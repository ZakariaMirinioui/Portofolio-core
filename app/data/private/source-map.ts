// PRIVATE source map — git-ignored. Never render these values.
// Maps each portfolio displayName to its original source name / folder / namespace.
// The build must work without this file; original names never appear in pages,
// slugs, meta tags, Open Graph data, JSON-LD, alt text, image file names,
// the sitemap, or shipped comments.
export const SOURCE_MAP: Record<string, { sourceName: string; folder?: string; namespace?: string }> = {
  autodeal: { sourceName: "Project ARCUS / PFE", folder: "Web Dev/Project-ARCUS" },
  courierGo: { sourceName: "FoodKing delivery app", folder: "Mobile Dev/foodking-delivery-app" },
  rideLink: { sourceName: "HexaRide user app", folder: "Mobile Dev/HexaRide-User-app-release-3.2" },
  secudriveMobile: { sourceName: "SECUDRIVE rider/driver Flutter app", folder: "Mobile Dev/SECUDRIVE" },
  kombatsushi: {
    sourceName: "Kombat Sushi customer apps",
    folder: "Mobile Dev/Kombat-sushi_customer-app / Mobile Dev/KombatSushiApp-old / Mobile Dev/kombat test",
  },
  bluevision: { sourceName: "BlueVision", folder: "Web Dev/BlueVision", namespace: "BlueVision-codebase" },
  clinicflow: { sourceName: "InfyCare (doctor)", folder: "Web Dev/doctor" },
  edumanage: { sourceName: "InfixEdu (school)", folder: "Web Dev/school" },
  legalflow: { sourceName: "Advocate SaaS (avocat)", folder: "Web Dev/avocat" },
  stylebook: { sourceName: "SalonHub (Spa)", folder: "Web Dev/Spa" },
  pwadcMarketplace: { sourceName: "Digital marketplace (marktplace)", folder: "Web Dev/marktplace" },
};
