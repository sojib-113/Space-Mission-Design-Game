/**
 * GOKU: SPACE MISSION COMMANDER
 * Main Game State Controller, UI Telemetry, Resource Management & Consequence Engine
 */

class SpaceGameManager {
  constructor() {
    this.currentMissionIndex = 0;
    this.lang = localStorage.getItem('goku_space_lang') || 'en'; // 'en' or 'bn'
    this.soundMuted = false;
    this.missionStartTime = 0;
    this.missionTimerInterval = null;

    // Progression in localStorage
    this.progress = this.loadProgress();

    // Spacecraft & Crew current stats
    this.ship = {
      fuel: 100,
      oxygen: 100,
      power: 100,
      hull: 100,
      cargoWeight: 600,
      maxCargo: 1000,
      comms: 100
    };

    this.crew = {
      health: 100,
      food: 100,
      water: 100,
      oxygen: 100,
      energy: 100,
      stress: 10,
      senzuBeans: 3
    };

    // Cargo preparation configuration
    this.cargoPrep = {
      food: 200,
      water: 200,
      fuel: 500,
      scienceKit: 100,
      oxygen: 200
    };

    // Active mission task completion state
    this.completedTasks = new Set();
    this.isEventTriggered = false;

    // Engine reference
    this.engine = null;

    // Mobile touch key state
    this.touchKeys = {
      up: false,
      down: false,
      left: false,
      right: false,
      action: false
    };
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('goku_space_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      unlockedMission: 1,
      highScores: {},
      stars: {},
      totalXP: 0
    };
  }

  saveProgress() {
    try {
      localStorage.setItem('goku_space_progress', JSON.stringify(this.progress));
    } catch (e) {}
  }

  init() {
    // Canvas setup
    const canvas = document.getElementById('simCanvas');
    this.engine = new SpaceSimulationEngine(canvas);
    window.addEventListener('resize', () => this.engine.resize());
    this.engine.resize();

    // Global callbacks from engine
    window.onMissionObjectiveComplete = (taskId) => this.onTaskDone(taskId);
    window.onShipDamage = (amount) => this.damageShip(amount);

    // Bind UI elements
    this.bindDOMEvents();
    this.bindKeyboardControls();
    this.bindMobileTouchControls();

    // Show initial screen
    this.updateLanguageUI();
    this.showScreen('startScreen');
  }

  // --- LANGUAGE SWITCHER ---
  toggleLanguage() {
    this.lang = this.lang === 'en' ? 'bn' : 'en';
    localStorage.setItem('goku_space_lang', this.lang);
    this.updateLanguageUI();
    sounds.playBeep(650, 0.05);
  }

