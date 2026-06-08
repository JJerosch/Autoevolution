/* ============================================================
   AUTO EVOLUTION — Helpers compartilhados
   Usado por js/services.js (lista) e js/servico.js (detalhe).
   Deve ser incluído ANTES desses scripts.
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

// monta link de orçamento via WhatsApp já com o serviço/peça preenchido
function waLink(serviceName) {
  const msg = `Olá! Tenho interesse no serviço de ${serviceName}. Gostaria de um orçamento.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function escapeHTML(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}
