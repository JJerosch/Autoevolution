/* ============================================================
   SMOOTH SCROLL — Scroll fluido e responsivo
   ============================================================ */

(function () {
  let currentScroll = window.scrollY || window.pageYOffset || 0;
  let targetScroll = currentScroll;
  let lastScroll = currentScroll;
  let isScrolling = false;
  let scrollTimeout;
  const easeAmount = 0.1; // quanto menor, mais suave (0.05 - 0.15 são bons)

  // Detecta scroll do mouse/touchpad
  window.addEventListener("wheel", (e) => {
    targetScroll += e.deltaY;
    targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight));
    isScrolling = true;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 100);
  }, { passive: true });

  // Suporta scroll por teclado também
  window.addEventListener("keydown", (e) => {
    const scrollAmount = window.innerHeight * 0.8;
    switch (e.key) {
      case "ArrowDown":
      case " ":
        targetScroll += scrollAmount;
        isScrolling = true;
        break;
      case "ArrowUp":
        targetScroll -= scrollAmount;
        isScrolling = true;
        break;
      case "End":
        targetScroll = document.documentElement.scrollHeight - window.innerHeight;
        isScrolling = true;
        break;
      case "Home":
        targetScroll = 0;
        isScrolling = true;
        break;
      default:
        return;
    }
    e.preventDefault();
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 100);
  });

  function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * easeAmount;
    
    // Snapping final para evitar decimais
    if (Math.abs(targetScroll - currentScroll) < 0.5) {
      currentScroll = targetScroll;
    }

    window.scrollTo(0, currentScroll);
    
    if (Math.abs(targetScroll - currentScroll) > 0.5 || isScrolling) {
      requestAnimationFrame(smoothScroll);
    }
  }

  // Inicia o loop de scroll
  requestAnimationFrame(smoothScroll);

  // Detecta scroll externo (barra lateral) e sincroniza
  window.addEventListener("scroll", () => {
    const actual = window.scrollY || window.pageYOffset || 0;
    if (Math.abs(actual - currentScroll) > 5) {
      currentScroll = actual;
      targetScroll = actual;
    }
  }, { passive: true });
})();
