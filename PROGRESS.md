# Progress Log: feat/project-details

## Executive Summary
Rebuilt the portfolio Projects ecosystem to deliver complete, credible, information-first project detail pages and categorized project directory without overstating any claims.

## Completed Milestones

### 1. Planning & Architecture (PLAN.md)
- Established data model in `types/index.ts` with strict bilingual typing (`Bilingual`, `BilingualParagraphs`, `AccessState`, `ProjectStatus`, `StackLayer`, etc.).
- Completed Step 0 mapping table matching every card to source projects.
- Established rename table with CamelCase domain+function conventions.
- Identified and isolated 7 known conflicts with explicit evidence handling.
- Inspected and characterized `public/project.png` as decorative banner (16:9 desktop, 4:3 mobile, eager loaded, no deceptive captions).

### 2. Private Source-Map & Denylist Protection
- Created git-ignored `app/data/private/source-map.ts` documenting internal folder and project mappings.
- Implemented build-time validator `scripts/project-validator.mjs` scanning the full static output directory `out/` for denylist violations (`FoodKing`, `HexaRide`, `ARCUS`, `InfixEdu`, `InfyCare`, `SalonHub`, `longclaw`, `yourusername`, `support@bluevision.io`).
- Verified all 89 output files pass with 0 denylist matches.

### 3. Truth-First Project Data Model (`app/data/projects.ts`)
- Configured all 16 projects:
  - **Core SaaS / Web Products**: Dossera JAMS, PWADC Marketplace, ClinicFlow, EduManage, LegalFlow, StyleBook, KombatSushi, SECUDRIVE, BlueVision.
  - **Also Built (Mobile / Academic)**: AutoDeal (PFE), CourierGo, RideLink, SECUDRIVE Mobile.
  - **Workflows & Automation**: EvolutionAgent (103 nodes), SalesBot (30 nodes), N8nLibrary (293 curated templates).
- Validated external links:
  - `https://kombatsushi.com/` (HTTP 200 - Live status & external link active)
  - `https://github.com/ZakariaMirinioui/BlueVision` (HTTP 200 - View source repo link active)
- Applied grouped stacks, capabilities, user roles, honest integration states (`dependency present` vs `configured and verified`), evidence notes, and local setup steps where documented.

### 4. Detail Page Rebuild (`app/[locale]/projects/[project]/page.tsx`)
- Structured strict section ordering:
  1. Header with logo tile, state-driven access controls (`Live`, `View source`, `Private` lock pill), title, summary, and context line.
  2. Confirmed metadata grid + platform.
  3. Hero image banner with eager loading and dark/light overlay gradient.
  4. Overview in natural paragraphs.
  5. What it does (capabilities grouped by workflow).
  6. Who uses it (role cards).
  7. Key metrics (owner-provided values only).
  8. How it is built (grouped stack chips + inline SVG architecture diagrams with theme-aware styling).
  9. Integrations with honest state tags.
  10. What is verified (honest Evidence panel).
  11. My role section.
  12. External links.
  13. Related slugs, variants, and experience cross-links.
  14. Collapsible local setup steps.
  15. Prev/Next navigation and CTA.

### 5. Projects Directory & Categorization (`app/[locale]/projects/ProjectsClient.tsx`)
- Computed filter pills and dynamic counts.
- Dynamic layout:
  - "All" filter displays Core Products grid, followed by "Also Built" (AutoDeal, CourierGo, RideLink, SECUDRIVE Mobile), and "Workflows & Automations" (EvolutionAgent, SalesBot, N8nLibrary).
  - Category filters (Mobile, Automation, Judicial, Healthcare, etc.) display filtered sets cleanly.
  - Dual-locale support for titles, summaries, and categories.

### 6. Cross-Links & Full Parity
- Work experiences on Home (`app/components/pages/Job.tsx`) and About (`app/components/sections/ExperienceTimeline.tsx`) cross-link to Dossera JAMS, BlueVision, and PWADC Marketplace.
- About page's `FeaturedWork.tsx` reads directly from `app/data/projects.ts` (`featuredProjects`).
- French translation key parity verified at 438 keys (`scripts/check-i18n-keys.mjs`).

### 7. Visual QA & Verification
- Playwright captured 24 full-resolution screenshots covering Projects, KombatSushi, SECUDRIVE, ClinicFlow, AutoDeal, and BlueVision across 1440px and 390px in both Light and Dark themes.
- Zero layout shift, full keyboard accessibility, AA contrast, and preserved circuit animations.
- Production static export (`next build`) builds 49 static pages with zero errors.

### 8. Phosphor Project Icons, Setup Steps Transfer & Redesigned Mobile Sidebar
- **Phosphor Project Logos**: Replaced generic `/project.png` in logo tiles across directory and detail headers with dedicated, curated Phosphor icons matching each domain:
  - AutoDeal: `Car` (Automotive marketplace)
  - CourierGo: `Package` (Courier delivery worker)
  - RideLink: `Taxi` (Ride-sharing and parcel)
  - BlueVision: `Monitor` (Digital signage management)
  - EvolutionAgent: `WhatsappLogo` (Conversational WhatsApp agent)
  - SalesBot: `ChatCircleDots` (AI sales bot)
  - N8nLibrary: `TreeStructure` (Workflow blueprints library)
- **Interactive SetupSteps Component**:
  - Implemented [app/[locale]/projects/[project]/SetupSteps.tsx](file:///C:/Users/ziko9/Desktop/Projects/Web%20Dev/Portofolio%20example/app/[locale]/projects/[project]/SetupSteps.tsx) with floating hover tooltip message on *"Show setup steps"*.
  - For Dossera (`/projects/dossera`), renders *"View on-premise case study →"* with hover guidance and direct transfer to `/dossera`.
- **Mobile Sidebar Drawer Redesign**:
  - Completely redesigned [app/components/global/MobileMenu.tsx](file:///C:/Users/ziko9/Desktop/Projects/Web%20Dev/Portofolio%20example/app/components/global/MobileMenu.tsx).
  - High-end glassmorphism right-aligned drawer with dimmed backdrop blur.
  - Active route highlighting with emerald pill tint and glowing pulse indicator.
  - Seamless language switcher segmented control (`English` / `Français`) embedded directly inside the drawer.
  - Live availability badge with animated pulse dot and direct quick-contact icons.
- **Surge.sh Deployment Ready**: Full production export (`npm run build`) validated with 49 static pages, 89 denylist-scanned files, zero errors.
