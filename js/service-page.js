/* ============================================
   Pro-Star KSA — Service Page Controller
   Mouse effect, 3D scroll animations, parallax
   ============================================ */

export function initServicePage() {
  initMouseGlow();
  init3DScrollAnimations();
  initParallaxHero();
  initServiceParticles();
  initSmoothScroll();
  initBackToTop();
  initServiceNavbar();
}

/* ── Mouse Glow Follow ── */
function initMouseGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Create outer ring cursor
  const cursor = document.createElement('div');
  cursor.classList.add('mouse-cursor');

  // Create inner dot
  const cursorDot = document.createElement('div');
  cursorDot.classList.add('mouse-cursor-dot');

  // Create ambient glow
  const glow = document.createElement('div');
  glow.classList.add('mouse-glow');

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);
  document.body.appendChild(glow);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows exactly
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function render() {
    // Smooth follow for outer ring
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

    // Even smoother follow for glow
    glowX += (mouseX - glowX) * 0.06;
    glowY += (mouseY - glowY) * 0.06;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // Hover effect on interactive elements
  const interactives = document.querySelectorAll(
    'a, button, input, select, textarea, .sp-feature-card, .sp-stat, .sp-step__content, .sp-overview__icon-item'
  );

  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('mouse-cursor--hover');
      cursorDot.classList.add('mouse-cursor-dot--hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('mouse-cursor--hover');
      cursorDot.classList.remove('mouse-cursor-dot--hover');
    });
  });
}

/* ── 3D Scroll Animations ── */
function init3DScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-3d');
  if (!elements.length) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));

  // Also handle reveal classes
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // Counter animations
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
}

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ── Parallax Hero Image ── */
function initParallaxHero() {
  const heroImage = document.querySelector('.service-hero__image img');
  if (!heroImage) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        heroImage.style.transform = `translateY(${rate}px) scale(1.05)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ── Floating Particles ── */
function initServiceParticles() {
  const sections = document.querySelectorAll('.sp-section');
  sections.forEach(section => {
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        border-radius: 50%;
        background: ${Math.random() > 0.5 ? 'var(--color-primary)' : 'var(--color-accent)'};
        opacity: ${Math.random() * 0.3 + 0.1};
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        animation: float ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 2}s;
      `;
      section.appendChild(particle);
    }
  });
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ── Back to Top ── */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Navbar scroll handling ── */
function initServiceNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const hamburger = document.querySelector('.navbar__hamburger');
  const nav = document.querySelector('.navbar__nav');
  const overlay = document.querySelector('.navbar__mobile-overlay');
  const links = document.querySelectorAll('.navbar__link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  function toggleMenu() {
    const isOpen = nav.classList.contains('active');
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? '' : 'hidden';
    hamburger.setAttribute('aria-expanded', !isOpen);
  }

  function closeMenu() {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close menu on nav link click (but not the dropdown trigger)
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.closest('.navbar__dropdown') && window.innerWidth <= 991) {
        // Don't close menu when toggling dropdown
        return;
      }
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ── Mobile Dropdown Toggle ──
  const dropdowns = document.querySelectorAll('.navbar__dropdown');
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.navbar__link');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });
}
