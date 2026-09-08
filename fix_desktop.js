const fs = require('fs');

// 1. Fix index.html
let html = fs.readFileSync('index.html', 'utf8');

// Font Awesome Async
const faPreload = '<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style">';
const faStylesheet = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"\r\n    integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="\r\n    crossorigin="anonymous" referrerpolicy="no-referrer" />';
// Handling both \n and \r\n
html = html.replace(/<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.4\.0\/css\/all\.min\.css"[\s\S]*?referrerpolicy="no-referrer" \/>/, 
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media=\'all\'">\n<noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>');

// Add fetchpriority
html = html.replace(/<img src="Logo.webp" alt="Sakr Makes Logo" class="intro-logo">/, '<img src="Logo.webp" alt="Sakr Makes Logo" class="intro-logo" fetchpriority="high">');
html = html.replace(/<img src="Mohamed Sakr.webp" width="400" height="400" alt="Mohamed Sakr — Founder of Sakr Makes" class="profile-circle-img">/, '<img src="Mohamed Sakr.webp" width="400" height="400" alt="Mohamed Sakr — Founder of Sakr Makes" class="profile-circle-img" fetchpriority="high">');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html');

// 2. Fix script.js
let script = fs.readFileSync('script.js', 'utf8');
script = script.replace(/particleCount = window.innerWidth < 768 \? 0 : window.innerWidth < 1200 \? 55 : 80;/, 
  'particleCount = window.innerWidth < 768 ? 0 : window.innerWidth < 1200 ? 15 : 20;');
fs.writeFileSync('script.js', script);
console.log('Fixed script.js');
