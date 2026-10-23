# Circuit System Rollout — PLAN

Branch `feat/circuit-system`. Ports the "Circuit traces family" (g2, g5, g6, g7, g9, g10, g11 + helpers + BASE CSS) into the site as **section-scoped, restrained, scroll-driven** decor that matches the hero-cube circuit identity. No code written before this plan.

---

## 0. Ground truth (corrections to the brief, verified in code)

1. **No standalone "corner circuits" were ever integrated.** Code-searched the repo: every circuit so far lives in `app/components/decor/SideCircuits.tsx` (fixed side rail/spine) plus the corner **glow gradients** (`emeraldGlow`/`gridPattern` radii) inside `CaseStudyTeaser.tsx`. What you remember as "corner traces" is almost certainly those glows. This plan replaces both with real traced corners.
2. **StatsBar has no count-up.** All 5 stat values are static text (`StatsBar.tsx`). The "pulse bursts when the counter finishes" trigger becomes: **a short node-pulse burst fires once when the stats block reveals** (equivalent drama, honest to the code).
3. **The header is in-flow, not fixed** (it scrolls away; `Navbar` is not sticky). Requirement "no decorated layer above header bottom" is naturally satisfied by section-scoping, but we still keep circuit layers strictly below the page top.
4. **Sticky right column is real content** on About (`AboutSidebar`: portrait card, CV card, contact/languages/certs — `sticky top-24`). It is *not* empty. The "sticky signature" therefore goes in the **column gap** between content grid `1.55fr` and `1fr` (gap-x-10 → ~40px confirmed usable strip), positioned to never sit under the sidebar cards.
5. **Nav active dot** currently *mounts/unmounts* per route (`NavLinks.tsx` conditional span). A pure-CSS dot-slide across items is impossible on remount. Adaptation: keep the conditional dot but give it a **one-shot pulse on mount** (CSS keyframe, no JS state). Listed in §7 as an accepted deviation.
6. **Theme toggle pulse along header border**: there is no fixed header rail to run a trace on. Implementation: one 2-px absolutely-positioned trace spanning the navbar's inner width inside `Navbar`, wired by a custom DOM event (`zm:theme-pulse`) dispatched from `Theme.tsx` onClick; `CircuitIsland` listens and replays one pulse lap. No shared-component state changes.
7. **`hiddenRoutes` in the Phase-1 config is inert** (static export layouts cannot read pathname) — superseded entirely by §3 (routes are declared per placement in code, not filtered at runtime).
8. Hero cube identity to match: stroke gradient `#27b173 → #1a663f → #26312d`, `strokeOpacity .6`, thin strokes (≈0.7px effective, minimum ~1px floor), solid `#27B173` node squares, one line weight everywhere.

## 1. Real section inventory (from the code, EN titles)

**Home (`app/[locale]/page.tsx`)**
- Hero (name/role + FlipWords + HeroAnimation cubes + email/social)
- `StatsBar` — 5 static stats
- `ValueProps` — "How I Can Help" (3 cards)
- `CaseStudyTeaser` — Dossera card (`relative overflow-hidden rounded-[24px]`, col 1: label pill + h2 + texts + 2×2 metric glass cards + CTAs; col 2: Dossera logo image + status pill). **Busy: keep additions minimal**
- `ServicesOverview` — "What I Build" (2-col cards)
- `ClientLogos` — **"Trusted by Clients" (keep clean, per brief)**
- `TestimonialsCarousel` — **keep clean**
- `ContributionGraph` — **keep clean**
- `Job` — "Work Experience" — 2-col cards with left stub axis at `left-9` and 80px initial boxes; h2 currently hardcoded (will not touch copy)
- `NextPageTeaser` → About ("Continue to About" CTA)

