# Project Details Rebuild — PLAN.md

Branch: `feat/project-details` (created from `feat/circuit-system`).
Rule: commit after each step; keep PROGRESS.md updated; do not touch unrelated files; do not change any circuit.

---

## 0. Ground truth (verified in code)

- Repo has NO `src/` directory; data lives in `app/data/`. I will honor the brief's intent by placing the private source map at `app/data/private/source-map.ts` (git-ignored) and the data file at `app/data/projects.ts`.
- Locales: `en`, `fr` only (`i18n/routing.ts`). `ar.json` exists as informational only (skipped by i18n checker).
- Static export: `output: "export"`, `trailingSlash: true`, images `unoptimized: true`. Build gates: `next lint`, `check-i18n-keys`, `verify-cv-downloads`, `regression-guards`, `next build`.
- Existing detail page: single route `app/[locale]/projects/[project]/page.tsx` used by KombatSushi and SECUDRIVE (and all cards). `generateStaticParams` maps every project slug × locale.
- `public/project.png`: 329 KB, dark background, large white "PROJECT" text with isometric circuit cubes/lines in green. GENERIC image — not a screenshot of any specific product. Per HERO IMAGE rules: decorative, `alt=""`, no caption/label implying it shows the product, used as the banner on every detail page.
- Existing detail-page defects to fix in the same pass: big hero image duplicates the logo; "Coming Soon" + "Private" imply a non-existent link; "1 Engineers" doesn't pluralize; category raw slugs shown; metadata not hidden when empty; stack chip row not grouped; page ends after stack + one metric; missing sections (Overview, What it does, Who uses it, Integrations, Evidence, My role, Links, Related, Run it locally, Prev/Next).

---

## 1. Route and component plan

### Routes
- `/:locale/projects` — Projects list page (existing `page.tsx` + `ProjectsClient.tsx`). Reads from the same data file.
- `/:locale/projects/[slug]` — Detail page (existing `[project]/page.tsx`). `generateStaticParams` from every public slug × locale. Draft slugs excluded.

### Components (new / rewritten)
- `app/data/projects.ts` — single typed data source (all projects, bilingual).
- `app/data/private/source-map.ts` — git-ignored; maps displayName → original source name/folder/namespace. Build works without it.
- `app/lib/project-validator.mjs` — build-time typed validator: required fields present in both languages, links https/non-empty, no draft referenced publicly, denylist strings absent from rendered output.
- `app/[locale]/projects/[project]/page.tsx` — rewritten detail page (15 sections, data-driven).
- Detail sub-components (kept in `app/components/projects/` or inline): `MetadataGrid`, `StackGroups`, `ArchitectureDiagram` (inline SVG), `EvidencePanel`, `KeyMetrics` (reuse style), `AccessControl` (state-driven), `ContextLabel`, `RelatedRow`, `PrevNext`.
- `app/[locale]/projects/ProjectsClient.tsx` — rewritten list/cards (computed +N counts, status pills, Details always, Live only when link exists, Source for BlueVision).
- i18n: `messages/en.json`, `messages/fr.json` — category labels, status labels, access labels, context lines, plural helper keys, section headings.

### Denylist (build-time scan, must FAIL build if found in output)
FoodKing, HexaRide, ARCUS, InfixEdu, InfyCare, SalonHub, longclaw, yourusername, support@bluevision.io. (Also private source names: never rendered.)

---

## 2. Data model (app/data/projects.ts)

