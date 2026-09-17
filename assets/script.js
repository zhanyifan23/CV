const portfolioItems = [
  {
    title: 'A DREAM NO.03',
    author: '张一帆',
    year: '2017',
    medium: '油画',
    category: '绘画',
    image: 'A-dream-NO.03.JPG',
    description: '以梦境与潜意识为线索的绘画实验，尝试将记忆中不稳定的空间转译为可感知的色彩结构。',
    location: '个人工作室 · 西安'
  },
  {
    title: 'A DREAM',
    author: '张一帆',
    year: '2023',
    medium: '油画',
    category: '绘画',
    image: '《butterfly》03.jpg',
    description: '以身体经验和空间记忆为起点，描绘现实与梦境交叠时的片段化感知。',
    location: '个人工作室 · 西安'
  },
  {
    title: 'BUTTERFLY',
    author: '张一帆',
    year: '2022',
    medium: '油画',
    category: '绘画',
    image: '《蝴蝶butterfly》02.JPG',
    description: '以蝴蝶作为关于变化与观看的隐喻，探索轻盈形体背后的心理张力。',
    location: '西安 · 当代艺术机构'
  },
  {
    title: '潜意识的边界',
    author: '张一帆',
    year: '2021',
    medium: '油画',
    category: '绘画',
    image: '《A dream NO.01》.JPG',
    description: '从女性主义艺术个案出发，讨论绘画中的主体经验、凝视与个人叙事。',
    location: '个人工作室 · 西安'
  },
  {
    title: '梦境切片 I',
    author: '张一帆',
    year: '2020',
    medium: '油画',
    category: '绘画',
    image: 'A-dream-NO.07.jpg',
    description: '将梦中反复出现的空间切分为色块与线索，保留记忆尚未稳定的瞬间。',
    location: '个人工作室 · 西安'
  },
  {
    title: '观看之后',
    author: '张一帆',
    year: '2019',
    medium: '油画',
    category: '绘画',
    image: 'A-dream-NO.03.JPG',
    description: '关于凝视发生之后的残影研究，尝试让画面停留在可辨认与不可辨认之间。',
    location: '个人工作室 · 西安'
  },
  {
    title: '隐秘花园',
    author: '张一帆',
    year: '2018',
    medium: '油画',
    category: '绘画',
    image: '《蝴蝶butterfly》02.JPG',
    description: '以植物、身体和封闭场域构成隐秘叙事，回应个人经验中的生长与回返。',
    location: '西安 · 工作室计划'
  },
  {
    title: '未命名的醒来',
    author: '张一帆',
    year: '2018',
    medium: '油画',
    category: '绘画',
    image: '《A dream NO.01》.JPG',
    description: '记录从梦境醒来时仍未消散的视觉碎片，研究清醒状态中的潜意识回声。',
    location: '个人工作室 · 西安'
  },
  {
    title: '漂浮的房间',
    author: '张一帆',
    year: '2017',
    medium: '油画',
    category: '绘画',
    image: 'A-dream-NO.07.jpg',
    description: '以漂浮的室内结构承载关于居所、身份与不确定性的个人叙事。',
    location: '个人工作室 · 西安'
  },
  {
    title: '梦的回声',
    author: '张一帆',
    year: '2016',
    medium: '油画',
    category: '绘画',
    image: '《butterfly》03.jpg',
    description: '早期梦境主题绘画练习，以层叠色彩和模糊边界寻找内在经验的回声。',
    location: '西安 · 早期创作'
  }
];

document.addEventListener('DOMContentLoaded', () => {
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
  let activeCategory = '全部';

  const categories = ['全部', ...new Set(portfolioItems.map(item => item.category))];
  portfolioFilters.innerHTML = categories.map(category => `<button class="filter-btn${category === activeCategory ? ' is-active' : ''}" type="button" data-category="${category}">${category}</button>`).join('');

  const renderPortfolio = () => {
    const visibleItems = activeCategory === '全部'
      ? portfolioItems
      : portfolioItems.filter(item => item.category === activeCategory);

    portfolioGrid.innerHTML = visibleItems.map((item, index) => `
      <article class="portfolio-card" data-index="${portfolioItems.indexOf(item)}" tabindex="0">
        <div class="portfolio-image-wrap">
          <img class="portfolio-image" src="${item.image}" alt="${item.title}，${item.medium}作品图" loading="lazy">
          <span class="portfolio-category">${item.category}</span>
        </div>
        <div class="portfolio-card-body">
          <div class="portfolio-card-top"><span>${item.year}</span><span>${item.medium}</span></div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <button class="text-link" type="button" data-detail="${portfolioItems.indexOf(item)}">查看详情 <span aria-hidden="true">↗</span></button>
        </div>
      </article>
    `).join('');
    portfolioCount.textContent = `${visibleItems.length} 件作品`;
    portfolioEmpty.hidden = visibleItems.length > 0;
    bindPortfolioInteractions();
    bindPortfolioTilt();
  };

  const openPortfolioDetail = (index) => {
    const item = portfolioItems[index];
    portfolioDetail.innerHTML = `
      <img class="dialog-image" src="${item.image}" alt="${item.title}，${item.medium}作品图">
      <div class="dialog-copy">
        <p class="eyebrow">${item.category} · ${item.year}</p>
        <h2>${item.title}</h2>
        <p class="dialog-description">${item.description}</p>
        <dl class="detail-meta"><div><dt>作者</dt><dd>${item.author}</dd></div><div><dt>媒介</dt><dd>${item.medium}</dd></div><div><dt>地点 / 项目</dt><dd>${item.location}</dd></div></dl>
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
