/**
 * GOKU: SPACE MISSION COMMANDER
 * Web Audio API Procedural Synthesizer Engine
 * Zero external audio files required, runs 100% offline & latency-free.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.thrusterGain = null;
    this.thrusterFilter = null;
    this.thrusterSource = null;
    this.alarmOsc = null;
    this.alarmGain = null;
    this.isAlarmRunning = false;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopThruster();
      this.stopAlarm();
    }
    return this.isMuted;
  }

  // NASA high-tech UI beep
  playBeep(freq = 880, duration = 0.08, type = 'sine') {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Thruster Rumble (White noise through resonant lowpass filter)
  startThruster() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx || this.thrusterSource) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, this.ctx.currentTime);
    filter.Q.setValueAtTime(3, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();

    this.thrusterSource = whiteNoise;
    this.thrusterFilter = filter;
    this.thrusterGain = gain;
  }

  setThrusterPower(throttle) { // 0.0 to 1.0
    if (!this.thrusterFilter || !this.thrusterGain || this.isMuted) return;
    const freq = 80 + throttle * 320;
    const volume = Math.min(0.3, throttle * 0.25);
    this.thrusterFilter.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.05);
    this.thrusterGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.05);
  }

  stopThruster() {
    if (this.thrusterSource) {
      try {
        this.thrusterSource.stop();
        this.thrusterSource.disconnect();
      } catch (e) {}
      this.thrusterSource = null;
      this.thrusterFilter = null;
      this.thrusterGain = null;
    }
  }

  // Scanner ping (Echo sonar sweep)
  playScannerPing() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  // Item Collect / Sample Found
  playCollect() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });
  }

  // Crash / Impact Explosion
  playExplosion() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.6;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.6);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();
  }

  // Emergency Klaxon Alarm
  startAlarm() {
    if (this.isMuted || this.isAlarmRunning) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    this.isAlarmRunning = true;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(750, this.ctx.currentTime);

    lfo.type = 'square';
    lfo.frequency.setValueAtTime(2.5, this.ctx.currentTime); // 2.5 pulses per sec
    lfoGain.gain.setValueAtTime(200, this.ctx.currentTime);

    lfo.connect(osc.frequency);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    lfo.start();

    this.alarmOsc = osc;
    this.alarmLfo = lfo;
    this.alarmGain = gain;
  }

  stopAlarm() {
    if (this.alarmOsc) {
      try {
        this.alarmOsc.stop();
        this.alarmLfo.stop();
        this.alarmOsc.disconnect();
        this.alarmLfo.disconnect();
      } catch (e) {}
      this.alarmOsc = null;
      this.alarmLfo = null;
      this.alarmGain = null;
    }
    this.isAlarmRunning = false;
  }

  // Mission Complete Victory Fanfare
  playFanfare() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.50, d: 0.40 } // C6
    ];

    let t = this.ctx.currentTime;
    melody.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + n.d);
      t += n.d * 0.9;
    });
  }
}

const sounds = new SoundEngine();