Per project (typed):
- `slug`, `displayName`, `category` (key), `platform` (Web|Android|Cross-platform|Automation)
- `access` (live|repo|private|demo-on-request|coming-soon), `status` (Live|Delivered|Built|Archived), `statusConfirmed`, `visibility` (public|draft)
- `context` {en, fr} (owner-provided label; only where specified)
- `summary` {en, fr} (one sentence)
- `overview` {en: string[], fr: string[]} (2–3 sentences)
- `glance`: role?, client?, team?, duration? (confirmed values only; hidden when absent)
- `keyMetrics` (owner-provided only)
- `myRole` {en, fr} (from site content / what I provide only)
- `capabilities`: [{label{en,fr}, items[{en,fr}]}]
- `roles`: [{label{en,fr}}]
- `stack`: [{layer{en,fr}, items:string[]}] (grouped: Backend/Frontend/Data/Integrations/Tooling)
- `architectureNotes`, `integrations`: [{name{en,fr}, state:"dependency-present"|"configured-and-verified"}]
- `evidenceNotes` {en, fr}
- `setup?` {steps:string[]}
- `links`: {live?, repo?, demo?} (only LINKS or already on site)
- `relatedSlugs`, `relatedExperience?`, `variantNote?`
- `assets`: {logo, hero?, screenshots?}
- `unconfirmed`: string[] (field names flagged unconfirmed; dev overlay only, not production)

i18n strings (messages): category labels, status labels, access state labels, context labels, plural "engineer(s)", section headings, "View source", "Live", "Private", etc.

---

## 3. STEP 0 — Mapping table (portfolio card → source project)

| Card (slug) | Display name | Source project | Confidence | Basis |
|---|---|---|---|---|
| dossera | Dossera JAMS | not in fact sheets | — | Existing page/home are source of truth; reuse, add nothing |
| clinicflow | ClinicFlow | InfyCare (doctor) | proposed | Card: clinic management; Fact sheet: clinic/doctor practice mgmt |
| edumanage | EduManage | InfixEdu (school) | proposed | Card: school ERP; Fact sheet: school management |
| legalflow | LegalFlow | Advocate SaaS (avocat) | high | Card: legal practice mgmt; Fact sheet: legal-practice SaaS |
| stylebook | StyleBook | SalonHub (Spa) | medium | Card: salon & spa; Fact sheet: salon discovery/booking |
| pwadc-marketplace | PWADC Marketplace | Digital marketplace (marktplace) | LOW | Card says ERP/POS with live demos; fact sheet: digital-products marketplace — confirm |
| kombatsushi | KombatSushi → AutoDeal? No. KombatSushi stays? | Kombat Sushi customer apps | medium | Card: restaurant mgmt w/ POS/KDS; fact sheet: customer ordering apps — CONFLICT (ask) |
| secudrive | SECUDRIVE | logistics tracking system | high (page content) | Existing page/card only |
| — | SECUDRIVE Mobile | Mobile Dev/SECUDRIVE Flutter app | — | New entry |
| — | AutoDeal | Web Dev/Project-ARCUS (PFE) | — | New entry (Android car marketplace) |
| — | CourierGo | Mobile Dev/foodking-delivery-app | — | New entry (Flutter delivery worker) |
| — | RideLink | Mobile Dev/HexaRide-User-app-release-3.2 | — | New entry (Flutter ride/parcel) |
| — | BlueVision | Web Dev/BlueVision | high | Existing repo link given |

Renames (default → used):
- Project ARCUS/PFE → AutoDeal (alternatives CarLink, AutoMarket not needed)
- HexaRide → RideLink
- FoodKing → CourierGo
- SECUDRIVE Mobile app → "SECUDRIVE Mobile" (not confused with SECUDRIVE page)
- BlueVision, SECUDRIVE, KombatSushi keep names

New entries with no card today: AutoDeal, CourierGo, RideLink, SECUDRIVE Mobile, BlueVision, Automation (2 n8n workflows + templates library).

Placement: main grid (incl. BlueVision under Enterprise/Internal Tools); below main grid "Also built" group (AutoDeal, CourierGo, RideLink, SECUDRIVE Mobile); below it "Automation" group.

---

## 4. Rename table

| Source (private) | Display name (default) | Slug | Alternative if collision |
|---|---|---|---|
| Project ARCUS / PFE | AutoDeal | autodeal | CarLink, AutoMarket |
| HexaRide user app | RideLink | ride-link | GoRide, RideParcel |
| FoodKing delivery app | CourierGo | courier-go | DropRunner, DeliveryPilot |
| SECUDRIVE (Mobile Dev) | SECUDRIVE Mobile | secudrive-mobile | SafeRide, SECUDRIVE Rides |
| Kombat Sushi customer apps | KombatSushi | kombatsushi | — |
| BlueVision | BlueVision | bluevision | — |
| SECUDRIVE (logistics) | SECUDRIVE | secudrive | — |

