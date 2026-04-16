const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const whatsappSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 32px; height: 32px; fill: #25D366;"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.9 69.4 27.3 107.1 27.3 124.7 0 226.2-101.5 226.2-226.2 0-58.5-22.8-113.5-64.6-155.3zm-158 331.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L70.7 349l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.5 2.4-11.2 2.5-2.4 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.5 3.6 35.2 2.2 10.8-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>`;
const phoneSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 28px; height: 28px; fill: none; stroke: #E8621C; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;

const htmlToInject = `
  <!-- Start Floating Contact -->
  <style>
    .pro-fab {
      position: fixed !important;
      bottom: 40px !important;
      right: 30px !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 15px !important;
      z-index: 99999999 !important;
      pointer-events: none !important;
    }
    .pro-fab__item {
      pointer-events: auto !important;
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: rgba(12, 12, 36, 0.95) !important;
      border: 2px solid rgba(232, 98, 28, 0.4) !important;
      backdrop-filter: blur(20px) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6) !important;
      transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1) !important;
    }
    .pro-fab__item--whatsapp {
      border-color: rgba(37, 211, 102, 0.4) !important;
    }
    .pro-fab__item:hover {
      transform: translateY(-8px) scale(1.1) !important;
      border-color: #E8621C !important;
      box-shadow: 0 15px 40px rgba(232, 98, 28, 0.4) !important;
    }
    .pro-fab__item--whatsapp:hover {
      border-color: #25D366 !important;
      box-shadow: 0 15px 40px rgba(37, 211, 102, 0.4) !important;
    }
    @media (max-width: 768px) {
      .pro-fab { bottom: 25px !important; right: 20px !important; }
      .pro-fab__item { width: 52px !important; height: 52px !important; }
    }
  </style>
  <div class="pro-fab">
    <a href="tel:115060750" class="pro-fab__item" aria-label="اتصل بنا">
      ${phoneSVG}
    </a>
    <a href="https://wa.me/966503134362" class="pro-fab__item pro-fab__item--whatsapp" aria-label="واتساب">
      ${whatsappSVG}
    </a>
  </div>
  <!-- End Floating Contact -->
`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Clean up any old attempts manually
  const patterns = [
    '<!-- Floating Contact Buttons -->',
    '<!-- Start Floating Contact -->'
  ];
  
  patterns.forEach(p => {
    while (content.indexOf(p) !== -1) {
      const start = content.indexOf(p);
      let end = -1;
      if (p === '<!-- Start Floating Contact -->') {
        end = content.indexOf('<!-- End Floating Contact -->') + '<!-- End Floating Contact -->'.length;
      } else {
        // Find closing div
        const divStart = content.indexOf('<div class="floating-contact">', start);
        end = content.indexOf('</div>', divStart) + '</div>'.length;
      }
      if (end > start) {
        content = content.slice(0, start) + content.slice(end);
      } else {
        break;
      }
    }
  });

  // Inject before </body>
  content = content.replace('</body>', `${htmlToInject}\n</body>`);
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Finalized ${file}`);
});
