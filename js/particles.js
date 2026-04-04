/* ============================================
   Pro-Star KSA — Floating Particles
   ============================================ */

export function initParticles() {
  const container = document.querySelector('.hero');
  if (!container) return;

  const PARTICLE_COUNT = 20;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  const size = Math.random() * 4 + 2;
  const x = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 10;
  const opacity = Math.random() * 0.3 + 0.1;
  const isOrange = Math.random() < 0.4;

  Object.assign(particle.style, {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    background: isOrange
      ? `rgba(232, 98, 28, ${opacity})`
      : `rgba(200, 200, 255, ${opacity})`,
    borderRadius: '50%',
    left: `${x}%`,
    bottom: '-10px',
    pointerEvents: 'none',
    zIndex: '1',
    boxShadow: isOrange
      ? `0 0 ${size * 2}px rgba(232, 98, 28, ${opacity * 0.5})`
      : 'none',
    animation: `particleRise ${duration}s ${delay}s infinite linear`,
  });

  container.appendChild(particle);
}

// Inject keyframe if not exists
if (!document.getElementById('particle-keyframes')) {
  const style = document.createElement('style');
  style.id = 'particle-keyframes';
  style.textContent = `
    @keyframes particleRise {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 100}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
