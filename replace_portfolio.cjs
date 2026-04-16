const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

c = c.replace('<div class="portfolio__item-bg"><i data-lucide="palette"></i></div>', '<div class="portfolio__item-bg" style="background-image: url(\'assets/Images/icon_uiux.png\'); background-size: cover; background-position: center; opacity: 0.8;"></div>');
c = c.replace('<div class="portfolio__item-bg"><i data-lucide="sparkles"></i></div>', '<div class="portfolio__item-bg" style="background-image: url(\'assets/Images/icon_graphic.png\'); background-size: cover; background-position: center; opacity: 0.8;"></div>');
c = c.replace('<div class="portfolio__item-bg"><i data-lucide="clapperboard"></i></div>', '<div class="portfolio__item-bg" style="background-image: url(\'assets/Images/icon_motion.png\'); background-size: cover; background-position: center; opacity: 0.8;"></div>');
c = c.replace('<div class="portfolio__item-bg"><i data-lucide="monitor"></i></div>', '<div class="portfolio__item-bg" style="background-image: url(\'assets/Images/icon_programming.png\'); background-size: cover; background-position: center; opacity: 0.8;"></div>');
c = c.replace('<div class="portfolio__item-bg"><i data-lucide="smartphone"></i></div>', '<div class="portfolio__item-bg" style="background-image: url(\'assets/Images/icon_social.png\'); background-size: cover; background-position: center; opacity: 0.8;"></div>');
c = c.replace('<div class="portfolio__item-bg"><i data-lucide="bar-chart-2"></i></div>', '<div class="portfolio__item-bg" style="background-image: url(\'assets/Images/icon_dashboard.png\'); background-size: cover; background-position: center; opacity: 0.8;"></div>');

fs.writeFileSync('index.html', c, 'utf8');
