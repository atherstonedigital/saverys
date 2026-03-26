const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(__dirname, "..", "public", "images");
const QUALITY = 80;
const MAX_WIDTH = 1920;

let converted = 0;
let skipped = 0;

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  // Skip if WebP already exists and is newer than source
  if (fs.existsSync(webpPath)) {
    const srcStat = fs.statSync(filePath);
    const webpStat = fs.statSync(webpPath);
    if (webpStat.mtimeMs >= srcStat.mtimeMs) {
      skipped++;
      return;
    }
  }

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = image;
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    await pipeline.webp({ quality: QUALITY }).toFile(webpPath);

    const srcSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const saving = Math.round((1 - webpSize / srcSize) * 100);
    console.log(
      `  ✓ ${path.relative(IMAGES_DIR, filePath)} → .webp (${saving}% smaller)`
    );
    converted++;
  } catch (err) {
    console.error(`  ✗ ${path.relative(IMAGES_DIR, filePath)}: ${err.message}`);
  }
}

async function main() {
  console.log("Optimizing images to WebP...\n");

  if (!fs.existsSync(IMAGES_DIR)) {
    console.log("No images directory found.");
    return;
  }

  const files = walkDir(IMAGES_DIR);
  const imageFiles = files.filter((f) =>
    /\.(jpg|jpeg|png)$/i.test(f)
  );

  if (imageFiles.length === 0) {
    console.log("No JPG/PNG images to convert.");
    return;
  }

  for (const file of imageFiles) {
    await optimizeImage(file);
  }

  console.log(`\nDone: ${converted} converted, ${skipped} skipped.`);
}

main().catch(console.error);
