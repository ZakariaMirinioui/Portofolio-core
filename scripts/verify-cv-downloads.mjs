import { existsSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const downloadsDir = join(root, "public", "downloads");
const files = {
  en: join(downloadsDir, "MiriniouiZakaria-CV-EN.pdf"),
  fr: join(downloadsDir, "MiriniouiZakaria-CV-FR.pdf"),
};

let missing = [];
for (const [key, path] of Object.entries(files)) {
  if (!existsSync(path)) missing.push(path);
}

if (missing.length > 0) {
  console.error(
    `Build blocked: CV download PDF(s) missing in public/downloads/:\n  ${missing.join(
      "\n  "
    )}\nAdd both PDFs before building. The About page CV download depends on them.`
  );
  process.exit(1);
}

const sizes = {};
for (const [key, path] of Object.entries(files)) {
  sizes[key] = statSync(path).size;
}

const outDir = join(root, "app", "data");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "cv-sizes.json"), JSON.stringify(sizes, null, 2));

console.log(`CV downloads verified: EN ${sizes.en} B, FR ${sizes.fr} B`);
