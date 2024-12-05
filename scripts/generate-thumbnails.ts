import sharp from 'sharp';
import path from 'path';

const textures = [
  'watercolor',
  'earth_atmos_2048',
  'earth-day'
];

async function generateThumbnails() {
  for (const texture of textures) {
    await sharp(path.join('public', `${texture}.jpg`))
      .resize(200, 200, {
        fit: 'cover',
        position: 'center'
      })
      .toFile(path.join('public', `${texture}-thumb.jpg`));
  }
}

generateThumbnails().catch(console.error); 