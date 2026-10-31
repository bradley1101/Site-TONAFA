// ============================================
//   TONAFA — script.js
//   Panier + WhatsApp + UI interactions
// ============================================

// ── NUMÉRO WHATSAPP DE MURIELLE ──
// Remplace par le vrai numéro (format international, sans + ni espaces)
const WHATSAPP_NUMBER = '2290143510837';

// ── ÉTAT DU PANIER ──
let cart = [];

// ════════════════════════════════════════════
//  1. HERO — effet zoom au chargement
// ════════════════════════════════════════════
window.addEventListener('load', () => {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) heroImg.classList.add('loaded');
});


// ════════════════════════════════════════════
//  2. HEADER — ombre au scroll
// ════════════════════════════════════════════
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// ════════════════════════════════════════════
//  3. MENU MOBILE — burger toggle
// ════════════════════════════════════════════
const menuBtn   = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}


// ════════════════════════════════════════════
//  4. PANIER — ouverture / fermeture
// ════════════════════════════════════════════
const cartBtn     = document.getElementById('cart-btn');
const cartClose   = document.getElementById('cart-close');
const cartDrawer  = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');

function openCart() {
  cartOverlay.classList.remove('hidden');
  setTimeout(() => cartOverlay.classList.add('opacity-100'), 10);
  cartDrawer.classList.remove('translate-x-full');
  document.body.style.overflow = 'hidden'; // bloque le scroll de la page
}

function closeCart() {
  cartOverlay.classList.remove('opacity-100');
  cartDrawer.classList.add('translate-x-full');
  setTimeout(() => {
    cartOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);


// ════════════════════════════════════════════
//  5. PANIER — ajouter un article
// ════════════════════════════════════════════
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-add-cart');
  if (!btn) return;

  const nom  = btn.dataset.nom;
  const prix = parseInt(btn.dataset.prix);
  const img  = btn.dataset.img;

  const taille = btn.dataset.taille;
    // Pas de taille choisie : on prévient le client et on n'ajoute rien
  if (!taille) {
    const card = btn.closest('.product-card');
    const selector = card ? card.querySelector('.taille-selector') : null;
    if (selector) {
      selector.style.outline = '1px solid #7F3301';
      setTimeout(() => selector.style.outline = 'none', 1500);
    }
    btn.textContent = 'Choisir une taille !';
    setTimeout(() => btn.textContent = 'Ajouter au panier', 1500);
    return;
  }

  

// Vérifie si l'article avec la même taille est déjà dans le panier
const existing = cart.find(item => item.nom === nom && item.taille === taille);

if (existing) {
  existing.qte += 1;
} else {
  cart.push({ nom, prix, img, taille, qte: 1 });
}

    updateCart();

  // Le badge du panier rebondit, puis le panier s'ouvre
  const badge = document.getElementById('cart-count');
  badge.classList.remove('rebond');
  void badge.offsetWidth;          // relance l'animation même si on clique vite
  badge.classList.add('rebond');
  setTimeout(openCart, 650);

  // Animation feedback sur le bouton
  btn.textContent = '✓ Ajouté !';
  setTimeout(() => btn.textContent = 'Ajouter au panier', 1500);
});


