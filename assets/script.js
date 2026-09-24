const portfolioItems = [
  {
    title: 'Butterfly 06',
    author: 'Maggie Zhang',
    year: '2020',
    medium: 'Publication',
    category: 'Research',
    image: 'A-dream-NO.03.JPG',
    description: 'Published research examining aesthetic experience, perception and the material language of oil painting.',
    location: 'China Teachers'
  },
  {
    title: 'Corner of Illusion',
    author: 'Maggie Zhang',
    year: '2020',
    medium: 'National project',
    category: 'Research',
    image: '《butterfly》03.jpg',
    description: 'Dreams blur the clear boundaries between reality and fantasy, merging the real and the unreal with disorienting colors that defy spatial logic. They restore the dreamlike and ambiguous visual experiences of confusion and ambiguity. The images no longer replicate real scenes but capture the soft and quiet moments in the subconscious, delving inward to explore the spiritual landscape where memories and illusions interweave.',
    location: 'National research project'
  },
  {
    title: 'Butterfly 09',
    author: 'Maggie Zhang',
    year: '2021',
    medium: 'Publication',
    category: 'Research',
    image: '《蝴蝶butterfly》02.JPG',
    description: 'Consciousness is like a butterfly, fluttering in the semi-awake interior. Fragmented color blocks blur the boundaries of reality, and the characters are lost in a trance, capturing the fleeting moments when thoughts flutter their wings and float freely.',
    location: 'Fenghui'
  },
  {
    title: 'Blue Dream',
    author: 'Maggie Zhang',
    year: '2021',
    medium: 'Graduate thesis',
    category: 'Research',
    image: '《A dream NO.01》.JPG',
    description: 'The blue-violet flow surges into an abyss of consciousness, and the form dissolves among the blended color blocks. The picture strips away the concrete narrative and uses flowing colors to depict the ceaselessly flowing spiritual currents deep within the dream.',
    location: 'CNKI'
  },
  {
    title: 'Soft Vortex',
    author: 'Maggie Zhang',
    year: '2021',
    medium: 'Oil painting',
    category: 'Exhibitions',
    image: '《A dream NO.02》.JPG',
    description: 'The fragrance is like smoke, and the container holds the fleeting illusions. The scene dissects the female symbols carried by the perfume with hazy language. The transparent container holds the illusory scent, and the softened form dissolves the materialized gaze.',
    location: 'Art Panorama'
  },
  {
    title: 'Ephemeral Fume',
    author: 'Maggie Zhang',
    year: '2019',
    medium: 'Group exhibition',
    category: 'Exhibitions',
    image: '《如烟》.jpg',
    description: 'The scene strips away the stereotypical imagination of female temperament in society, exploring the boundaries between self-perception, the body, and illusion in the realm of reality and fantasy.',
    location: 'Weinan, Shaanxi'
  },
  {
    title: 'A Dream 14',
    author: 'Maggie Zhang',
    year: '2019',
    medium: 'Oil painting',
    category: 'Exhibitions',
    image: '《蝴蝶09》.JPG',
    description: 'Dreams often transform familiar everyday spaces into fantastic liminal realms. The staircase, a transitional space, is softened and distorted in the painting, with strange beings emerging within the dim corridor. Following the visual language of dream painting, it uses hazy colour layers to recreate the sense of subconscious adventure, like falling into Alice’s wonderland, releasing romantic, surreal inner emotions between reality and illusion.',
    location: '798 Art Centre, Beijing'
  },
  {
    title: 'Butterfly 07',
    author: 'Maggie Zhang',
    year: '2018',
    medium: 'Workshop direction',
    category: 'Education',
    image: '《蝴蝶》04.JPG',
    description: 'Dreams reconstruct natural scenery. The woods shed realistic outlines and merge into a hazy fantasy amid twilight. Loose, expressive brushwork blurs object boundaries, with forest light and shadow interweaving. Using the visual language of dream painting, the work captures the bewitching atmosphere of woods in half-slumber, reflecting subtle, tranquil natural emotions within the subconscious.',
    location: "Xi'an Academy of Fine Arts"
  },
  {
    title: 'Outdoor Sketching',
    author: 'Maggie Zhang',
    year: '2018',
    medium: 'Oil painting',
    category: 'Exhibitions',
    image: '《隐世02》.jpeg',
    description: 'Drawing inspiration from the performance of Kunqu opera musicians, the details of the characters are weakened through a hazy style. Breaking away from the realistic format of traditional opera, the gentle auditory charm of the strings and flutes is transformed into flowing colors and forms in the picture.',
    location: 'Shaanxi'
  },
  {
    title: 'Soft Chant',
    author: 'Maggie Zhang',
    year: '2018',
    medium: 'Group exhibition',
    category: 'Exhibitions',
    image: 'A-dream-NO.07.jpg',
    description: 'Presented oil paintings in a young artists exhibition focused on reflexivity, process and contemporary image-making.',
    location: '798 Art District, Beijing'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initGlobe();
  initButterflyFollower();

  // 平滑滚动 for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });

  // Reveal on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const portfolioGrid = document.getElementById('portfolio-grid');
  const portfolioFilters = document.getElementById('portfolio-filters');
  const portfolioCount = document.getElementById('portfolio-count');
  const portfolioEmpty = document.getElementById('portfolio-empty');
  const portfolioDialog = document.getElementById('portfolio-dialog');
  const portfolioDetail = document.getElementById('portfolio-detail');
  if (!portfolioGrid || !portfolioFilters || !portfolioCount || !portfolioEmpty || !portfolioDialog || !portfolioDetail) return;
  let activeCategory = 'All';

  const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];
  portfolioFilters.innerHTML = categories.map(category => `<button class="filter-btn${category === activeCategory ? ' is-active' : ''}" type="button" data-category="${category}">${category}</button>`).join('');

  const renderPortfolio = () => {
    const visibleItems = activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter(item => item.category === activeCategory);

    portfolioGrid.innerHTML = visibleItems.map((item, index) => `
      <article class="portfolio-card" data-index="${portfolioItems.indexOf(item)}" tabindex="0">
        <div class="portfolio-image-wrap">
          <img class="portfolio-image" src="${item.image}" alt="${item.title}, ${item.medium}" loading="lazy">
          <span class="portfolio-category">${item.category}</span>
        </div>
        <div class="portfolio-card-body">
          <div class="portfolio-card-top"><span>${item.year}</span><span>${item.medium}</span></div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <button class="text-link" type="button" data-detail="${portfolioItems.indexOf(item)}">View details <span aria-hidden="true">↗</span></button>
        </div>
      </article>
    `).join('');
    portfolioCount.textContent = `${visibleItems.length} works`;
    portfolioEmpty.hidden = visibleItems.length > 0;
    bindPortfolioInteractions();
    bindPortfolioTilt();
  };

  const openPortfolioDetail = (index) => {
    const item = portfolioItems[index];
    portfolioDetail.innerHTML = `
      <img class="dialog-image" src="${item.image}" alt="${item.title}, ${item.medium}">
      <div class="dialog-copy">
        <p class="eyebrow">${item.category} · ${item.year}</p>
        <h2>${item.title}</h2>
        <p class="dialog-description">${item.description}</p>
        <dl class="detail-meta"><div><dt>Author</dt><dd>${item.author}</dd></div><div><dt>Format</dt><dd>${item.medium}</dd></div><div><dt>Location / Project</dt><dd>${item.location}</dd></div></dl>
      </div>
    `;
    portfolioDialog.showModal();
  };

  const bindPortfolioInteractions = () => {
    document.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => openPortfolioDetail(Number(button.dataset.detail))));
    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openPortfolioDetail(Number(card.dataset.index));
        }
      });
    });
  };

  const bindPortfolioTilt = () => {
    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const px = (x / r.width - 0.5) * 5;
        const py = (y / r.height - 0.5) * -4;
        card.style.transform = `translateY(-6px) rotateX(${py}deg) rotateY(${px}deg)`;
        card.style.transition = 'transform .08s linear';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .3s cubic-bezier(.2,.9,.2,1)';
      });
    });
  };

  portfolioFilters.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    activeCategory = button.dataset.category;
    document.querySelectorAll('.filter-btn').forEach(filter => filter.classList.toggle('is-active', filter === button));
    renderPortfolio();
  });
  document.querySelector('.dialog-close').addEventListener('click', () => portfolioDialog.close());
  portfolioDialog.addEventListener('click', event => { if (event.target === portfolioDialog) portfolioDialog.close(); });
  renderPortfolio();

  // Subtle parallax for hero background based on scroll
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const sc = window.scrollY;
      hero.style.backgroundPosition = `center ${-sc * 0.05}px`;
    });
  }
});

