let estado = "MENU"; // MENU, JOGO, PUZZLE, VITORIA
let nivelAtual = 1;
let robo;
let lixos = [];
let plataformas = [];
let perigos = [];
let particulas = [];
let puzzle;
let som;

let chaoY = 430;
let totalLixos = 0;
let lixosColetados = 0;
let vidas = 3;

function setup() {
  createCanvas(800, 500);
  som = new GeradorSom();
  carregarNivel(1);
}

function carregarNivel(n) {
  nivelAtual = n;
  robo = new Robo(30, chaoY - 40);
  puzzle = new TerminalPuzzle();
  lixosColetados = 0;
  particulas = [];

  if (nivelAtual === 1) {
    totalLixos = 3;
    plataformas = [
      new Plataforma(170, 330, 120, 15),
      new Plataforma(350, 250, 130, 15),
      new Plataforma(530, 325, 120, 15)
    ];
    lixos = [
      new Lixo(80, chaoY - 20),
      new Lixo(220, 305),
      new Lixo(410, 225)
    ];
    perigos = [
      new PocaAcido(310, chaoY, 80),
      new PocaAcido(490, chaoY, 70)
    ];
  } else if (nivelAtual === 2) {
    // Fase 2: Plataforma móvel e maior desafio
    totalLixos = 4;
    plataformas = [
      new Plataforma(150, 330, 100, 15),
      new Plataforma(290, 250, 110, 15, true, 120), // Plataforma que anda
      new Plataforma(460, 180, 120, 15),
      new Plataforma(600, 280, 100, 15)
    ];
    lixos = [
      new Lixo(180, 305),
      new Lixo(340, 225),
      new Lixo(510, 155),
      new Lixo(630, 255)
    ];
    perigos = [
      new PocaAcido(160, chaoY, 120),
      new PocaAcido(340, chaoY, 140),
      new PocaAcido(540, chaoY, 110)
    ];
  }
}

function draw() {
  background(22, 27, 34);

  if (estado === "MENU") {
    telaMenu();
  } else if (estado === "JOGO") {
    executarJogo();
  } else if (estado === "PUZZLE") {
    executarJogo();
    puzzle.desenhar();
    if (puzzle.resolvido) {
      if (nivelAtual === 1) {
        carregarNivel(2);
        estado = "JOGO";
      } else {
        estado = "VITORIA";
      }
    }
  } else if (estado === "VITORIA") {
    telaVitoria();
  }
}

function executarJogo() {
  // Chão
  fill(45, 55, 72);
  noStroke();
  rect(0, chaoY, width, height - chaoY);

  // Terminal de purificação
  fill(100, 116, 139);
  rect(730, chaoY - 70, 50, 70, 4);
  fill(lixosColetados === totalLixos ? color(56, 239, 125) : color(239, 68, 68));
  circle(755, chaoY - 45, 14);

  // Atualiza plataformas
  for (let p of plataformas) {
    p.atualizar();
    p.desenhar();
  }

  // Resíduos
  for (let l of lixos) {
    l.desenhar();
    if (l.checarColeta(robo)) {
      lixosColetados++;
      som.tocarColeta();
    }
  }

  // Perigos
  for (let perigo of perigos) {
    perigo.desenhar();
    if (perigo.checarColisao(robo)) {
      vidas--;
      som.tocarDano();
      robo.x = 30;
      robo.y = chaoY - robo.tam;
      robo.velY = 0;
      if (vidas <= 0) {
        vidas = 3;
        carregarNivel(nivelAtual);
      }
    }
  }

  // Partículas
  for (let i = particulas.length - 1; i >= 0; i--) {
    particulas[i].atualizar();
    particulas[i].desenhar();
    if (particulas[i].terminou()) {
      particulas.splice(i, 1);
    }
  }

  // Robô
  robo.atualizar(chaoY, plataformas);
  robo.desenhar();

  // HUD informativo
  fill(255);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text(`Setor 0${nivelAtual} | Resíduos: ${lixosColetados} / ${totalLixos}`, 20, 25);
  text(`Integridade: ${vidas} / 3`, 20, 48);

  if (robo.x > 680) {
    if (lixosColetados === totalLixos) {
      estado = "PUZZLE";
    } else {
      fill(243, 156, 18);
      textAlign(CENTER);
      text("Colete todos os resíduos para descriptografar o terminal!", width / 2, 70);
    }
  }
}

function telaMenu() {
  textAlign(CENTER, CENTER);
  fill(56, 239, 125);
  textSize(36);
  text("ECOBOT: RESTAURAÇÃO", width / 2, height / 2 - 60);

  fill(203, 213, 225);
  textSize(16);
  text("Limpe os resíduos industriais e reative as matrizes de filtragem.", width / 2, height / 2 - 10);
  text("Controles: [A][D] mover | [ESPAÇO] pular", width / 2, height / 2 + 20);

  fill(255);
  textSize(18);
  text("Pressione [ESPAÇO] para iniciar", width / 2, height / 2 + 80);
}

function telaVitoria() {
  background(16, 68, 50);
  textAlign(CENTER, CENTER);
  fill(56, 239, 125);
  textSize(34);
  text("PARABÉNS! ECOSSISTEMA RECUPERADO!", width / 2, height / 2 - 50);
  fill(241, 245, 249);
  textSize(16);
  text("Todos os setores foram purificados e as usinas voltaram a operar.", width / 2, height / 2);
  text("Pressione [R] para reiniciar a missão", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (estado === "MENU" && keyCode === 32) {
    estado = "JOGO";
  } else if (estado === "JOGO") {
    if (keyCode === 32 || keyCode === UP_ARROW || keyCode === 87) {
      if (robo.noChao) {
        robo.pular();
        som.tocarPulo();
        // Emite partículas ao pular
        for (let i = 0; i < 6; i++) {
          particulas.push(new Particula(robo.x + robo.tam / 2, robo.y + robo.tam));
        }
      }
    }
  } else if (estado === "VITORIA" && (key === 'r' || key === 'R')) {
    carregarNivel(1);
    estado = "JOGO";
  }
}

function mousePressed() {
  if (estado === "PUZZLE") {
    puzzle.clicar(mouseX, mouseY);
  }
}
