import sharp from 'sharp';

for (const size of [192, 512]) {
  await sharp('public/icons/icon.svg').resize(size, size).png().toFile(`public/icons/icon-${size}.png`);
  console.log(`Generated ${size}x${size}`);
}
await sharp('public/icons/icon-maskable.svg').resize(512, 512).png().toFile('public/icons/icon-maskable-512.png');
console.log('Generated maskable 512x512');
