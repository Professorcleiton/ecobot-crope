class Lixo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tam = 20;
    this.coletado = false;
  }

  desenhar() {
    if (this.coletado) return;
    push();
    fill(243, 156, 18);
    stroke(20);
    rect(this.x, this.y, this.tam, this.tam, 4);
    // Símbolo de resíduo
    stroke(255);
    line(this.x + 4, this.y + 4, this.x + 16, this.y + 16);
    line(this.x + 16, this.y + 4, this.x + 4, this.y + 16);
    pop();
  }

  checarColeta(robo) {
    if (this.coletado) return false;
    let colidiu = (
      robo.x < this.x + this.tam &&
      robo.x + robo.tam > this.x &&
      robo.y < this.y + this.tam &&
      robo.y + robo.tam > this.y
    );
    if (colidiu) {
      this.coletado = true;
      return true;
    }
    return false;
  }
}
