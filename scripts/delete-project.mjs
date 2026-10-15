import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const slug = process.argv[2];

if (!slug) {
  console.error("Usage: node --env-file=.env.local scripts/delete-project.mjs <slug>");
  process.exit(1);
}

const doc = await client.fetch(`*[_type == "project" && slug.current == $slug][0]{ _id, name }`, { slug });

if (!doc) {
  console.log(`No project with slug "${slug}" (nothing to delete)`);
  process.exit(0);
}

const refs = await client.fetch(
  `*[references($id)]{ _id, _type }`,
  { id: doc._id }
);

if (refs.length > 0) {
  console.log(`Project "${doc.name}" is referenced by ${refs.length} document(s):`);
  refs.forEach((r) => console.log(` - ${r._type} (${r._id})`));
  console.log("Aborting delete to protect references.");
  process.exit(1);
}

await client.delete(doc._id);
console.log(`Deleted project "${doc.name}" (${doc._id})`);
