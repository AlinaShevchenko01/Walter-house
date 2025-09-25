import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { relative, resolve } from 'path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  const sourcePath = join(__dirname, 'public/img/**/*.{jpg,png}');
  const outputPath = join(__dirname, 'public/img/');

  try {
    // Конвертуємо файли у WebP
    const files = await imagemin([sourcePath], {
      destination: outputPath,
      plugins: [imageminWebp({ quality: 75 })],
    });

    for (const file of files) {
      const relativePath = relative(outputPath, file.sourcePath);
      const newFilePath = relativePath.replace(/\.[^/.]+$/, '.webp');
      const fullNewPath = resolve(outputPath, newFilePath);
      const directoryPath = dirname(fullNewPath);

      // Створюємо директорію, якщо її ще немає
      await fs.mkdir(directoryPath, { recursive: true });

      // Якщо файл існує – видаляємо старий
      const exists = await fs.stat(fullNewPath).catch(() => false);
      if (exists) {
        await fs.unlink(fullNewPath);
      }

      // Переміщуємо новий WebP
      await fs.rename(file.destinationPath, fullNewPath);

      console.log(`Converting: ${file.sourcePath} -> ${fullNewPath}`);
    }

    console.log('All images successfully converted to WebP!');
  } catch (err) {
    console.error('Error during image conversion:', err);
  }
})();
