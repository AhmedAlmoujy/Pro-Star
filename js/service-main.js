/* ============================================
   Pro-Star KSA — Service Pages Entry Point
   ============================================ */

// CSS imports (Vite-native)
import '../css/variables.css';
import '../css/reset.css';
import '../css/base.css';
import '../css/layout.css';
import '../css/components/animations.css';
import '../css/components/navbar.css';
import '../css/components/mouse-effect.css';
import '../css/components/service-page.css';
import '../css/components/footer.css';

// JS modules
import { initServicePage } from './service-page.js';

document.addEventListener('DOMContentLoaded', () => {
  initServicePage();
});
