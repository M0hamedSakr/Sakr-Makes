const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<script defer src="script\.js"><\/script>/g, '<script defer src="script.min.js"></script>');
html = html.replace(/<script defer src="chatbot\.js"><\/script>/g, '<script defer src="chatbot.min.js"></script>');
html = html.replace(/<link rel="preload" href="style\.css" as="style">/g, '<link rel="preload" href="style.min.css" as="style">');
html = html.replace(/<link rel="stylesheet" href="style\.css">/g, '<link rel="stylesheet" href="style.min.css">');

fs.writeFileSync('index.html', html);
console.log('index.html updated with minified files');
