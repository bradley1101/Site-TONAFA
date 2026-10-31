// ============================================
//   TONAFA : transitions.js
//   Un voile crème passe quand on change de page
// ============================================

(function () {

  // Pas de voile si le visiteur a demandé à réduire les animations
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 1. Créer le voile (caché sous l'écran au départ)
  const voile = document.createElement('div');
  voile.id = 'voile';
  voile.setAttribute('aria-hidden', 'true');
  voile.innerHTML = '<span>TONAFA</span>';
  document.body.appendChild(voile);

  // 2. ARRIVÉE : si on vient d'une autre page du site, le voile couvre
  //    l'écran puis remonte pour dévoiler la nouvelle page
  let arrivee = false;
  try {
    arrivee = sessionStorage.getItem('tonafa-voile') === '1';
    sessionStorage.removeItem('tonafa-voile');
  } catch (e) {}

  const loaderAffiche = document.documentElement.classList.contains('loader-actif');

  if (arrivee && !loaderAffiche) {
    voile.classList.add('instant', 'couvre');          // couvre sans animation
    requestAnimationFrame(() => requestAnimationFrame(() => {
      voile.classList.remove('instant');
      voile.classList.add('part');                     // remonte vers le haut
    }));
  }

  // Une fois remonté, on le remet en bas, prêt pour le prochain clic
  voile.addEventListener('transitionend', () => {
    if (voile.classList.contains('part')) {
      voile.classList.add('instant');
      voile.classList.remove('couvre', 'part');
    }
  });

  // 3. DÉPART : quand on clique un lien vers une autre page du site,
  //    le voile monte depuis le bas, puis on change de page
  document.addEventListener('click', (e) => {
    const lien = e.target.closest('a');
    if (!lien || e.defaultPrevented) return;

    // Laisser faire le navigateur : nouvel onglet, Ctrl+clic, téléchargement
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (lien.target === '_blank' || lien.hasAttribute('download')) return;

    const url = new URL(lien.href, location.href);

    // WhatsApp, Instagram, mailto, tel... : pas de voile
    if (url.origin !== location.origin) return;
    // Lien vers la même page (ancre #) : pas de voile
    if (url.pathname === location.pathname && url.search === location.search) return;
    // Seulement nos pages .html (ou la racine du site)
    if (!/(\.html|\/)$/.test(url.pathname)) return;

    e.preventDefault();
    try { sessionStorage.setItem('tonafa-voile', '1'); } catch (err) {}

    voile.classList.remove('instant', 'part');
    void voile.offsetWidth;                            // force le départ de l'animation
    voile.classList.add('couvre');
    setTimeout(() => { window.location.href = url.href; }, 600);
  });

  // 4. Bouton « Retour » de Safari et Chrome : la page revient de la mémoire
  //    avec le voile encore posé, on l'enlève
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      voile.classList.add('instant');
      voile.classList.remove('couvre', 'part');
    }
  });

})();