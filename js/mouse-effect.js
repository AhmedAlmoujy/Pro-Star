/* ============================================
   Pro-Star KSA — Mouse Follower Cursor Effect
   ============================================ */

export function initMouseEffect() {
  // Only initialize on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.classList.add('mouse-cursor');
  
  const cursorDot = document.createElement('div');
  cursorDot.classList.add('mouse-cursor-dot');

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows exactly
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // Smooth follow for the outer ring
  function render() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);

  // Add hover effect on interactive elements
  const interactives = document.querySelectorAll('a, button, input, select, textarea, .service-card, .portfolio__item');
  
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
