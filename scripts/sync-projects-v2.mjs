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

async function uploadLogo(filename) {
  const path = `${ASSETS}/${filename}`;
  if (!fs.existsSync(path)) {
    console.log(`  Logo file missing: ${filename} (skipping)`);
    return null;
  }
  const asset = await client.assets.upload(
    "image",
    fs.createReadStream(path),
    { filename }
  );
  console.log(`  Uploaded logo ${filename} -> ${asset._id}`);
  return asset._id;
}

async function patchProject(id, patch) {
  await client.patch(id).set(patch).commit();
}

async function run() {
  // 1. Rename existing projects (keep _id so testimonial/client refs survive)
  const renames = [
    { oldSlug: "doctor-pwadcteam", name: "ClinicFlow", newSlug: "clinicflow" },
    { oldSlug: "school-pwadcteam", name: "EduManage", newSlug: "edumanage" },
    { oldSlug: "avocat-pwadcteam", name: "LegalFlow", newSlug: "legalflow" },
    { oldSlug: "salon-pwadcteam", name: "StyleBook", newSlug: "stylebook" },
    { oldSlug: "spa-pwadcteam", name: "SpaFlow", newSlug: "spaflow" },
  ];

  for (const r of renames) {
    const doc = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{ _id, name }`,
      { slug: r.oldSlug }
    );
    if (!doc) {
      const already = await client.fetch(
        `*[_type == "project" && slug.current == $slug][0]{ _id, name }`,
        { slug: r.newSlug }
      );
      console.log(already ? `OK ${r.name} already renamed (${already._id})` : `MISSING project with slug ${r.oldSlug}`);
      continue;
    }
    await patchProject(doc._id, {
      name: r.name,
      slug: { _type: "slug", current: r.newSlug },
    });
    console.log(`Renamed "${doc.name}" -> "${r.name}" (${r.newSlug})`);
  }

  // 2. Upload + attach real logos
  const logoMap = [
    { slug: "dossera", file: "dossera-logo.png" },
    { slug: "edumanage", file: "PWADCTEAMSCHOOL-logo.webp" },
    { slug: "stylebook", file: "PWADCSalon-logo.png" },
    { slug: "kombatsushi", file: "kombat-sushi logo.jpg" },
  ];

  for (const entry of logoMap) {
    const doc = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{ _id, name, logo }`,
      { slug: entry.slug }
    );
    if (!doc) {
      console.log(`MISSING project ${entry.slug} (cannot attach logo)`);
      continue;
    }
    if (doc.logo) {
      console.log(`OK ${doc.name} already has a logo (skipping)`);
      continue;
    }
    const assetId = await uploadLogo(entry.file);
    if (!assetId) continue;
    await patchProject(doc._id, {
      logo: { _type: "image", asset: { _type: "reference", _ref: assetId } },
    });
    console.log(`Attached logo to ${doc.name}`);
  }

  // 3. SECUDRIVE mobile project
  const secudriveExisting = await client.fetch(
    `*[_type == "project" && slug.current == "secudrive"][0]{ _id }`
  );
  let secudriveId = secudriveExisting?._id;
  if (!secudriveId) {
    const secudriveLogo = await uploadLogo("SECUDRIVE-ouside-logo.png");
    const created = await client.create({
      _type: "project",
      name: "SECUDRIVE",
      slug: { current: "secudrive" },
      tagline: "Secure ride-hailing mobile app for riders & drivers",
      category: "mobile",
      status: "active",
      featured: true,
      clientType: "own-product",
      role: "founder",
      teamSize: 2,
      duration: "Ongoing",
      techStack: ["Flutter", "Dart", "Supabase", "GetX", "Google Maps", "PostgreSQL", "Lottie"],
      metrics: [
        { label: "App Screens", value: "35+", description: "Rider + driver flows in one codebase" },
        { label: "Platforms", value: "3", description: "Android, iOS and Web from a single codebase" },
        { label: "Auth", value: "PKCE", description: "Supabase auth with secure PKCE flow" },
        { label: "Live Tracking", value: "Real-time", description: "Maps, geolocation, routing & ETAs" },
      ],
      ...(secudriveLogo
        ? { logo: { _type: "image", asset: { _type: "reference", _ref: secudriveLogo } } }
        : {}),
      projectUrl: "",
      repository: "",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "SECUDRIVE is a secure ride-hailing mobile app built with Flutter, covering both sides of the marketplace in a single codebase: riders can request rides with live tracking, saved places and spending analytics, while drivers get earnings dashboards, performance insights, vehicle management and ride history.",
            },
          ],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "The backend runs on Supabase (auth with PKCE, Postgres, realtime), navigation and state are handled with GetX, and the maps experience uses Google Maps with geolocation, geocoding and route polylines. The app ships with light/dark themes, deep linking, and full onboarding from splash to role selection.",
            },
          ],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "As founder and lead developer I designed the dual rider/driver architecture, the 35+ screen route map, and the Supabase data model. Mobile demo available on request — store listings forthcoming.",
            },
          ],
        },
      ],
    });
    secudriveId = created._id;
    console.log(`Created SECUDRIVE (${secudriveId})`);
  } else {
    console.log(`OK SECUDRIVE already exists (${secudriveId})`);
  }

  // 4. PWADC Team Marketplace project
  const marketplaceExisting = await client.fetch(
    `*[_type == "project" && slug.current == "pwadc-marketplace"][0]{ _id }`
  );
  if (!marketplaceExisting) {
    const storeLogo = await uploadLogo("PwadcTeamStore-logo.webp");
    const created = await client.create({
      _type: "project",
      name: "PWADC Team Marketplace",
      slug: { current: "pwadc-marketplace" },
      tagline: "Trilingual marketplace to buy & sell scripts, themes & apps",
      category: "ecommerce",
      status: "production",
      featured: true,
      clientType: "own-product",
      role: "founder",
      teamSize: 3,
      duration: "Ongoing (2023 - Present)",
      techStack: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
      metrics: [
        { label: "Products Listed", value: "200+", description: "Scripts, themes, Flutter apps & templates" },
        { label: "Languages", value: "3", description: "English, French and Arabic storefront" },
        { label: "Currencies", value: "3", description: "MAD, EUR and USD checkout" },
        { label: "Own Products", value: "5", description: "Shipped with live preview links" },
      ],
      ...(storeLogo
        ? { logo: { _type: "image", asset: { _type: "reference", _ref: storeLogo } } }
        : {}),
      projectUrl: "https://pwadcteam.com",
      repository: "",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "PWADC Team Marketplace (pwadcteam.com) is a trilingual digital marketplace to buy and sell scripts, themes, Flutter apps and templates, with multi-currency checkout (MAD/EUR/USD), author storefronts, carts, collections and a become-an-author program.",
            },
          ],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "My own verified author storefront lists the ClinicFlow, EduManage, LegalFlow and StyleBook systems — each shipping with a live preview link — alongside a restaurant management suite. Every listing pairs documentation with a working demo so buyers can try before they buy.",
            },
          ],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "As founder I run the full commercial loop: product development, packaging, documentation, live demo deployments, and post-sale support for buyers across Morocco and beyond.",
            },
          ],
        },
      ],
    });
    console.log(`Created PWADC Team Marketplace (${created._id})`);
  } else {
    console.log(`OK marketplace already exists (${marketplaceExisting._id})`);
  }

  console.log("Sync complete!");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