function initButterflyFollower() {
  const butterfly = document.getElementById('butterfly-cursor');
  if (!butterfly) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  const ease = 0.08;

  document.addEventListener('mousemove', event => {
    targetX = event.clientX - 70;
    targetY = event.clientY - 70;
  });

  const animate = () => {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    butterfly.style.left = `${currentX}px`;
    butterfly.style.top = `${currentY}px`;
    requestAnimationFrame(animate);
  };

  animate();
}

function initGlobe() {
  const canvas = document.getElementById('globe-canvas');
  const globe = document.getElementById('globe');
  if (!canvas || !globe || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.z = 3.25;
  const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const sphere = new THREE.Group();
  scene.add(sphere);
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(1.02, 48, 32),
    new THREE.MeshBasicMaterial({color: 0x4fabe3, transparent: true, opacity: .075, wireframe: true})
  );
  sphere.add(shell);

  const pointGeometry = new THREE.BufferGeometry();
  const pointPositions = [];
  const pointColors = [];
  const markerColor = new THREE.Color(0x2b6792);
  for (let index = 0; index < 190; index += 1) {
    const y = 1 - (index / 189) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = Math.PI * (3 - Math.sqrt(5)) * index;
    pointPositions.push(Math.cos(theta) * radius * 1.02, y * 1.02, Math.sin(theta) * radius * 1.02);
    pointColors.push(markerColor.r, markerColor.g, markerColor.b);
  }
  pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointPositions, 3));
  pointGeometry.setAttribute('color', new THREE.Float32BufferAttribute(pointColors, 3));
  sphere.add(new THREE.Points(pointGeometry, new THREE.PointsMaterial({size: .034, vertexColors: true, transparent: true, opacity: .9, sizeAttenuation: true})));

  const markerGeometry = new THREE.SphereGeometry(.058, 12, 8);
  const markerMaterial = new THREE.MeshBasicMaterial({color: 0xc96b50});
  [[.58, .48, .66], [-.72, .24, .42], [.12, -.68, .7], [-.32, .75, -.34], [.8, -.18, -.36]].forEach(([x, y, z]) => {
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.set(x, y, z).normalize().multiplyScalar(1.05);
    sphere.add(marker);
  });

  const resize = () => {
    const size = Math.max(1, globe.clientWidth);
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  let dragging = false;
  let previousX = 0;
  let previousY = 0;
  globe.addEventListener('pointerdown', event => {
    dragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
    globe.classList.add('is-dragging');
    globe.setPointerCapture(event.pointerId);
  });
  globe.addEventListener('pointermove', event => {
    if (!dragging) return;
    sphere.rotation.y += (event.clientX - previousX) * .008;
    sphere.rotation.x += (event.clientY - previousY) * .008;
    sphere.rotation.x = Math.max(-1.2, Math.min(1.2, sphere.rotation.x));
    previousX = event.clientX;
    previousY = event.clientY;
  });
  const stopDragging = event => {
    dragging = false;
    globe.classList.remove('is-dragging');
    if (event.pointerId !== undefined && globe.hasPointerCapture(event.pointerId)) globe.releasePointerCapture(event.pointerId);
  };
  globe.addEventListener('pointerup', stopDragging);
  globe.addEventListener('pointercancel', stopDragging);

  const animate = () => {
    if (!dragging) sphere.rotation.y += .0018;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
}
