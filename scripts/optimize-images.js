const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SIZES = {
  sm: 400,
  md: 800,
  lg: 1200,
};

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath);
  const basename = path.basename(inputPath, ext);
  const isAlreadyOptimized = basename.includes('-optimized');

  if (isAlreadyOptimized) {
    return;
  }

  try {
    // Crear versiones optimizadas para diferentes tamaños
    for (const [size, width] of Object.entries(SIZES)) {
      const outputPath = path.join(path.dirname(inputPath), `${basename}-optimized-${size}${ext}`);

      await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({ quality: 80 })
        .toFile(outputPath.replace(ext, '.webp'));

      // También mantener formato original optimizado
      await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .toFile(outputPath);
    }

    console.warn(`✅ Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error);
  }
}

async function processDirectory(directory) {
  try {
    const files = await fs.readdir(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        await processDirectory(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          await optimizeImage(filePath);
        }
      }
    }
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

console.warn('🖼️ Starting image optimization...');
processDirectory(PUBLIC_DIR)
  .then(() => console.warn('✨ Image optimization complete!'))
  .catch(console.error);
