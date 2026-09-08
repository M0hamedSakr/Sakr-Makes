const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add width and height to images
html = html.replace(/<img([^>]*)src="([^"]+)"([^>]*)>/g, (match, p1, p2, p3) => {
  if (match.includes('width=') || match.includes('height=')) return match;
  
  let w = 800;
  let h = 800;
  
  if (p2.includes('Logo.webp')) { w = 200; h = 200; }
  else if (p2.includes('Mohamed Sakr.webp') || p2.includes('Personal.webp')) { w = 400; h = 400; }
  else if (p2.includes('3D') || p2.includes('Drnone')) { w = 800; h = 600; }
  else if (p2.includes('Persnal') || p2.includes('persnal')) { w = 800; h = 600; }
  else if (p2.includes('1.webp') || p2.includes('2.webp') || p2.includes('Fusion360.webp')) { w = 800; h = 450; }
  else if (p2.includes('favicon.ico')) { w = 32; h = 32; }

  return `<img${p1}src="${p2}" width="${w}" height="${h}"${p3}>`;
});

// Add defer to scripts
html = html.replace(/<script src="script\.js"><\/script>/g, '<script defer src="script.js"></script>');
html = html.replace(/<script src="chatbot\.js"><\/script>/g, '<script defer src="chatbot.js"></script>');

// Preload styles
let fontAwesomeLink = `<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style">\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"`;
html = html.replace(/<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.4\.0\/css\/all\.min\.css"/g, fontAwesomeLink);

let styleLink = `<link rel="preload" href="style.css" as="style">\n  <link rel="stylesheet" href="style.css">`;
html = html.replace(/<link rel="stylesheet" href="style\.css">/g, styleLink);

fs.writeFileSync('index.html', html);
console.log('Fixed index.html');