No default collides with a well-known product, so defaults are used.

---

## 5. Conflicts (verify, report, do not resolve silently)

1. **Stack tags**: cards/existing KombatSushi page show React, Next.js, Node.js, PostgreSQL. Fact sheets: web projects Laravel/PHP; Kombat apps Flutter/React Native. → Use fact-sheet stacks; list every changed tag.
2. **SECUDRIVE naming**: two projects share the name. Existing page = logistics tracking (React, Spring Boot, REST/GraphQL, PostgreSQL). Flutter app = rider/driver ride-booking (Supabase), freelance. → Two separate entries. SECUDRIVE page built ONLY from existing page/card content. Do not use Brink's experience text.
3. **KombatSushi scope**: card says "Restaurant management system with POS and kitchen display". Fact sheet: customer ordering apps (menu, cart, delivery/takeaway, checkout, order tracking). No POS/KDS documented. → ASK whether POS/kitchen-display project exists elsewhere.
4. **Status**: cards/pages show "Production"; fact sheets don't confirm. → Data-driven status: Live (link verified), Delivered (confirmed), Built (source exists), Archived. KombatSushi = Live. Others keep "Production" owner-provided + flagged. New entries default Built.
5. **Counts**: "+N" counts and filter pill counts computed from data.
6. **Brink's**: experience entry (Apr–Jun 2025, Spring Boot, REST/GraphQL, React, PostgreSQL) vs BlueVision README (React, TS, Vite, Supabase, Xibo; no Spring Boot/GraphQL). → Report gap; do not edit experience text; ask which parts belong to BlueVision.
7. **AutoDeal domain**: README says "offers/listings"; I state car marketplace (sell/rent/buy), PFE. → Verify car-specific features vs source if reachable; otherwise use owner statement flagged, generic feature wording.

---

## 6. public/project.png description

- File: `public/project.png`, 329,020 bytes (~321 KB).
- Dimensions/content: dark background, large white "PROJECT" text (left), isometric circuit cubes/connected lines in green (right), small "+" markers in corners.
- Verdict: GENERIC, not a screenshot of any specific product. → Decorative: `alt=""`, no caption, no label/adjacent text implying it shows the product. Used as banner on every detail page.
- Per HERO IMAGE: pre-optimize to ~300 KB or less (already ~321 KB; keep original, optionally re-encode). Render as banner in rounded container, 16:9 desktop / 4:3 phone, explicit width/height, object-fit contain (nothing to crop), eager load. Check light/dark themes.

---

## 7. Risks

- Source folders reachable but must avoid .env/keys/seeds/SQL dumps; only READMEs/package.json inspected for stack verification.
- KombatSushi POS/KDS conflict unresolved → page keeps fact-sheet scope, flagged, reported.
- Thin pages (SECUDRIVE, SECUDRIVE Mobile, AutoDeal, CourierGo, RideLink, Automation) → shorter honest pages; questions logged in PROJECT_QUESTIONS.md.
- i18n key parity must be exact (en/fr); build fails otherwise.
- Denylist scan must pass; source names never rendered.
- Link checks: kombatsushi.com and github.com/ZakariaMirinioui/BlueVision must be reachable or flagged.
- Home page stats (25+ projects, 15+ delivered, 4 products, 8+ automations) must not change; report whether inventory supports them.
- Circuits must remain untouched and uncovered by new sections.

---

## 8. Deliverables

1. Data file + private source-map template + validator + detail components + updated Projects page + cross-links + i18n.
2. PLAN.md (this file) — final mapping, rename table, project.png description, conflict list, per-card/page diffs.
3. Claim audit table: every claim on every page with source (fact sheet / site content / owner statement).
4. PROJECT_QUESTIONS.md — per thin page, specific questions to enrich it.
5. Before/after screenshots: Projects + KombatSushi, SECUDRIVE, one Laravel web project, AutoDeal, BlueVision at 1440 & 390, light & dark.
6. Denylist scan result + two link-check results.
7. "Decisions needed" list.
