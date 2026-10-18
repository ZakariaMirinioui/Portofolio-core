import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const messagesDir = join(root, "messages");

const REQUIRED_LOCALES = ["en", "fr"];
const REFERENCE_LOCALE = "en";
const INFORMATIONAL_LOCALES = ["ar"];

function load(locale) {
  return JSON.parse(readFileSync(join(messagesDir, `${locale}.json`), "utf8"));
}

function collectKeys(obj, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...collectKeys(value, path));
    } else {
      keys.push(path);
    }
  }
  return keys.sort();
}

const reference = collectKeys(load(REFERENCE_LOCALE));
const referenceSet = new Set(reference);

let hasErrors = false;

for (const locale of REQUIRED_LOCALES) {
  if (locale === REFERENCE_LOCALE) continue;

  const keys = collectKeys(load(locale));
  const keySet = new Set(keys);
  const missing = reference.filter((k) => !keySet.has(k));
  const extra = keys.filter((k) => !referenceSet.has(k));

  if (missing.length === 0 && extra.length === 0) {
    console.log(`✓ ${locale}: ${keys.length} keys, full parity with ${REFERENCE_LOCALE}`);
    continue;
  }

  hasErrors = true;
  console.error(`✗ ${locale}: key mismatch vs ${REFERENCE_LOCALE}`);
  if (missing.length) {
    console.error(`  Missing (${missing.length}):`);
    missing.forEach((k) => console.error(`    - ${k}`));
  }
  if (extra.length) {
    console.error(`  Extra (${extra.length}):`);
    extra.forEach((k) => console.error(`    + ${k}`));
  }
}

for (const locale of INFORMATIONAL_LOCALES) {
  let keys;
  try {
    keys = collectKeys(load(locale));
  } catch {
    console.warn(`! ${locale}: messages file not found (skipped)`);
    continue;
  }
  const keySet = new Set(keys);
  const missing = reference.filter((k) => !keySet.has(k));
  console.log(
    `i ${locale} (informational): ${keys.length} keys, ${missing.length} missing vs ${REFERENCE_LOCALE}`
  );
}

if (hasErrors) {
  console.error("\ni18n key parity check failed.");
  process.exit(1);
}

console.log(`\n✓ i18n key parity OK (${reference.length} keys)`);
