document.addEventListener('DOMContentLoaded', () => {

  // ── Loader ──
  const loader = document.getElementById('loader');

  function hideLoader() {
    loader.classList.add('hidden');
    // After loader fades out, init scroll reveal
    setTimeout(initReveal, 700);
  }

  // Hide after progress bar finishes (0.7s delay + 1.6s anim + 0.3s buffer)
  setTimeout(hideLoader, 2600);
  window.addEventListener('load', () => setTimeout(hideLoader, 500));

  // ── Custom Cursor ──
  const cursor = document.createElement('div');
  const cursorRing = document.createElement('div');
  cursor.className = 'cursor';
  cursorRing.className = 'cursor-ring';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // ── Nav scroll shadow ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ── Mobile Menu ──
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.close-btn');
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // ── Scroll Reveal (runs AFTER loader hides) ──
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('js-reveal');
      const siblings = [...el.parentElement.querySelectorAll(':scope > .reveal')];
      const idx = siblings.indexOf(el);
      if (idx > 0) el.style.transitionDelay = `${idx * 0.08}s`;
      observer.observe(el);
      // Immediately trigger visible for elements already in viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }

  // ── Active nav link ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : '';
    });
  });

  // ── Copyright year ──
  document.getElementById('copyright-year').textContent = new Date().getFullYear();

});