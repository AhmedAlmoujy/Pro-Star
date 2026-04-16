const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
c = c.replace('/profile-company.pdf?v=1', 'assets/profile-company.pdf');
c = c.replace('download="Profile-Company-ProStar.pdf"', 'target="_blank"');
fs.writeFileSync('index.html', c, 'utf8');
