/**
 * GOKU: SPACE MISSION COMMANDER
 * Simulation & Canvas Rendering Engine
 * Handles 60FPS physics, starfields, spacecraft, minigames, and responsive particle effects.
 */

class SpaceSimulationEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    // Simulation state
    this.activeMission = null;
    this.mode = 'idle'; // 'launch', 'landing', 'surface_rover', 'satellite_eva', 'crisis_triage', 'asteroid_dodge', 'station_dock_hack', 'deep_slingshot', 'final_reentry'
    this.simTime = 0;
    this.lastFrame = 0;
    this.isPaused = false;

    // Starfield particles
    this.stars = [];
    this.nebulae = [];
    this.initCosmos();

    // Mission-specific dynamic state
    this.state = {};

    // Controls state
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      action: false,
      throttle: 0
    };

    // Images
    this.gokuImg = new Image();
    this.gokuImg.src = 'assets/goku.jpg';
    this.planetsGridImg = new Image();
    this.planetsGridImg.src = 'assets/planets_grid.jpg';

    // Particle pool for thruster flames, explosions, dust
    this.particles = [];

    // Bind loop
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.width = rect.width;
    this.height = rect.height;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  initCosmos() {
    this.stars = [];
    for (let i = 0; i < 150; i++) {
      this.stars.push({
        x: Math.random() * 2000,
        y: Math.random() * 2000,
        z: Math.random() * 1.5 + 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.05 + 0.01
      });
    }
  }

  setMission(mission) {
    this.activeMission = mission;
    this.mode = mission.mechanic || 'launch';
    this.simTime = 0;
    this.particles = [];
    this.initModeState(this.mode);
  }

  initModeState(mode) {
    const w = this.width || 800;
    const h = this.height || 500;

    switch (mode) {
      case 'launch':
        this.state = {
          altitude: 0, // km (target 300km)
          velocity: 0, // km/s (target 7.8 km/s)
          pitch: 90,   // degrees (starts 90 vertical, turns to ~5 near orbit)
          throttle: 0, // 0 to 1
          fuel: 100,
          stage: 1,
          orbitCircularized: false,
          maxAltitude: 300,
          targetVelocity: 7.8
        };
        break;

      case 'landing':
        this.state = {
          x: w * 0.5,
          y: 80,
          vx: 0.5,
          vy: 0.8,
          fuel: 100,
          pitch: 0,
          gravity: 0.045, // Moon gravity scaled
          crashed: false,
          landed: false,
          padX: w * 0.5,
          padWidth: 140,
          touchdownSpeed: 0
        };
        break;

      case 'surface_rover':
        this.state = {
          roverX: w * 0.5,
          roverY: h * 0.5,
          roverAngle: 0,
          roverSpeed: 0,
          samplesNeeded: 5,
          samplesCollected: 0,
          radarPulse: 0,
          cargoWeightAdded: 0,
          minerals: [
            { x: w * 0.2, y: h * 0.3, collected: false, name: 'Helium-3 Isotope' },
            { x: w * 0.8, y: h * 0.25, collected: false, name: 'Titanium Basalt' },
            { x: w * 0.35, y: h * 0.75, collected: false, name: 'Ancient Regolith' },
            { x: w * 0.75, y: h * 0.7, collected: false, name: 'Silicon Glass' },
            { x: w * 0.5, y: h * 0.2, collected: false, name: 'Water-Ice Crystal' }
          ],
          landerX: w * 0.5,
          landerY: h * 0.5,
          nearLander: true
        };
        break;

      case 'satellite_eva':
        this.state = {
          gokuX: w * 0.3,
          gokuY: h * 0.5,
          tetherX: w * 0.15,
          tetherY: h * 0.5,
          solarStormTime: 65, // seconds until flare hit
          elapsedTime: 0,
          nodes: [
            { id: 'power', x: w * 0.7, y: h * 0.35, label: 'Solar Power Array', repaired: 0, max: 100 },
            { id: 'comms', x: w * 0.75, y: h * 0.5, label: 'High-Gain Dish', repaired: 0, max: 100 },
            { id: 'nav',   x: w * 0.7, y: h * 0.65, label: 'Quantum Gyro', repaired: 0, max: 100 }
          ],
          activeNode: null,
          allRepaired: false
        };
        break;

      case 'crisis_triage':
        this.state = {
          hullIntegrity: 68,
          oxygenLeakRate: 1.2,
          reactorTemp: 780, // Target < 450
          repairedO2: false,
          repairedPower: false,
          repairedFood: false,
          crisisTimer: 45
        };
        break;

      case 'asteroid_dodge':
        this.state = {
          shipX: w * 0.2,
          shipY: h * 0.5,
          speed: 4,
          distanceTraveled: 0,
          targetDistance: 1000,
          asteroids: [],
          fuelPickups: [],
          shield: 100,
          isShieldActive: false,
          dodgeCount: 0
        };
        // Pre-populate asteroids
        for (let i = 0; i < 14; i++) {
          this.state.asteroids.push({
            x: w + Math.random() * w * 1.5,
            y: Math.random() * h,
            vx: -(Math.random() * 3 + 3),
            vy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 25 + 15,
            rot: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.05
          });
        }
        break;

      case 'mars_mission':
        this.state = {
          phase: 'descent', // 'descent', 'surface', 'ascent'
          marsY: 50,
          heatShieldTemp: 800,
          samplesDrilled: 0,
          roverX: w * 0.5,
          roverY: h * 0.6,
          dustStormIntensity: 0.6
        };
        break;

      case 'station_dock_hack':
        this.state = {
          dockAlignment: { x: 0, y: 0, roll: 0 },
          docked: false,
          hackProgress: 0,
          powerRerouted: false,
          weightAccepted: false
        };
        break;

      case 'deep_slingshot':
        this.state = {
          shipDist: 1.0, // AU from Sun
          jupiterDist: 5.2,
          uranusDist: 19.2,
          neptuneDist: 30.1,
          velocity: 15, // km/s
          slingshotDone: false,
          tempK: 45
        };
        break;

      case 'final_reentry':
        this.state = {
          altitude: 120, // km
          velocity: 11.2, // km/s
          reentryAngle: 34.0, // target 32.0 to 36.0 deg
          heatShieldTemp: 1800,
          plasmaIntensity: 1.0,
          crises: {
            fuelLeak: true,
            commsLost: true,
            solarStorm: true,
            oxygenLow: true,
            powerDrop: true
          },
          parachuteDeployed: false,
          landedSafe: false
        };
        break;
    }
  }

  // Input bindings from game controller
  updateInput(keys) {
    this.keys = keys;
  }

  // Main simulation loop
  loop(timestamp) {
    if (!this.lastFrame) this.lastFrame = timestamp;
    const dt = Math.min((timestamp - this.lastFrame) / 1000, 0.1);
    this.lastFrame = timestamp;

    if (!this.isPaused) {
      this.simTime += dt;
      this.updateSimulation(dt);
    }

    this.render();
    requestAnimationFrame(this.loop);
  }

  updateSimulation(dt) {
    if (!this.activeMission) return;

    // Background cosmic star motion
    const cosmicSpeed = (this.mode === 'asteroid_dodge' || this.mode === 'launch') ? 60 : 15;
    for (let s of this.stars) {
      s.x -= cosmicSpeed * dt * s.z;
      if (s.x < -10) s.x = this.width + 20;
    }

    // Update floating particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      p.alpha = Math.max(0, p.life / p.maxLife);
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    // Specific mode physics
    switch (this.mode) {
      case 'launch':
        this.updateLaunchSim(dt);
        break;
      case 'landing':
        this.updateLandingSim(dt);
        break;
      case 'surface_rover':
        this.updateRoverSim(dt);
        break;
      case 'satellite_eva':
        this.updateEvaSim(dt);
        break;
      case 'asteroid_dodge':
        this.updateAsteroidSim(dt);
        break;
      case 'station_dock_hack':
        this.updateStationSim(dt);
        break;
      case 'deep_slingshot':
        this.updateDeepSpaceSim(dt);
        break;
      case 'final_reentry':
        this.updateFinalReentrySim(dt);
        break;
    }
  }

  spawnParticle(x, y, vx, vy, color, size, life) {
    this.particles.push({
      x, y, vx, vy, color, size, life, maxLife: life, alpha: 1
    });
  }

  // --- MISSION 1: LAUNCH SIMULATION ---
  updateLaunchSim(dt) {
    const s = this.state;
    // Throttle control via keys or virtual throttle
    if (this.keys.up) s.throttle = Math.min(1.0, s.throttle + dt * 0.8);
    if (this.keys.down) s.throttle = Math.max(0.0, s.throttle - dt * 0.8);
    if (this.keys.right) s.pitch = Math.max(10, s.pitch - dt * 15);
    if (this.keys.left) s.pitch = Math.min(90, s.pitch + dt * 15);

    sounds.setThrusterPower(s.throttle);

    if (s.throttle > 0.05 && s.fuel > 0) {
      s.fuel -= s.throttle * dt * 2.2;
      const thrust = s.throttle * 14.5;
      const pitchRad = (s.pitch * Math.PI) / 180;

      // Vertical climb and horizontal acceleration
      const vertAcc = thrust * Math.sin(pitchRad) - 9.81 * (1 - s.altitude / 600);
      const horizAcc = thrust * Math.cos(pitchRad);

      s.velocity += Math.sqrt(vertAcc * vertAcc + horizAcc * horizAcc) * dt * 0.15;
      s.altitude += (vertAcc > 0 ? vertAcc : 0) * dt * 0.6;

      // Spawn thruster particles
      const exhaustX = this.width * 0.5 - Math.cos(pitchRad) * 40;
      const exhaustY = this.height * 0.65 + Math.sin(pitchRad) * 40;
      for (let i = 0; i < 3; i++) {
        this.spawnParticle(
          exhaustX + (Math.random() - 0.5) * 8,
          exhaustY,
          (Math.random() - 0.5) * 20 - Math.cos(pitchRad) * 80,
          Math.sin(pitchRad) * 120 + Math.random() * 50,
          Math.random() > 0.3 ? '#ffaa00' : '#00e5ff',
          Math.random() * 5 + 3,
          0.35
        );
      }
    }

    if (s.altitude >= 280 && s.velocity >= 7.6 && !s.orbitCircularized) {
      s.orbitCircularized = true;
      sounds.playFanfare();
      if (window.onMissionObjectiveComplete) {
        window.onMissionObjectiveComplete('reach_orbit');
      }
    }
  }

  // --- MISSION 2: LUNAR LANDING SIMULATION ---
  updateLandingSim(dt) {
    const s = this.state;
    if (s.landed || s.crashed) return;

    // Lunar gravity pull
    s.vy += s.gravity;

    // Retro-thrusters
    if ((this.keys.up || this.keys.action) && s.fuel > 0) {
      s.vy -= 0.11;
      s.fuel -= dt * 4.5;
      sounds.setThrusterPower(0.8);
      // Spawn lander flame
      this.spawnParticle(s.x, s.y + 24, (Math.random() - 0.5) * 10, 40 + Math.random() * 30, '#00f0ff', 4, 0.2);
    } else {
      sounds.setThrusterPower(0);
    }

    // RCS lateral thrusters
    if (this.keys.left && s.fuel > 0) {
      s.vx -= 0.05;
      s.fuel -= dt * 1.5;
      this.spawnParticle(s.x + 18, s.y, 30, 0, '#ffffff', 2.5, 0.15);
    }
    if (this.keys.right && s.fuel > 0) {
      s.vx += 0.05;
      s.fuel -= dt * 1.5;
      this.spawnParticle(s.x - 18, s.y, -30, 0, '#ffffff', 2.5, 0.15);
    }

    s.x += s.vx;
    s.y += s.vy;

    // Ground collision check
    const groundY = this.height - 70;
    if (s.y >= groundY) {
      s.y = groundY;
      const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy) * 2.5; // Scaled to m/s
      s.touchdownSpeed = speed;

      const padLeft = s.padX - s.padWidth / 2;
      const padRight = s.padX + s.padWidth / 2;
      const onPad = s.x >= padLeft && s.x <= padRight;

      if (speed <= 3.0 && onPad) {
        s.landed = true;
        sounds.stopThruster();
        sounds.playFanfare();
        if (window.onMissionObjectiveComplete) {
          window.onMissionObjectiveComplete('touchdown');
        }
      } else {
        s.crashed = true;
        sounds.stopThruster();
        sounds.playExplosion();
        // Spawn crash debris
        for (let i = 0; i < 40; i++) {
          this.spawnParticle(
            s.x, s.y,
            (Math.random() - 0.5) * 160,
            (Math.random() - 0.9) * 120,
            Math.random() > 0.5 ? '#ff4400' : '#888888',
            Math.random() * 6 + 2,
            0.8
          );
        }
      }
    }
  }

  // --- MISSION 3 & 7: SURFACE ROVER / NIMBUS EXPLORATION ---
  updateRoverSim(dt) {
    const s = this.state;
    // Movement
    let moving = false;
    if (this.keys.up) {
      s.roverY -= 140 * dt;
      moving = true;
    }
    if (this.keys.down) {
      s.roverY += 140 * dt;
      moving = true;
    }
    if (this.keys.left) {
      s.roverX -= 140 * dt;
      moving = true;
    }
    if (this.keys.right) {
      s.roverX += 140 * dt;
      moving = true;
    }

    // Keep inside bounds
    s.roverX = Math.max(30, Math.min(this.width - 30, s.roverX));
    s.roverY = Math.max(60, Math.min(this.height - 60, s.roverY));

    // Radar scan wave
    s.radarPulse = (s.radarPulse + dt * 2) % 4;

    // Check mineral collection
    for (let m of s.minerals) {
      if (!m.collected) {
        const dist = Math.hypot(m.x - s.roverX, m.y - s.roverY);
        if (dist < 40 && this.keys.action) {
          m.collected = true;
          s.samplesCollected++;
          s.cargoWeightAdded += 40; // 40 kg per sample
          sounds.playCollect();

          if (s.samplesCollected >= s.samplesNeeded) {
            sounds.playFanfare();
            if (window.onMissionObjectiveComplete) {
              window.onMissionObjectiveComplete('collect_5');
            }
          }
        }
      }
    }
  }

  // --- MISSION 4: SATELLITE EVA SPACEWALK ---
  updateEvaSim(dt) {
    const s = this.state;
    s.elapsedTime += dt;
    s.solarStormTime = Math.max(0, s.solarStormTime - dt);

    // Goku Spacewalk Thruster Pack
    if (this.keys.up) s.gokuY -= 90 * dt;
    if (this.keys.down) s.gokuY += 90 * dt;
    if (this.keys.left) s.gokuX -= 90 * dt;
    if (this.keys.right) s.gokuX += 90 * dt;

    s.gokuX = Math.max(40, Math.min(this.width - 40, s.gokuX));
    s.gokuY = Math.max(40, Math.min(this.height - 40, s.gokuY));

    // Tether spring constraint
    const tetherDist = Math.hypot(s.gokuX - s.tetherX, s.gokuY - s.tetherY);
    if (tetherDist > 380) {
      const angle = Math.atan2(s.gokuY - s.tetherY, s.gokuX - s.tetherX);
      s.gokuX = s.tetherX + Math.cos(angle) * 380;
      s.gokuY = s.tetherY + Math.sin(angle) * 380;
    }

    // Proximity to repair nodes
    s.activeNode = null;
    let allDone = true;
    for (let node of s.nodes) {
      const dist = Math.hypot(node.x - s.gokuX, node.y - s.gokuY);
      if (dist < 50) {
        s.activeNode = node;
        if (this.keys.action && node.repaired < node.max) {
          node.repaired = Math.min(node.max, node.repaired + dt * 45);
          // Sparks
          this.spawnParticle(node.x, node.y, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, '#00ffcc', 2.5, 0.2);
          if (node.repaired >= node.max) {
            sounds.playCollect();
            if (window.onMissionObjectiveComplete) {
              window.onMissionObjectiveComplete(node.id === 'power' ? 'repair_power' : (node.id === 'comms' ? 'fix_comms' : 'calibrate_nav'));
            }
          }
        }
      }
      if (node.repaired < node.max) allDone = false;
    }

    if (allDone && !s.allRepaired) {
      s.allRepaired = true;
      sounds.playFanfare();
    }
  }

  // --- MISSION 6: ASTEROID FIELD DODGE ---
  updateAsteroidSim(dt) {
    const s = this.state;
    // Ship vertical & horizontal motion
    if (this.keys.up) s.shipY -= 200 * dt;
    if (this.keys.down) s.shipY += 200 * dt;
    if (this.keys.left) s.shipX -= 150 * dt;
    if (this.keys.right) s.shipX += 150 * dt;

    s.shipX = Math.max(40, Math.min(this.width * 0.7, s.shipX));
    s.shipY = Math.max(40, Math.min(this.height - 40, s.shipY));

    // Saiyan Ki-Shield activation
    s.isShieldActive = this.keys.action;
    if (s.isShieldActive) {
      s.shield = Math.max(0, s.shield - dt * 25);
    } else {
      s.shield = Math.min(100, s.shield + dt * 8);
    }

    // Distance progression
    s.distanceTraveled += dt * 60;

    // Asteroids fly from right to left
    for (let ast of s.asteroids) {
      ast.x += ast.vx * 60 * dt;
      ast.y += ast.vy * 60 * dt;
      ast.rot += ast.rotSpeed;

      // Wrap around
      if (ast.x < -60) {
        ast.x = this.width + 60 + Math.random() * 200;
        ast.y = Math.random() * this.height;
        s.dodgeCount++;
      }

      // Collision detection with spaceship
      const dist = Math.hypot(ast.x - s.shipX, ast.y - s.shipY);
      if (dist < ast.size + 18) {
        if (s.isShieldActive && s.shield > 10) {
          // Deflected by Saiyan Ki-Shield
          ast.vx = Math.abs(ast.vx) * 1.5;
          sounds.playScannerPing();
        } else {
          // Direct collision hit
          sounds.playExplosion();
          ast.x = this.width + 100;
          if (window.onShipDamage) {
            window.onShipDamage(18); // inflicts hull & fuel damage
          }
        }
      }
    }

    if (s.distanceTraveled >= s.targetDistance && !s.completed) {
      s.completed = true;
      sounds.playFanfare();
      if (window.onMissionObjectiveComplete) {
        window.onMissionObjectiveComplete('reach_belt_exit');
      }
    }
  }

  // --- MISSION 8: STATION DOCK & DECRYPT ---
  updateStationSim(dt) {
    const s = this.state;
    if (this.keys.action) {
      s.hackProgress = Math.min(100, s.hackProgress + dt * 20);
      if (s.hackProgress >= 100 && !s.done) {
        s.done = true;
        sounds.playFanfare();
        if (window.onMissionObjectiveComplete) {
          window.onMissionObjectiveComplete('decode_data');
        }
      }
    }
  }

  // --- MISSION 9: DEEP SPACE SLINGSHOT ---
  updateDeepSpaceSim(dt) {
    const s = this.state;
    if (this.keys.action && !s.slingshotDone) {
      s.velocity += 12;
      s.shipDist += 4;
      s.slingshotDone = true;
      sounds.playFanfare();
      if (window.onMissionObjectiveComplete) {
        window.onMissionObjectiveComplete('gravity_assist');
      }
    }
  }

  // --- MISSION 10: THE FINAL RETURN RE-ENTRY ---
  updateFinalReentrySim(dt) {
    const s = this.state;
    if (s.landedSafe) return;

    // Angle adjustments
    if (this.keys.up) s.reentryAngle -= dt * 3.5;
    if (this.keys.down) s.reentryAngle += dt * 3.5;

    // Altitude descent
    s.altitude = Math.max(0, s.altitude - dt * 4.5);

    // Heat shield calculation
    // Ideal entry corridor is 32° to 36°
    const angleError = Math.abs(s.reentryAngle - 34.0);
    s.heatShieldTemp = 1600 + angleError * 400;

    // Deploy chute below 10 km
    if (s.altitude <= 10 && !s.parachuteDeployed) {
      s.parachuteDeployed = true;
      sounds.playScannerPing();
      if (window.onMissionObjectiveComplete) {
        window.onMissionObjectiveComplete('reentry_corridor');
      }
    }

    if (s.altitude <= 0 && !s.landedSafe) {
      s.landedSafe = true;
      sounds.playFanfare();
      if (window.onMissionObjectiveComplete) {
        window.onMissionObjectiveComplete('final_touchdown');
      }
    }
  }

  // ==========================================
  // RENDER MAIN CANVAS VIEW
  // ==========================================
  render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Clear with deep space gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#040814');
    bgGrad.addColorStop(1, '#020308');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw twinkling stars
    this.drawStars(ctx);

    // Render mode-specific graphics
    switch (this.mode) {
      case 'launch':
        this.renderLaunch(ctx, w, h);
        break;
      case 'landing':
        this.renderLanding(ctx, w, h);
        break;
      case 'surface_rover':
        this.renderSurfaceRover(ctx, w, h);
        break;
      case 'satellite_eva':
        this.renderSatelliteEva(ctx, w, h);
        break;
      case 'asteroid_dodge':
        this.renderAsteroidDodge(ctx, w, h);
        break;
      case 'station_dock_hack':
        this.renderStationDock(ctx, w, h);
        break;
      case 'deep_slingshot':
        this.renderDeepSlingshot(ctx, w, h);
        break;
      case 'final_reentry':
        this.renderFinalReentry(ctx, w, h);
        break;
      default:
        this.renderDefaultSpace(ctx, w, h);
        break;
    }

    // Render floating particles
    this.drawParticles(ctx);

    // High-tech HUD grid lines & targeting reticles
    this.renderHUDOverlay(ctx, w, h);
  }

  drawStars(ctx) {
    for (let s of this.stars) {
      const alpha = s.alpha + Math.sin(this.simTime * 3 * s.twinkleSpeed) * 0.2;
      ctx.fillStyle = `rgba(220, 240, 255, ${Math.max(0.1, alpha)})`;
      ctx.beginPath();
      ctx.arc(s.x % this.width, s.y % this.height, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawParticles(ctx) {
    for (let p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  }

  renderHUDOverlay(ctx, w, h) {
    // NASA HUD corner brackets
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
    ctx.lineWidth = 1.5;

    // Top-left
    ctx.beginPath();
    ctx.moveTo(15, 35);
    ctx.lineTo(15, 15);
    ctx.lineTo(35, 15);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(w - 35, 15);
    ctx.lineTo(w - 15, 15);
    ctx.lineTo(w - 15, 35);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(15, h - 35);
    ctx.lineTo(15, h - 15);
    ctx.lineTo(35, h - 15);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(w - 35, h - 15);
    ctx.lineTo(w - 15, h - 15);
    ctx.lineTo(w - 15, h - 35);
    ctx.stroke();
  }

  // --- RENDER LAUNCH ---
  renderLaunch(ctx, w, h) {
    const s = this.state;
    // Earth curved horizon at bottom
    const earthGrad = ctx.createRadialGradient(w * 0.5, h * 1.5, 50, w * 0.5, h * 1.5, h * 1.2);
    earthGrad.addColorStop(0, '#1976d2');
    earthGrad.addColorStop(0.7, '#0b3d91');
    earthGrad.addColorStop(1, '#020917');

    ctx.fillStyle = earthGrad;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 1.5, h * 1.05, 0, Math.PI * 2);
    ctx.fill();

    // Atmosphere blue glow
    ctx.strokeStyle = 'rgba(75, 192, 255, 0.4)';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Spacecraft or Goku on Flying Nimbus
    const pitchRad = (s.pitch * Math.PI) / 180;
    const rocketX = w * 0.5;
    const rocketY = h * 0.65;

    ctx.save();
    ctx.translate(rocketX, rocketY);
    ctx.rotate(Math.PI / 2 - pitchRad);

    this.drawSpacecraft(ctx, 0, 0, s.throttle > 0);
    ctx.restore();

    // Telemetry Teletext
    ctx.fillStyle = '#00e5ff';
    ctx.font = '13px monospace';
    ctx.fillText(`ALTITUDE: ${s.altitude.toFixed(1)} km / 300.0 km`, 30, 45);
    ctx.fillText(`VELOCITY: ${s.velocity.toFixed(2)} km/s / 7.80 km/s`, 30, 65);
    ctx.fillText(`PITCH: ${s.pitch.toFixed(1)}°`, 30, 85);
    ctx.fillText(`THROTTLE: ${(s.throttle * 100).toFixed(0)}%`, 30, 105);

    // Target orbit corridor bar
    const progress = Math.min(1, s.altitude / 300);
    ctx.strokeStyle = '#00e5ff';
    ctx.strokeRect(30, 120, 180, 12);
    ctx.fillStyle = progress >= 0.95 ? '#00ff88' : '#00b0ff';
    ctx.fillRect(32, 122, progress * 176, 8);
  }

  // --- RENDER LUNAR LANDING ---
  renderLanding(ctx, w, h) {
    const s = this.state;
    // Moon lunar surface with craters
    ctx.fillStyle = '#484b55';
    ctx.beginPath();
    ctx.moveTo(0, h - 70);
    ctx.lineTo(w, h - 70);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();

    // Craters
    ctx.fillStyle = '#2f313a';
    ctx.beginPath();
    ctx.ellipse(w * 0.2, h - 65, 45, 10, 0, 0, Math.PI * 2);
    ctx.ellipse(w * 0.82, h - 65, 55, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Landing Pad with blinking beacon lights
    const blink = Math.sin(this.simTime * 8) > 0;
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(s.padX - s.padWidth / 2, h - 72, s.padWidth, 6);

    ctx.fillStyle = blink ? '#ff2200' : '#ffff00';
    ctx.beginPath();
    ctx.arc(s.padX - s.padWidth / 2 + 5, h - 76, 4, 0, Math.PI * 2);
    ctx.arc(s.padX + s.padWidth / 2 - 5, h - 76, 4, 0, Math.PI * 2);
    ctx.fill();

    // Lander module
    ctx.save();
    ctx.translate(s.x, s.y);
    this.drawLander(ctx, 0, 0);
    ctx.restore();

    // Speed telemetry
    const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy) * 2.5;
    ctx.font = '13px monospace';
    ctx.fillStyle = speed <= 3.0 ? '#00ff88' : '#ff4444';
    ctx.fillText(`DESCENT SPEED: ${speed.toFixed(2)} m/s (MAX SAFE: 3.00 m/s)`, 30, 45);
    ctx.fillStyle = '#00e5ff';
    ctx.fillText(`FUEL: ${s.fuel.toFixed(1)}%`, 30, 65);

    if (s.landed) {
      ctx.fillStyle = '#00ff88';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('✓ LUNAR TOUCHDOWN SUCCESSFUL!', w * 0.5 - 180, h * 0.35);
    } else if (s.crashed) {
      ctx.fillStyle = '#ff3344';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('CRASHED! IMPACT VELOCITY TOO HIGH', w * 0.5 - 190, h * 0.35);
    }
  }

  // --- RENDER ROVER ---
  renderSurfaceRover(ctx, w, h) {
    const s = this.state;
    // Ground texture
    ctx.fillStyle = '#3a2016'; // Mars or Moon terrain
    ctx.fillRect(0, 0, w, h);

    // Crater rims
    ctx.strokeStyle = '#5a3525';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(w * 0.25, h * 0.3, 70, 0, Math.PI * 2);
    ctx.arc(w * 0.75, h * 0.65, 90, 0, Math.PI * 2);
    ctx.stroke();

    // Base Lander
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(s.landerX - 25, s.landerY - 25, 50, 50);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    ctx.fillText('BASE LANDER', s.landerX - 35, s.landerY + 40);

    // Minerals & Samples
    for (let m of s.minerals) {
      if (!m.collected) {
        ctx.fillStyle = '#ffd700';
        ctx.shadowColor = '#ffff00';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px sans-serif';
        ctx.fillText(m.name, m.x - 30, m.y - 12);
      }
    }

    // Rover / Goku on Nimbus
    ctx.save();
    ctx.translate(s.roverX, s.roverY);
    this.drawNimbusGoku(ctx, 0, 0);
    ctx.restore();

    // Radar scan wave
    ctx.strokeStyle = `rgba(0, 229, 255, ${Math.max(0, 1 - s.radarPulse / 4)})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(s.roverX, s.roverY, s.radarPulse * 80, 0, Math.PI * 2);
    ctx.stroke();

    // HUD stats
    ctx.fillStyle = '#00ffcc';
    ctx.font = '13px monospace';
    ctx.fillText(`SAMPLES: ${s.samplesCollected} / ${s.samplesNeeded}`, 30, 45);
    ctx.fillText(`CARGO WEIGHT ADDED: +${s.cargoWeightAdded} kg`, 30, 65);
    ctx.fillText(`FUEL PENALTY: +${(s.cargoWeightAdded * 0.4).toFixed(1)}% burn`, 30, 85);
  }

  // --- RENDER EVA ---
  renderSatelliteEva(ctx, w, h) {
    const s = this.state;
    // Approaching solar storm wave from left
    const waveX = (1 - s.solarStormTime / 65) * w;
    const waveGrad = ctx.createLinearGradient(0, 0, waveX, 0);
    waveGrad.addColorStop(0, 'rgba(255, 80, 0, 0.45)');
    waveGrad.addColorStop(1, 'rgba(255, 200, 0, 0.05)');
    ctx.fillStyle = waveGrad;
    ctx.fillRect(0, 0, waveX, h);

    // Tether line
    ctx.strokeStyle = 'rgba(200, 220, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(s.tetherX, s.tetherY);
    ctx.lineTo(s.gokuX, s.gokuY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Satellite body
    ctx.fillStyle = '#607d8b';
    ctx.fillRect(w * 0.7 - 25, h * 0.4, 50, 70);
    // Solar panels
    ctx.fillStyle = '#1565c0';
    ctx.fillRect(w * 0.7 - 95, h * 0.45, 60, 25);
    ctx.fillRect(w * 0.7 + 35, h * 0.45, 60, 25);

    // Repair nodes
    for (let node of s.nodes) {
      const isRepaired = node.repaired >= node.max;
      ctx.fillStyle = isRepaired ? '#00ff88' : '#ff9100';
      ctx.beginPath();
      ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '11px sans-serif';
      ctx.fillText(`${node.label}: ${node.repaired.toFixed(0)}%`, node.x - 45, node.y - 15);
    }

    // Spacewalking Goku
    ctx.save();
    ctx.translate(s.gokuX, s.gokuY);
    this.drawAstronautGoku(ctx, 0, 0);
    ctx.restore();

    // Timer countdown
    ctx.fillStyle = s.solarStormTime < 15 ? '#ff3344' : '#00e5ff';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`SOLAR FLARE IMPACT IN: ${s.solarStormTime.toFixed(1)}s`, 30, 45);

    if (s.activeNode) {
      ctx.fillStyle = '#ffff00';
      ctx.fillText(`[HOLD ACTION / REPAIR] TO FIX ${s.activeNode.label.toUpperCase()}`, 30, 70);
    }
  }

  // --- RENDER ASTEROID DODGE ---
  renderAsteroidDodge(ctx, w, h) {
    const s = this.state;
    // Draw space rocks
    for (let ast of s.asteroids) {
      ctx.save();
      ctx.translate(ast.x, ast.y);
      ctx.rotate(ast.rot);

      ctx.fillStyle = '#7a7672';
      ctx.beginPath();
      // Rough rock shape
      const points = 7;
      for (let p = 0; p < points; p++) {
        const angle = (p / points) * Math.PI * 2;
        const radius = ast.size * (0.8 + ((p % 2) * 0.3));
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#4e4c49';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    }

    // Ship or Nimbus
    ctx.save();
    ctx.translate(s.shipX, s.shipY);
    this.drawSpacecraft(ctx, 0, 0, true);

    // Saiyan Ki-Shield bubble
    if (s.isShieldActive) {
      ctx.strokeStyle = 'rgba(255, 235, 59, 0.8)';
      ctx.fillStyle = 'rgba(255, 235, 59, 0.15)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();

    // HUD stats
    ctx.fillStyle = '#00e5ff';
    ctx.font = '13px monospace';
    ctx.fillText(`BELT TRANSIT: ${s.distanceTraveled.toFixed(0)} / ${s.targetDistance} km`, 30, 45);
    ctx.fillText(`KI-SHIELD ENERGY: ${s.shield.toFixed(0)}%`, 30, 65);
    ctx.fillText(`ASTEROIDS EVADED: ${s.dodgeCount}`, 30, 85);
  }

  // --- RENDER STATION DOCK ---
  renderStationDock(ctx, w, h) {
    const s = this.state;
    // Saturn and rings in background
    ctx.fillStyle = '#d2b55b';
    ctx.beginPath();
    ctx.arc(w * 0.8, h * 0.3, 70, 0, Math.PI * 2);
    ctx.fill();

    // Saturn Ring
    ctx.strokeStyle = 'rgba(240, 215, 130, 0.7)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.ellipse(w * 0.8, h * 0.3, 130, 30, -0.4, 0, Math.PI * 2);
    ctx.stroke();

    // Abandoned Deep Space Outpost
    ctx.fillStyle = '#37474f';
    ctx.fillRect(w * 0.35, h * 0.25, 140, 140);
    ctx.strokeStyle = '#00e5ff';
    ctx.strokeRect(w * 0.35, h * 0.25, 140, 140);

    // Crosshairs
    ctx.strokeStyle = '#ff1744';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.5 - 20, h * 0.5);
    ctx.lineTo(w * 0.5 + 20, h * 0.5);
    ctx.moveTo(w * 0.5, h * 0.5 - 20);
    ctx.lineTo(w * 0.5, h * 0.5 + 20);
    ctx.stroke();

    // Decryption HUD
    ctx.fillStyle = '#00e5ff';
    ctx.font = '14px monospace';
    ctx.fillText(`MAINFRAME DATA RECOVERY: ${s.hackProgress.toFixed(0)}%`, 30, 45);
    ctx.strokeRect(30, 60, 220, 14);
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(32, 62, (s.hackProgress / 100) * 216, 10);
    ctx.fillStyle = '#ffd700';
    ctx.fillText('[HOLD ACTION] TO DECRYPT QUANTUM ARCHIVE', 30, 100);
  }

  // --- RENDER DEEP SLINGSHOT ---
  renderDeepSlingshot(ctx, w, h) {
    const s = this.state;
    // Massive Jupiter with Great Red Spot
    ctx.fillStyle = '#c99661';
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.6, 110, 0, Math.PI * 2);
    ctx.fill();

    // Gas bands
    ctx.fillStyle = '#ab7847';
    ctx.fillRect(w * 0.5 - 110, h * 0.6 - 20, 220, 18);
    ctx.fillRect(w * 0.5 - 110, h * 0.6 + 25, 220, 14);

    // Great Red Spot
    ctx.fillStyle = '#cc4422';
    ctx.beginPath();
    ctx.ellipse(w * 0.5 + 40, h * 0.6 + 10, 24, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Orbital Slingshot Trajectory Arc
    ctx.strokeStyle = '#00e5ff';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.6, 150, Math.PI * 0.8, Math.PI * 1.9);
    ctx.stroke();
    ctx.setLineDash([]);

    // Telemetry
    ctx.fillStyle = '#00e5ff';
    ctx.font = '13px monospace';
    ctx.fillText(`LOCATION: JUPITER-NEPTUNE TRANSIT (AU: ${s.shipDist.toFixed(1)})`, 30, 45);
    ctx.fillText(`CORE VELOCITY: ${s.velocity.toFixed(1)} km/s`, 30, 65);
    ctx.fillText(`TEMPERATURE: -225°C (CRYOGENIC RISK)`, 30, 85);
    ctx.fillStyle = '#ffff00';
    ctx.fillText('[PRESS ACTION / SLINGSHOT] TO FIRE GRAVITY ASSIST BURN', 30, 115);
  }

  // --- RENDER FINAL RE-ENTRY ---
  renderFinalReentry(ctx, w, h) {
    const s = this.state;
    // Hypersonic Plasma Sheath (Fiery orange/red glow)
    const plasmaGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 30, w * 0.5, h * 0.5, 140);
    plasmaGrad.addColorStop(0, 'rgba(255, 200, 50, 0.8)');
    plasmaGrad.addColorStop(0.5, 'rgba(255, 60, 0, 0.4)');
    plasmaGrad.addColorStop(1, 'rgba(255, 0, 0, 0)');

    ctx.fillStyle = plasmaGrad;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, 140, 0, Math.PI * 2);
    ctx.fill();

    // Re-entering spacecraft
    ctx.save();
    ctx.translate(w * 0.5, h * 0.5);
    this.drawSpacecraft(ctx, 0, 0, false);
    ctx.restore();

    // Parachute if deployed
    if (s.parachuteDeployed) {
      ctx.fillStyle = '#ff9900';
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5 - 60, 35, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(w * 0.5 - 35, h * 0.5 - 60);
      ctx.lineTo(w * 0.5, h * 0.5 - 15);
      ctx.moveTo(w * 0.5 + 35, h * 0.5 - 60);
      ctx.lineTo(w * 0.5, h * 0.5 - 15);
      ctx.stroke();
    }

    // Telemetry
    ctx.fillStyle = '#ff5533';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`RE-ENTRY ANGLE: ${s.reentryAngle.toFixed(1)}° (CORRIDOR: 32.0° - 36.0°)`, 30, 45);
    ctx.fillText(`HEAT SHIELD TEMP: ${s.heatShieldTemp.toFixed(0)}°C`, 30, 65);
    ctx.fillText(`ALTITUDE: ${s.altitude.toFixed(1)} km`, 30, 85);
  }

  renderDefaultSpace(ctx, w, h) {
    ctx.fillStyle = '#00e5ff';
    ctx.font = '14px monospace';
    ctx.fillText('CAPSULE CORP STAR-EXPLORER - ORBITAL CRUISE', 30, 45);
    this.drawSpacecraft(ctx, w * 0.5, h * 0.5, true);
  }

  // --- DRAWING ASSETS ---
  drawSpacecraft(ctx, x, y, thrusting) {
    ctx.save();
    ctx.translate(x, y);

    // Capsule shape
    ctx.fillStyle = '#e8edf3';
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(16, 14);
    ctx.lineTo(-16, 14);
    ctx.closePath();
    ctx.fill();

    // Heat shield base
    ctx.fillStyle = '#37474f';
    ctx.fillRect(-18, 14, 36, 6);

    // Glass visor cockpit
    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.arc(0, -2, 6, 0, Math.PI * 2);
    ctx.fill();

    // Thruster exhaust flame
    if (thrusting) {
      ctx.fillStyle = '#00b0ff';
      ctx.beginPath();
      ctx.moveTo(-10, 20);
      ctx.lineTo(0, 36 + Math.random() * 8);
      ctx.lineTo(10, 20);
      ctx.fill();
    }

    ctx.restore();
  }

  drawLander(ctx, x, y) {
    // Lunar lander legs & body
    ctx.fillStyle = '#dcdde1';
    ctx.fillRect(x - 18, y - 14, 36, 24);

    // Gold foil ascent stage
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(x - 12, y - 24, 24, 10);

    // Landing gear struts
    ctx.strokeStyle = '#718093';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x - 16, y + 10);
    ctx.lineTo(x - 26, y + 24);
    ctx.moveTo(x + 16, y + 10);
    ctx.lineTo(x + 26, y + 24);
    ctx.stroke();

    // Footpads
    ctx.fillStyle = '#2f3640';
    ctx.fillRect(x - 30, y + 24, 8, 3);
    ctx.fillRect(x + 22, y + 24, 8, 3);
  }

  drawNimbusGoku(ctx, x, y) {
    // Flying Nimbus cloud (Golden yellow)
    ctx.fillStyle = '#ffdd44';
    ctx.beginPath();
    ctx.arc(x - 14, y + 6, 12, 0, Math.PI * 2);
    ctx.arc(x, y + 4, 15, 0, Math.PI * 2);
    ctx.arc(x + 14, y + 6, 12, 0, Math.PI * 2);
    ctx.arc(x + 6, y + 14, 10, 0, Math.PI * 2);
    ctx.arc(x - 6, y + 14, 10, 0, Math.PI * 2);
    ctx.fill();

    // Goku avatar circle / figure
    if (this.gokuImg.complete && this.gokuImg.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y - 10, 16, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(this.gokuImg, x - 16, y - 26, 32, 32);
      ctx.restore();
    } else {
      ctx.fillStyle = '#ff6f00';
      ctx.beginPath();
      ctx.arc(x, y - 10, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawAstronautGoku(ctx, x, y) {
    // Spacesuit body
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 12, y - 10, 24, 28);

    // Helmet with gold visor
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.arc(x, y - 16, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(x, y - 16, 9, 0, Math.PI * 2);
    ctx.fill();
  }
}
