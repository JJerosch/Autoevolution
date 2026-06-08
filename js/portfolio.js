/* ============================================================
   AUTO EVOLUTION — Portfólio (carregamento async)
   ============================================================ */

function escapeHTML(str) {
  const d = document.createElement("div");
  d.textContent = str == null ? "" : String(str);
  return d.innerHTML;
}

const playIconSVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>
  </svg>`;

const instaIconSVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none"/>
  </svg>`;

const arrowSVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>`;

/* -------- renderização -------- */

function renderVideos(list) {
  return list.map((v) => `
    <article class="video-card reveal">
      <div class="video-label">${escapeHTML(v.label)}</div>
      <div class="video-frame">
        <video
          src="${escapeHTML(v.src)}"
          muted
          loop
          playsinline
          preload="metadata"
          controls
          poster=""
        ></video>
        <button class="video-play" type="button" aria-label="Reproduzir">
          ${playIconSVG}
        </button>
      </div>
    </article>
  `).join("");
}

function renderInsta(list) {
  return list.map((i) => `
    <a class="insta-card reveal" href="${escapeHTML(i.url)}" target="_blank" rel="noopener">
      <div class="insta-top">
        <span class="insta-date">${escapeHTML(i.date)}</span>
        <span class="insta-icon">${instaIconSVG}</span>
      </div>
      <h3>${escapeHTML(i.name)}</h3>
      <p>${escapeHTML(i.description)}</p>
      <span class="insta-cta">Ver no Instagram ${arrowSVG}</span>
    </a>
  `).join("");
}

/* -------- estados de carregamento -------- */

function showSkeletons() {
  const v = document.getElementById("video-grid");
  const i = document.getElementById("insta-grid");
  if (v) v.innerHTML = Array(6).fill('<div class="skeleton sk-video"></div>').join("");
  if (i) i.innerHTML = Array(4).fill('<div class="skeleton sk-insta"></div>').join("");
}

function showError(target, message) {
  if (!target) return;
  target.innerHTML = `
    <div class="load-error">
      <b>${escapeHTML(message)}</b>
      <p>Confira sua conexão e recarregue a página.</p>
      <p style="margin-top:6px">Rodando localmente? Sirva os arquivos por um servidor:</p>
      <code>python3 -m http.server</code>
    </div>`;
}

/* -------- interações: play/pause + autopause em scroll -------- */

function initVideoCards() {
  const cards = document.querySelectorAll(".video-card");
  cards.forEach((card) => {
    const video = card.querySelector("video");
    const playBtn = card.querySelector(".video-play");
    if (!video) return;

    const togglePlay = () => {
      if (video.paused) {
        document.querySelectorAll(".video-card video").forEach((other) => {
          if (other !== video) other.pause();
        });
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    playBtn.addEventListener("click", (e) => { e.stopPropagation(); togglePlay(); });
    video.addEventListener("play",  () => card.classList.add("playing"));
    video.addEventListener("pause", () => card.classList.remove("playing"));
    video.addEventListener("ended", () => card.classList.remove("playing"));
  });

  // pausa vídeos que saem da viewport
  const visObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target.querySelector("video");
      if (!v) return;
      if (!e.isIntersecting && !v.paused) v.pause();
    });
  }, { threshold: 0.15 });
  cards.forEach((c) => visObs.observe(c));
}

/* -------- scroll reveal -------- */

function activateReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("in"), (i % 4) * 90);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

/* -------- carga principal (async) -------- */

async function loadPortfolio() {
  showSkeletons();
  const videoGrid = document.getElementById("video-grid");
  const instaGrid = document.getElementById("insta-grid");

  try {
    let data;
    try {
      const res = await fetch("data/portfolio-videos.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();
    } catch (fetchErr) {
      if (window.PORTFOLIO_DATA) {
        data = window.PORTFOLIO_DATA;
      } else {
        throw fetchErr;
      }
    }

    if (videoGrid) videoGrid.innerHTML = renderVideos(data.videos || []);
    if (instaGrid) instaGrid.innerHTML = renderInsta(data.instagram || []);

    initVideoCards();
    activateReveal();
  } catch (err) {
    console.error("Falha ao carregar o portfólio:", err);
    showError(videoGrid, "Não foi possível carregar os vídeos");
    if (instaGrid) instaGrid.innerHTML = "";
  }
}

/* -------- menu mobile -------- */

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle) return;
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) links.classList.remove("open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  loadPortfolio();
});
