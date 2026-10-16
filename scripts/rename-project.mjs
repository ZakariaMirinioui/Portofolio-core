import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const [oldSlug, newName, newSlug] = process.argv.slice(2);

if (!oldSlug || !newName || !newSlug) {
  console.error("Usage: node --env-file=.env.local scripts/rename-project.mjs <old-slug> <new-name> <new-slug>");
  process.exit(1);
}

const doc = await client.fetch(
  `*[_type == "project" && slug.current == $slug][0]{ _id, name }`,
  { slug: oldSlug }
);

if (!doc) {
  console.error(`No project with slug "${oldSlug}"`);
  process.exit(1);
}

await client.patch(doc._id).set({
  name: newName,
  slug: { _type: "slug", current: newSlug },
}).commit();

console.log(`Renamed "${doc.name}" -> "${newName}" (${newSlug})`);
