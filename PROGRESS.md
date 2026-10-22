# Home/Dossera Recovery Progress

## Phase 1: Safety & Discovery ✓
- [x] Git tag `pre-recovery-2026-10-22` exists
- [x] Branch `fix/home-dossera-recovery` exists
- [x] Fetched live site (zakariamirinioui.surge.sh) for reference

## Phase 2: Find Last Good State ✓
- [x] Identified commit that removed animated hero illustration: HeroSvg was always SVG with CSS animation (commit 210e71f)
- [x] Identified commit that removed display typeface treatment: Font config existed from start (commit 71c5515)
- [x] Documented findings in PROGRESS.md

## Phase 3: Restore Hero Animation ✓
- [x] Restored animated wireframe-cubes illustration component (HeroSvg with CSS stroke animation)
- [x] Created lazy-loading HeroAnimation wrapper with client-side mounting
- [x] Added static fallback for prefers-reduced-motion (global CSS + conditional rendering)
- [x] Commit: "restore: hero wireframe-cubes animation with lazy loading and reduced-motion support"

## Phase 4: Restore Display Font ✓
- [x] Verified font files/config (Incognito: bold 800, condensed 700, medium 600, regular 400)
- [x] Checked CSS variables and font-family assignments (globals.css h1-h4, Tailwind font-incognito)
- [x] Updated hero h1 to use font-bold (700/condensed) for display treatment
- [x] Ensured hero h1, section titles, card titles, stat numbers use display font
- [x] Commit: "restore: Incognito display font treatment for hero h1 (bold weight)"

## Phase 5: Fix Hero Alignment ✓
- [x] Removed `xl:justify-center` from hero section
- [x] Used `xl:justify-between` to align left column with container left edge
- [x] Restored two-column layout (text left, animation right)
- [x] Commit: "fix: hero container alignment with sections; update hero copy to honest version"

## Phase 6: Hero Copy ✓
- [x] Updated messages with honest copy: "Full stack developer." / "I build management software for courts, restaurants, clinics and growing businesses." + stats lines
- [x] Preserved old copy in git history
- [x] Commit: "fix: hero container alignment with sections; update hero copy to honest version"

## Phase 7: Stats Strip ✓
- [x] Created shared constants file: `app/data/home-stats.ts`
- [x] Restored 5-item strip: 25+ Projects, 30+ Clients, 10 Products, 8+ n8n, 4+ Years
- [x] Updated messages with new translation keys
- [x] Updated StatsBar to use shared constants and lg:grid-cols-5
- [x] Commit: "restore: stats strip with honest metrics from shared constants"

## Phase 8: Regression Guards ✓
- [x] Hero animation element exists check
- [x] Display font configuration verified (font files, CSS variables, layout)
- [x] Hero left edge alignment classes verified (xl:justify-between, no xl:justify-center)
- [x] Stats strip configuration verified (5 expected stats, shared constant usage)
- [x] No unresolved i18n keys check (excludes t() calls, namespace, labelKey, multi-line)
- [x] Added to build script as `regression-guards.mjs`
- [x] Commit: "ci: add regression guards for home page (animation, font, alignment, stats, i18n)"

## Decisions
- Live site has good hero/font but damaged Dossera section
- Current code had damaged hero/font and damaged Dossera
- Stats on live site (9+, 100+, etc.) are NOT the target - target is 25+/30+/10/8+/4+ from prompt
- Hero copy should be "Full stack developer. I build management software for courts, restaurants, clinics and growing businesses." + 2 lines
- Hero animation is SVG with CSS stroke-dashoffset animation (wireframe-cubes)
- Display font is Incognito with weights: bold(800), condensed(700), medium(600), regular(400)
- Hero h1 uses condensed (700) for display treatment

## Open Questions - RESOLVED
- [x] What exactly is the "wireframe-cubes" animation? → SVG stroke animation (existing HeroSvg)
- [x] Where is the shared constants file for stats? → Created `app/data/home-stats.ts`
- [x] Exact computed font styles from live site → Hero h1 uses font-bold (700/condensed), matching section titles

## Verification Commands
```bash
# Run regression guards
npm run regression:check

# Full build with all checks
npm run build
```

## Next Steps (NOT IN SCOPE)
- Dossera section redesign (separate task)
- Work Experience section
- GitHub Analytics section
- Visual screenshot baselines at 1440/768/390px light/dark (requires Playwright setup)