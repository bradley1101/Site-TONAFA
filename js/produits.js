// ============================================
//   TONAFA : Collection New Light
//   Catalogue des pièces (noms en fon, prix en FCFA)
// ============================================

const PRODUITS = [
  {
    id: "gilet-sin", peint: false, nom: "Gilet Sìn", fon: "Sìn", sens: "l'eau",
    categorie: "Femme", type: "Haut", prix: 25000, assorti: "pantalon-sin",
    photos: ["img/gilet-sin/1.jpg","img/gilet-sin/2.jpg","img/gilet-sin/3.jpg","img/gilet-sin/4.jpg","img/gilet-sin/5.jpg"],
    intro: "Le Gilet Sìn tire son nom du mot fon qui désigne l'eau, celle des lagunes et des lacs du Sud-Bénin, calme en surface et vivante en profondeur. Taillé dans un lin bleu ciel finement rayé, il reprend les codes du tailleur classique et les adoucit par la légèreté naturelle du lin.",
    corps: [
      "Sa coupe droite et sans manches dessine une silhouette nette, structurée aux épaules et fluide sur les hanches. L'encolure en V allonge le buste, tandis que les deux poches à rabat apportent une touche de sophistication très couture.",
      "La fermeture se fait par quatre cauris naturels, cousus un à un. Autrefois monnaie et parure, le cauri devient ici un bijou discret qui relie la pièce à la mémoire de l'Afrique de l'Ouest. Que vous le portiez fermé comme un top ou ouvert sur un débardeur, le Gilet Sìn est fait pour celles qui aiment l'élégance sans effort."
    ],
    remarque: "Les cauris sont des coquillages naturels : leur forme et leur teinte varient légèrement d'une pièce à l'autre.",
    details: ["Coupe droite sans manches, encolure en V","Fermeture par 4 boutons cauris naturels","Deux poches à rabat sur le devant","Lin rayé bleu ciel, doublure légère"],
    look: "Portez-le avec le Pantalon Sìn pour un tailleur complet, ou seul sur un jean brut. Le chapeau et la pochette visibles sur les photos ne sont pas inclus."
  },
  {
    id: "pantalon-sin", peint: true, nom: "Pantalon Sìn", fon: "Sìn", sens: "l'eau",
    categorie: "Femme", type: "Bas", prix: 20000, assorti: "gilet-sin",
    photos: ["img/pantalon-sin/1.jpg","img/pantalon-sin/2.jpg","img/pantalon-sin/3.jpg","img/pantalon-sin/4.jpg"],
    intro: "Compagnon naturel du Gilet Sìn, le Pantalon Sìn prolonge la même lumière bleue, celle de l'eau qui reflète le ciel. Taillé dans un lin rayé bleu ciel, il tombe droit et ample jusqu'à la cheville, avec cette nonchalance élégante qui fait toute la signature de la collection New Light.",
    corps: [
      "Toute son âme se révèle aux chevilles : de larges revers en lin clair sont peints à la main de motifs graphiques bleu indigo, chevrons, cercles et traits verticaux, comme une écriture ancienne tracée au bord de l'eau. À chaque pas, ces revers attirent le regard et donnent du mouvement à la silhouette.",
      "Sa taille haute affine la silhouette et ses poches latérales le rendent aussi pratique qu'élégant. Porté avec le gilet assorti pour un tailleur affirmé ou avec une simple chemise blanche pour une journée en ville, le Pantalon Sìn s'adapte à toutes vos envies."
    ],
    remarque: "Les revers sont peints à la main : chaque paire est unique et les motifs peuvent légèrement différer de ceux des photos.",
    details: ["Coupe large et droite, taille haute","Revers peints à la main en bleu indigo","Poches latérales, fermeture zippée","Lin rayé bleu ciel"],
    look: "Associez-le au Gilet Sìn et à des sandales à talon fin pour laisser voir les revers peints."
  },
  {
    id: "chemise-axosu", peint: true, nom: "Chemise Axɔ́sú", fon: "Axɔ́sú", sens: "le roi",
    categorie: "Homme", type: "Haut", prix: 30000, assorti: null,
    photos: ["img/chemise-axosu/1.jpg","img/chemise-axosu/2.jpg","img/chemise-axosu/3.jpg","img/chemise-axosu/4.jpg","img/chemise-axosu/5.jpg"],
    intro: "Axɔ́sú, c'est le roi en fon, en hommage aux souverains du royaume du Danxomè et aux tentures appliquées d'Abomey, célèbres pour leurs motifs colorés cousus sur fond sombre. La Chemise Axɔ́sú en reprend l'esprit : un lin noir profond, sobre et puissant, réveillé par une seule poche peinte à la main.",
    corps: [
      "Sur la poitrine, la poche se pare de motifs géométriques en zigzag peints en vert, bleu et jaune, encadrés d'un trait vert vif. C'est un détail unique qui suffit à faire de cette chemise une pièce de caractère.",
      "La patte de boutonnage et les ourlets des manches en lin bleu ciel créent un contraste net avec le noir et rappellent le Gilet Sìn, pour des looks assortis à deux. Le col rond sans revers et la coupe droite lui donnent une allure moderne, à porter boutonnée jusqu'en haut pour un style affirmé ou légèrement ouverte pour plus de décontraction."
    ],
    remarque: "La poche est peinte à la main : l'emplacement et les couleurs des motifs peuvent légèrement varier d'une chemise à l'autre.",
    details: ["Col rond sans revers, manches courtes","Boutonnage pression sur bande contrastée bleu ciel","Poche poitrine peinte à la main","Lin noir, ourlets de manches bleu ciel"],
    look: "Portez-la avec un short ou un pantalon en lin écru et des derbies noires, comme sur le lookbook. Le short visible sur les photos est un accessoire de stylisme : il n'est pas vendu par TONAFA."
  },
  {
    id: "jupe-nyonu", peint: true, nom: "Jupe Nyɔ̀nù", fon: "Nyɔ̀nù", sens: "la femme",
    categorie: "Femme", type: "Bas", prix: 28000, assorti: null,
    photos: ["img/jupe-nyonu/1.jpg","img/jupe-nyonu/2.jpg","img/jupe-nyonu/3.jpg"],
    intro: "Nyɔ̀nù signifie « la femme » en fon. Cette mini-jupe lui rend hommage, à l'image des masques Gèlèdè qui, au Bénin, célèbrent depuis des siècles la force et la sagesse des mères. Sur un lin noir profond, un visage africain est peint à la main sur le côté, comme un portrait posé sur une toile.",
    corps: [
      "Sa coupe courte et ajustée met la silhouette en valeur, tandis que la taille haute allonge les jambes. Le visage, tracé en lignes souples avec des touches de rouge, regarde vers l'avant : c'est la pièce qui ouvre la conversation.",
      "Facile à associer, la Jupe Nyɔ̀nù se porte aussi bien avec une chemise blanche structurée pour un look raffiné qu'avec un simple t-shirt pour une allure plus urbaine. Elle est faite pour celles qui s'habillent avec audace et veulent qu'on se souvienne d'elles."
    ],
    remarque: "La veste blanche portée sur les photos est un accessoire de stylisme : elle n'est pas vendue par TONAFA. Le visage est peint à la main, chaque jupe est unique.",
    details: ["Coupe mini, taille haute ajustée","Visage peint à la main sur le côté","Fermeture éclair invisible au dos","Lin noir"],
    look: "Associez-la à un haut blanc et à des escarpins noirs pour que le visage reste le centre de la silhouette."
  },
  {
    id: "chemise-atin", peint: true, nom: "Chemise Atín", fon: "Atín", sens: "l'arbre",
    categorie: "Homme", type: "Haut", prix: 30000, assorti: null,
    photos: ["img/chemise-atin/1.jpg","img/chemise-atin/2.jpg","img/chemise-atin/3.jpg","img/chemise-atin/4.jpg"],
    intro: "Atín, l'arbre en fon : celui qui donne l'ombre, sous lequel on se rassemble et on se raconte. La Chemise Atín en reprend la couleur, un vert canard profond, et la sérénité, dans un lin naturel léger qui respire sous la chaleur.",
    corps: [
      "Sur le devant, des cercles et des lignes fluides sont peints à la main en blanc et en vert. On croirait des cernes de bois, des racines ou des reflets d'eau : des motifs abstraits qui laissent chacun y voir sa propre histoire.",
      "Son col camp ouvert et sa coupe droite légèrement ample lui donnent une allure décontractée mais soignée, idéale pour une journée en ville comme pour un dîner en terrasse. Une chemise qui se porte rentrée avec style ou ouverte sur un t-shirt."
    ],
    remarque: "Les motifs sont peints à la main : leur tracé varie légèrement d'une chemise à l'autre.",
    details: ["Col camp ouvert, manches courtes","Coupe droite légèrement ample","Motifs abstraits peints à la main sur le devant","Lin vert canard"],
    look: "Portez-la avec un short en lin écru et des boots noires, ou sur un pantalon clair. Le short visible sur les photos est un accessoire de stylisme : il n'est pas vendu par TONAFA."
  },
  {
    id: "chemise-hwe", peint: true, nom: "Chemise Hwè", fon: "Hwè", sens: "le soleil",
    categorie: "Homme", type: "Haut", prix: 28000, assorti: "pantalon-hwe",
    photos: ["img/chemise-hwe/1.jpg","img/chemise-hwe/2.jpg","img/chemise-hwe/3.jpg","img/chemise-hwe/4.jpg"],
    intro: "Hwè, c'est le soleil en fon : la lumière dorée de la côte, celle des fins d'après-midi au bord de l'océan. La Chemise Hwè en capte toute la chaleur avec ses fines rayures terracotta et blanc, dans un lin léger pensé pour les journées ensoleillées.",
    corps: [
      "Sa coupe droite et légèrement longue tombe avec aisance, et son col classique lui donne une tenue impeccable. La patte de boutonnage et les bords des manches sont soulignés d'un lin camel uni, qui encadre les rayures avec douceur.",
      "Sur le bas de la chemise et sur la manche, des lignes ondulées peintes à la main en kaki et en brun dessinent un motif africain discret, comme le relief des dunes au coucher du soleil. Avec le Pantalon Hwè, elle compose un ensemble ton sur ton d'une grande élégance ; seule, elle s'accorde avec un pantalon blanc ou un jean."
    ],
    remarque: "Les motifs sont peints à la main : leur tracé varie légèrement d'une chemise à l'autre.",
    details: ["Coupe droite légèrement longue, col classique, manches courtes","Rayures verticales terracotta et blanc","Patte de boutonnage et bords de manches en lin camel","Motifs peints à la main sur le bas et la manche"],
    look: "Portez-la avec le Pantalon Hwè et des derbies noires pour l'ensemble complet, comme sur le lookbook."
  },
  {
    id: "pantalon-hwe", peint: false, nom: "Pantalon Hwè", fon: "Hwè", sens: "le soleil",
    categorie: "Homme", type: "Bas", prix: 28000, assorti: "chemise-hwe",
    photos: ["img/pantalon-hwe/1.jpg","img/pantalon-hwe/2.jpg"],
    intro: "Compagnon de la Chemise Hwè, le Pantalon Hwè prolonge sa chaleur dans un lin camel uni, de la couleur du sable sous le soleil de l'après-midi. Une base élégante et lumineuse pour le vestiaire masculin TONAFA.",
    corps: [
      "Sa coupe droite et légèrement fuselée s'arrête juste au-dessus de la cheville, pour une allure moderne qui laisse voir la chaussure. Sa taille à passants et ses poches latérales lui donnent une tenue soignée, à la fois habillée et confortable.",
      "Avec la chemise assortie, il compose un ensemble ton sur ton d'une grande sobriété. Avec une chemise blanche ou une chemise peinte de la collection, il devient la pièce passe-partout de la semaine comme du week-end."
    ],
    remarque: "",
    details: ["Coupe droite légèrement fuselée, longueur cheville","Taille à passants, poches latérales","Lin camel uni"],
    look: "Associez-le à la Chemise Hwè et à des derbies noires, ou à une chemise blanche pour une allure plus sobre."
  },
  {
    id: "robe-ayi", peint: true, nom: "Robe Ayǐ", fon: "Ayǐ", sens: "la terre",
    categorie: "Femme", type: "Robe", prix: 35000, assorti: null,
    photos: ["img/robe-ayi/1.jpg","img/robe-ayi/2.jpg","img/robe-ayi/3.jpg","img/robe-ayi/4.jpg","img/robe-ayi/5.jpg","img/robe-ayi/6.jpg"],
    intro: "Ayǐ, la terre en fon. La Robe Ayǐ la fait naître sur un lin blanc pur : au bas de la robe, un paysage peint à la main superpose des vagues brunes comme des collines, des éclats orange et jaune comme un coucher de soleil et des touches de vert, comme une terre vue de loin.",
    corps: [
      "Sa coupe trapèze courte s'évase doucement depuis les épaules et laisse la robe bouger à chaque pas. Le col rond et l'absence de manches lui donnent une ligne épurée, pour que toute l'attention se porte sur la peinture.",
      "Pureté en haut, couleur en bas : la Robe Ayǐ se porte comme une œuvre. Avec des sandales plates pour une journée lumineuse ou des talons pour une soirée, elle reste la pièce qu'on remarque en premier."
    ],
    remarque: "Le paysage est peint à la main : aucune robe n'est identique et les couleurs peuvent légèrement varier par rapport aux photos.",
    details: ["Coupe trapèze courte, sans manches","Col rond, fermeture au dos","Paysage peint à la main sur le bas","Lin blanc"],
    look: "Portez-la avec des sandales naturelles et des bijoux dorés."
  },
  {
    id: "corset-agojie", peint: true, nom: "Corset Agojie", fon: "Agojie", sens: "les guerrières du royaume du Danxomè",
    categorie: "Femme", type: "Haut", prix: 45000, assorti: "culotte-sun",
    photos: ["img/corset-agojie/1.jpg","img/corset-agojie/2.jpg","img/corset-agojie/3.jpg","img/corset-agojie/4.jpg","img/corset-agojie/5.jpg"],
    intro: "Agojie, c'était le nom des guerrières du royaume du Danxomè, célèbres pour leur courage. Le Corset Agojie leur rend hommage : une pièce structurée comme une armure, mais taillée dans un lin naturel brut et ornée d'une feuille d'oiseau de paradis peinte à la main en or et orange, comme une flamme posée sur le tissu.",
    corps: [
      "Pièce signature de la collection New Light, il sculpte le buste et marque la taille avec précision. Dans le dos, un laçage doré permet d'ajuster le corset parfaitement à votre morphologie, et il devient lui-même un détail de style.",
      "Les bretelles à volants en satin vert tropical adoucissent la structure et ajoutent une touche romantique. Avec la Culotte Sùn pour une journée lumineuse ou sur un pantalon noir pour une soirée, le Corset Agojie est fait pour celles qui avancent avec assurance et veulent briller."
    ],
    remarque: "La feuille d'oiseau de paradis est peinte à la main : chaque corset est unique. Le laçage permet d'ajuster d'environ une taille. La culotte portée sur les photos est la Culotte Sùn, vendue séparément.",
    details: ["Corset structuré","Laçage doré ajustable au dos","Bretelles à volants en satin vert","Lin naturel brut peint à la main"],
    look: "Portez-le avec la Culotte Sùn et des sandales à talon, comme sur le lookbook, ou sur un pantalon noir pour le soir."
  },
  {
    id: "culotte-sun", peint: true, nom: "Culotte Sùn", fon: "Sùn", sens: "la lune",
    categorie: "Femme", type: "Bas", prix: 20000, assorti: "corset-agojie",
    photos: ["img/culotte-sun/1.jpg","img/culotte-sun/2.jpg","img/culotte-sun/3.jpg","img/culotte-sun/4.jpg","img/culotte-sun/5.jpg","img/culotte-sun/6.jpg","img/culotte-sun/7.jpg","img/culotte-sun/8.jpg","img/culotte-sun/9.jpg"],
    intro: "Sùn signifie « la lune » en fon. Comme elle, la Culotte Sùn joue sur le contraste entre la clarté et l'ombre : un lin blanc épuré, bordé d'un large ourlet artistique où des roses et des spirales dorées sont peintes à la main sur fond brun, encadrées d'une frise de points.",
    corps: [
      "Sa coupe large au genou, sa taille haute à passants et ses plis sur le devant lui donnent une allure de pantalon de tailleur revisité, à la fois chic et confortable.",
      "C'est la pièce la plus polyvalente de la collection : avec un t-shirt noir et une ceinture camel pour une journée en ville, avec une chemise blanche pour le bureau, ou avec un top habillé pour le soir. Une pièce simple qui devient précieuse par le geste de l'artiste."
    ],
    remarque: "La chemise blanche et le t-shirt noir visibles sur les photos sont des accessoires de stylisme : ils ne sont pas vendus par TONAFA. Le Corset Agojie, porté sur certaines photos, est vendu séparément. L'ourlet est peint à la main, chaque culotte est unique.",
    details: ["Coupe large au genou, taille haute avec passants","Plis devant pour plus d'aisance","Ourlet peint à la main en or et brun","Lin blanc"],
    look: "Portez-la avec un t-shirt noir, une ceinture camel et des mules noires, ou avec le Corset Agojie pour une silhouette plus habillée."
  },
  {
    id: "chemise-weziza", peint: false, nom: "Chemise Wěziza", fon: "Wěziza", sens: "la lumière",
    categorie: "Femme", type: "Haut", prix: 22000, assorti: "short-ali",
    photos: ["img/chemise-weziza/1.jpg","img/chemise-weziza/2.jpg","img/chemise-weziza/3.jpg","img/chemise-weziza/4.jpg"],
    intro: "Wěziza signifie « la lumière » en fon, le mot qui résume le mieux l'esprit de la collection New Light. Cette chemise longue en lin rayé orange doux et blanc semble capter le soleil de l'après-midi : une pièce ample et enveloppante qui illumine la silhouette.",
    corps: [
      "Sa coupe oversize et sa longueur jusqu'aux hanches lui permettent de se porter ouverte, comme une surchemise légère, ou boutonnée et rentrée dans un bas taille haute. Les manches longues se retroussent pour une allure plus décontractée, et la poche poitrine apporte une touche classique.",
      "Les rayures horizontales sur le corps et verticales sur les détails créent un jeu graphique subtil. Avec le Short Ali, elle compose une tenue lumineuse pour les journées chaudes ; sur un jean ou une robe, elle devient la pièce qui apporte de la couleur à toutes vos tenues."
    ],
    remarque: "Le débardeur blanc et le panier visibles sur les photos ne sont pas inclus.",
    details: ["Coupe longue et oversize","Manches longues retroussables","Poche poitrine","Lin rayé orange doux et blanc"],
    look: "Portez-la ouverte sur le Short Ali et un débardeur crème, comme sur le lookbook."
  },
  {
    id: "short-ali", peint: true, nom: "Short Ali", fon: "Ali", sens: "le chemin",
    categorie: "Femme", type: "Bas", prix: 20000, assorti: "chemise-weziza",
    photos: ["img/short-ali/1.jpg","img/short-ali/2.jpg","img/short-ali/3.jpg","img/short-ali/4.jpg"],
    intro: "Ali, le chemin en fon. Ce short en lin blanc porte à ses ourlets des flèches géométriques peintes à la main, un motif qui indique le mouvement et la route à suivre. Une pièce légère pour celles qui avancent.",
    corps: [
      "Sa coupe droite à mi-cuisse et sa taille confortable en font un indispensable des journées chaudes. Le blanc du lin met en valeur le tracé noir des motifs, nets et graphiques.",
      "Avec un débardeur et un panier en paille pour le marché, ou avec une chemise longue et des sandales pour une sortie, le Short Ali accompagne tous vos chemins."
    ],
    remarque: "La Chemise Wěziza, portée sur les photos, est vendue séparément. Les motifs sont peints à la main.",
    details: ["Coupe droite mi-cuisse","Ourlets peints à la main","Taille confortable","Lin blanc"],
    look: "Associez-le à la Chemise Wěziza portée ouverte, à un débardeur crème et à un panier en paille, comme sur le lookbook."
  },
  {
    id: "chemise-xonton", peint: false, nom: "Chemise Xɔ́ntɔ́n", fon: "Xɔ́ntɔ́n", sens: "l'ami",
    categorie: "Femme", type: "Haut", prix: 15000, assorti: null,
    photos: ["img/chemise-xonton/1.jpg","img/chemise-xonton/2.jpg"],
    intro: "Xɔ́ntɔ́n signifie « l'ami » en fon : une pièce facile, fidèle, qu'on a envie de porter tout le temps. Cette chemise courte en lin aéré à carreaux gris, blanc et rouge apporte une touche graphique et joyeuse à la collection.",
    corps: [
      "Son col camp et sa coupe courte et droite lui donnent une allure décontractée. Elle se porte ouverte sur un débardeur ou boutonnée et nouée à la taille.",
      "Sur un jean, un short en lin ou une jupe unie, elle apporte une touche graphique à toutes vos tenues. Elle s'accorde particulièrement bien avec les bas aux tons chauds, marron, camel ou crème."
    ],
    remarque: "",
    details: ["Coupe courte et droite, col camp","Manches courtes","Lin à carreaux gris, blanc et rouge"],
    look: "Portez-la ouverte sur un débardeur blanc avec un bas marron ou camel, et des sandales à talon. La culotte visible sur les photos est vendue séparément."
  },
  {
    id: "culotte-xonton", peint: true, nom: "Culotte Xɔ́ntɔ́n", fon: "Xɔ́ntɔ́n", sens: "l'ami",
    categorie: "Femme", type: "Bas", prix: 20000, assorti: null,
    photos: ["img/culotte-xonton/1.jpg","img/culotte-xonton/2.jpg"],
    intro: "La Culotte Xɔ́ntɔ́n est taillée dans un lin marron chaud, couleur de terre, dont les ourlets éclatent de couleurs : losanges rouges, spirales dorées et points blancs, peints à la main en une frise joyeuse.",
    corps: [
      "Sa coupe large au genou et sa taille haute lui donnent une allure à la fois chic et confortable. Le marron profond fait ressortir chaque couleur des motifs.",
      "Avec un simple haut crème pour mettre les ourlets en valeur, ou avec une chemise à motifs pour un style plus audacieux, elle se porte du matin au soir."
    ],
    remarque: "Les ourlets sont peints à la main : chaque culotte est unique. La chemise visible sur les photos est vendue séparément.",
    details: ["Coupe large au genou, taille haute","Ourlets peints à la main","Poches latérales","Lin marron"],
    look: "Associez-la à un haut uni crème ou rouge et à des sandales à talon."
  },
  {
    id: "chemise-nukun", peint: true, nom: "Chemise Nùkún", fon: "Nùkún", sens: "le regard",
    categorie: "Femme", type: "Haut", prix: 15000, assorti: null,
    photos: ["img/chemise-nukun/1.jpg","img/chemise-nukun/2.jpg","img/chemise-nukun/3.jpg"],
    intro: "Nùkún, le regard en fon. Sur cette chemise oversize en lin rayé vert d'eau et blanc, un visage féminin est dessiné à la main d'un seul trait noir, les lèvres rehaussées de rouge : un regard calme et assuré, posé sur le monde.",
    corps: [
      "Sa coupe ample et ses manches longues à retrousser lui donnent une allure décontractée et moderne. Le dessin, placé sur le devant, est minimaliste mais impossible à ignorer.",
      "Rentrée dans un short ou portée ouverte sur un débardeur, la Chemise Nùkún apporte fraîcheur et caractère à toutes vos tenues, du marché du samedi aux sorties du soir."
    ],
    remarque: "Le visage est dessiné à la main : son tracé varie légèrement d'une chemise à l'autre.",
    details: ["Coupe oversize, col chemise","Manches longues retroussables","Visage dessiné à la main en un trait","Lin rayé vert d'eau et blanc"],
    look: "Portez-la avec un short ou un pantalon clair et des sandales camel. Le short visible sur les photos est vendu séparément."
  },
  {
    id: "short-weke", peint: true, nom: "Short Wɛ̀kɛ̀", fon: "Wɛ̀kɛ̀", sens: "le monde",
    categorie: "Femme", type: "Bas", prix: 20000, assorti: null,
    photos: ["img/short-weke/1.jpg","img/short-weke/2.jpg","img/short-weke/3.jpg"],
    intro: "Un short saumon en lin léger, doux comme une fin de journée. Ses ourlets sont ponctués de losanges géométriques peints à la main en vert et rouge, comme des repères posés sur une carte du monde.",
    corps: [
      "Sa taille élastiquée avec cordon et sa coupe ample à mi-cuisse en font une pièce confortable pour les journées chaudes, sans rien perdre de son élégance.",
      "Avec un débardeur blanc pour une allure simple ou une chemise rayée pour un look plus travaillé, le Short Wɛ̀kɛ̀ est le compagnon des beaux jours."
    ],
    remarque: "Les losanges sont peints à la main : chaque short est unique. La chemise visible sur les photos est vendue séparément.",
    details: ["Coupe ample mi-cuisse","Taille élastiquée avec cordon","Losanges peints à la main aux ourlets","Lin saumon"],
    look: "Associez-le à un débardeur blanc ou à une chemise légère et à des sandales camel."
  },
  {
    id: "robe-kpojito", peint: true, nom: "Robe Kpɔ̀jitó", fon: "Kpɔ̀jitó", sens: "la reine-mère",
    categorie: "Femme", type: "Robe", prix: 40000, assorti: null,
    photos: ["img/robe-kpojito/1.jpg","img/robe-kpojito/2.jpg","img/robe-kpojito/3.jpg","img/robe-kpojito/4.jpg"],
    intro: "Au royaume du Danxomè, la Kpɔ̀jitó était la reine-mère, l'une des femmes les plus puissantes de la cour. La Robe Kpɔ̀jitó lui rend hommage : une robe longue en lin marron chocolat qui épouse la silhouette avec une élégance souveraine.",
    corps: [
      "Elle se boutonne du décolleté jusqu'à la fente par une longue rangée de boutons noirs, et ses bretelles larges dessinent un décolleté en cœur très féminin. La fente sur le devant libère le mouvement et dévoile la jambe à chaque pas.",
      "Sur le bas, un oiseau de paradis peint à la main déploie ses pétales orange et or, face à un motif géométrique noir et doré de l'autre côté de la fente. C'est la pièce la plus élégante de la collection, pour une cérémonie, un dîner ou toute occasion où vous voulez être remarquée."
    ],
    remarque: "La peinture est réalisée à la main : chaque robe est unique et les couleurs peuvent légèrement varier par rapport aux photos.",
    details: ["Coupe longue ajustée, bretelles larges","Boutonnage noir sur toute la longueur","Fente sur le devant","Lin marron chocolat peint à la main"],
    look: "Portez-la avec des mules marron et des créoles dorées."
  }
];

