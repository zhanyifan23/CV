const portfolioItems = [
  {
    title: '梦境样本 No.01',
    author: '张一帆',
    year: '2017',
    medium: '油画',
    category: '绘画',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85',
    description: '以梦境与潜意识为线索的绘画实验，尝试将记忆中不稳定的空间转译为可感知的色彩结构。',
    location: '个人工作室 · 西安'
  },
  {
    title: 'A DREAM',
    author: '张一帆',
    year: '2023',
    medium: '公共艺术',
    category: '空间',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=85',
    description: '关中村落公共艺术空间营建项目，以日常材料回应村庄的风向、记忆与社区关系。',
    location: '关中忙罢艺术节'
  },
  {
    title: '观看的练习',
    author: '张一帆',
    year: '2022',
    medium: '策展项目',
    category: '策展',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&w=1200&q=85',
    description: '围绕观看、身体和展览空间展开的青年艺术家群展，包含装置、影像与现场行动。',
    location: '西安 · 当代艺术机构'
  },
  {
    title: '潜意识的边界',
    author: '张一帆',
    year: '2021',
    medium: '研究文章',
    category: '研究',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85',
    description: '从女性主义艺术个案出发，讨论绘画中的主体经验、凝视与个人叙事。',
    location: '学术发表 · 2021'
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
