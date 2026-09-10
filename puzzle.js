class TerminalPuzzle {
  constructor() {
    this.passoEsperado = 0;
    this.resolvido = false;
    this.erro = false;
    this.tempoErro = 0;

    // Etapas da reprogramação lógica em ordem misturada
    this.botoes = [
      { id: 0, texto: "1. ATIVAR SENSORES", x: 260, y: 180, w: 280, h: 42 },
      { id: 2, texto: "3. PURIFICAR ECOSSISTEMA", x: 260, y: 235, w: 280, h: 42 },
      { id: 1, texto: "2. FILTRAR IMPUREZAS", x: 260, y: 290, w: 280, h: 42 }
    ];
  }

  desenhar() {
    push();
    // Janela do terminal
    fill(15, 23, 42, 240);
    stroke(56, 239, 125);
    strokeWeight(3);
    rect(180, 70, 440, 350, 12);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("TERMINAL DE REPROGRAMAÇÃO", width / 2, 110);

    textSize(13);
    fill(148, 163, 184);
    text("Monte o algoritmo correto de recuperação ambiental:", width / 2, 140);

    // Botões interativos
    for (let b of this.botoes) {
      if (b.id < this.passoEsperado) {
        fill(34, 197, 94); // Sucesso
      } else {
        fill(30, 41, 59);
      }
      stroke(100, 116, 139);
      strokeWeight(1);
      rect(b.x, b.y, b.w, b.h, 6);

      noStroke();
      fill(255);
      textSize(14);
      text(b.texto, b.x + b.w / 2, b.y + b.h / 2);
    }

    if (this.erro && millis() - this.tempoErro < 1500) {
      fill(239, 68, 68);
      textSize(13);
      text("Falha na lógica! O algoritmo foi resetado.", width / 2, 365);
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
          this.passoEsperado = 0; // Reinicia se errar a ordem
        }
      }
    }
  }
}
