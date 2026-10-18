import { createClient } from "next-sanity";
import fs from "node:fs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const [slug, file] = process.argv.slice(2);

if (!slug || !file) {
  console.error("Usage: node --env-file=.env.local scripts/swap-logo.mjs <slug> <abs-file-path>");
  process.exit(1);
}

if (!fs.existsSync(file)) {
  console.error(`File not found: ${file}`);
  process.exit(1);
}

const doc = await client.fetch(
  `*[_type == "project" && slug.current == $slug][0]{ _id, name }`,
  { slug }
);

if (!doc) {
  console.error(`No project with slug "${slug}"`);
  process.exit(1);
}

const filename = file.split("/").pop();
const asset = await client.assets.upload("image", fs.createReadStream(file), { filename });
await client.patch(doc._id).set({
  logo: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
}).commit();

console.log(`Swapped logo for "${doc.name}" -> ${asset._id}`);
