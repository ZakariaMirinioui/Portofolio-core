import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const privatePaths = [
  join(root, "app/data/private/source-map.ts"),
];

// Denylist: original names / source identifiers that must never appear in rendered output.
const DENYLIST = [
  "FoodKing",
  "HexaRide",
  "ARCUS",
  "InfixEdu",
  "InfyCare",
  "SalonHub",
  "longclaw",
  "yourusername",
  "support@bluevision.io",
];

function walk(dir) {
  const files = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if ([".html", ".json", ".txt"].includes(full.slice(full.lastIndexOf(".")))) {
      files.push(full);
    }
  }
  return files;
}

async function validateProjectsData() {
  const { projects } = await import("../app/data/projects.ts");
  let dataErrors = 0;

  for (const p of projects) {
    // Required fields in en and fr
    if (!p.slug) {
      console.error(`Project missing slug:`, p);
      dataErrors++;
    }
    if (!p.displayName?.en || !p.displayName?.fr) {
      console.error(`[${p.slug}] missing bilingual displayName`);
      dataErrors++;
    }
    if (!p.summary?.en || !p.summary?.fr) {
      console.error(`[${p.slug}] missing bilingual summary`);
      dataErrors++;
    }
    if (!p.evidenceNotes?.en || !p.evidenceNotes?.fr) {
      console.error(`[${p.slug}] missing bilingual evidenceNotes`);
      dataErrors++;
    }
    if (!p.platform || !p.access || !p.status) {
      console.error(`[${p.slug}] missing platform, access, or status`);
      dataErrors++;
    }

    // Links check: if present, must be non-empty and https://
    if (p.links) {
      for (const [k, url] of Object.entries(p.links)) {
        if (url !== undefined) {
          if (typeof url !== "string" || !url.trim()) {
            console.error(`[${p.slug}] link ${k} is empty`);
            dataErrors++;
          } else if (!url.startsWith("https://")) {
            console.error(`[${p.slug}] link ${k} is not https: ${url}`);
            dataErrors++;
          }
        }
      }
    }

    // Check draft references
    if (p.relatedSlugs && Array.isArray(p.relatedSlugs)) {
      for (const rel of p.relatedSlugs) {
        const target = projects.find((x) => x.slug === rel);
        if (target && target.visibility === "draft" && p.visibility === "public") {
          console.error(`[${p.slug}] public project references draft project ${rel}`);
          dataErrors++;
        }
      }
    }
  }

  if (dataErrors > 0) {
    console.error(`\n❌ Projects data validation failed with ${dataErrors} errors.`);
    process.exit(1);
  }
  console.log(`✓ Projects data validation passed (${projects.length} projects validated)`);
}

async function main() {
  let hasErrors = false;

  // 1. Validate projects data integrity
  await validateProjectsData();

  // 2. Denylist scan on build output (only if out/ exists).
  if (existsSync(outDir)) {
    const files = walk(outDir);
    for (const file of files) {
      try {
        const content = readFileSync(file, "utf8");
        for (const term of DENYLIST) {
          if (content.includes(term)) {
            console.error(`❌ Denylist violation in ${file}: found "${term}"`);
            hasErrors = true;
          }
        }
      } catch {
        // skip unreadable
      }
    }
    if (hasErrors) {
      console.error("\n❌ Denylist scan failed.");
      process.exit(1);
    }
    console.log(`✓ Denylist scan passed (${files.length} output files scanned)`);
  } else {
    console.log("ℹ out/ not found — skipping denylist scan of output (run `next build` first)");
  }

  // 3. Private source map must exist as a template (build works without it).
  for (const p of privatePaths) {
    if (!existsSync(p)) {
      console.error(`❌ Private source-map template missing: ${p}`);
      process.exit(1);
    }
  }
  console.log("✓ Private source-map template present");

  console.log("\n✓ Project validator passed");
}

main().catch((err) => {
  console.error("Validator fatal error:", err);
  process.exit(1);
});
