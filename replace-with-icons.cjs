const fs = require('fs');

// 1. Update CSS
const cssPath = 'css/components/navbar.css';
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.navbar__dropdown-menu a img')) {
  css = css.replace('.navbar__dropdown-menu a svg {', '.navbar__dropdown-menu a svg,\n.navbar__dropdown-menu a img {\n    object-fit: contain;');
  fs.writeFileSync(cssPath, css, 'utf8');
}

// 2. Map SVGs from dropdown
const svgs = [
  ['<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>', '<img src="assets/Images/icon_uiux.png" alt="icon">'],
  ['<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>', '<img src="assets/Images/icon_dashboard.png" alt="icon">'],
  ['<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>', '<img src="assets/Images/icon_graphic.png" alt="icon">'],
  ['<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>', '<img src="assets/Images/icon_motion.png" alt="icon">'],
  ['<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>', '<img src="assets/Images/icon_programming.png" alt="icon">'],
  ['<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>', '<img src="assets/Images/icon_social.png" alt="icon">'],
  ['<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>', '<img src="assets/Images/icon_dashboard.png" alt="icon">'],
  ['<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>', '<img src="assets/Images/icon_social.png" alt="icon">']
];

const imgMapping = {
  "edit": "icon_uiux.png",
  "megaphone": "icon_social.png",
  "clipboard": "icon_dashboard.png",
  "newspaper": "icon_social.png",
  "smartphone": "icon_social.png",
  "mail": "icon_social.png",
  "clapperboard": "icon_motion.png",
  "file-text": "icon_dashboard.png",
  "bar-chart-2": "icon_dashboard.png",
  "palette": "icon_uiux.png",
  "package": "icon_programming.png",
  "sparkles": "icon_graphic.png",
  "book-open": "icon_graphic.png",
  "smile": "icon_social.png",
  "crosshair": "icon_dashboard.png",
  "search": "icon_dashboard.png",
  "book": "icon_programming.png",
  "camera": "icon_motion.png",
  "twitter": "icon_social.png",
  "trending-up": "icon_dashboard.png",
  "library": "icon_programming.png",
  "video": "icon_motion.png",
  "graduation-cap": "icon_programming.png",
  "star": "icon_graphic.png",
  "monitor": "icon_programming.png",
  "shopping-cart": "icon_dashboard.png",
  "globe": "icon_programming.png",
  "plug": "icon_programming.png",
  "lock": "icon_programming.png",
  "zap": "icon_programming.png",
  "flask-conical": "icon_programming.png",
  "ruler": "icon_uiux.png",
  "refresh-cw": "icon_motion.png",
  "hard-hat": "icon_programming.png",
  "map-pin": "icon_social.png",
  "settings": "icon_dashboard.png",
  "heart": "icon_social.png"
};

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Replace dropdown SVGs
  svgs.forEach(([svg, img]) => {
    if (content.includes(svg)) {
      content = content.split(svg).join(img);
      changed = true;
    }
  });

  // 2. Replace lucide icons
  for (const [lucideType, pngFile] of Object.entries(imgMapping)) {
    const searchString = `<i data-lucide="${lucideType}"></i>`;
    const replacement = `<img src="assets/Images/${pngFile}" alt="" style="width:100%; height:100%; object-fit:contain;">`;
    if (content.includes(searchString)) {
      content = content.split(searchString).join(replacement);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});

