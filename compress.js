import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mediaDir = path.join(__dirname, 'assets', 'media');

async function processGifs() {
  try {
    const files = fs.readdirSync(mediaDir).filter(f => f.endsWith('.gif'));
    for (const file of files) {
      const inputPath = path.join(mediaDir, file);
      const outputPath = path.join(mediaDir, file.replace('.gif', '.webp'));
      console.log(`Processing: ${file}...`);
      
      await sharp(inputPath, { animated: true })
        .webp({ quality: 60, effort: 6 }) // Compress WEBP
        .toFile(outputPath);
        
      console.log(`Done: ${outputPath}`);
    }
  } catch (error) {
    console.error("Error processing GIFs:", error);
  }
}

processGifs();
