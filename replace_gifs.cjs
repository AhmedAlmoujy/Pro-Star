const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

c = c.replace('assets/media/banner-ui.gif" alt="تصميم واجهات', 'assets/Images/UI,UX.png" alt="تصميم واجهات');
c = c.replace('assets/media/banner-seo.gif', 'assets/Images/SEO2.png');
c = c.replace('assets/media/banner-social1.gif', 'assets/Images/Graphic-Design.png'); // assuming social1 was used for Graphic design previously by error
c = c.replace('assets/media/banner-motion.gif', 'assets/Images/Motion.png');
c = c.replace('assets/media/banner-ui.gif', 'assets/Images/Programming2.png'); // second banner-ui was Programming
c = c.replace('assets/media/banner-content.gif', 'assets/Images/Content2.png');
c = c.replace('assets/media/banner-media.gif', 'assets/Images/Media_Buying.png');
c = c.replace('assets/media/banner-social2.gif', 'assets/Images/Social.png');

fs.writeFileSync('index.html', c, 'utf8');
