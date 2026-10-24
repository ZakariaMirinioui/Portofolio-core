import { readFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";

const root = process.cwd();
const appDir = join(root, "app");

// Pattern to match i18n key-like strings that are NOT inside t() calls
// This matches strings like "home.stats" that appear outside of t("...") calls
const UNRESOLVED_KEY_PATTERN = /(?<!t\(['"`])["'`]([a-z]{2,}\.[a-zA-Z0-9_.-]+)["'`](?!\))/g;

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!["node_modules", ".next", ".git", "public"].includes(entry.name)) {
        files.push(...walk(full));
      }
    } else if ([".tsx", ".ts", ".jsx", ".js"].includes(extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function checkUnresolvedI18nKeys() {
  const files = walk(appDir);
  let hasErrors = false;

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, lineNum) => {
      // Skip lines that are:
      // - import statements
      // - namespace: "..." in getTranslations calls
      // - t("...") or t.raw("...") calls
      // - labelKey: "..." or key: "..." in constant definitions
      // - previous line contains t( or t.raw( (multi-line calls)
      if (
        line.trim().startsWith("import ") ||
        line.includes('namespace: "') ||
        line.includes("t(") ||
        line.includes('t.raw(') ||
        line.includes('labelKey: "') ||
        line.includes('key: "') ||
        (lineNum > 0 && lines[lineNum - 1].includes("t(")) ||
        (lineNum > 0 && lines[lineNum - 1].includes('t.raw('))
      ) {
        return;
      }

      let match;
      while ((match = UNRESOLVED_KEY_PATTERN.exec(line)) !== null) {
        const key = match[1];
        if (key.includes(".") && !key.startsWith("http") && !key.includes("://")) {
          console.error(`✗ Unresolved i18n key-like string in ${file}:${lineNum + 1}`);
          console.error(`  "${key}"`);
          hasErrors = true;
        }
      }
    });
  }

  if (hasErrors) {
    console.error("\nUnresolved i18n key check failed.");
    process.exit(1);
  }

  console.log("✓ No unresolved i18n key-like strings found");
}

function checkHeroAnimationExists() {
  const heroAnimationPath = join(root, "app", "components", "hero", "HeroAnimation.tsx");
  const heroSvgPath = join(root, "app", "assets", "icons", "HeroSvg.tsx");

  try {
    readFileSync(heroAnimationPath, "utf8");
    readFileSync(heroSvgPath, "utf8");
    console.log("✓ Hero animation component exists");
  } catch {
    console.error("✗ Hero animation component missing");
    process.exit(1);
  }
}

function checkFontConfiguration() {
  const globalsCssPath = join(root, "app", "styles", "globals.css");
  const layoutPath = join(root, "app", "layout.tsx");
  const fontConfigPath = join(root, "app", "assets", "font", "font.ts");

  try {
    const globalsCss = readFileSync(globalsCssPath, "utf8");
    const layout = readFileSync(layoutPath, "utf8");
    const fontConfig = readFileSync(fontConfigPath, "utf8");

    if (!globalsCss.includes("var(--incognito)")) {
      console.error("✗ globals.css missing var(--incognito) for headings");
      process.exit(1);
    }

    if (!layout.includes("incognito.variable")) {
      console.error("✗ layout.tsx missing incognito.variable on body");
      process.exit(1);
    }

    if (!fontConfig.includes("incognito_bold.woff2") || !fontConfig.includes("incognito_condensed.woff2")) {
      console.error("✗ font.ts missing Incognito font weights");
      process.exit(1);
    }

    console.log("✓ Display font configuration verified");
  } catch {
    console.error("✗ Font configuration files missing");
    process.exit(1);
  }
}

function checkHeroAlignment() {
  const pagePath = join(root, "app", "[locale]", "page.tsx");

  try {
    const pageContent = readFileSync(pagePath, "utf8");

    if (!pageContent.includes("xl:justify-between")) {
      console.error("✗ Hero section missing xl:justify-between for alignment");
      process.exit(1);
    }

    if (pageContent.includes("xl:justify-center")) {
      console.error("✗ Hero section still has xl:justify-center causing misalignment");
      process.exit(1);
    }

    console.log("✓ Hero alignment classes verified");
  } catch {
    console.error("✗ page.tsx missing or unreadable");
    process.exit(1);
  }
}

function checkStatsStrip() {
  const statsPath = join(root, "app", "data", "home-stats.ts");
  const statsBarPath = join(root, "app", "components", "sections", "StatsBar.tsx");

  try {
    const statsContent = readFileSync(statsPath, "utf8");
    const statsBarContent = readFileSync(statsBarPath, "utf8");

    const expectedStats = ["25+", "30+", "10", "8+", "4+"];
    for (const stat of expectedStats) {
      if (!statsContent.includes(stat)) {
        console.error(`✗ home-stats.ts missing expected stat: ${stat}`);
        process.exit(1);
      }
    }

    if (!statsBarContent.includes("homeStats")) {
      console.error("✗ StatsBar not using shared homeStats constant");
      process.exit(1);
    }

    console.log("✓ Stats strip configuration verified");
  } catch {
    console.error("✗ Stats strip files missing");
    process.exit(1);
  }
}

console.log("Running regression guards...\n");

checkHeroAnimationExists();
checkFontConfiguration();
checkHeroAlignment();
checkStatsStrip();
checkUnresolvedI18nKeys();

console.log("\n✓ All regression guards passed");