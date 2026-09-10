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

// NOVO: Plataforma sólida suspensa
class Plataforma {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  desenhar() {
    push();
    fill(80, 90, 105);
    stroke(40);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h, 4);
    pop();
  }
}

// NOVO: Poça tóxica que reseta o robô
class PocaAcido {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = 15;
  }

  desenhar() {
    push();
    noStroke();
    fill(231, 76, 60, 200); // Vermelho ácido
    rect(this.x, this.y - 5, this.w, this.h, 6);
    pop();
  }

  checarColisao(robo) {
    return (
      robo.x + robo.tam > this.x &&
      robo.x < this.x + this.w &&
      robo.y + robo.tam >= this.y
    );
  }
}
