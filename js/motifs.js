// ============================================
//   TONAFA : motifs.js
//   Motifs africains qui se peignent au scroll
//   Utilisation : <div class="motif" data-motif="losanges"></div>
// ============================================

(function () {

  // Les 3 motifs, inspirés des ourlets peints des vêtements TONAFA.
  // "trait" = les lignes de côté, "forme" = le motif central, "circle" = les points dorés
  const MOTIFS = {

    // Losanges (comme le Short Wɛ̀kɛ̀)
    losanges:
      '<path class="trait" pathLength="1" d="M84 12 H0"/>' +
      '<path class="trait" pathLength="1" d="M156 12 H240"/>' +
      '<path class="forme" style="--i:0" pathLength="1" d="M96 3 L105 12 L96 21 L87 12 Z"/>' +
      '<path class="forme" style="--i:1" pathLength="1" d="M120 3 L129 12 L120 21 L111 12 Z"/>' +
      '<path class="forme" style="--i:2" pathLength="1" d="M144 3 L153 12 L144 21 L135 12 Z"/>' +
      '<path class="forme" style="--i:3" pathLength="1" d="M120 8 L124 12 L120 16 L116 12 Z"/>' +
      '<circle cx="96" cy="12" r="1.4"/>' +
      '<circle cx="144" cy="12" r="1.4"/>',

    // Spirale (comme la Culotte Sùn)
    spirale:
      '<path class="trait" pathLength="1" d="M106 12 H0"/>' +
      '<path class="trait" pathLength="1" d="M134 12 H240"/>' +
      '<path class="forme" style="--i:0" pathLength="1" d="M120.9 12.0 L121.1 12.2 L121.2 12.6 L121.2 13.0 L121.1 13.4 L120.9 13.8 L120.5 14.2 L120.0 14.5 L119.4 14.6 L118.8 14.6 L118.1 14.5 L117.4 14.1 L116.8 13.6 L116.3 12.9 L116.0 12.1 L115.8 11.1 L115.9 10.1 L116.3 9.1 L116.9 8.2 L117.7 7.4 L118.7 6.8 L119.9 6.4 L121.2 6.3 L122.5 6.5 L123.8 7.0 L125.0 7.8 L126.0 8.9 L126.7 10.3 L127.2 11.8 L127.2 13.4 L126.9 15.1 L126.3 16.7 L125.2 18.1 L123.8 19.3 L122.2 20.2 L120.3 20.7 L118.3 20.8 L116.3 20.4 L114.4 19.6 L112.7 18.3 L111.3 16.6 L110.3 14.6 L109.7 12.4 L109.7 10.1 L110.1 7.8 L111.1 5.6"/>' +
      '<circle cx="100" cy="12" r="1.4"/>' +
      '<circle cx="140" cy="12" r="1.4"/>',

    // Chevrons (comme le Pantalon Sìn)
    chevrons:
      '<path class="trait" pathLength="1" d="M79 12 H0"/>' +
      '<path class="trait" pathLength="1" d="M156 12 H240"/>' +
      '<path class="forme" style="--i:0" pathLength="1" d="M86 5 L93 12 L86 19"/>' +
      '<path class="forme" style="--i:1" pathLength="1" d="M100 5 L107 12 L100 19"/>' +
      '<path class="forme" style="--i:2" pathLength="1" d="M114 5 L121 12 L114 19"/>' +
      '<path class="forme" style="--i:3" pathLength="1" d="M128 5 L135 12 L128 19"/>' +
      '<path class="forme" style="--i:4" pathLength="1" d="M142 5 L149 12 L142 19"/>'
  };

  const elements = document.querySelectorAll('.motif');
  if (!elements.length) return;

  // 1. Dessiner le SVG de chaque motif
  elements.forEach(el => {
    const nom = el.dataset.motif || 'losanges';
    el.innerHTML = '<svg viewBox="0 0 240 24" aria-hidden="true">' + (MOTIFS[nom] || MOTIFS.losanges) + '</svg>';
  });

  // 2. Animations réduites : on affiche directement les motifs
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('peint'));
    return;
  }

  // 3. Peindre chaque motif quand il arrive à l'écran
  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
      if (entree.isIntersecting) {
        entree.target.classList.add('peint');
        observateur.unobserve(entree.target);   // une seule fois
      }
    });
  }, { threshold: 0.6 });

  elements.forEach(el => observateur.observe(el));
})();