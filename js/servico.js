/* ============================================================
   AUTO EVOLUTION — Página individual de serviço
   Lê ?id=<id> da URL e monta o detalhe a partir de data/services.json
   (com fallback para window.SERVICES_DATA, como na listagem).
   Depende de js/common.js (WHATSAPP, ICONS, arrowSVG, waLink, escapeHTML).
   ============================================================ */

// ícone para os serviços em destaque (que não têm campo "icon")
const FEATURED_ICONS = {
  ppf: "shield",
  "insulfilm-ceramico": "glass",
  vitrificacao: "sparkle",
};

function getServiceId() {
  return new URLSearchParams(window.location.search).get("id");
}

/* -------- carga dos dados (mesmo padrão da listagem) -------- */
async function fetchData() {
  try {
    const res = await fetch("data/services.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (fetchErr) {
    if (window.SERVICES_DATA) return window.SERVICES_DATA;
    throw fetchErr;
  }
}

// procura o serviço pelo id em featured e depois em groups
function findService(data, id) {
  const feat = (data.featured || []).find((s) => s.id === id);
  if (feat) return { type: "featured", service: feat };
  const grp = (data.groups || []).find((g) => g.id === id);
  if (grp) return { type: "group", service: grp };
  return null;
}

/* -------- renderização -------- */

function breadcrumb(name) {
  return `
    <nav class="breadcrumb">
      <a href="index.html">Início</a>
      <span class="sep">/</span>
      <a href="servicos.html">Serviços</a>
      <span class="sep">/</span>
      <span class="here">${escapeHTML(name)}</span>
    </nav>`;
}

// normaliza destaque ou categoria num formato único de exibição
function normalize(found) {
  const { type, service: s } = found;
  if (type === "featured") {
    return {
      name: s.name,
      icon: ICONS[FEATURED_ICONS[s.id]] || ICONS.star,
      eyebrow: s.tagline || "Serviço em destaque",
      lead: s.description,
      services: [],                  // destaque é um serviço único (botão único)
      features: s.highlights || [],  // highlights = características
    };
  }
  return {
    name: s.name,
    icon: ICONS[s.icon] || ICONS.star,
    eyebrow: "Linha completa",
    lead: s.description,
    services: s.services || [],
    features: s.features || [],
  };
}

// mini-seção "Serviços": uma linha + botão por serviço; se não houver
// sub-serviços, um único botão para o serviço inteiro.
function renderServicesSection(d) {
  let body;
  if (d.services.length) {
    body = `
      <div class="detail-items">
        ${d.services.map((it) => `
          <div class="detail-item">
            <span class="tick">✓</span>
            <span class="di-text">${escapeHTML(it)}</span>
            <a class="btn btn-ghost di-btn" href="${waLink(it)}" target="_blank" rel="noopener">
              Quero saber mais ${arrowSVG}
            </a>
          </div>
        `).join("")}
      </div>`;
  } else {
    body = `
      <div class="detail-cta">
        <a class="btn btn-primary" href="${waLink(d.name)}" target="_blank" rel="noopener">
          Quero saber mais ${arrowSVG}
        </a>
      </div>`;
  }
  return `
    <div class="detail-section">
      <h2 class="detail-section-title">Serviços</h2>
      ${body}
    </div>`;
}

// mini-seção "Características": apenas listagem, sem botões
function renderFeaturesSection(d) {
  if (!d.features.length) return "";
  return `
    <div class="detail-section">
      <h2 class="detail-section-title">Características</h2>
      <ul class="fc-highlights detail-highlights">
        ${d.features.map((f) => `<li>${escapeHTML(f)}</li>`).join("")}
      </ul>
    </div>`;
}

function renderDetail(found) {
  const d = normalize(found);
  return `
    ${breadcrumb(d.name)}
    <div class="detail-head">
      <div class="detail-icon">${d.icon}</div>
      <div>
        <span class="eyebrow">${escapeHTML(d.eyebrow)}</span>
        <h1>${escapeHTML(d.name)}</h1>
      </div>
    </div>
    <p class="detail-lead">${escapeHTML(d.lead)}</p>
    ${renderServicesSection(d)}
    ${renderFeaturesSection(d)}`;
}

function renderNotFound() {
  return `
    ${breadcrumb("Serviço não encontrado")}
    <div class="detail-head">
      <div>
        <span class="eyebrow">Ops</span>
        <h1>Serviço não encontrado</h1>
      </div>
    </div>
    <p class="detail-lead">Não localizamos esse serviço. Confira a lista completa de serviços disponíveis.</p>
    <div class="detail-cta">
      <a class="btn btn-primary" href="servicos.html">Ver todos os serviços ${arrowSVG}</a>
    </div>`;
}

/* -------- menu mobile (igual à listagem) -------- */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle) return;
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) links.classList.remove("open");
  });
}

/* -------- carga principal -------- */
async function loadService() {
  const root = document.getElementById("service-detail");
  const id = getServiceId();

  if (!id) {
    root.innerHTML = renderNotFound();
    return;
  }

  try {
    const data = await fetchData();
    const found = findService(data, id);

    if (!found) {
      root.innerHTML = renderNotFound();
      document.title = "Serviço não encontrado · Auto Evolution";
      return;
    }

    root.innerHTML = renderDetail(found);
    document.title = `${found.service.name} · Auto Evolution`;
  } catch (err) {
    console.error("Falha ao carregar o serviço:", err);
    root.innerHTML = `
      <div class="load-error">
        <b>Não foi possível carregar o serviço</b>
        <p>Confira sua conexão e recarregue a página.</p>
        <p style="margin-top:6px">Rodando localmente? Sirva os arquivos por um servidor:</p>
        <code>python3 -m http.server</code>
      </div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  loadService();
});