**About (`app/[locale]/about/page.tsx`)** — grid `[1.55fr_1fr] gap-x-10`; left col: `AboutHero` (h1 + buttons), `KpiStrip` (4 static KPIs), `ExperienceTimeline` (border-l axis, 12px dots, treelike `ol`), `FeaturedWork` (2 cards), `StackGrid` ("Stack", 5 groups on md:2/lg:3 grid), `ClosingBand` (card with CV/Contact/Projects buttons); right col: sticky `AboutSidebar`. Single `<Slide>` wraps the whole grid — per-section one-shot reveals must come from the circuit island's IO, not from adding new Reveal wrappers.

**Projects (`app/[locale]/projects/page.tsx`)** — `PageHeading`, `ProjectsClient`: featured grid `xl:3` (2 featured cards + empty 3rd column ✓), filter pill row (11 pills, client state), main grid `xl:3 md:2` (8 projects → last row: 2 cards + empty 3rd cell ✓), `NextPageTeaser` → Services.

**Services (`app/[locale]/services/page.tsx`)** — `PageHeading`, 4 service cards each with a numbered 1–4 process list (circles + `w-0.5` connectors), Engagement Models, Tech Stack, Testimonials, CTA card ("Ready to Start Your Project?" → "Start a Conversation"), `NextPageTeaser` → Dossera.

**Dossera (`app/[locale]/dossera/page.tsx`)** — hero with `DosseraLogo` (white chip: border token + `/dossera-lightmode.png`), overview slides, **Core Capabilities** — 6 cards (`md:2 lg:3`), **Production Deployments** (4-tile grid), **Technical Architecture** (5-col tech grid inside one bordered card), **Deployment Timeline** (numbered circles + `w-0.5 h-full` connectors), Testimonials, `DosseraContactForm` (success state swaps the whole block for a card), `NextPageTeaser` → Home.

Global: `Navbar` (in-flow ~97px, border-b, nav dot, LanguageSwitcher, Theme), `Footer` (clean per Phase-1 decision, g1 not ported).

## 2. Final placement map

Legend: variant g# = reference family; trigger names: `load` (hero, elite draw once on mount), `enter` (draw once when 25% visible), `enter-refade` (draw once, fade to rest 0.12 on exit), `scroll` (scroll-linked via `animation-timeline: view()` + JS fallback), `hover` (CSS-only on the element), `event` (island-triggered one-shot).

