# Sanity/Vercel Removal & Surge Deployment Readiness - Complete ✓

## What Was Done

### 1. Removed Sanity CMS Entirely
- Deleted `lib/sanity.client.ts`, `lib/sanity.query.ts`, `lib/sanity.image.ts`
- Deleted `sanity.config.ts`
- Deleted `schemas/` folder (all 7 schema files)
- Deleted `scripts/populate-sanity.mjs`, `scripts/delete-project.mjs`
- Removed `public/sanity.png`
- Removed `sanity` import from `types/index.ts` (replaced with local PortableTextBlock type)
- Removed Sanity remote pattern from `next.config.js`
- Removed `@sanity/*`, `next-sanity`, `sanity` npm packages

### 2. Removed Vercel Dependencies
- Removed `@vercel/analytics` npm package

### 3. Created Static Data Files (replacing Sanity CMS)
- `app/data/profile.ts` - Profile data (headline, bio, social links, etc.)
- `app/data/jobs.ts` - Work experience data (4 jobs)
- `app/data/projects.ts` - Projects data (8 projects with metrics, tech stack, gallery)
- `app/data/services.ts` - Services data (4 services with process, engagement models, certifications)
- `app/data/testimonials.ts` - Testimonials data (3 featured testimonials)
- `app/data/clients.ts` - Client logos data (8 clients)
- `app/data/home-stats.ts` - Stats strip data (5 honest metrics: 25+/30+/10/8+/4+)
- `public/malt-logo.svg` - Malt logo copied from Downloads

### 4. Updated All Components to Use Static Data
- `app/[locale]/page.tsx` - Home page uses static profile + testimonials, client component with `useTranslations`
- `app/[locale]/about/page.tsx` - About page uses static profile
- `app/[locale]/projects/page.tsx` - Projects page uses static projects
- `app/[locale]/projects/[project]/page.tsx` - Project detail uses static projects
- `app/[locale]/services/page.tsx` - Services page uses static services + testimonials
- `app/[locale]/dossera/page.tsx` - Dossera page uses static testimonials
- `app/components/pages/Job.tsx` - Uses static jobs data, letter initials instead of logos
- `app/components/sections/CaseStudyTeaser.tsx` - Redesigned Dossera JAMS case study card
- `app/components/sections/ServicesOverview.tsx` - Uses static featured services
- `app/components/sections/ClientLogos.tsx` - Uses static clients
- `app/sitemap.ts` - Uses static projects for sitemap generation
- `app/components/shared/CustomPortableText.tsx` - Removed @portabletext/react dependency
- `app/components/shared/CustomPortableTextFavicon.tsx` - Removed @portabletext/react dependency
- `app/components/shared/PortableImage.tsx` - Fixed image src handling
- `app/components/shared/ImageComponent.tsx` - Removed Sanity urlFor dependency
- `app/components/shared/Social.tsx` - Uses Malt logo (SVG file), renders all social icons as images
- `app/components/global/Footer.tsx` - Removed Sanity logo/link

### 5. Updated Types
- `types/index.ts` - Removed PortableTextBlock import from sanity, added local type definition
- Updated JobType endDate to accept `string | null`
- Updated ClientType ndaExpires to accept `string | null | undefined`

### 6. Updated package.json
- Removed: `@sanity/code-input`, `@sanity/image-url`, `@sanity/table`, `@sanity/vision`, `next-sanity`, `sanity`, `@vercel/analytics`, `@giscus/react`, `@portabletext/react`, `styled-components`
- Kept: `next`, `next-intl`, `react`, `react-dom`, `framer-motion`, `react-icons`, `react-github-calendar`, `sharp`, `autoprefixer`, `eslint`, `eslint-config-next`, `next-themes`, `postcss`, `react-refractor`, `tailwindcss`, `typescript`

### 7. Design Changes

