/* ============================================================
   AUTO EVOLUTION — Página de Serviços
   Carregamento assíncrono dos serviços a partir de data/services.json
   ============================================================ */

// número de WhatsApp oficial (confirmar na entrevista)
const WHATSAPP = "5541996459928";

// biblioteca mínima de ícones (SVG inline) por categoria
const ICONS = {
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
  seat: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v7"/><path d="M5 13h12a2 2 0 0 1 2 2v3H7l-2-5z"/><path d="M7 18v2M17 18v2"/></svg>',
  headlight: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a4 4 0 0 1 4-4h4a7 7 0 0 1 0 14H7a4 4 0 0 1-4-4z"/><path d="M18 9h3M18 12h3M18 15h2"/></svg>',
  spray: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 8h5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z"/><path d="M9 8V5a1 1 0 0 1 1-1h3"/><path d="M18 5h.01M20 8h.01M18 11h.01"/></svg>',
  wheel: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3v5.8M12 15.2V21M3 12h5.8M15.2 12H21"/></svg>',
  gauge: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/><circle cx="12" cy="17" r="1.4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.2"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.5 6.3 6.8.5-5.2 4.4 1.7 6.6L12 17.7 6.2 21.3l1.7-6.6L2.7 9.8l6.8-.5z"/></svg>',
  glass: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5h14l-1.5 9a3 3 0 0 1-3 2.5H9.5a3 3 0 0 1-3-2.5z"/><path d="M9 5l1.5 11M15 5l-1.5 11"/></svg>',
};

const arrowSVG = '<svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

// monta link de orçamento via WhatsApp já com o serviço preenchido
function waLink(serviceName) {
  const msg = `Olá! Tenho interesse no serviço de ${serviceName}. Gostaria de um orçamento.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function escapeHTML(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

/* -------- renderização -------- */

function renderFeatured(list) {
  return list.map((s) => `
    <article class="feat-card reveal">
      <div class="fc-num">${escapeHTML(s.number)}</div>
      <div class="fc-tagline">${escapeHTML(s.tagline)}</div>
      <h3>${escapeHTML(s.name)}</h3>
      <p class="fc-desc">${escapeHTML(s.description)}</p>
      <ul class="fc-highlights">
        ${s.highlights.map((h) => `<li>${escapeHTML(h)}</li>`).join("")}
      </ul>
      <a class="fc-cta" href="${waLink(s.name)}" target="_blank" rel="noopener">
        Solicitar orçamento ${arrowSVG}
      </a>
    </article>
  `).join("");
}

function renderGroups(groups) {
  return groups.map((g) => `
    <article class="grp-card reveal" id="grp-${escapeHTML(g.id)}">
      <div class="grp-head">
        <div class="grp-icon">${ICONS[g.icon] || ICONS.star}</div>
        <h3>${escapeHTML(g.name)}</h3>
      </div>
      <p class="grp-desc">${escapeHTML(g.description)}</p>
      <ul class="grp-items">
        ${g.items.map((it) => `<li><span class="tick">✓</span><span>${escapeHTML(it)}</span></li>`).join("")}
      </ul>
    </article>
  `).join("");
}

function renderDropdown(groups) {
  return groups.map((g) => `
    <a href="#grp-${escapeHTML(g.id)}"><span class="dot"></span>${escapeHTML(g.name)}</a>
  `).join("");
}

/* -------- estados de carregamento -------- */

function showSkeletons() {
  const feat = document.getElementById("featured-grid");
  const grp = document.getElementById("groups-grid");
  feat.innerHTML = Array(3).fill('<div class="skeleton sk-feat"></div>').join("");
  grp.innerHTML = Array(4).fill('<div class="skeleton sk-grp"></div>').join("");
}

function showError() {
  const feat = document.getElementById("featured-grid");
  feat.innerHTML = `
    <div class="load-error">
      <b>Não foi possível carregar os serviços</b>
      <p>Confira sua conexão e recarregue a página.</p>
      <p style="margin-top:6px">Rodando localmente? Sirva os arquivos por um servidor:</p>
      <code>python3 -m http.server</code>
    </div>`;
  document.getElementById("groups-grid").innerHTML = "";
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

async function loadServices() {
  showSkeletons();
  try {
    let data;
    try {
      const res = await fetch("data/services.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();
    } catch (fetchErr) {
      // Fallback para dados embutidos quando fetch falha (ex: file://)
      if (window.SERVICES_DATA) {
        data = window.SERVICES_DATA;
      } else {
        throw fetchErr;
      }
    }

    document.getElementById("featured-grid").innerHTML = renderFeatured(data.featured);
    document.getElementById("groups-grid").innerHTML = renderGroups(data.groups);
    document.getElementById("drop-menu").innerHTML = renderDropdown(data.groups);

    activateReveal();
  } catch (err) {
    console.error("Falha ao carregar serviços:", err);
    showError();
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
  loadServices();
  initCategoryScroll();
});

/* -------- animação de scroll para categorias (apenas 16:9) -------- */

function initCategoryScroll() {
  const dropMenu = document.getElementById("drop-menu");
  if (!dropMenu) return;

  // Verifica se a resolução é 16:9
  function is16to9() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    return Math.abs(aspectRatio - 16/9) < 0.01;
  }

  // Intercepta cliques nos links de categoria
  dropMenu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    // Se NÃO for 16:9, deixa o comportamento padrão
    if (!is16to9()) return;

    e.preventDefault();

    const targetId = href.substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    // Animação suave até a categoria
    animateScrollToElement(target);

    // Fecha o menu mobile
    const navLinks = document.getElementById("nav-links");
    if (navLinks) navLinks.classList.remove("open");
  });
}

function animateScrollToElement(element) {
  const targetPos = element.offsetTop - 100; // offset para deixar espaço no topo
  const startPos = window.scrollY || window.pageYOffset || 0;
  const distance = targetPos - startPos;
  const duration = 800; // ms
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  function scroll(currentTime) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPos + distance * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}