// script.js - 轻量交互：滚动触发、hover 反馈、平滑滚动、旁通动画
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

  // Tilt effect on hover for projects
  document.querySelectorAll('.card.project').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = (x / r.width - 0.5) * 10; // -5deg ~ 5deg
      const py = (y / r.height - 0.5) * -6;
      card.style.transform = `translateY(-6px) rotateX(${py}deg) rotateY(${px}deg)`;
      card.style.transition = 'transform .08s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .3s cubic-bezier(.2,.9,.2,1)';
    });
  });

  // Subtle parallax for hero background based on scroll
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const sc = window.scrollY;
      hero.style.backgroundPosition = `center ${-sc * 0.05}px`;
    });
  }
});