**Dossera Section Color (#056d4e):**
- Added `dossera-color: "#056d4e"` to `tailwind.config.js`
- Updated all green elements in dossera/page.tsx to use `dossera-color`

**Dossera Logo Placement:**
- Updated `DosseraLogo.tsx` to use clean flex container instead of grid overlay

**Home Page Fonts:**
- Changed hero h1 from `font-bold` to `font-semibold` to match About page styling

**Experience Logos:**
- Removed image logos from Job component, replaced with letter initials (e.g., "P" for Palais de Justice)

**Malt Logo:**
- Added Malt entry to social.ts with link to Malt profile
- Updated Social.tsx to render Malt logo as SVG image

**Case Study Card (Dossera JAMS) Redesign:**
- Two-column layout on desktop (content left, glass logo panel right), stacked on mobile
- Rounded card (~24px radius), 1px translucent border, soft deep shadow, overflow hidden
- Rich green gradient background (linear-gradient(135deg, #04281E, #064430, #0B7A52))
- Blurred radial glows (emerald #2FE090 at 25% opacity, top-right and bottom-left)
- Subtle noise/grain overlay and faint grid/dot pattern
- Case Study chip (uppercase, letter-spacing, translucent white bg)
- Title "Dossera JAMS" (bold, white, large, tight tracking)
- Description in white at ~75% opacity
- 2x2 stat tiles (glass style with backdrop-blur, animated count-up on first view)
- Buttons side by side (primary solid mint, secondary ghost button)
- Glass logo panel (rgba(255,255,255,0.06), backdrop-blur 20px, Dossera wordmark centered)
- Emerald halo pulsing behind logo, light-sweep shimmer, concentric rings
- "JAMS v2.4" badge, "OPERATIONAL SYSTEM" pill with green status dot
- Light/dark theme support with different gradient depths

**Hero Text & Animation:**
- Updated hero text to: "Full Stack Developer & Digital Solutions Architect — Building enterprise-grade applications for judicial and secure logistics sectors"
- Added CSS fadeSlideUp entrance animation on first load

### 8. Build Verification
- `npm run build` - ✅ Compiles successfully
- `next lint` - ✅ No ESLint warnings or errors
- `node scripts/check-i18n-keys.mjs` - ✅ i18n key parity OK
- `node scripts/verify-cv-downloads.mjs` - ✅ CV downloads verified
- `node scripts/regression-guards.mjs` - ✅ All guards pass
- Static export: `output: "export"` in next.config.js - ✅ Ready for Surge deployment
- All 33 pages statically generated

### 9. Deployment Ready For Surge
- Static export configured (`output: "export"`)
- Image optimization disabled (`unoptimized: true`)
- No server runtime features
- No API routes
- All data is static (no CMS dependency)
- Build outputs to `out/` directory ready for `surge` upload
## feat: animated side circuit-trace decor (branch project-finalisations)

### Step 1 - Config, generators, component, CSS (complete)
- `config/decor.ts` (repo has no `src/`, adapted to root): `decorConfig { left: "rail", right: "spine", hiddenRoutes: [] }`, seeded deterministic trace generators (`railTraces`, `spineTraces`, mulberry-style PRNG, isometric projection) - no `Math.random`, build-time/server only.
- `app/components/decor/SideCircuits.tsx`: server component, mounted once in `app/[locale]/layout.tsx`; static SVG markup, zero client JS.
- CSS in `app/styles/globals.css`: `zc-*` classes, `--zm-line: #27b173` / `--zm-dot: #27b173` (hero cube stroke color) with `--zm-o: 0.8` opacity multiplier (matching hero cubes at strokeOpacity 0.6), top/bottom 8% container mask + inner content-side fade mask (-webkit- prefixed), `@media (min-width: 1520px)` show gate (contentMax 1280 + 2 x 120 gutter), print hidden, reduced-motion off.
- Measured: content max width 1280px (`max-w-7xl`), padding 64px (`md:px-16`), header z-30 transparent, page transition overlay z-[90].

### Step 2 - Visual verification, performance pass, build (complete)
- Playwright verification vs pre-change worktree (be708b1): 6 routes x light/dark x 1440/1920; screenshots in `docs/decor/` (before-*, after-*).
- Thresholds (measured, `min-w-7xl` = 1280px content max, min gutter 120px): hidden at 1024/1366/1440; shown at 1536 (128px), 1600 (160px), 1920 (rail 180px / spine 240px), 2560 (rail 180px / spine 240px). At 1440 the after page is pixel-identical to before (PSNR ~102 dB); at 1920 the content area matches before (diff map shows only font-antialiasing noise) - zero layout shift.
- Overlap audit over all routes x 1536/1920/2560 x both themes: zero content elements intersecting the gutter bands (one flagged testimonial paragraph proved to be an offscreen slide inside an overflow-hidden carousel - visually clean, see verify-testimonials-scroll-1920-dark.png).
- Theme vars: `--zm-line/--zm-dot: #27b173` (hero cube stroke + node color) with `--zm-o: 0.8` so traveler stroke lands at 0.6 effective opacity, matching the hero cubes; verified visually in both themes.
- Reduced motion: `zc-mv`/`zc-pu` animations go to `none`; dot rests at 0.5 opacity. Print: decor hidden (verified via print-media emulation).
- Keyboard: tab order unchanged (skip link first); decor is aria-hidden + pointer-events:none.
- Performance (4x CPU throttle, headless/SwiftShader - numbers noisy): decor roughly 2x frame time vs no-decor under throttle. Mitigation ladder executed: 22 animated paths removed (spine mini-branches are now static faint traces + pulsing dots, merged into the zc-c base path), layer promotion tested (no gain), contain unnecessary (fixed + overflow-hidden + mask already isolates). Real-GPU browsers have far cheaper compositing; recommend a quick manual check on hardware.
- Budgets (static export, per page): +20.3 KB uncompressed HTML, 184 SVG elements (rail ~71, spine ~113), zero client JS, zero hydration warnings, clean console (only pre-existing GitHub API 403 from react-github-calendar rate limiting, unrelated to decor).
- `npm run build` (lint + i18n guards + regression guards + next build + static export): pass.

## feat(decor): section-scoped circuit system (branch feat/circuit-system, PLAN.md-driven)

### Step 1 - PLAN.md (commit fe3e994)
- Full section inventory for Home/About/Projects/Services/Dossera + 30-row placement map, animation system, budget, risks, deviations (no counters -> one-shot stat pulses; nav dot mount/unmount -> one-shot pulse; theme pulse via zm:theme-pulse event).

### Step 2 - System core (this commit)
- config/decor.ts extended: faithful port of reference generators g2/g5/g6/g7/g9/g10/g11 + derived cornerMicro (card hover) and gapRail (About sticky-column signature, from g3 geometry). All seeded via existing createRng - deterministic, build-time only. enderCircuit(variant, uid) emits SSR SVG strings with uid-namespaced mask ids (safe multi-instance).
- Node smoke test (temp harness, repo typescript transpile): 9 variants render clean (no NaN/undefined), deterministic, uid-sensitive; headerRoots 4.8KB/svg, chip 5.9KB, routing 5.8KB, all <= ~70 SVG elements/placement (budget 150).
- pp/components/decor/Circuit.tsx: server component (dangerouslySetInnerHTML svg, aria-hidden, opts io/draw/fade).
- pp/components/decor/CircuitIsland.tsx: only client JS - IntersectionObserver toggles data-z-live/data-z-drawn on hosts, MutationObserver re-attach (Dossera form remount), visibilitychange pause (html.z-paused), zm:theme-pulse listener (one-shot lap). Shipped minified ~1.6KB (below 2KB budget).
- CSS engine in globals.css (z-* block after phase-1 zc-*): tokens light #0f9d6b@.42 / dark #22c58a@.5, z-mint (#BFFFE3 for green-gradient surfaces), BASE classes ported 1:1 (+ pathLength=1 on plumb lines for dash draw-in), reveal gating via data attributes (not className - fixes React hydration attr mismatch), draw-in transition (per-host --z-draw-delay/dur), exit fade to .12, z-cc micro-corner hover, z-theme lap, print/reduced-motion blocks.
- Dev-mode verification (Playwright, services temp strip, reverted): all 9 variants render; draw-in fires on scroll (9/9 drawn), live only while host in band (-12% margins); screenshots: temp amily-strip/v*.png; Fidelity visually matches reference (chip cube + child circuits, corner fade, mirrored crown).
- Island bug found: initial implementation used marker class .z-obs - StrictMode double-mount observed nothing after cleanup; fixed with idempotent io.observe.
- 
pm run build: pass (lint + i18n + CV + regression guards + static export), shared First Load JS unchanged 87.3 kB.
- Temp verification strip + dev servers removed; artifacts kept in temp dir only.

### Step 3 - Part 1 fix: fixed side rail/spine retired (this commit)
- Removed <SideCircuits /> mount + import from pp/[locale]/layout.tsx; deleted pp/components/decor/SideCircuits.tsx.
- config/decor.ts: removed Phase-1 exports (decorConfig, ailTraces, spineTraces, constants incl. inert hiddenRoutes); kept shared seeded helpers used by the family port; header comment documents the retirement rationale (fixed-position decor -> section-scoped system per PLAN.md; rail idea lives on as gapRail About signature).
- globals.css: deleted whole zc-* block (tokens now sourced from the z-* engine: light #0f9d6b@.42 / dark #22c58a@.5).
- Verified Playwright at 1920 light/dark (part1-after/* in temp): zero .zc-side elements, gutters clean, layout unchanged, console clean.
- 
pm run build: pass (lint + guards + 33 static pages), shared First Load JS unchanged 87.3 kB.
- Note: dev-server hiccup during verification = corrupted .next (prod build interleaved with dev); fixed by full .next delete + restart. Unrelated to code changes.
