/* ============================================
   Pro-Star KSA — Main Entry
   ============================================ */

// CSS imports (Vite-native)
import '../css/variables.css';
import '../css/reset.css';
import '../css/base.css';
import '../css/layout.css';
import '../css/components/animations.css';
import '../css/components/navbar.css';
import '../css/components/hero.css';
import '../css/components/services.css';
import '../css/components/about.css';
import '../css/components/portfolio.css';
import '../css/components/contact.css';
import '../css/components/footer.css';

// JS modules
import { initStarfield } from './starfield.js';
import { initNavbar } from './navbar.js';
import { initAnimations } from './animations.js';
import { initContact } from './contact.js';
import { initParticles } from './particles.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initStarfield();
  initNavbar();
  initAnimations();
  initContact();
  initParticles();
  initBackToTop();
  initSmoothScroll();
});

// ── Back to Top ──
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

// ── Smooth Scroll for anchor links ──
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
