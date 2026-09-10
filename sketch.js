let estado = "MENU"; // MENU, JOGO, PUZZLE, VITORIA
let robo;
let lixos = [];
let plataformas = [];
let perigos = [];
let puzzle;

let chaoY = 430;
let totalLixos = 4;
let lixosColetados = 0;
let vidas = 3;

function setup() {
  createCanvas(800, 500);
  reiniciarJogo();
}

function reiniciarJogo() {
  robo = new Robo(30, chaoY - 40);
  puzzle = new TerminalPuzzle();
  lixosColetados = 0;
  vidas = 3;

  // Plataformas elevadas
  plataformas = [
    new Plataforma(170, 330, 120, 15),
    new Plataforma(350, 245, 130, 15),
    new Plataforma(530, 325, 120, 15)
  ];

  // Resíduos no solo e sobre as plataformas
  lixos = [
    new Lixo(70, chaoY - 20),
    new Lixo(220, 305),
    new Lixo(410, 220),
    new Lixo(580, 300)
  ];

  // Poças de ácido perigosas
  perigos = [
    new PocaAcido(260, chaoY, 90),
    new PocaAcido(460, chaoY, 80)
  ];
}

function draw() {
  background(26, 32, 44);

  if (estado === "MENU") {
    telaMenu();
  } else if (estado === "JOGO") {
    executarJogo();
  } else if (estado === "PUZZLE") {
    executarJogo(); // Mantém a fase renderizada atrás
    puzzle.desenhar();
    if (puzzle.resolvido) {
      estado = "VITORIA";
    }
  } else if (estado === "VITORIA") {
    telaVitoria();
  }
}

function executarJogo() {
  // Solo da usina
  fill(51, 65, 85);
  noStroke();
  rect(0, chaoY, width, height - chaoY);

  // Terminal à direita
  fill(100, 116, 139);
  stroke(20);
  rect(730, chaoY - 70, 50, 70, 4);
  fill(56, 239, 125);
  circle(755, chaoY - 45, 14);

  // Plataformas
  for (let p of plataformas) {
    p.desenhar();
  }

  // Resíduos
  for (let l of lixos) {
    l.desenhar();
    if (l.checarColeta(robo)) {
      lixosColetados++;
    }
  }

  // Obstáculos de Ácido
  for (let perigo of perigos) {
    perigo.desenhar();
    if (perigo.checarColisao(robo)) {
      // Dano: reposiciona no começo
      vidas--;
      robo.x = 30;
      robo.y = chaoY - robo.tam;
      robo.velY = 0;
      if (vidas <= 0) {
        reiniciarJogo();
      }
    }
  }

  // Robô
  robo.atualizar(chaoY, plataformas);
  robo.desenhar();

  // Interface (HUD)
  fill(255);
  noStroke();
  textSize(15);
  textAlign(LEFT, CENTER);
  text(`Resíduos: ${lixosColetados} / ${totalLixos}`, 20, 25);
  text(`Integridade: ${vidas} / 3`, 20, 50);

  // Mensagem ou ativação do puzzle
  if (robo.x > 670) {
    if (lixosColetados === totalLixos) {
      estado = "PUZZLE";
    } else {
      textAlign(CENTER);
      fill(243, 156, 18);
      textSize(14);
      text("Colete todos os resíduos para liberar a reprogramação do terminal!", width / 2, 60);
    }
  }
}

function telaMenu() {
  textAlign(CENTER, CENTER);
  fill(56, 239, 125);
  textSize(34);
  text("ECOBOT: RESTAURAÇÃO", width / 2, height / 2 - 60);

  fill(203, 213, 225);
  textSize(16);
  text("Recupere o setor degradado limpando os rejeitos e reprogramando a usina.", width / 2, height / 2 - 10);
  text("Controles: [A][D] ou Setas para mover | [ESPAÇO] ou [W] para pular", width / 2, height / 2 + 25);

  fill(255);
  textSize(18);
  text("Pressione [ESPAÇO] para iniciar", width / 2, height / 2 + 85);
}

function telaVitoria() {
  background(16, 68, 50);
  textAlign(CENTER, CENTER);

  fill(56, 239, 125);
  textSize(34);
  text("SETOR 01 RESTAURADO!", width / 2, height / 2 - 50);

  fill(241, 245, 249);
  textSize(18);
  text("O algoritmo de purificação foi executado e as toxinas foram neutralizadas.", width / 2, height / 2);
  textSize(15);
  text("Pressione [R] para reiniciar o setor", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (estado === "MENU" && keyCode === 32) {
    estado = "JOGO";
  } else if (estado === "JOGO") {
    if (keyCode === 32 || keyCode === UP_ARROW || keyCode === 87) {
      robo.pular();
    }
  } else if (estado === "VITORIA" && (key === 'r' || key === 'R')) {
    reiniciarJogo();
    estado = "JOGO";
  }
}

function mousePressed() {
  if (estado === "PUZZLE") {
    puzzle.clicar(mouseX, mouseY);
  }
}