// Textes communs à toutes les fiches
const COMMUN = {
  matiere: "Tissu en lin naturel : une fibre noble, légère et respirante, idéale sous la chaleur. Le lin s'assouplit au fil des lavages et gagne en douceur avec le temps.",
  peinture: "Les motifs sont peints à la main avec une peinture textile fixée dans la fibre : elle ne se décolore pas au lavage et garde l'éclat de ses couleurs dans le temps.",
  artisanat: "Chaque pièce TONAFA est confectionnée à la main au Bénin. En raison de ce travail artisanal, de légères variations de teinte, de motif et de placement peuvent exister d'une pièce à l'autre : elles font partie du caractère unique de votre vêtement.",
  entretienIntro: "Pour préserver la beauté de votre pièce TONAFA, nous vous recommandons :",
  entretien: [
    "Laver à la main à l'eau froide, sur l'envers, avec un savon doux.",
    "Ne pas frotter les parties peintes et éviter de laisser tremper longtemps.",
    "Ne pas utiliser d'eau de Javel ni de détergents agressifs.",
    "Sécher à plat et à l'ombre, sans sèche-linge.",
    "Repasser sur l'envers, sans passer le fer sur la peinture."
  ],
  entretienFin: "En suivant ces conseils, vous profiterez de votre pièce bien plus longtemps.",
  tailles: ["S", "M", "L", "XL"]
};