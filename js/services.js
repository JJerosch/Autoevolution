/* ============================================================
   AUTO EVOLUTION — Página de Serviços
   Carregamento assíncrono dos serviços a partir de data/services.json
   ============================================================ */

// WHATSAPP, ICONS, arrowSVG, waLink() e escapeHTML() vêm de js/common.js
// (incluído antes deste script).

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
  return groups.map((g) => {
    const preview = [...(g.services || []), ...(g.features || [])];
    return `
    <article class="grp-card reveal" id="grp-${escapeHTML(g.id)}">
      <div class="grp-head">
        <div class="grp-icon">${ICONS[g.icon] || ICONS.star}</div>
        <h3>${escapeHTML(g.name)}</h3>
      </div>
      <p class="grp-desc">${escapeHTML(g.description)}</p>
      <ul class="grp-items">
        ${preview.map((it) => `<li><span class="tick">✓</span><span>${escapeHTML(it)}</span></li>`).join("")}
      </ul>
      <a class="fc-cta grp-cta" href="servico.html?id=${encodeURIComponent(g.id)}">
        Ver serviço ${arrowSVG}
      </a>
    </article>
  `;
  }).join("");
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