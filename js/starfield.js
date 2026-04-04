/* ============================================
   Pro-Star KSA — Starfield Canvas
   ============================================ */

export function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  let shootingStars = [];
  let mouseX = 0;
  let mouseY = 0;
  let animationId;

  const STAR_COUNT = 200;
  const SHOOTING_STAR_INTERVAL = 4000;

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.8 + 0.2;
      this.speed = Math.random() * 0.5 + 0.1;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinkleOffset = Math.random() * Math.PI * 2;
      this.parallaxFactor = Math.random() * 0.5 + 0.1;
      // Some stars are orange-tinted
      this.isOrange = Math.random() < 0.1;
    }

    update(time) {
      this.opacity = 0.3 + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.4;
      // Parallax based on mouse
      this.drawX = this.x + (mouseX - width / 2) * this.parallaxFactor * 0.02;
      this.drawY = this.y + (mouseY - height / 2) * this.parallaxFactor * 0.02;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.drawX, this.drawY, this.size, 0, Math.PI * 2);
      if (this.isOrange) {
        ctx.fillStyle = `rgba(232, 98, 28, ${this.opacity})`;
      } else {
        ctx.fillStyle = `rgba(232, 232, 255, ${this.opacity})`;
      }
      ctx.fill();

      // Glow effect for larger stars
      if (this.size > 1.5) {
        ctx.beginPath();
        ctx.arc(this.drawX, this.drawY, this.size * 3, 0, Math.PI * 2);
        const glowColor = this.isOrange
          ? `rgba(232, 98, 28, ${this.opacity * 0.1})`
          : `rgba(200, 200, 255, ${this.opacity * 0.08})`;
        ctx.fillStyle = glowColor;
        ctx.fill();
      }
    }
  }

  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width * 1.5;
      this.y = -10;
      this.length = Math.random() * 80 + 40;
      this.speed = Math.random() * 8 + 6;
      this.angle = Math.PI / 4 + Math.random() * 0.3;
      this.opacity = 1;
      this.active = true;
    }

    update() {
      this.x -= Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.opacity -= 0.015;

      if (this.opacity <= 0 || this.y > height + 50) {
        this.active = false;
      }
    }

    draw() {
      const tailX = this.x + Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;

      const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(232, 98, 28, ${this.opacity})`);
      gradient.addColorStop(1, 'rgba(232, 98, 28, 0)');

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Head glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 179, 71, ${this.opacity})`;
      ctx.fill();
    }
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star());
    }
  }

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    // Draw stars
    stars.forEach(star => {
      star.update(time * 0.001);
      star.draw();
    });

    // Draw shooting stars
    shootingStars = shootingStars.filter(s => s.active);
    shootingStars.forEach(s => {
      s.update();
      s.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  // Mouse tracking with throttle
  let mouseThrottle = false;
  document.addEventListener('mousemove', (e) => {
    if (mouseThrottle) return;
    mouseThrottle = true;
    setTimeout(() => { mouseThrottle = false; }, 50);
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Shooting star timer
  setInterval(() => {
    if (shootingStars.length < 2) {
      shootingStars.push(new ShootingStar());
    }
  }, SHOOTING_STAR_INTERVAL);

  window.addEventListener('resize', resize);
  resize();
  animate(0);

  return () => {
    cancelAnimationFrame(animationId);
  };
}