  updateLanguageUI() {
    const isBn = this.lang === 'bn';
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = isBn ? el.getAttribute('data-bn') : el.getAttribute('data-en');
    });

    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.textContent = isBn ? '🌐 English' : '🌐 বাংলা';
    }

    // Refresh dynamic active view if any
    const mission = MISSIONS_DATA[this.currentMissionIndex];
    if (mission && document.getElementById('briefingModal').classList.contains('active')) {
      this.populateBriefing(mission);
    }
  }

  // --- SCREEN NAVIGATION ---
  showScreen(screenId) {
    sounds.playBeep(880, 0.04);
    const screens = ['startScreen', 'gameplayContainer', 'resultScreen', 'encyclopediaModal', 'missionSelectModal'];
    screens.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });

    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');

    if (screenId === 'gameplayContainer') {
      setTimeout(() => this.engine.resize(), 50);
    }
  }

  // --- MISSION FLOW ---
  startMissionBriefing(missionIndex) {
    this.currentMissionIndex = missionIndex;
    const mission = MISSIONS_DATA[missionIndex];
    this.populateBriefing(mission);

    const modal = document.getElementById('briefingModal');
    modal.classList.add('active');
    sounds.playBeep(980, 0.08);
  }

  populateBriefing(mission) {
    const isBn = this.lang === 'bn';
    document.getElementById('briefingAct').textContent = isBn ? mission.actBengali : mission.actName;
    document.getElementById('briefingTitle').textContent = `MISSION ${String(mission.id).padStart(2, '0')}: ${isBn ? mission.titleBengali : mission.title}`;
    document.getElementById('briefingDest').textContent = isBn ? mission.destinationBengali : mission.destination;
    document.getElementById('briefingObjective').textContent = isBn ? mission.objectiveBengali : mission.objective;
    document.getElementById('briefingRisk').textContent = isBn ? mission.riskBengali : mission.risk;

    // Difficulty stars
    let starStr = '';
    for (let i = 0; i < mission.difficulty; i++) starStr += '⭐';
    document.getElementById('briefingDifficulty').textContent = starStr;

    // Tasks list
    const tasksEl = document.getElementById('briefingTasks');
    tasksEl.innerHTML = '';
    mission.tasks.forEach(t => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="task-bullet">▸</span> ${isBn ? t.textBn : t.text}`;
      tasksEl.appendChild(li);
    });

    // Goku dialogue
    const gokuQuote = GOKU_DIALOGUES[`mission${mission.id}_start`] || GOKU_DIALOGUES.welcome;
    document.getElementById('briefingGokuText').textContent = isBn ? gokuQuote.bn : gokuQuote.en;
  }

  openCargoPrep() {
    document.getElementById('briefingModal').classList.remove('active');
    const mission = MISSIONS_DATA[this.currentMissionIndex];

    // Reset default cargo according to mission recommendation
    this.cargoPrep = { ...mission.recommendedCargo };
    this.updateCargoUI();

    document.getElementById('cargoModal').classList.add('active');
    sounds.playBeep(750, 0.05);
  }

  updateCargoUI() {
    const mission = MISSIONS_DATA[this.currentMissionIndex];
    const totalWeight = this.cargoPrep.food + this.cargoPrep.water + this.cargoPrep.fuel + this.cargoPrep.scienceKit + this.cargoPrep.oxygen;
    this.ship.cargoWeight = totalWeight;
    this.ship.maxCargo = mission.maxCargoCapacity;

    document.getElementById('cargoFoodVal').textContent = `${this.cargoPrep.food} kg`;
    document.getElementById('cargoWaterVal').textContent = `${this.cargoPrep.water} kg`;
    document.getElementById('cargoFuelVal').textContent = `${this.cargoPrep.fuel} kg`;
    document.getElementById('cargoKitVal').textContent = `${this.cargoPrep.scienceKit} kg`;
    document.getElementById('cargoO2Val').textContent = `${this.cargoPrep.oxygen} kg`;

    const weightBar = document.getElementById('cargoWeightBar');
    const weightPct = Math.min(100, (totalWeight / mission.maxCargoCapacity) * 100);
    weightBar.style.width = `${weightPct}%`;

    const weightText = document.getElementById('cargoWeightText');
    weightText.textContent = `${totalWeight} kg / ${mission.maxCargoCapacity} kg`;

    // Dynamic Tradeoffs (PDF Page 11: More Weight -> Fuel Consumption ↑ & Maneuverability ↓)
    const fuelMultiplier = (1 + (totalWeight / mission.maxCargoCapacity) * 0.45).toFixed(2);
    const maneuverPct = Math.max(40, (100 - (totalWeight / mission.maxCargoCapacity) * 45)).toFixed(0);

    document.getElementById('cargoFuelMultiplier').textContent = `${fuelMultiplier}x`;
    document.getElementById('cargoManeuverability').textContent = `${maneuverPct}%`;

    const launchBtn = document.getElementById('confirmLaunchBtn');
    if (totalWeight > mission.maxCargoCapacity) {
      launchBtn.disabled = true;
      weightText.style.color = '#ff3344';
    } else {
      launchBtn.disabled = false;
      weightText.style.color = '#00e5ff';
    }
  }

  adjustCargo(item, delta) {
    sounds.playBeep(600, 0.03);
    this.cargoPrep[item] = Math.max(50, this.cargoPrep[item] + delta);
    this.updateCargoUI();
  }

  launchCurrentMission() {
    document.getElementById('cargoModal').classList.remove('active');
    this.showScreen('gameplayContainer');

    const mission = MISSIONS_DATA[this.currentMissionIndex];

    // Reset ship & crew from configured cargo
    this.ship = {
      fuel: 100,
      oxygen: 100,
      power: 100,
      hull: 100,
      cargoWeight: this.ship.cargoWeight,
      maxCargo: mission.maxCargoCapacity,
      comms: 100
    };

    this.crew = {
      health: 100,
      food: Math.min(100, (this.cargoPrep.food / 250) * 100),
      water: Math.min(100, (this.cargoPrep.water / 250) * 100),
      oxygen: 100,
      energy: 100,
      stress: 5 + mission.difficulty * 4,
      senzuBeans: 3
    };

    this.completedTasks.clear();
    this.isEventTriggered = false;

    // Start simulation engine
    this.engine.setMission(mission);

    // Setup HUD telemetry
    this.updateHUDHeader(mission);
    this.populateObjectiveChecklist(mission);
    this.updateShipTelemetry();
    this.updateCrewTelemetry();

    // Start mission timer
    this.missionStartTime = Date.now();
    if (this.missionTimerInterval) clearInterval(this.missionTimerInterval);
    this.missionTimerInterval = setInterval(() => this.gameLoopTick(), 1000);

    sounds.startThruster();
    setTimeout(() => sounds.stopThruster(), 1200);
  }

  updateHUDHeader(mission) {
    const isBn = this.lang === 'bn';
    document.getElementById('hudMissionName').textContent = `M${mission.id}: ${isBn ? mission.titleBengali : mission.title}`;
    document.getElementById('hudDestination').textContent = isBn ? mission.destinationBengali : mission.destination;
    document.getElementById('hudMissionTime').textContent = '00:00';
  }

  populateObjectiveChecklist(mission) {
    const isBn = this.lang === 'bn';
    const container = document.getElementById('hudObjectivesList');
    container.innerHTML = '';

    mission.tasks.forEach(t => {
      const item = document.createElement('div');
      item.className = 'objective-item';
      item.id = `task_item_${t.id}`;
      item.innerHTML = `
        <span class="obj-check">○</span>
        <span class="obj-text">${isBn ? t.textBn : t.text}</span>
      `;
      container.appendChild(item);
    });
  }

  // --- OBJECTIVE PROGRESSION ---
  onTaskDone(taskId) {
    if (this.completedTasks.has(taskId)) return;
    this.completedTasks.add(taskId);

    const item = document.getElementById(`task_item_${taskId}`);
    if (item) {
      item.classList.add('done');
      item.querySelector('.obj-check').textContent = '✓';
    }

    sounds.playBeep(1100, 0.08);

    const mission = MISSIONS_DATA[this.currentMissionIndex];
    // Check random mid-flight crisis event trigger at 50% task completion
    if (!this.isEventTriggered && this.completedTasks.size >= Math.ceil(mission.tasks.length / 2)) {
      this.isEventTriggered = true;
      setTimeout(() => this.triggerUnexpectedEvent(), 1200);
    }

    // Check all objectives complete
    if (this.completedTasks.size >= mission.tasks.length) {
      setTimeout(() => this.completeMission(), 2000);
    }
  }

  // --- MID-FLIGHT CRISIS EVENT (PDF Page 2 & 11) ---
  triggerUnexpectedEvent() {
    sounds.startAlarm();
    const event = UNEXPECTED_EVENTS_POOL[Math.floor(Math.random() * UNEXPECTED_EVENTS_POOL.length)];
    const isBn = this.lang === 'bn';

    document.getElementById('crisisEventTitle').textContent = `⚠️ ${isBn ? event.titleBn : event.title}`;
    document.getElementById('crisisEventDesc').textContent = isBn ? event.descBn : event.desc;

    const choicesContainer = document.getElementById('crisisChoices');
    choicesContainer.innerHTML = '';

    event.choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'crisis-choice-btn';
      btn.textContent = isBn ? choice.textBn : choice.text;
      btn.onclick = () => {
        sounds.stopAlarm();
        this.applyEventChoice(choice);
        document.getElementById('crisisModal').classList.remove('active');
      };
      choicesContainer.appendChild(btn);
    });

    document.getElementById('crisisModal').classList.add('active');
  }

  applyEventChoice(choice) {
    sounds.playBeep(780, 0.06);
    if (choice.powerCost) this.ship.power = Math.max(0, this.ship.power - choice.powerCost);
    if (choice.hullCost) this.ship.hull = Math.max(0, this.ship.hull - choice.hullCost);
    if (choice.fuelLoss) this.ship.fuel = Math.max(0, this.ship.fuel - choice.fuelLoss * 0.1);
    if (choice.o2Cost) this.ship.oxygen = Math.max(0, this.ship.oxygen - choice.o2Cost);
    if (choice.crewStress) this.crew.stress = Math.min(100, this.crew.stress + choice.crewStress);
    if (choice.gokuEnergyCost) this.crew.energy = Math.max(0, this.crew.energy - choice.gokuEnergyCost);
    if (choice.foodLoss) this.crew.food = Math.max(0, this.crew.food - choice.foodLoss * 0.2);

    this.updateShipTelemetry();
    this.updateCrewTelemetry();
  }

  damageShip(amount) {
    this.ship.hull = Math.max(0, this.ship.hull - amount);
    this.ship.fuel = Math.max(0, this.ship.fuel - amount * 0.3);
    this.crew.stress = Math.min(100, this.crew.stress + 12);
    this.updateShipTelemetry();
    this.updateCrewTelemetry();

    if (this.ship.hull <= 0) {
      this.failMission("Catastrophic hull integrity failure!");
    }
  }

  // --- MAIN SIMULATION TIME TICK ---
  gameLoopTick() {
    const elapsedSec = Math.floor((Date.now() - this.missionStartTime) / 1000);
    const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
    const secs = String(elapsedSec % 60).padStart(2, '0');
    document.getElementById('hudMissionTime').textContent = `${mins}:${secs}`;

    // Slow ambient resource consumption
    this.ship.power = Math.max(5, this.ship.power - 0.25);
    this.crew.oxygen = Math.max(5, this.crew.oxygen - 0.3);
    this.crew.food = Math.max(0, this.crew.food - 0.2);
    this.crew.water = Math.max(0, this.crew.water - 0.25);
    this.crew.energy = Math.max(0, this.crew.energy - 0.2);

    // If starving or out of oxygen, crew health drops
    if (this.crew.oxygen < 15 || this.crew.food <= 0 || this.crew.water <= 0) {
      this.crew.health = Math.max(0, this.crew.health - 2);
    }

    if (this.crew.health <= 0) {
      this.failMission("Life support failure! Crew casualties sustained.");
      return;
    }

    this.updateShipTelemetry();
    this.updateCrewTelemetry();
  }

  updateShipTelemetry() {
    this.setGauge('gaugeFuel', this.ship.fuel);
    this.setGauge('gaugeO2', this.ship.oxygen);
    this.setGauge('gaugePower', this.ship.power);
    this.setGauge('gaugeHull', this.ship.hull);
    this.setGauge('gaugeCargo', (this.ship.cargoWeight / this.ship.maxCargo) * 100);
    this.setGauge('gaugeComms', this.ship.comms);
  }

  updateCrewTelemetry() {
    this.setGauge('gaugeHealth', this.crew.health);
    this.setGauge('gaugeFood', this.crew.food);
    this.setGauge('gaugeWater', this.crew.water);
    this.setGauge('gaugeCrewO2', this.crew.oxygen);
    this.setGauge('gaugeEnergy', this.crew.energy);
    this.setGauge('gaugeStress', this.crew.stress);

    document.getElementById('senzuCount').textContent = `× ${this.crew.senzuBeans}`;
  }

  setGauge(elementId, value) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const clamped = Math.max(0, Math.min(100, value));
    el.style.width = `${clamped}%`;

    const valEl = document.getElementById(`${elementId}_val`);
    if (valEl) valEl.textContent = `${clamped.toFixed(0)}%`;

    // Alert color styling
    if (elementId === 'gaugeStress') {
      el.style.background = clamped > 70 ? '#ff3344' : '#00e5ff';
    } else {
      el.style.background = clamped < 25 ? '#ff3344' : (clamped < 50 ? '#ff9100' : '#00e5ff');
    }
  }

  // --- CREW ACTIONS ---
  restCrew() {
    if (this.crew.food >= 10 && this.crew.water >= 10) {
      sounds.playBeep(520, 0.1);
      this.crew.food -= 10;
      this.crew.water -= 10;
      this.crew.stress = Math.max(0, this.crew.stress - 25);
      this.crew.energy = Math.min(100, this.crew.energy + 35);
      this.updateCrewTelemetry();
    } else {
      sounds.playBeep(250, 0.15);
    }
  }

  useSenzuBean() {
    if (this.crew.senzuBeans > 0) {
      sounds.playFanfare();
      this.crew.senzuBeans--;
      this.crew.health = 100;
      this.crew.energy = 100;
      this.crew.stress = 0;
      this.crew.food = 100;
      this.crew.water = 100;
      this.updateCrewTelemetry();
    } else {
      sounds.playBeep(250, 0.15);
    }
  }

  // --- SCORING & MISSION CONCLUSION (PDF Page 12-13) ---
  completeMission() {
    if (this.missionTimerInterval) clearInterval(this.missionTimerInterval);
    sounds.stopThruster();
    sounds.stopAlarm();
    sounds.playFanfare();

    const isBn = this.lang === 'bn';
    const mission = MISSIONS_DATA[this.currentMissionIndex];

    // Calculate score exactly according to PDF Page 12:
    // Mission Completion: +500
    // Crew Survival: +300
    // Scientific Data: +250
    // Fuel Efficiency: +200
    // Resource Management: +200
    // Time Efficiency: +150
    // Bonus Objective: +100
    const completionScore = 500;
    const survivalScore = Math.round((this.crew.health / 100) * 300);
    const dataScore = 250;
    const fuelScore = Math.round((this.ship.fuel / 100) * 200);
    const resourceScore = Math.round(((this.ship.power + this.ship.oxygen) / 200) * 200);

    const elapsedSec = Math.floor((Date.now() - this.missionStartTime) / 1000);
    const timeScore = elapsedSec < 120 ? 150 : (elapsedSec < 180 ? 100 : 50);
    const bonusScore = (this.crew.health > 85 && this.ship.hull > 80) ? 100 : 50;

    const totalXP = completionScore + survivalScore + dataScore + fuelScore + resourceScore + timeScore + bonusScore;

    // Star calculation (1 to 5)
    let starsEarned = 3;
    if (totalXP >= 1600) starsEarned = 5;
    else if (totalXP >= 1400) starsEarned = 4;
    else if (totalXP >= 1100) starsEarned = 3;
    else if (totalXP >= 900) starsEarned = 2;
    else starsEarned = 1;

    // Update progression
    const nextMissionId = mission.id + 1;
    if (nextMissionId > this.progress.unlockedMission && nextMissionId <= 11) {
      this.progress.unlockedMission = nextMissionId;
    }
    this.progress.highScores[mission.id] = Math.max(this.progress.highScores[mission.id] || 0, totalXP);
    this.progress.stars[mission.id] = Math.max(this.progress.stars[mission.id] || 0, starsEarned);
    this.progress.totalXP += totalXP;
    this.saveProgress();

    // Populate Results Screen (PDF Page 13)
    document.getElementById('resultStatus').textContent = '✅ MISSION COMPLETE';
    document.getElementById('resultStatus').style.color = '#00ff88';

    document.getElementById('resCrewSurvival').textContent = `${this.crew.health.toFixed(0)}%`;
    document.getElementById('resFuelRemain').textContent = `${this.ship.fuel.toFixed(0)}%`;
    document.getElementById('resO2Remain').textContent = `${this.ship.oxygen.toFixed(0)}%`;
    document.getElementById('resHullIntegrity').textContent = `${this.ship.hull.toFixed(0)}%`;
    document.getElementById('resSamples').textContent = `${this.completedTasks.size}/${mission.tasks.length}`;

    // Itemized Score List
    document.getElementById('scoreList').innerHTML = `
      <div class="score-line"><span>Mission Completion</span><span>+${completionScore}</span></div>
      <div class="score-line"><span>Crew Survival</span><span>+${survivalScore}</span></div>
      <div class="score-line"><span>Scientific Data</span><span>+${dataScore}</span></div>
      <div class="score-line"><span>Fuel Efficiency</span><span>+${fuelScore}</span></div>
      <div class="score-line"><span>Resource Management</span><span>+${resourceScore}</span></div>
      <div class="score-line"><span>Time Efficiency</span><span>+${timeScore}</span></div>
      <div class="score-line"><span>Bonus Objective</span><span>+${bonusScore}</span></div>
    `;

    document.getElementById('resultTotalScore').textContent = `${totalXP.toLocaleString()} XP`;

    let starDisplay = '';
    for (let s = 0; s < starsEarned; s++) starDisplay += '⭐';
    document.getElementById('resultStars').textContent = starDisplay;

    // Goku quote
    const gokuResult = mission.id === 10 ? GOKU_DIALOGUES.grand_ending : GOKU_DIALOGUES.mission_success;
    document.getElementById('resultGokuText').textContent = isBn ? gokuResult.bn : gokuResult.en;

    const nextBtn = document.getElementById('resultNextBtn');
    if (mission.id < 10) {
      nextBtn.style.display = 'inline-block';
      nextBtn.onclick = () => {
        this.showScreen('gameplayContainer');
        this.startMissionBriefing(this.currentMissionIndex + 1);
      };
    } else {
      nextBtn.style.display = 'none';
      document.getElementById('resultStatus').textContent = '🌍 MISSION ACCOMPLISHED! THE CREW IS HOME!';
    }

    this.showScreen('resultScreen');
  }

  failMission(reason) {
    if (this.missionTimerInterval) clearInterval(this.missionTimerInterval);
    sounds.stopThruster();
    sounds.stopAlarm();
    sounds.playExplosion();

    const isBn = this.lang === 'bn';
    document.getElementById('resultStatus').textContent = '❌ MISSION FAILED';
    document.getElementById('resultStatus').style.color = '#ff3344';

    document.getElementById('resCrewSurvival').textContent = '0%';
    document.getElementById('resFuelRemain').textContent = `${this.ship.fuel.toFixed(0)}%`;
    document.getElementById('resO2Remain').textContent = `${this.ship.oxygen.toFixed(0)}%`;
    document.getElementById('resHullIntegrity').textContent = `${this.ship.hull.toFixed(0)}%`;
    document.getElementById('resSamples').textContent = '0';

    document.getElementById('scoreList').innerHTML = `
      <div class="score-line"><span>Failure Cause</span><span style="color:#ff4444">${reason}</span></div>
    `;

    document.getElementById('resultTotalScore').textContent = '0 XP';
    document.getElementById('resultStars').textContent = '—';

    document.getElementById('resultGokuText').textContent = isBn ? GOKU_DIALOGUES.mission_fail.bn : GOKU_DIALOGUES.mission_fail.en;

    document.getElementById('resultNextBtn').style.display = 'none';

    this.showScreen('resultScreen');
  }

  // --- SOLAR SYSTEM HOLO-DECK ENCYCLOPEDIA (From Infographics) ---
  openEncyclopedia(targetPlanetId = 'earth') {
    sounds.playScannerPing();
    const isBn = this.lang === 'bn';

    const listContainer = document.getElementById('encyclopediaPlanetList');
    listContainer.innerHTML = '';

    PLANETS_DATA.forEach(p => {
      const btn = document.createElement('button');
      btn.className = `planet-tab-btn ${p.id === targetPlanetId ? 'active' : ''}`;
      btn.innerHTML = `<span class="planet-dot" style="background:${p.color}"></span> ${isBn ? p.bengaliName : p.name}`;
      btn.onclick = () => {
        document.querySelectorAll('.planet-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderPlanetDetails(p);
      };
      listContainer.appendChild(btn);
    });

    const initialPlanet = PLANETS_DATA.find(p => p.id === targetPlanetId) || PLANETS_DATA[2];
    this.renderPlanetDetails(initialPlanet);

    document.getElementById('encyclopediaModal').classList.add('active');
  }

  renderPlanetDetails(planet) {
    const isBn = this.lang === 'bn';
    document.getElementById('holoPlanetName').textContent = isBn ? `${planet.bengaliName} (${planet.name})` : planet.name;
    document.getElementById('holoPlanetTagline').textContent = planet.tagline;

    // Visual Sphere
    const sphere = document.getElementById('holoPlanetSphere');
    sphere.style.background = `radial-gradient(circle at 35% 35%, ${planet.glow}, ${planet.color}, #080a14)`;
    sphere.style.boxShadow = `0 0 40px ${planet.glow}66`;

    // Planet Stats
    document.getElementById('holoDistSun').textContent = planet.distanceSun;
    document.getElementById('holoDiameter').textContent = planet.diameter;
    document.getElementById('holoMoons').textContent = planet.moons;
    document.getElementById('holoTemp').textContent = planet.temp;
    document.getElementById('holoOrbital').textContent = planet.orbitalPeriod;

    // Facts list
    const factsList = document.getElementById('holoPlanetFacts');
    factsList.innerHTML = '';
    const facts = isBn ? planet.bengaliFacts : planet.facts;
    facts.forEach(f => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="fact-bullet">⭐</span> ${f}`;
      factsList.appendChild(li);
    });
  }

  // --- MISSION SELECT SCREEN ---
  openMissionSelect() {
    sounds.playBeep(700, 0.05);
    const grid = document.getElementById('missionSelectGrid');
    grid.innerHTML = '';
    const isBn = this.lang === 'bn';

    MISSIONS_DATA.forEach((m, idx) => {
      const card = document.createElement('div');
      const isUnlocked = m.id <= this.progress.unlockedMission;
      const starsEarned = this.progress.stars[m.id] || 0;
      const highScore = this.progress.highScores[m.id] || 0;

      card.className = `mission-select-card ${isUnlocked ? 'unlocked' : 'locked'}`;

      let starStr = '';
      for (let s = 0; s < 5; s++) {
        starStr += s < starsEarned ? '⭐' : '☆';
      }

      card.innerHTML = `
        <div class="m-card-header">
          <span class="m-number">M${String(m.id).padStart(2, '0')}</span>
          <span class="m-stars">${starStr}</span>
        </div>
        <div class="m-card-title">${isBn ? m.titleBengali : m.title}</div>
        <div class="m-card-dest">${isBn ? m.destinationBengali : m.destination}</div>
        <div class="m-card-footer">
          ${isUnlocked ? `<span class="m-high-score">High: ${highScore} XP</span>` : `<span class="m-locked-tag">🔒 LOCKED</span>`}
        </div>
      `;

      if (isUnlocked) {
        card.onclick = () => {
          document.getElementById('missionSelectModal').classList.remove('active');
          this.startMissionBriefing(idx);
        };
      }

      grid.appendChild(card);
    });

    document.getElementById('missionSelectModal').classList.add('active');
  }

  // --- EVENT BINDINGS ---
  bindDOMEvents() {
    // Sound Toggle
    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn) {
      soundBtn.onclick = () => {
        this.soundMuted = sounds.toggleMute();
        soundBtn.textContent = this.soundMuted ? '🔇' : '🔊';
      };
    }

    // Language Toggle
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.onclick = () => this.toggleLanguage();
    }

    // Start Screen Buttons
    document.getElementById('btnStartGame').onclick = () => {
      const nextIdx = Math.min(this.progress.unlockedMission - 1, 9);
      this.startMissionBriefing(nextIdx);
    };

    document.getElementById('btnMissionSelect').onclick = () => this.openMissionSelect();
    document.getElementById('btnHoloDeck').onclick = () => this.openEncyclopedia('earth');

    const viewInfographicBtn = document.getElementById('btnViewInfographic');
    if (viewInfographicBtn) {
      viewInfographicBtn.onclick = () => {
        sounds.playScannerPing();
        document.getElementById('infographicModal').classList.add('active');
      };
    }

    // Briefing Modal buttons
    document.getElementById('briefingPrepBtn').onclick = () => this.openCargoPrep();
    document.getElementById('briefingCloseBtn').onclick = () => {
      document.getElementById('briefingModal').classList.remove('active');
    };

    // Cargo Preparation Sliders / Increments
    const cargoItems = ['food', 'water', 'fuel', 'scienceKit', 'oxygen'];
    cargoItems.forEach(item => {
      const plusBtn = document.getElementById(`cargo_${item}_plus`);
      const minusBtn = document.getElementById(`cargo_${item}_minus`);
      if (plusBtn) plusBtn.onclick = () => this.adjustCargo(item, 50);
      if (minusBtn) minusBtn.onclick = () => this.adjustCargo(item, -50);
    });

    document.getElementById('confirmLaunchBtn').onclick = () => this.launchCurrentMission();

    // Crew Status action buttons
    document.getElementById('btnRestCrew').onclick = () => this.restCrew();
    document.getElementById('btnSenzu').onclick = () => this.useSenzuBean();

    // Results screen
    document.getElementById('resultRetryBtn').onclick = () => {
      this.launchCurrentMission();
    };
    document.getElementById('resultHomeBtn').onclick = () => {
      this.showScreen('startScreen');
    };

    // Close buttons for modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.onclick = () => {
        btn.closest('.modal-backdrop').classList.remove('active');
      };
    });
  }

  bindKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) this.engine.keys.up = true;
      if (['ArrowDown', 'KeyS'].includes(e.code)) this.engine.keys.down = true;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.engine.keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.engine.keys.right = true;
      if (['Space', 'KeyE', 'Enter'].includes(e.code)) this.engine.keys.action = true;
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) this.engine.keys.up = false;
      if (['ArrowDown', 'KeyS'].includes(e.code)) this.engine.keys.down = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.engine.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.engine.keys.right = false;
      if (['Space', 'KeyE', 'Enter'].includes(e.code)) this.engine.keys.action = false;
    });
  }

  bindMobileTouchControls() {
    // Touch D-Pad
    const setupTouchBtn = (elementId, keyName) => {
      const btn = document.getElementById(elementId);
      if (!btn) return;

      const press = (e) => {
        e.preventDefault();
        this.engine.keys[keyName] = true;
        sounds.playBeep(450, 0.02);
      };

      const release = (e) => {
        e.preventDefault();
        this.engine.keys[keyName] = false;
      };

      btn.addEventListener('touchstart', press, { passive: false });
      btn.addEventListener('touchend', release, { passive: false });
      btn.addEventListener('mousedown', press);
      btn.addEventListener('mouseup', release);
    };

    setupTouchBtn('btnTouchUp', 'up');
    setupTouchBtn('btnTouchDown', 'down');
    setupTouchBtn('btnTouchLeft', 'left');
    setupTouchBtn('btnTouchRight', 'right');
    setupTouchBtn('btnTouchAction', 'action');
    setupTouchBtn('btnTouchThrust', 'up');
  }
}

// Instantiate game on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new SpaceGameManager();
  window.gameApp.init();
});
