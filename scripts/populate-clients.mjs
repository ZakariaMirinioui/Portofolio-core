import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function createClients() {
  const clients = [
    {
      _type: "client",
      displayName: "Court of First Instance - Khouribga",
      website: "https://www.justice.gov.ma",
      industry: "government",
      size: "government",
      location: "Khouribga, Morocco",
      isPublic: true,
      projects: [
        { _type: "reference", _ref: "mORS4la0tH1FbdDKXaXXrt" }
      ],
      services: [
        { _type: "reference", _ref: "9w4x9fxYkdV6d5UAhEAyW8" }
      ],
    },
    {
      _type: "client",
      displayName: "Court of Appeal",
      website: "https://www.justice.gov.ma",
      industry: "government",
      size: "government",
      location: "Morocco",
      isPublic: true,
      projects: [
        { _type: "reference", _ref: "mORS4la0tH1FbdDKXaXXrt" }
      ],
    },
    {
      _type: "client",
      displayName: "Healthcare Network - Casablanca",
      website: "",
      industry: "healthcare",
      size: "enterprise",
      location: "Casablanca, Morocco",
      isPublic: true,
      projects: [
        { _type: "reference", _ref: "jBDwtB3mp8LqsYJHvva1hF" }
      ],
      services: [
        { _type: "reference", _ref: "jBDwtB3mp8LqsYJHvva2Cb" }
      ],
    },
    {
      _type: "client",
      displayName: "Private School - Rabat",
      website: "",
      industry: "education",
      size: "medium",
      location: "Rabat, Morocco",
      isPublic: true,
      projects: [
        { _type: "reference", _ref: "jBDwtB3mp8LqsYJHvva1nL" }
      ],
    },
    {
      _type: "client",
      displayName: "Law Firm - Marrakech",
      website: "",
      industry: "legal",
      size: "medium",
      location: "Marrakech, Morocco",
      isPublic: true,
      projects: [
        { _type: "reference", _ref: "jBDwtB3mp8LqsYJHvva1qp" }
      ],
    },
    {
      _type: "client",
      displayName: "Beauty Salon - Tangier",
      website: "",
      industry: "wellness",
      size: "small",
      location: "Tangier, Morocco",
      isPublic: true,
      projects: [
        { _type: "reference", _ref: "9w4x9fxYkdV6d5UAhEAxiR" }
      ],
    },
    {
      _type: "client",
      displayName: "Spa Center - Casablanca",
      website: "",
      industry: "wellness",
      size: "small",
      location: "Casablanca, Morocco",
      isPublic: true,
      projects: [
        { _type: "reference", _ref: "jBDwtB3mp8LqsYJHvva1uJ" }
      ],
    },
    {
      _type: "client",
      displayName: "KombatSushi Restaurant",
      website: "https://kombatsushi.com",
      industry: "hospitality",
      size: "small",
      location: "Morocco",
      isPublic: true,
      projects: [
        { _type: "reference", _ref: "9w4x9fxYkdV6d5UAhEAxxj" }
      ],
    },
  ];

  console.log(`Creating ${clients.length} clients...`);

  for (const c of clients) {
    try {
      const existing = await client.fetch(
        `*[_type == "client" && displayName == $name][0]`,
        { name: c.displayName }
      );
      if (existing) {
        console.log(`Skipping ${c.displayName} (already exists)`);
        continue;
      }
      const created = await client.create(c);
      console.log(`Created client: ${c.displayName} (${created._id})`);
    } catch (error) {
      console.error(`Failed to create client ${c.displayName}:`, error);
    }
  }

  console.log("Clients migration complete!");
}

createClients().catch(console.error);