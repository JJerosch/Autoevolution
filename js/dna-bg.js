/* ============================================================
   AUTO EVOLUTION — Fundo animado de DNA
   Dupla hélice em canvas, girando lentamente como pano de fundo.
   O scroll controla o SENTIDO da rotação:
     • rolar para baixo  → gira em um sentido
     • rolar para cima   → gira no sentido oposto
   Respeita "prefers-reduced-motion" (desenha estático).
   ============================================================ */

(function () {
  const canvas = document.getElementById("dna-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const ORANGE = [255, 99, 0];
  const IDLE = 0.0016;   // velocidade base (giro lento contínuo)
  const MAX_BOOST = 0.06; // impulso máximo dado pelo scroll
  const DECAY = 0.93;     // quão rápido o impulso do scroll esvanece

  let W = 0, H = 0, dpr = 1;
  let rotation = 0;
  let dir = 1;            // 1 = sentido horário | -1 = anti-horário
  let boost = 0;
  let lastY = window.scrollY || window.pageYOffset || 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // scroll define o sentido e dá um impulso de velocidade
  window.addEventListener("scroll", () => {
    const y = window.scrollY || window.pageYOffset || 0;
    const d = y - lastY;
    lastY = y;
    if (d > 0) dir = 1;
    else if (d < 0) dir = -1;
    boost = Math.min(MAX_BOOST, boost + Math.abs(d) * 0.0006);
  }, { passive: true });

  window.addEventListener("resize", resize);

  function rgba(a) {
    return `rgba(${ORANGE[0]},${ORANGE[1]},${ORANGE[2]},${a})`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const small = W < 700;
    const cx = W / 2;
    const radius = Math.min(W * 0.12, 140) * (small ? 0.8 : 1);
    const diag = Math.sqrt(W * W + H * H);
    const span = diag + 280;           // alcança os dois cantos com folga
    const top = H / 2 - span / 2;       // hélice centrada na tela
    const turns = span / 320;           // densidade de voltas constante
    const count = small ? 46 : 70;      // resolução da hélice
    const theta = Math.atan2(W, H);     // inclinação: canto inf. esq → sup. dir

    // gira o sistema de coordenadas em torno do centro p/ a diagonal
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(theta);
    ctx.translate(-W / 2, -H / 2);

    const strandA = [];
    const strandB = [];
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const y = top + t * span;
      const a = t * turns * Math.PI * 2 + rotation;
      strandA.push({ x: cx + radius * Math.cos(a),          y, z: Math.sin(a) });
      strandB.push({ x: cx + radius * Math.cos(a + Math.PI), y, z: Math.sin(a + Math.PI) });
    }

    // 1) "espinha" de cada fita (linhas suaves ligando os nós em ordem)
    [strandA, strandB].forEach((strand) => {
      ctx.beginPath();
      strand.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.strokeStyle = rgba(0.08);
      ctx.lineWidth = 1.4;
      ctx.stroke();
    });

    // 2) degraus (pontes entre as fitas), com profundidade
    for (let i = 0; i <= count; i++) {
      const n1 = strandA[i], n2 = strandB[i];
      const depth = (n1.z + n2.z) / 2;            // -1 (fundo) .. 1 (frente)
      const a = 0.035 + (depth + 1) / 2 * 0.10;
      ctx.strokeStyle = rgba(a);
      ctx.lineWidth = 1 + (depth + 1) / 2 * 1.3;
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.stroke();
    }

    // 3) nós (esferas) — desenhados do fundo p/ a frente
    const nodes = strandA.concat(strandB).sort((p, q) => p.z - q.z);
    for (const n of nodes) {
      const f = (n.z + 1) / 2;                    // 0 (fundo) .. 1 (frente)
      const r = 1.6 + f * 3.6;
      ctx.fillStyle = rgba(0.10 + f * 0.42);
      if (f > 0.62) {
        ctx.shadowColor = rgba(0.55);
        ctx.shadowBlur = 12 * f;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function loop() {
    boost *= DECAY;
    rotation += (IDLE + boost) * dir;
    draw();
    requestAnimationFrame(loop);
  }

  resize();

  const reduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    draw(); // estático para quem prefere menos movimento
  } else {
    loop();
  }
})();