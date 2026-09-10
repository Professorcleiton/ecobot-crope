class Robo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tam = 40;
    this.velX = 0;
    this.velY = 0;
    this.velocidade = 4.5;
    this.gravidade = 0.6;
    this.forcaPulo = -11;
    this.noChao = false;
  }

atualizar(chaoY, plataformas) {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.velX = -this.velocidade;
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.velX = this.velocidade;
    } else {
      this.velX = 0;
    }

    this.x += this.velX;

    // Gravidade
    this.velY += this.gravidade;
    this.y += this.velY;

    this.noChao = false;

    // Colisão com o chão padrão
    if (this.y + this.tam >= chaoY) {
      this.y = chaoY - this.tam;
      this.velY = 0;
      this.noChao = true;
    }

    // Colisão com as plataformas suspensas
    for (let p of plataformas) {
      if (
        this.x + this.tam > p.x &&
        this.x < p.x + p.w &&
        this.y + this.tam >= p.y &&
        this.y + this.tam <= p.y + 15 &&
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

    // Corpo
    fill(72, 202, 228);
    rect(this.x, this.y, this.tam, this.tam, 8);

    // Visor
    fill(20, 20, 30);
    rect(this.x + 6, this.y + 8, this.tam - 12, 14, 4);

    // Olhos
    fill(56, 239, 125);
    ellipse(this.x + 14, this.y + 15, 5, 5);
    ellipse(this.x + 26, this.y + 15, 5, 5);

    // Antena
    line(this.x + 20, this.y, this.x + 20, this.y - 8);
    fill(255, 107, 107);
    circle(this.x + 20, this.y - 8, 6);
    pop();
  }
}
