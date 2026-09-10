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

// Plataforma com suporte a movimento horizontal automático
class Plataforma {
  constructor(x, y, w, h, mover = false, alcance = 0) {
    this.xInicial = x;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.mover = mover;
    this.alcance = alcance;
    this.vel = 1.5;
  }

  atualizar() {
    if (this.mover) {
      this.x += this.vel;
      if (this.x > this.xInicial + this.alcance || this.x < this.xInicial) {
        this.vel *= -1;
      }
    }
  }

  desenhar() {
    push();
    fill(this.mover ? 99 : 71, 102, this.mover ? 241 : 105);
    stroke(30, 41, 59);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h, 4);
    stroke(148, 163, 184);
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
    fill(239, 68, 68, 220);
    rect(this.x, this.y - 4, this.w, this.h, 6);

    // Bolha dinâmica
    fill(254, 202, 202, 200);
    let oscilacao = sin(frameCount * 0.1) * 3;
    circle(this.x + 15, this.y + oscilacao, 5);
    circle(this.x + this.w - 20, this.y - oscilacao, 4);
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

// Sistema de partículas para o rastro do robô
class Particula {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = random(-1, 1);
    this.velY = random(-1, -0.2);
    this.opacidade = 255;
    this.tam = random(3, 6);
  }

  atualizar() {
    this.x += this.velX;
    this.y += this.velY;
    this.opacidade -= 12;
  }

  desenhar() {
    push();
    noStroke();
    fill(56, 239, 125, this.opacidade);
    ellipse(this.x, this.y, this.tam);
    pop();
  }

  terminou() {
    return this.opacidade <= 0;
  }
}
