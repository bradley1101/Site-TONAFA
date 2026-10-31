// ============================================
//   TONAFA : boutique.js
//   Crée les cartes articles (boutique et accueil) à partir de produits.js
// ============================================

const grille = document.getElementById('products-grid');

// Les chemins dans produits.js commencent par "img/" :
// sur le site, les photos sont dans "assets/img/produits/"
function chemin(photo) {
  return 'assets/img/produits/' + photo.replace('img/', '');
}

function formatPrix(n) {
  return n.toLocaleString('fr-FR') + ' FCFA';
}

// ── Créer une carte (toute la carte est un lien vers la page de l'article) ──
function creerCarte(p, index) {
  const carte = document.createElement('a');
  carte.href = 'produit.html?id=' + p.id;
  carte.className = 'product-card group block reveal reveal-delay-' + ((index % 3) + 1);
  // Sert aux filtres : ex. "femme haut"
  carte.dataset.category = (p.categorie + ' ' + p.type).toLowerCase();

  const photo1 = chemin(p.photos[0]);
  const photo2 = p.photos[1] ? chemin(p.photos[1]) : null;

  carte.innerHTML = `
    <!-- Photo entière, sans recadrage. La 2e photo apparaît au survol -->
      <div class="tissu relative overflow-hidden mb-4">
      <img src="${photo1}" alt="${p.nom}, collection New Light" loading="lazy"
           class="w-full h-auto block">
      ${photo2 ? `<img src="${photo2}" alt="" loading="lazy"
           class="absolute inset-0 w-full h-full object-contain bg-creme
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500">` : ''}
    </div>

    <div class="px-1 flex justify-between items-start gap-4">
      <div>
        <p class="font-sans text-xs tracking-[0.2em] uppercase text-cognac mb-1">
          ${p.categorie} · ${p.type}
        </p>
        <h3 class="font-display text-charbon text-2xl font-normal">${p.nom}</h3>
        <p class="fon-sens">« ${p.fon} » signifie ${p.sens} en fon</p>
      </div>
      <p class="font-sans text-cognac font-medium text-sm mt-6 whitespace-nowrap">
        ${formatPrix(p.prix)}
      </p>
    </div>

    <span class="voir-article">Voir l'article</span>
  `;
  return carte;
}

// ── Afficher les cartes ──
if (grille && typeof PRODUITS !== 'undefined') {
  // Sur l'accueil, on n'affiche qu'une sélection (attribut data-selection)
  let liste = PRODUITS;
  if (grille.dataset.selection) {
    const ids = grille.dataset.selection.split(',');
    liste = ids.map(id => PRODUITS.find(p => p.id === id.trim())).filter(Boolean);
  }

  liste.forEach((p, i) => grille.appendChild(creerCarte(p, i)));

  const compteur = document.getElementById('results-count');
  if (compteur) compteur.textContent = liste.length + ' pièces';
}