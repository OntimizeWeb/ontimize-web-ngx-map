const fs = require('fs');
const path = require('path');

const files = [
  'node_modules/leaflet/dist/images/layers.png',
  'node_modules/leaflet/dist/images/layers-2x.png',
  'node_modules/leaflet/dist/images/marker-shadow.png',
  'node_modules/leaflet-draw/dist/images/marker-icon.png',
  'node_modules/leaflet-draw/dist/images/marker-icon-2x.png',
  'node_modules/leaflet-draw/dist/images/spritesheet.png',
  'node_modules/leaflet-draw/dist/images/spritesheet-2x.png',
  'node_modules/leaflet-draw/dist/images/spritesheet.svg',
];

const dest = path.join('dist', 'images');
fs.mkdirSync(dest, { recursive: true });

for (const file of files) {
  const filename = path.basename(file);
  fs.copyFileSync(file, path.join(dest, filename));
  console.log(`Copied: ${filename}`);
}

console.log('----¡Leaflet images copied!----');
