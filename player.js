class Robo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tam = 36;
    this.velX = 0;
    this.velY = 0;
    this.velocidade = 4.5;
    this.gravidade = 0.55;
    this.forcaPulo = -11.5;
    this.noChao = false;
  }

  atualizar(chaoY, plataformas) {
    // Controles laterais (Setas ou A/D)
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.velX = -this.velocidade;
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.velX = this.velocidade;
    } else {
      this.velX = 0;
    }

    this.x += this.velX;

    // Física e Gravidade
    this.velY += this.gravidade;
    this.y += this.velY;

    this.noChao = false;

    // Colisão com o piso base
    if (this.y + this.tam >= chaoY) {
      this.y = chaoY - this.tam;
      this.velY = 0;
      this.noChao = true;
    }

    // Colisão com plataformas suspensas (apenas caindo sobre elas)
    for (let p of plataformas) {
      if (
        this.x + this.tam > p.x &&
        this.x < p.x + p.w &&
        this.y + this.tam >= p.y &&
        this.y + this.tam <= p.y + 14 &&
        this.velY >= 0
      ) {
        this.y = p.y - this.tam;
        this.velY = 0;
        this.noChao = true;
      }
    }

    this.x = constrain(this.x, 0, width - this.tam);
  }

  pular() {
    if (this.noChao) {
      this.velY = this.forcaPulo;
      this.noChao = false;
    }
  }

  desenhar() {
    push();
    stroke(20);
    strokeWeight(2);

    // Chassi principal
    fill(72, 202, 228);
    rect(this.x, this.y, this.tam, this.tam, 8);

    // Visor digital
    fill(15, 23, 42);
    rect(this.x + 5, this.y + 7, this.tam - 10, 13, 4);

    // Olhos LED
    fill(56, 239, 125);
    noStroke();
    ellipse(this.x + 12, this.y + 13, 4, 4);
    ellipse(this.x + 24, this.y + 13, 4, 4);

    // Antena
    stroke(20);
    strokeWeight(2);
    line(this.x + 18, this.y, this.x + 18, this.y - 7);
    fill(255, 90, 95);
    circle(this.x + 18, this.y - 7, 5);
    pop();
  }
}