// ════════════════════════════════════════════
//  6. PANIER — mettre à jour l'affichage
// ════════════════════════════════════════════
function updateCart() {
  const cartItems  = document.getElementById('cart-items');
  const cartEmpty  = document.getElementById('cart-empty');
  const cartFooter = document.getElementById('cart-footer');
  const cartCount  = document.getElementById('cart-count');
  const cartTotal  = document.getElementById('cart-total');

  const totalQte    = cart.reduce((acc, item) => acc + item.qte, 0);
  const totalPrix   = cart.reduce((acc, item) => acc + item.prix * item.qte, 0);

  // Badge nombre d'articles
  if (totalQte > 0) {
    cartCount.textContent = totalQte;
    cartCount.classList.remove('hidden');
  } else {
    cartCount.classList.add('hidden');
  }

  // Total
  cartTotal.textContent = totalPrix.toLocaleString('fr-FR') + ' FCFA';

  // Afficher / cacher le footer et le message "vide"
  if (cart.length === 0) {
    cartEmpty.classList.remove('hidden');
    cartFooter.classList.add('hidden');
    cartItems.innerHTML = '';
    cartItems.appendChild(cartEmpty);
    return;
  }

  cartEmpty.classList.add('hidden');
  cartFooter.classList.remove('hidden');

  // Construire les lignes d'articles
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'flex gap-4 py-4 border-b border-cognac border-opacity-10';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.nom}"
           class="w-20 h-24 object-cover flex-shrink-0">
      <div class="flex flex-col justify-between flex-1">
        <div>
          <p class="font-sans text-xs tracking-[0.15em] uppercase text-cognac mb-1">TONAFA</p>
          <p class="font-display text-charbon text-base">${item.nom}</p>
          <p class="font-sans text-xs text-cognac opacity-60 mt-0.5">Taille : ${item.taille}</p>
          <p class="font-sans text-cognac text-xs mt-1">
            ${item.prix.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
        <div class="flex items-center justify-between mt-2">
          <!-- Contrôle quantité -->
          <div class="flex items-center gap-3">
            <button onclick="changeQte(${index}, -1)"
                    class="w-6 h-6 border border-cognac border-opacity-30 text-cognac
                           font-sans text-sm flex items-center justify-center
                           hover:bg-cognac hover:text-creme transition-colors duration-200">
              −
            </button>
            <span class="font-sans text-sm text-charbon">${item.qte}</span>
            <button onclick="changeQte(${index}, +1)"
                    class="w-6 h-6 border border-cognac border-opacity-30 text-cognac
                           font-sans text-sm flex items-center justify-center
                           hover:bg-cognac hover:text-creme transition-colors duration-200">
              +
            </button>
          </div>
          <!-- Supprimer -->
          <button onclick="removeItem(${index})"
                  class="font-sans text-xs opacity-30 hover:opacity-70
                         hover:text-red-600 transition-all duration-200 uppercase tracking-wider">
            Retirer
          </button>
        </div>
      </div>
    `;
    cartItems.appendChild(div);
  });
}


// ════════════════════════════════════════════
//  7. PANIER — changer quantité / supprimer
// ════════════════════════════════════════════
function changeQte(index, delta) {
  cart[index].qte += delta;
  if (cart[index].qte <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById('cart-clear').addEventListener('click', () => {
  cart = [];
  updateCart();
});


// ════════════════════════════════════════════
//  8. WHATSAPP — formater et envoyer
// ════════════════════════════════════════════
document.getElementById('whatsapp-btn').addEventListener('click', () => {
  if (cart.length === 0) return;

  const total = cart.reduce((acc, item) => acc + item.prix * item.qte, 0);

  // Construire le message
  let message = '🛍️ *Bonjour TONAFA !*\n';
  message += 'Je souhaite passer la commande suivante :\n\n';

  cart.forEach(item => {
    message += `▪️ *${item.nom}*\n`;
        message += `   Taille : ${item.taille}\n`;
        message += `   Quantité : ${item.qte}\n`;
    message += `   Prix : ${item.prix.toLocaleString('fr-FR')} FCFA\n\n`;
  });

  message += `─────────────────\n`;
  message += `💰 *Total : ${total.toLocaleString('fr-FR')} FCFA*\n\n`;
  message += `Merci de me confirmer la disponibilité et les modalités de livraison. 🙏`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});

// ════════════════════════════════════════════
//  9. SCROLL REVEAL — apparition au scroll
// ════════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12
});

// On observe tous les éléments avec la classe .reveal
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


// ════════════════════════════════════════════
//  10. CURSEUR PERSONNALISÉ
// ════════════════════════════════════════════
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// Grossit au survol des liens et boutons
document.querySelectorAll('a, button, .product-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// ════════════════════════════════════════════
//  11. FILTRES BOUTIQUE
// ════════════════════════════════════════════
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('#products-grid .product-card');
const resultsCount = document.getElementById('results-count');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      // Mettre à jour le bouton actif
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let count = 0;

      productCards.forEach(card => {
        const categories = card.dataset.category || '';
        const match = filter === 'tous' || categories.includes(filter);

        if (match) {
          card.style.display = 'flex';
          card.style.flexDirection = 'column';
          count++;
        } else {
          card.style.display = 'none';
        }
      });

      // Mettre à jour le compteur
      if (resultsCount) {
        resultsCount.textContent = count + (count > 1 ? ' pièces' : ' pièce');
      }
    });
  });
}
// ════════════════════════════════════════════
//  12. FORMULAIRE CONTACT → WhatsApp
// ════════════════════════════════════════════
const sendBtn = document.getElementById('send-whatsapp');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const nom     = document.getElementById('contact-nom').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const sujet   = document.getElementById('contact-sujet').value;
    const message = document.getElementById('contact-message').value.trim();
    const error   = document.getElementById('contact-error');

    // Validation simple
    if (!nom || !email || !sujet || !message) {
      error.classList.remove('hidden');
      return;
    }

    error.classList.add('hidden');

    // Construire le message WhatsApp
    let wa = `👋 *Nouveau message depuis le site TONAFA*\n\n`;
    wa += `*Nom :* ${nom}\n`;
    wa += `*Email :* ${email}\n`;
    wa += `*Sujet :* ${sujet}\n\n`;
    wa += `*Message :*\n${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(wa)}`;
    window.open(url, '_blank');
  });
}

// ════════════════════════════════════════════
//  13. SÉLECTEUR DE TAILLE
// ════════════════════════════════════════════
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.taille-btn');
  if (!btn) return;

  // Désélectionner les autres tailles du même produit
  const selector = btn.closest('.taille-selector');
  selector.querySelectorAll('.taille-btn').forEach(b => b.classList.remove('selected'));

  // Sélectionner la taille cliquée
  btn.classList.add('selected');

  // Mettre à jour le data-taille du bouton "Ajouter au panier"
  const card = btn.closest('.product-card');
  const addBtn = card.querySelector('.btn-add-cart');
  if (addBtn) {
    addBtn.dataset.taille = btn.dataset.taille;
  }
});

// ════════════════════════════════════════════
//  14. RECHERCHE
// ════════════════════════════════════════════
const searchBtn     = document.getElementById('search-btn');
const searchPanel   = document.getElementById('search-panel');
const searchOverlay = document.getElementById('search-overlay');
const searchInput   = document.getElementById('search-input');
const searchClose   = document.getElementById('search-close');
const searchResults = document.getElementById('search-results');
const searchCount   = document.getElementById('search-count');

if (searchBtn && searchPanel) {

  // Met le texte en minuscules et retire accents et tons du fon,
  // pour que "kpojito" trouve "Kpɔ̀jitó" et "sin" trouve "Sìn"
  function normaliser(texte) {
    return texte
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ɔ/g, 'o')
      .replace(/ɛ/g, 'e');
  }

  function ouvrirRecherche() {
    searchPanel.classList.remove('hidden');
    searchOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 50);
  }

  function fermerRecherche() {
    searchPanel.classList.add('hidden');
    searchOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function afficherResultats(terme) {
    if (typeof PRODUITS === 'undefined') return;

    const recherche = normaliser(terme.trim());

    // Champ vide : on n'affiche rien
    if (!recherche) {
      searchResults.innerHTML = '';
      searchCount.textContent = '';
      return;
    }

    // Un article est trouvé s'il contient TOUS les mots tapés
    const mots = recherche.split(/\s+/);
    const trouves = PRODUITS.filter(p => {
      const texte = normaliser([
        p.nom, p.categorie, p.type, p.sens, p.intro, p.details.join(' ')
      ].join(' '));
      return mots.every(mot => texte.includes(mot));
    });

    if (trouves.length === 0) {
      searchCount.textContent = `Aucun article ne correspond à « ${terme.trim()} ». Essayez « robe », « chemise » ou « lin blanc ».`;
      searchResults.innerHTML = '';
      return;
    }

    searchCount.textContent = trouves.length + (trouves.length > 1 ? ' articles trouvés' : ' article trouvé');

    searchResults.innerHTML = trouves.map(p => `
      <a href="produit.html?id=${p.id}" class="search-result">
        <img src="assets/img/produits/${p.photos[0].replace('img/', '')}"
             alt="${p.nom}" class="w-full h-auto block mb-3">
        <p class="font-sans text-xs tracking-[0.2em] uppercase text-cognac mb-1">${p.categorie}</p>
        <p class="font-display text-charbon text-lg leading-tight">${p.nom}</p>
        <p class="font-sans text-cognac text-sm mt-1">${p.prix.toLocaleString('fr-FR')} FCFA</p>
      </a>
    `).join('');
  }

  // Ouvrir / fermer
  searchBtn.addEventListener('click', ouvrirRecherche);
  searchClose.addEventListener('click', fermerRecherche);
  searchOverlay.addEventListener('click', fermerRecherche);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fermerRecherche();
  });

  // Résultats pendant la frappe
  searchInput.addEventListener('input', () => afficherResultats(searchInput.value));

  // Clic sur une suggestion
  document.querySelectorAll('.search-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      searchInput.value = chip.dataset.terme;
      afficherResultats(chip.dataset.terme);
      searchInput.focus();
    });
  });
}

// ════════════════════════════════════════════
//  15. PHOTOS QUI SE DÉROULENT COMME UN TISSU
// ════════════════════════════════════════════
const tissus = document.querySelectorAll('.tissu');

if (tissus.length) {
  const observateurTissu = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
      if (entree.isIntersecting) {
        entree.target.classList.add('deroule');
        observateurTissu.unobserve(entree.target);   // une seule fois
      }
    });
  }, { threshold: 0.15 });

  tissus.forEach(el => observateurTissu.observe(el));
}

// ════════════════════════════════════════════
//  16. HERO VIVANT : lettres + parallaxe
// ════════════════════════════════════════════
const heroTitre = document.getElementById('hero-titre');

if (heroTitre) {
  const hero = document.querySelector('.hero-section');

  // a) Couper TONAFA en lettres, chacune dans son <span>
  const mot = heroTitre.textContent.trim();
  heroTitre.setAttribute('aria-label', mot);       // les lecteurs d'écran lisent le mot entier
  heroTitre.innerHTML = [...mot]
    .map((lettre, i) => `<span class="hero-lettre" style="--i:${i}" aria-hidden="true">${lettre}</span>`)
    .join('');

  // b) Lancer l'apparition, en attendant la fin du loader s'il est là
  const racine = document.documentElement;
  const lancer = () => hero.classList.add('hero-pret');

  if (racine.classList.contains('loader-actif')) {
    const guetteur = new MutationObserver(() => {
      if (!racine.classList.contains('loader-actif')) {
        guetteur.disconnect();
        setTimeout(lancer, 300);                    // pendant que le voile remonte
      }
    });
    guetteur.observe(racine, { attributes: true, attributeFilter: ['class'] });
  } else {
    requestAnimationFrame(() => requestAnimationFrame(lancer));
  }

  // c) Parallaxe : la photo et le texte ne défilent pas à la même vitesse
  const fond    = hero.querySelector('.hero-fond');
  const contenu = hero.querySelector('.hero-contenu');
  const reduit  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let enAttente = false;

  function parallaxe() {
    const y = window.scrollY;
    const hauteur = hero.offsetHeight;
    if (y < hauteur) {
      fond.style.transform    = `translateY(${y * 0.3}px)`;
      contenu.style.transform = `translateY(${y * 0.15}px)`;
      contenu.style.opacity   = Math.max(0, 1 - y / (hauteur * 0.7));
    }
    enAttente = false;
  }

  if (!reduit) {
    window.addEventListener('scroll', () => {
      if (!enAttente) {
        enAttente = true;
        requestAnimationFrame(parallaxe);
      }
    }, { passive: true });
  }
}