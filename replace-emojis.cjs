const fs = require('fs');
const mapping = {
  "📝": "edit", "📢": "megaphone", "📋": "clipboard", "📰": "newspaper", "📱": "smartphone",
  "📧": "mail", "🎬": "clapperboard", "📄": "file-text", "📊": "bar-chart-2", "🎨": "palette",
  "📦": "package", "✨": "sparkles", "📖": "book-open", "🎭": "smile", "🎯": "crosshair",
  "🔍": "search", "📘": "book", "📸": "camera", "🐦": "twitter", "📈": "trending-up",
  "📚": "library", "🎥": "video", "🎓": "graduation-cap", "🌟": "star", "💻": "monitor",
  "🛒": "shopping-cart", "📲": "smartphone", "🌐": "globe", "🔌": "plug", "🔒": "lock",
  "⚡": "zap", "🧪": "flask-conical", "📐": "ruler", "🔄": "refresh-cw", "🏗️": "hard-hat",
  "📍": "map-pin", "⚙️": "settings", "🚀": "", "❤️": "heart"
};

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const [emoji, icon] of Object.entries(mapping)) {
    if (content.includes(emoji)) {
      if(icon === "") {
        content = content.split(emoji).join(""); 
      } else {
        content = content.split(emoji).join(`<i data-lucide="${icon}"></i>`);
      }
      changed = true;
    }
  }

  const remainingRocket = /\uD83D\uDE80/g;
  if(remainingRocket.test(content)) {
    content = content.replace(remainingRocket, '');
    changed = true;
  }

  if (changed && !content.includes('lucide@latest')) {
    content = content.replace('</body>', '  <script src="https://unpkg.com/lucide@latest"></script>\n  <script>lucide.createIcons();</script>\n</body>');
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
