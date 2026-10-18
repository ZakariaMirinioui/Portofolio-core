import { createClient } from "next-sanity";
import fs from "node:fs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const ASSETS = "C:/Users/ziko9/Desktop/Projects/Assets";
const TEMP = "C:/Users/ziko9/AppData/Local/Temp/opencode";

async function uploadImage(absPath, filename) {
  if (!fs.existsSync(absPath)) {
    console.log(`  File missing: ${absPath} (skipping)`);
    return null;
  }
  const asset = await client.assets.upload("image", fs.createReadStream(absPath), { filename });
  console.log(`  Uploaded ${filename} -> ${asset._id}`);
  return asset._id;
}

async function run() {
  // 1. StyleBook -> PWADC Salon
  const salon = await client.fetch(
    `*[_type == "project" && slug.current in ["stylebook", "pwadc-salon"]][0]{ _id, name }`
  );
  if (salon) {
    await client.patch(salon._id).set({
      name: "PWADC Salon",
      slug: { _type: "slug", current: "pwadc-salon" },
    }).commit();
    console.log(`Renamed -> PWADC Salon (pwadc-salon)`);
  } else {
    console.log("MISSING salon project");
  }

  // 2. SpaFlow -> Salon Hub + logo
  const spa = await client.fetch(
    `*[_type == "project" && slug.current in ["spaflow", "salon-hub"]][0]{ _id, name, logo }`
  );
  if (spa) {
    await client.patch(spa._id).set({
      name: "Salon Hub",
      slug: { _type: "slug", current: "salon-hub" },
    }).commit();
    console.log(`Renamed -> Salon Hub (salon-hub)`);
    if (!spa.logo) {
      const assetId = await uploadImage(`${ASSETS}/Salonhub.webp`, "salon-hub.webp");
      if (assetId) {
        await client.patch(spa._id).set({
          logo: { _type: "image", asset: { _type: "reference", _ref: assetId } },
        }).commit();
        console.log("Attached logo to Salon Hub");
      }
    } else {
      console.log("OK Salon Hub already has a logo");
    }
  } else {
    console.log("MISSING spa project");
  }

  // 3. Dossera -> trimmed tight logo (readable at card size)
  const dossera = await client.fetch(
    `*[_type == "project" && slug.current == "dossera-jams"][0]{ _id, name }`
  );
  if (dossera) {
    const assetId = await uploadImage(`${TEMP}/dossera-logo-trimmed.png`, "dossera-logo-trimmed.png");
    if (assetId) {
      await client.patch(dossera._id).set({
        logo: { _type: "image", asset: { _type: "reference", _ref: assetId } },
      }).commit();
      console.log("Replaced Dossera logo with trimmed version");
    }
  } else {
    console.log("MISSING dossera project");
  }

  console.log("Sync v3 complete!");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
