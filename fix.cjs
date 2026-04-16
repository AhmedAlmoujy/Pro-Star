const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
c = c.replace('<div class="about__visual-float-icon"><img src="assets/Images/icon_uiux.png" style="width:100%; height:100%; object-fit:contain;"></div>', '<div class="about__visual-float-icon"><i data-lucide="palette"></i></div>')
     .replace('<div class="about__visual-float-icon"><img src="assets/logo.png" style="width:100%; height:100%; object-fit:contain;"></div>', '<div class="about__visual-float-icon"><i data-lucide="trending-up"></i></div>');
fs.writeFileSync('index.html', c, 'utf8');
