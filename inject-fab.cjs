const fs = require('fs');
const path = require('path');

const htmlToInject = `
  <!-- Floating Contact Buttons -->
  <div class="floating-contact">
    <a href="tel:115060750" class="floating-contact__btn" data-tooltip="اتصل بنا" aria-label="اتصل بنا">
      <i data-lucide="phone"></i>
    </a>
    <a href="https://wa.me/966503134362" class="floating-contact__btn floating-contact__btn--whatsapp" data-tooltip="واتساب" aria-label="واتساب">
      <i data-lucide="message-circle"></i>
    </a>
  </div>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Clean up any existing injection attempt
  content = content.replace(/<!-- Floating Contact Buttons -->\s*<div class="floating-contact">[\s\S]*?<\/div>/g, '');
  
  // Inject BEFORE lucide scripts
  const lucideScriptTag = '<script src="https://unpkg.com/lucide@latest"></script>';
  if (content.includes(lucideScriptTag)) {
    content = content.replace(lucideScriptTag, `${htmlToInject}\n  ${lucideScriptTag}`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  } else if (content.includes('</body>')) {
    // Fallback
    content = content.replace('</body>', `${htmlToInject}\n</body>`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file} (fallback to end of body)`);
  }
});