| # | Route · Section | Variant (g#) | Trigger | Notes / adaptation |
|---|---|---|---|---|
| 1 | Home · hero, right of cubes | g07 Chip core | load + drift + **cursor proximity 120px** (pointer:fine only) | fab 1 cube as micro-core, `#BFFFE3` veins |
| 2 | Home · hero top-left → nav underline stop | g02 Header roots | load | fades with hero exit; stops at header border |
| 3 | Home · StatsBar | g09 Routing field (sparse) | enter + one-shot node pulse burst (replaces count-finish) | hidden <1024 |
| 4 | Home · What I Build → Trusted by Clients gap | g11 Mirror crown | enter-refade | sits in inter-section whitespace, baseline-anchored |
| 5 | Home · Dossera card | g05 Corner ×2 (top-left, bottom-right) | enter (draw after card's `fadeSlideUp`, +200ms) | color `#BFFFE3`; one pulse toward the logo (col 2); 2–3 short traces leaving the logo block edges as if it were the chip |
| 6 | Home · Work Experience | g10 Pipeline trace | scroll | left column stub axis; node lights when card crosses viewport center; right column mirrors dimly (0.15 rest) |
| 7 | Home · Continue-to-About CTA | g05 Corner | hover only (dormant corner wakes) | arrow button is focus target; also on `:focus-visible` |
| 8 | About · column gap (≈40px strip) | g03-style vertical rail (Phase-1 rail idea reused) + dot synchronised with `ExperienceTimeline` dot markers | scroll | **the sticky-panel signature**; sits between columns, never under sidebar cards; falls back to border-aligned rail on md |
| 9 | About · hero top-right | g05 Corner | load | sits between text column and portrait column, under sidebar (transparent decor) |
| 10 | About · KpiStrip | g10 Pipeline (horizontal, quiet) | scroll | connects the 4 KPI cards' top edges through the card borders |
| 11 | About · Stack grid | g09 Routing field (sparse) | enter-refade | links neighbouring cards' nearest corners only, center gutters, avoids rows with `hover` cards? no — cards are static, safe |
| 12 | About · ExperienceTimeline | g10 Pipeline (vertical) | scroll-linked | replaces the flat `border-l` progression visually; dots light in sync (built-in wire target in `ExperienceTimeline`) |
| 13 | About · ClosingBand CTA | g05 Corner | hover (dormant→active) | |
| 14 | Projects · PageHeading right | g07 Chip core (compact) | load | **empty sx 3rd featured column as normal content** – core placed as a decorative grid child `xl-only` when featuredCount < 3 |
| 15 | Projects · filter pills row | g09-short trace row + pill pulse | event on category change | active pill ring-pulse once; corner flash one-shot on remounting cards (React `key`) staggered 120ms |
| 16 | Projects · each project card | g05 Corner (micro) | hover/focus only | CSS-only, draws top-left inside the border |
| 17 | Projects · empty last cell | g06 Nested rhombi (dormant) | static | xl-breakpoint cell; hidden when grid reflows to fewer columns |
| 18 | Projects · header area | g02 Header roots @0.5 opacity | load | very faint, per brief |
| 19 | Projects · Continue-to-Services CTA | g05 Corner | hover | mirrored from #7 |
| 20 | Services · header | g02 Header roots | load | |
| 21 | Services · process lists | g10 Pipeline (vertical) | scroll-linked | runs beside the 1–4 numbered circles' connector |
| 22 | Services · between the 4 cards | g10 Pipeline strips (horizontal) | enter-refade | connects card edges through the outer gutters only; **not** through center text |
| 23 | Services · final CTA card | g05 Corner | hover | dormant → draw on hover |
| 24 | Dossera · hero | g07 Chip core wrapping `DosseraLogo` (logo = wafer) | load + drift | |
| 25 | Dossera · Core Capabilities | g05 Corner micro + pulse lap across all 6 cards | enter | 6-corner circuit; pulse lap via `addressing` delays |
| 26 | Dossera · Production Deployments | g10 Pipeline (horizontal) | scroll | tiny nodes lighting as 4 regions cross center |
| 27 | Dossera · Technical Architecture | g09 Routing field (sparse) | enter | inside bordered card's underground, under grid |
| 28 | Dossera · Deployment Timeline | g10 Pipeline (vertical) | scroll-linked | along `w-0.5` connector, per spec |
| 29 | Dossera · Request a Demo form | g05 Corner (micro) | enter | fades to very low on form focus? — keeps 0.12 rest; crops fully on `:focus-within` of inputs |
| 30 | Dossera · Continue-to-Home CTA | g05 Corner | hover | dormant |

**Stay-clean (zero additions):** Home ClientLogos, Testimonials, ContributionGraph, ServicesOverview cards, AboutSidebar cards, Footer, headers/footers of every page beyond the placements above.

Viewport discipline: ≤3 visible circuit elements per viewport, ≤6 per page (Home #3–#7 = 5, About #8–#13 = 6, Projects #14–#19 = 6 exactly, others ≤6), no same variant twice in one viewport (About: KpiStrip vs ClosingBand both corner — geographic separation + one enters viewport when other has exited).

## 3. System architecture (new code)

```
config/decor.ts            (extend)   g2/g5/g6/g7/g9/g10/g11 generators + helpers, seeded R(s)
app/components/decor/
  CircuitFamily.tsx        server: pure functions → SVG strings/shapes for each g#
  Circuit.tsx              server: <Circuit variant= width= height= className= color= …/>
  CircuitIsland.tsx        client ~1.6KB: IntersectionObserver (mounts .is-live),
                           event listeners (zm:theme-pulse), visibilitychange pause,
                           reduced-motion + !- ScrollTimeline feature detection
app/styles/globals.css     (extend)  .z-root family + per-variant classes (port of BASE CSS)
```

- **Server-rendered only**: all geometry computed at build time via the seeded PRNG — nothing random in render, no pass-in of runtime data, zero hydration mismatch.
- `Circuit` renders `<div class="z-pad z-root">…</svg>`-shaped assemblies, `aria-hidden`, `pointer-events:none` (except its host placement), absolute within a `relative` host; z-index `-1` unless a spec row needs edge-overlap (never over text).
- **CSS classes ported as-is from BASE CSS** (`.z-root/.z-a/.z-b/.z-c/.z-d/.z-pad/.z-mv/.z-rv/.z-pu` + keyframes `z-mv/z-pu`); `.zc-*` Phase-1 classes stay until §commit-2 removes them (no collision — different prefixes).
- **CSS toning tokens**: light `--zm-line:#0f9d6b @ .4 → sub 400` / dark `--zm-line:#22c58a @ .6` + brighter node dots; inside the Dossera gradient card all layers forced to `#BFFFE3`; resting `--zm-o` 0.35–0.5; masks: top fade (breathing top edge), bottom fade, content-side cross-fade side).
- **Breakpoint hygiene from measured container** (1280 max-w + 64px gutters):
  - ≥1280: all placements active as mapped
  - 1024–1279: drop routing fields (#3, #11, #27) + gap/rail traces, shrink chips to ~70%; keep corners, crowns, pipelines
  - <1024: hero corners + crowns only; all mid-section traces removed
  - <760: tiny corners kept where they can't collide with text; **one per section max**; smaller chips (60%); no parallax; no sticky-signature; verified no horizontal scroll at 360/390/768.
- **Scroll-linked reveals** (`#12, #21, #28`): native via `animation-timeline: view(); animation-range: entry 20% exit 80%` when CSS.supports matches; **fallback**: the island applies `.is-live` → time-based draw. No JS scroll math.
- Existing reveal mechanism (`<Slide>` staggered) is reused for the *content*, circuits interface with it only via delays (never delay-clamped animations on real content).

## 4. Animation system

- **Draw-in**: every trace has `pathLength=1`; dash-draw `stroke-dashoffset 1→0`, 1.2–1.8s, staggered ≤3 per family, `cubic-bezier(.22,.61,.36,1)`; dots + pulses appear only while host carries `.is-live`.
- **Fade-out**: on host exit (>20px beyond bottom edge) host opacity animates to the resting `--zm-o 0.12`; on re-enter, only if the IO island refires alive (targets `is-live` only above the fold).
- **Pulses** (traveling dash, `keyframes z-mv`): only on g7 chips' fab, g5 corners' wake lap, Dossera capability lap, hero cube drift — capped to 2 pulsing concurrent per viewport via CSS `:has` selector count guard.
- **Cursor proximity (Home hero chip only)**: pointer `:hover` zone in a 120px invisible ring (pure CSS `:hover` on neighboring transparent overlay div, pointer-events only `pointer:fine`), no JS mousemove handlers.
- **Reduced motion** (`prefers-reduced-motion`): no `z-mv`/`z-pu` runs; all resting = fully drawn static lines; no parallax.
- **Stat/+KPI node pulse** (adaptation of count-finish): island adds `.z-live` on `CaseStudyTeaser/Job/KpiStrip` reveal; CSS keyframe bursts dots 3× then rests.

## 5. Performance & size budget (same gate as Phase 1)

| Item | Budget | How measured |
|---|---|---|
| Client JS added | **< 2KB gz** total (CircuitIsland only) | `next build` first-load delta |
| Added HTML per page | ≤ ~60KB gz | build output size |
| SVG elements per placement | ≤ ~150 nodes | count in devtools |
| Lighthouse perf Home/Services | ≥ −3 vs 5e72f9d baseline (mobile ≥93, desktop ≥97) | Lighthouse ladder |
| CLS | zero (fixed sizes/aria decorations, `overflow:hidden` hosts) | layout-shift CI check |
| Hydration | zero warnings | console grep in Playwright logs |

Re-checks: `visibilitychange` pause; `content-visibility:auto` on below-fold hosts; no `transition` on layout properties (only transform/opacity/dashoffset); `will-change` only during draw (`z-b` via CSS `will-change: stroke-dashoffset` then removed by `.is-done`).

## 6. Risks & mitigations

1. **RTL/FR text overlap** (crown sits between FR titles that run longer): all mid-section traces live in pure whitespace bands measured from code (section `mb-*` ≥ 20 = ≥80px); masks cropped 16px before any text column; QA matrix screenshot sweep on FR catches collisions.
2. **Sticky sidebar overlays the gap rail on short viewports**: rail lives in grid `gap`, under sidebar z-order; sidebar cards are opaque `bg` — worst case the rail is partially hidden behind a card = visually same as cut; masks make the cap fade soft.
3. **Dossera form success swap remounts section** (`formState` changes the whole block): corner is inside the block → naturally remounts; IO island tolerates re-init (single delegated listener on document, `MutationObserver`-free via event delegation on `.z-root` containers).
4. **Projects featured grid becomes 3-col with a decorative 3rd child**: on any filter/viewport reflow the decorative child hides or reflows harmlessly (grid child, not absolute); if a future 3rd featured project appears, the component accepts `hideCore` prop.
5. **i18n keys / lint guards**: no new i18n keys (icons/disc are decorative, `aria-hidden`); `npm run build` gates run (check-i18n, verify-cv, regression-guards).
6. **`animation-timeline` unsupported in Safari/Firefox <泉16**: fallback path verified by forcing `CSS.supports` false in a Playwright run.
7. **`group-hover` chains on Dossera CTA cards** already use `group` — our hover corners use a distinct `data-cc` selector to avoid coupling.

## 7. Execution order (each step = build + QA + commit + PROGRESS.md note)

1. **PLAN commit** (this file — you're reading it).
2. **System core**: port helpers + g2/g5/g6/g7/g9/g10/g11 into `config/decor.ts` (deterministic, seeded, typed `CircuitTrace`-compatible), add `CircuitFamily/Circuit/CircuitIsland.tsx`, `BASE CSS` port (`.z-*`) into globals.css; verify build + zero-JS-delta budget; unit-render each g# on every route before committing (no wire-up yet) — commit `system core`.
3. **Part 1 fix**: remove `<SideCircuits />` from `app/[locale]/layout.tsx`; strip `zc-*` block; note retirement of the fixed rail/spine (g3/g4 not in the shipped family; rail idea lives on in placement #8) — commit `part-1 section-scope fix`.
4. **Home placements** (#1–#7) — commit; **About** (#8–#13) — commit; **Projects** (#14–#19) — commit; **Services** (#20–#23) — commit; **Dossera** (#24–#30) — commit.
5. **Interactions layer**: hover corners (#7/#13/#19/#23/#30), card corners (#16), pill pulse (#15), nav dot pulse (deviation), theme-pulse wire, cursor chip (#1) — commit.
6. **QA pass**: matrix 360/390/768/1024/1280/1366/1440/1536/1920/2560 × light/dark × 5 routes × EN/FR × top/mid/bottom frames; Lighthouse before/after; reduced-motion + `animation-timeline` fallback forced run; budget assertions; PROGRESS.md QA note — commit. Screenshots saved under `artifacts/circuit-system/`.

> Open decision needed from you (non-blocking, will default if silent): **Phase-1 branch `project-finalisations` is still unpushed** — push it, or fold its 2 commits into this branch? Default: push as-is.
