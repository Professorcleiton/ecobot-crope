class TerminalPuzzle {
  constructor() {
    this.passoEsperado = 0;
    this.resolvido = false;
    this.erro = false;
    this.tempoErro = 0;

    this.botoes = [
      { id: 0, texto: "1. LIGAR FILTRO", x: 260, y: 190, w: 280, h: 45 },
      { id: 2, texto: "3. PURIFICAR ÁGUA", x: 260, y: 250, w: 280, h: 45 },
      { id: 1, texto: "2. COLETAR DADOS", x: 260, y: 310, w: 280, h: 45 }
    ];
  }

  desenhar() {
    push();
    // Fundo do terminal (Painel do Robô)
    fill(15, 23, 42, 235);
    stroke(56, 239, 125);
    strokeWeight(3);
    rect(180, 80, 440, 340, 15);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("TERMINAL DE REPROGRAMAÇÃO", width / 2, 120);

    textSize(13);
    fill(180);
    text("Ordene a sequência lógica do algoritmo de purificação:", width / 2, 150);

    // Botões
    for (let b of this.botoes) {
      if (b.id < this.passoEsperado) {
        fill(46, 204, 113); // Concluído
      } else {
        fill(30, 41, 59);
      }
      stroke(255);
      strokeWeight(1);
      rect(b.x, b.y, b.w, b.h, 8);

      noStroke();
      fill(255);
      textSize(15);
      text(b.texto, b.x + b.w / 2, b.y + b.h / 2);
    }

    if (this.erro && millis() - this.tempoErro < 1500) {
      fill(231, 76, 60);
      textSize(14);
      text("Sequência incorreta! Tente novamente.", width / 2, 385);
    }
    pop();
  }

  clicar(mx, my) {
    for (let b of this.botoes) {
      if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
        if (b.id === this.passoEsperado) {
          this.passoEsperado++;
          this.erro = false;
          if (this.passoEsperado === 3) {
            this.resolvido = true;
          }
        } else if (b.id > this.passoEsperado) {
          this.erro = true;
          this.tempoErro = millis();
          this.passoEsperado = 0; // Reinicia a tentativa
        }
      }
    }
  }
}
