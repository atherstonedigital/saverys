const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "..", "content");
const PUBLIC_DIR = path.join(__dirname, "..", "public");

let updated = 0;

function walkDir(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath, ext));
    } else if (ext.some((e) => entry.name.endsWith(e))) {
      files.push(fullPath);
    }
  }
  return files;
}

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let changed = false;

  // Match image references to .jpg, .jpeg, .png in /images/ paths
  const newContent = content.replace(
    /\/images\/([^"'\s\)]+)\.(jpg|jpeg|png)/gi,
    (match, name, ext) => {
      const webpPath = path.join(PUBLIC_DIR, "images", `${name}.webp`);
      if (fs.existsSync(webpPath)) {
        changed = true;
        return `/images/${name}.webp`;
      }
      return match;
    }
  );

  if (changed) {
    fs.writeFileSync(filePath, newContent, "utf-8");
    console.log(`  ✓ ${path.relative(process.cwd(), filePath)}`);
    updated++;
  }
}

function main() {
  console.log("Updating image references to .webp...\n");

  const contentFiles = [
    ...walkDir(CONTENT_DIR, [".json", ".md"]),
  ];

  for (const file of contentFiles) {
    updateFile(file);
  }

  console.log(`\nDone: ${updated} files updated.`);
}

main();
