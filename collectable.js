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
    stroke(30);
    strokeWeight(1.5);
    rect(this.x, this.y, this.tam, this.tam, 4);

    // Ícone de alerta/reciclagem
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

class Plataforma {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  desenhar() {
    push();
    fill(71, 85, 105);
    stroke(30, 41, 59);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h, 4);

    // Textura da plataforma
    stroke(100, 116, 139);
    line(this.x + 5, this.y + 3, this.x + this.w - 5, this.y + 3);
    pop();
  }
}

class PocaAcido {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = 12;
  }

  desenhar() {
    push();
    noStroke();
    fill(239, 68, 68, 220); // Fluido tóxico avermelhado
    rect(this.x, this.y - 4, this.w, this.h, 6);
    
    // Bolhas
    fill(254, 202, 202, 180);
    circle(this.x + 15, this.y, 4);
    circle(this.x + this.w - 20, this.y + 2, 5);
    pop();
  }

  checarColisao(robo) {
    return (
      robo.x + robo.tam > this.x &&
      robo.x < this.x + this.w &&
      robo.y + robo.tam >= this.y - 4
    );
  }
}
