import sharp from "sharp";
import fs from "node:fs";

const root = process.cwd();

async function run() {
  // 1. Personal photo -> lightweight webp (About page LCP)
  const personalSrc = `${root}/public/personal-img-formal.png`;
  if (fs.existsSync(personalSrc)) {
    await sharp(personalSrc)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`${root}/public/personal-img-formal.webp`);
    const before = fs.statSync(personalSrc).size;
    const after = fs.statSync(`${root}/public/personal-img-formal.webp`).size;
    console.log(`personal photo: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB webp`);
  }

  // 2. Dossera header logos -> smaller (same filenames, same format)
  for (const file of ["dossera-lightmode.png", "dossera-darkmode.png"]) {
    const p = `${root}/public/${file}`;
    if (!fs.existsSync(p)) continue;
    const tmp = `${p}.tmp`;
    await sharp(p).resize({ width: 768, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(tmp);
    fs.renameSync(tmp, p);
    console.log(`${file} resized -> ${Math.round(fs.statSync(p).size / 1024)}KB`);
  }

  // 3. Dossera Sanity logo -> trim uniform padding so text reads at card size
  const dosseraSrc = "C:/Users/ziko9/Desktop/Projects/Assets/dossera-logo.png";
  const trimmedOut = "C:/Users/ziko9/AppData/Local/Temp/opencode/dossera-logo-trimmed.png";
  if (fs.existsSync(dosseraSrc)) {
    const meta = await sharp(dosseraSrc).metadata();
    await sharp(dosseraSrc).trim().toFile(trimmedOut);
    const meta2 = await sharp(trimmedOut).metadata();
    console.log(`dossera logo trimmed: ${meta.width}x${meta.height} -> ${meta2.width}x${meta2.height}`);
  }

  console.log("Optimize complete!");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
