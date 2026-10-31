// ============================================
//   TONAFA : lin3d.js
//   Un morceau de lin peint qui flotte en 3D (Three.js)
// ============================================

(function () {

  const zone = document.getElementById('lin-3d');
  if (!zone) return;

  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 768px)').matches;
  let visible = false;
  let demarre = false;

  // 1. La texture du lin, dessinée à la main dans un canvas 2D
  function dessinerLin() {
    const c = document.createElement('canvas');
    c.width = c.height = 1024;
    const g = c.getContext('2d');

    // Fond lin naturel
    g.fillStyle = '#E8D2AC';
    g.fillRect(0, 0, 1024, 1024);

    // Les fils : trame (horizontale) et chaîne (verticale)
    for (let i = 0; i < 1024; i += 3) {
      g.fillStyle = `rgba(110, 70, 30, ${Math.random() * 0.12})`;
      g.fillRect(0, i, 1024, 1);
      g.fillStyle = `rgba(255, 246, 228, ${Math.random() * 0.2})`;
      g.fillRect(i, 0, 1, 1024);
    }

    // Les petites irrégularités typiques du lin
    for (let k = 0; k < 260; k++) {
      g.fillStyle = `rgba(100, 60, 25, ${0.05 + Math.random() * 0.08})`;
      g.fillRect(Math.random() * 1024, Math.random() * 1024,
                 30 + Math.random() * 140, 1 + Math.random() * 1.5);
    }

    // La bande peinte : losanges cognac, points dorés, deux filets
    const y = 770, h = 64;
    g.fillStyle = '#7F3301';
    g.fillRect(0, y - h / 2 - 26, 1024, 5);
    g.fillRect(0, y + h / 2 + 21, 1024, 5);

    g.strokeStyle = '#7F3301';
    g.lineWidth = 6;
    g.lineJoin = 'round';
    g.beginPath();
    for (let x = 0; x < 1024; x += h) {
      g.moveTo(x, y);
      g.lineTo(x + h / 2, y - h / 2);
      g.lineTo(x + h, y);
      g.lineTo(x + h / 2, y + h / 2);
      g.closePath();
    }
    g.stroke();

    g.fillStyle = '#D4A017';
    for (let x = 0; x < 1024; x += h) {
      g.beginPath();
      g.arc(x + h / 2, y, 7, 0, Math.PI * 2);
      g.fill();
    }

    return c;
  }

  // 2. Si la 3D n'est pas possible, on montre juste la texture à plat
  function secours(toile) {
    toile.classList.add('lin-secours');
    zone.appendChild(toile);
  }

  // 3. Charger Three.js seulement quand on approche de la section
  const guetteur = new IntersectionObserver(([entree]) => {
    visible = entree.isIntersecting;
    if (visible && !demarre) {
      demarre = true;
      lancer();
    }
  }, { rootMargin: '300px' });
  guetteur.observe(zone);

  async function lancer() {
    const toile = dessinerLin();

    let THREE, rendu;
    try {
      THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
      rendu = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      return secours(toile);
    }

    rendu.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    zone.appendChild(rendu.domElement);

    // La scène et la caméra
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);

    // Le tissu : un plan découpé en petits carrés qu'on va faire onduler
    const L = 3, H = 4;
    const geo = new THREE.PlaneGeometry(L, H, mobile ? 36 : 64, mobile ? 48 : 85);
    const texture = new THREE.CanvasTexture(toile);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = rendu.capabilities.getMaxAnisotropy();

    const tissu = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.95,
      side: THREE.DoubleSide
    }));
    tissu.rotation.y = -0.35;
    scene.add(tissu);

    // La tringle dorée qui tient le tissu en haut
    const tringle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, L + 0.3, 24),
      new THREE.MeshStandardMaterial({ color: 0xD4A017, metalness: 0.6, roughness: 0.35 })
    );
    tringle.rotation.z = Math.PI / 2;
    tringle.position.y = H / 2 + 0.02;
    tissu.add(tringle);

    // La lumière : chaude et rasante pour faire ressortir les plis
    scene.add(new THREE.AmbientLight(0xfff1dc, 0.55));
    const soleil = new THREE.DirectionalLight(0xffe2b8, 3);
    soleil.position.set(-4, 1.5, 2.5);
    scene.add(soleil);
    const reflet = new THREE.DirectionalLight(0xD4A017, 0.8);
    reflet.position.set(3, -1, -2);
    scene.add(reflet);

    // 4. Le vent : chaque point du tissu bouge selon des vagues
    const pos = geo.attributes.position;
    const depart = pos.array.slice();
    const souris = new THREE.Vector3(99, 99, 0);
    let force = 0, forceCible = 0;

    function onduler(t) {
      for (let i = 0; i < pos.count; i++) {
        const x = depart[i * 3], y = depart[i * 3 + 1];
        const libre = Math.pow((H / 2 - y) / H, 1.2);   // 0 en haut (accroché), 1 en bas

        let z = libre * (
          0.32 * Math.sin(x * 1.6 + t * 1.3) +
          0.16 * Math.sin(y * 2.3 - t * 1.7 + x * 0.8) +
          0.05 * Math.sin(x * 5 + y * 3 + t * 2.4)
        );

        // Le tissu se gonfle sous la souris
        const dx = x - souris.x, dy = y - souris.y;
        z += force * 0.5 * Math.exp(-(dx * dx + dy * dy) / 0.6);

        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();   // recalcule l'ombre des plis
    }

    // 5. Suivre la souris (ou le doigt) sur le tissu
    const rayon = new THREE.Raycaster();
    const pointeur = new THREE.Vector2();
    const planTissu = new THREE.Plane();

    zone.addEventListener('pointermove', (e) => {
      const r = zone.getBoundingClientRect();
      pointeur.set(((e.clientX - r.left) / r.width) * 2 - 1,
                  -((e.clientY - r.top) / r.height) * 2 + 1);
      rayon.setFromCamera(pointeur, camera);
      planTissu.setFromNormalAndCoplanarPoint(
        new THREE.Vector3(0, 0, 1).applyQuaternion(tissu.quaternion), tissu.position);
      if (rayon.ray.intersectPlane(planTissu, souris)) {
        tissu.worldToLocal(souris);
        forceCible = 1;
      }
    });
    zone.addEventListener('pointerleave', () => { forceCible = 0; });

    // 6. Adapter la taille au cadre (ordinateur ou téléphone)
    function cadrer() {
      const w = zone.clientWidth, h = zone.clientHeight;
      rendu.setSize(w, h, false);
      camera.aspect = w / h;
      const demiAngle = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const distance = Math.max((H * 0.6) / demiAngle, (L * 0.65) / (demiAngle * camera.aspect));
      camera.position.set(0, 0, distance);
      camera.updateProjectionMatrix();
      if (reduit) rendu.render(scene, camera);
    }
    new ResizeObserver(cadrer).observe(zone);
    cadrer();

    // 7. Animer, seulement quand la section est à l'écran
    const debut = performance.now();
    function boucle() {
      if (visible) {
        const t = (performance.now() - debut) / 1000;
        force += (forceCible - force) * 0.06;
        onduler(t);
        tissu.rotation.y = -0.35 + Math.sin(t * 0.3) * 0.06;
        rendu.render(scene, camera);
      }
      requestAnimationFrame(boucle);
    }

    if (reduit) {
      onduler(1.5);                 // une seule image, tissu immobile
      rendu.render(scene, camera);
    } else {
      boucle();
    }

    rendu.domElement.classList.add('pret');
  }

})();