// ============================================
//   TONAFA : produit.js
//   Affiche un article en entier : produit.html?id=corset-agojie
// ============================================

const zone = document.getElementById('fiche-produit');

function chemin(photo) {
  return 'assets/img/produits/' + photo.replace('img/', '');
}

function formatPrix(n) {
  return n.toLocaleString('fr-FR') + ' FCFA';
}

// 1. Lire l'id de l'article dans l'adresse de la page
const idArticle = new URLSearchParams(window.location.search).get('id');
const p = PRODUITS.find(item => item.id === idArticle);

// 2. Article introuvable (adresse incorrecte)
if (!p) {
  zone.innerHTML = `
    <div class="text-center py-32 px-6">
      <h1 class="font-display text-4xl mb-4">Article introuvable</h1>
      <p class="font-sans text-sm opacity-60 mb-10">Cet article n'existe pas ou n'est plus disponible.</p>
      <a href="boutique.html" class="btn-outline">Retour à la boutique</a>
    </div>`;
} else {
  // 3. Afficher l'article
  document.title = p.nom + ' · TONAFA';

  const photos = p.photos.map(chemin);
  const assorti = p.assorti ? PRODUITS.find(x => x.id === p.assorti) : null;

  // Partie cachée de la description ("Voir plus")
  const suite = `
    ${p.corps.map(texte => `<p>${texte}</p>`).join('')}
    ${p.remarque ? `<p class="remarque">Remarque : ${p.remarque}</p>` : ''}
    <h4>Détails</h4>
    <ul>${p.details.map(d => `<li>${d}</li>`).join('')}</ul>
    <h4>Conseil de style</h4>
    <p>${p.look}</p>
    <h4>Matière</h4>
    <p>${COMMUN.matiere}</p>
    ${p.peint ? `<p>${COMMUN.peinture}</p>` : ''}
    <h4>Savoir-faire</h4>
    <p>${COMMUN.artisanat}</p>
    <h4>Entretien</h4>
    <p>${COMMUN.entretienIntro}</p>
    <ul>${COMMUN.entretien.map(e => `<li>${e}</li>`).join('')}</ul>
    <p>${COMMUN.entretienFin}</p>
  `;

  zone.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-10">
      <a href="boutique.html" class="lien-retour">← Retour à la boutique</a>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-8 items-start">

        <!-- GALERIE : grande photo + miniatures -->
        <div>
            <div class="galerie-principale tissu">
            <img id="photo-principale" src="${photos[0]}" alt="${p.nom}, collection New Light">
          </div>
          <div class="galerie-miniatures">
            ${photos.map((src, i) => `
              <button type="button" class="miniature ${i === 0 ? 'active' : ''}"
                      data-src="${src}" aria-label="Voir la photo ${i + 1}">
                <img src="${src}" alt="">
              </button>`).join('')}
          </div>
        </div>

        <!-- INFOS ARTICLE -->
        <div class="product-card fiche lg:sticky lg:top-28">
          <p class="font-sans text-xs tracking-[0.2em] uppercase text-cognac mb-2">
            ${p.categorie} · ${p.type} · New Light
          </p>
          <h1 class="font-display text-charbon text-4xl md:text-5xl font-normal mb-2">${p.nom}</h1>
          <p class="fon-sens">« ${p.fon} » signifie ${p.sens} en fon</p>
          <p class="font-sans text-cognac text-xl font-medium mb-6">${formatPrix(p.prix)}</p>

          <!-- Description -->
          <p class="desc-intro">${p.intro}</p>
          <div class="desc-suite hidden">${suite}</div>
          <button type="button" class="btn-voir-plus" aria-expanded="false">Voir plus</button>

          <!-- Tailles -->
          <div class="mt-8 mb-5">
            <p class="font-sans text-xs tracking-[0.2em] uppercase opacity-50 mb-2">Taille</p>
            <div class="flex gap-2 taille-selector">
              ${COMMUN.tailles.map(t =>
                `<button type="button" class="taille-btn" data-taille="${t}">${t}</button>`
              ).join('')}
            </div>
          </div>

          <!-- Ajouter au panier -->
          <button type="button" class="btn-add-cart plein"
                  data-nom="${p.nom}"
                  data-prix="${p.prix}"
                  data-img="${photos[0]}"
                  data-taille="">
            Ajouter au panier
          </button>

          ${assorti ? `
            <p class="assorti">Se porte avec :
              <a href="produit.html?id=${assorti.id}">${assorti.nom}</a>
              (${formatPrix(assorti.prix)}), vendu séparément.
            </p>` : ''}
        </div>

      </div>
    </div>
  `;

  // 4. Cliquer sur une miniature change la grande photo
  const principale = document.getElementById('photo-principale');
  zone.querySelectorAll('.miniature').forEach(btn => {
    btn.addEventListener('click', () => {
            if (principale.src.endsWith(btn.dataset.src)) return;   // déjà affichée
      principale.style.opacity = 0;                          // fondu sortant
      setTimeout(() => {
        principale.src = btn.dataset.src;
        principale.onload = () => { principale.style.opacity = 1; };   // fondu entrant
        setTimeout(() => { principale.style.opacity = 1; }, 600);      // sécurité
      }, 250);
      zone.querySelectorAll('.miniature').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 5. Bouton "Voir plus / Voir moins"
  const btnPlus = zone.querySelector('.btn-voir-plus');
  const suiteDesc = zone.querySelector('.desc-suite');
  btnPlus.addEventListener('click', () => {
    const ouvert = suiteDesc.classList.toggle('hidden') === false;
    btnPlus.textContent = ouvert ? 'Voir moins' : 'Voir plus';
    btnPlus.setAttribute('aria-expanded', ouvert);
  });
}