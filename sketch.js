let estado = "MENU"; // MENU, JOGO, PUZZLE, VITORIA
let robo;
let lixos = [];
let puzzle;
let chaoY = 420;
let totalLixos = 4;
let lixosColetados = 0;

function setup() {
  createCanvas(800, 500);
  reiniciarJogo();
}

function reiniciarJogo() {
  robo = new Robo(50, chaoY - 40);
  puzzle = new TerminalPuzzle();
  lixosColetados = 0;
  lixos = [
    new Lixo(200, chaoY - 20),
    new Lixo(320, chaoY - 20),
    new Lixo(470, chaoY - 20),
    new Lixo(600, chaoY - 20)
  ];
}

function draw() {
  background(30, 30, 45);

  if (estado === "MENU") {
    telaMenu();
  } else if (estado === "JOGO") {
    executarJogo();
  } else if (estado === "PUZZLE") {
    executarJogo(); // Mantém o fundo da fase visível
    puzzle.desenhar();
    if (puzzle.resolvido) {
      estado = "VITORIA";
    }
  } else if (estado === "VITORIA") {
    telaVitoria();
  }
}

function executarJogo() {
  // Cenário de fundo (Céu degradado vs restaurado)
  fill(50, 70, 60);
  rect(0, chaoY, width, height - chaoY);

  // Terminal na direita
  fill(100, 110, 120);
  rect(720, chaoY - 70, 50, 70, 4);
  fill(56, 239, 125);
  circle(745, chaoY - 45, 15);

  // Atualiza resíduos
  for (let lixo of lixos) {
    lixo.desenhar();
    if (lixo.checarColeta(robo)) {
      lixosColetados++;
    }
  }

  // Atualiza robô
  robo.atualizar(chaoY);
  robo.desenhar();

  // HUD
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text(`Resíduos Coletados: ${lixosColetados} / ${totalLixos}`, 20, 30);

  // Checa se pode abrir o puzzle
  if (robo.x > 670) {
    if (lixosColetados === totalLixos) {
      estado = "PUZZLE";
    } else {
      fill(255, 200, 0);
      textAlign(CENTER);
      text("Colete todo o lixo do setor antes de ativar a usina!", width / 2, 80);
    }
  }
}

function telaMenu() {
  textAlign(CENTER, CENTER);
  fill(56, 239, 125);
  textSize(34);
  text("ECOBOT: RESTAURAÇÃO", width / 2, height / 2 - 50);

  fill(220);
  textSize(16);
  text("Limpe a área e reative o terminal central de purificação.", width / 2, height / 2);
  text("Controles: [A][D] ou Setas para mover | [ESPAÇO] ou [W] para pular", width / 2, height / 2 + 30);

  fill(255);
  textSize(18);
  text("Pressione [ESPAÇO] para iniciar", width / 2, height / 2 + 90);
}

function telaVitoria() {
  // Cenário esmeralda restaurado
  background(20, 80, 60);
  textAlign(CENTER, CENTER);

  fill(56, 239, 125);
  textSize(36);
  text("SETOR 01 PURIFICADO COM SUCESSO!", width / 2, height / 2 - 40);

  fill(255);
  textSize(18);
  text("O ecossistema local começou o processo de regeneração.", width / 2, height / 2 + 10);
  textSize(15);
  text("Pressione [R] para jogar novamente", width / 2, height / 2 + 60);
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
