// Gerador de áudio sintetizado puro via Web Audio API nativa
class GeradorSom {
  constructor() {
    this.ctx = null;
  }

  iniciarAudio() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  tocarColeta() {
    this.iniciarAudio();
    if (!this.ctx) return;
    let osc = this.ctx.createOscillator();
    let ganho = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // Tom Ré
    osc.frequency.exponentialRampToValueAtTime(880.00, this.ctx.currentTime + 0.12); // Tom Lá
    ganho.gain.setValueAtTime(0.2, this.ctx.currentTime);
    ganho.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(ganho);
    ganho.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  tocarPulo() {
    this.iniciarAudio();
    if (!this.ctx) return;
    let osc = this.ctx.createOscillator();
    let ganho = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.1);
    ganho.gain.setValueAtTime(0.15, this.ctx.currentTime);
    ganho.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(ganho);
    ganho.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  tocarDano() {
    this.iniciarAudio();
    if (!this.ctx) return;
    let osc = this.ctx.createOscillator();
    let ganho = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 0.2);
    ganho.gain.setValueAtTime(0.2, this.ctx.currentTime);
    ganho.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(ganho);
    ganho.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }
}
