# French (EN/FR) Internationalization — Full Implementation Plan

> **Project**: Zakaria Mirinioui Portfolio
> **Stack**: Next.js 14.2.3 (App Router) · TypeScript · Tailwind · Sanity · `next-intl` 4.14.9 · **static export** (`output: "export"`, deployed to surge.sh)
> **Goal**: Make the entire portfolio bilingual (English + French), auto-detect the visitor's browser language, and place a language switcher in the top bar where the "Download CV" button currently sits.
> **Status**: Approved plan — execute part by part.

---

## 1. Executive Summary

The site currently has **zero wired i18n**. Three translation files exist (`messages/en.json`, `messages/fr.json`, `messages/ar.json`) but no component imports them — every string is hardcoded English. This plan connects `next-intl` to the app, moves all routes under a `[locale]` segment, adds browser-language auto-detection, replaces the navbar CV button with a language switcher, and translates every page.

Because the site is **statically exported**, there is **no server runtime**: no middleware, no API routes, no server actions, no rewrites. This is the single most important constraint and it drives every architectural choice below.

---

## 2. Goals & Non-Goals

### Goals
- Full EN + FR content across **every page and component**.
- Auto-detect browser language (`navigator.languages`) and serve the right locale on first visit.
- Language switcher in the **navbar**, in the exact position of the current compact "Download CV" button.
- Preserve/extend SEO: per-locale metadata, `hreflang`, canonical, localized JSON-LD, localized sitemap.
- Correct French typography (non-breaking spaces before `? ! : ;`) and locale-aware dates/numbers.
- Keep `ar.json` **dormant** but design the codebase to be RTL-ready for a future Arabic phase.

### Non-Goals
- Arabic/RTL implementation (deferred; `ar.json` stays unused).
- Translated URL slugs (`/fr/a-propos`) — internal paths stay English, only the prefix changes.
- Moving off static export.
- Rebuilding the CMS data model (Sanity content stays as-is with English fallbacks).

---

## 3. Locked Decisions

| # | Decision | Choice | Rationale |
|---|----------|--------|-----------|
| D1 | URL strategy | **`/en/` + `/fr/`** (both prefixed, `localePrefix: "always"`) | Static export cannot run middleware, so the default-locale redirect cannot be negotiated server-side. Always-prefix guarantees every generated URL maps to a real pre-rendered file. |
| D2 | Language scope | **English + French only** | `fr.json` is complete. Arabic needs RTL, a font, and mirrored layout — separate phase. |
| D3 | Contact form backend | **Third-party form service** (Formspree / Web3Forms / Getform) | API routes are dead on static export. Client-side POST to a hosted endpoint needs no backend. |
| D4 | CV placement | **CV stays on the About page only** (hero, sidebar, closing band, sticky mobile) | Navbar gains the language switcher; CV is already well-placed on About. |
| D5 | Root `/` | Redirect to `/en/` | Required because `localePrefix: "always"` means `/` has no locale. |

---

## 4. Hard Constraints (read before coding)

1. **No middleware / proxy** — static export does not run it.
2. **No API routes** — `app/api/contact/route.ts` and `app/api/revalidate/route.ts` do not function in the exported site. The contact form is **already broken today** and will be replaced (D3).
3. **No server actions** — same reason.
4. **No rewrites** — no `pathnames` translation, no URL rewrites.
5. **Locale must be in the URL** — the `[locale]` segment is the source of truth.
6. **Static rendering required** — in Next.js 14 you **must call `setRequestLocale(locale)`** in every layout/page that uses `getTranslations`/`useTranslations`. Without it, pages opt into dynamic rendering and break the export.
7. **`params` is a plain object in Next 14** (not a `Promise`).
8. **`trailingSlash: true`** — every internal link, canonical, hreflang, and sitemap URL must end with `/` for non-root paths.
9. **`revalidate = 3600`** is a no-op under static export — remove it.
10. **`images.unoptimized: true`** must stay (required for static export).

---

## 5. Target Architecture

### 5.1 Routing

```
/                     → redirect to /en/   (app/page.tsx)
/en/                  → English (app/[locale]/page.tsx)
/en/about/            → About
/en/projects/         → Projects list
/en/projects/[slug]/  → Project detail
/en/services/         → Services
/en/dossera/          → Dossera
/fr/...               → French equivalents
/en/nope/ , /fr/nope/ → localized 404
```

### 5.2 Folder layout (target)

```
app/
  layout.tsx                  ← NEW thin root layout (html/body + inline detect script)
  page.tsx                    ← NEW root redirect → /en/
  not-found.tsx               ← keep (global 404 fallback)
  sitemap.ts                  ← REWRITE (locale matrix)
  robots.ts                   ← keep (minor update)
  providers.tsx               ← keep
  icon.svg                    ← keep
  utils/  lib/  animation/  styles/  assets/  data/   ← keep
  [locale]/
    layout.tsx                ← NEW real UI shell (NextIntlClientProvider + Navbar/Footer + JSON-LD)
    page.tsx                  ← moved from app/page.tsx
    loading.tsx               ← moved
    not-found.tsx             ← moved (localized)
    about/        page.tsx, loading.tsx        ← moved
    projects/     page.tsx, loading.tsx, ProjectsClient.tsx   ← moved
    projects/[project]/ page.tsx, loading.tsx  ← moved
    services/     page.tsx, loading.tsx        ← moved
    dossera/      page.tsx, loading.tsx        ← moved
i18n/
  routing.ts                  ← NEW
  request.ts                  ← NEW
  navigation.ts               ← NEW
messages/
  en.json  fr.json  ar.json   ← keep (add missing keys)
lib/
  metadata.ts                 ← NEW (canonical/hreflang helpers)
  alternates.ts               ← NEW (hreflang builder)
app/components/global/
  LanguageSwitcher.tsx        ← NEW (replaces CvDownload in Navbar)
  HtmlLang.tsx                ← NEW (client; sets <html lang> fallback)
```

> **Layout caveat**: Next.js requires exactly one root layout. We use a **thin** `app/layout.tsx` (`<html>`/`<body>` + the inline detection script) and a **nested** `app/[locale]/layout.tsx` that owns the provider, navbar, footer, and localized JSON-LD. Verify with `next build`; if Next rejects this split, fall back to putting `<html lang={locale}>` inside `app/[locale]/layout.tsx` and removing the thin root layout (see Phase 1, Step 8).

---

## 6. File Manifest

### 6.1 Create
| File | Purpose |
|------|---------|
| `i18n/routing.ts` | `defineRouting` config (`locales`, `defaultLocale`, `localePrefix: "always"`) |
| `i18n/request.ts` | `getRequestConfig` — loads + merges messages per locale |
| `i18n/navigation.ts` | `createNavigation` wrappers (`Link`, `usePathname`, `useRouter`, `getPathname`) |
| `app/[locale]/layout.tsx` | Real UI shell |
| `app/[locale]/page.tsx` | Home (moved) |
| `app/[locale]/loading.tsx`, `not-found.tsx` | Moved |
| `app/[locale]/about/page.tsx`, `loading.tsx` | Moved |
| `app/[locale]/projects/page.tsx`, `loading.tsx`, `ProjectsClient.tsx` | Moved |
| `app/[locale]/projects/[project]/page.tsx`, `loading.tsx` | Moved |
| `app/[locale]/services/page.tsx`, `loading.tsx` | Moved |
| `app/[locale]/dossera/page.tsx`, `loading.tsx` | Moved |
| `app/page.tsx` | Root redirect → `/en/` |
| `app/components/global/LanguageSwitcher.tsx` | Language switcher |
| `app/components/global/HtmlLang.tsx` | Client `<html lang>` setter |
| `lib/metadata.ts` | `getCanonicalUrl`, `getAlternateUrls` |
| `lib/alternates.ts` | `alternatesFor(locale, href)` |
| `scripts/check-i18n-keys.mjs` | Key-parity CI check |

### 6.2 Modify
| File | Change |
|------|--------|
| `next.config.js` | Wrap with `createNextIntlPlugin("./i18n/request.ts")` |
| `app/layout.tsx` | Become thin root layout + inline detection script |
| `app/components/global/Navbar.tsx` | Swap `CvDownload` → `LanguageSwitcher`; use i18n `Link`; translate skip link/aria |
| `app/components/global/NavLinks.tsx` | i18n `Link`/`usePathname`; translate labels |
| `app/components/global/MobileMenu.tsx` | i18n navigation; translate labels; add switcher |
| `app/components/global/Footer.tsx` | Translate "Built with:" + copyright |
| `app/components/global/Theme.tsx` | Translate aria-label |
| `app/components/transitions/PageTransition.tsx` | i18n navigation; locale-aware paths |
| `app/components/cv-download/CvDownload.tsx` | Translate labels; locale-aware default |
| All `app/components/sections/*` | Replace hardcoded strings with `t()` |
| All `app/components/shared/*` | Replace hardcoded strings with `t()` |
| All `app/components/pages/*` | Replace hardcoded strings with `t()` |
| `app/providers.tsx` | Wrap with `NextIntlClientProvider` (or keep in `[locale]/layout`) |
| `app/sitemap.ts` | Locale × path matrix |
| `app/robots.ts` | Minor (keep both locales indexable) |
| `app/api/contact/route.ts` | **Delete** (dead) or leave unused |
| `app/api/revalidate/route.ts` | **Delete** (dead) |
| `messages/en.json`, `messages/fr.json` | Add missing keys (see §20) |

### 6.3 Delete
- `app/api/contact/route.ts` (replaced by third-party form service)
- `app/api/revalidate/route.ts` (no-op under static export)
- `revalidate = 3600` exports on pages (no-op)

---

## 7. Phase 0 — Preparation

- [ ] Create branch `feat/i18n-fr` off current `main`.
- [ ] Tag current HEAD as `pre-i18n` (rollback anchor).
- [ ] Confirm `npm run build` is green **before** changes (baseline).
- [ ] Confirm `node_modules/next-intl` is `4.14.9` and peer-compatible with Next 14 (verified: yes).
- [ ] Ensure `messages/fr.json` and `messages/en.json` have **identical key sets** (run a diff; fix gaps).
- [ ] Back up `public/downloads/*.pdf` (untouched by this work).

---

## 8. Phase 1 — Scaffold next-intl

**Goal**: Get `next-intl` wired with zero behavior change.

- [ ] **1.1** Create `i18n/routing.ts`:
  ```ts
  import { defineRouting } from "next-intl/routing";
  export const routing = defineRouting({
    locales: ["en", "fr"],
    defaultLocale: "en",
    localePrefix: "always", // REQUIRED for output:"export"
  });
  ```
- [ ] **1.2** Create `i18n/request.ts`:
  ```ts
  import { getRequestConfig } from "next-intl/server";
  import { hasLocale } from "next-intl";
  import { routing } from "./routing";

  export default getRequestConfig(async ({ locale }) => {
    const valid = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
    const base = (await import(`../messages/${valid}.json`)).default;
    const fallback = (await import("../messages/en.json")).default;
    return { locale: valid, messages: { ...fallback, ...base } };
  });
  ```
- [ ] **1.3** Create `i18n/navigation.ts`:
  ```ts
  import { createNavigation } from "next-intl/navigation";
  import { routing } from "./routing";
  export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
  ```
- [ ] **1.4** Update `next.config.js`:
  ```js
  const createNextIntlPlugin = require("next-intl/plugin");
  const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
  const nextConfig = {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true, remotePatterns: [/* keep existing */] },
  };
  module.exports = withNextIntl(nextConfig);
  ```
- [ ] **1.5** Create `app/layout.tsx` (thin root) with inline detection script (see §9).
- [ ] **1.6** Create `app/page.tsx` root redirect:
  ```tsx
  import { redirect } from "next/navigation";
  export default function Root() { redirect("/en/"); }
  ```
- [ ] **1.7** Run `npm run build`. Expect success. If Next complains about a missing root layout or a duplicate `<html>`, apply the fallback in 1.8.
- [ ] **1.8** (Fallback) Move `<html lang={locale}>` + `<body>` into `app/[locale]/layout.tsx` and delete the thin `app/layout.tsx`; rely on the inline script for `/` detection.

**Exit criteria**: `npm run build` succeeds; `out/en/` exists; `/` redirects to `/en/`.

---

## 9. Phase 2 — Route Restructure into `[locale]`

**Goal**: Move all routes under `app/[locale]/`.

- [ ] **2.1** `git mv` every route file (see §6.1) into `app/[locale]/...`.
- [ ] **2.2** Create `app/[locale]/layout.tsx`:
  ```tsx
  import { NextIntlClientProvider } from "next-intl";
  import { setRequestLocale, getMessages } from "next-intl/server";
  import { hasLocale } from "next-intl";
  import { notFound } from "next/navigation";
  import { routing } from "@/i18n/routing";
  import { Providers } from "@/app/providers";
  import Navbar from "@/app/components/global/Navbar";
  import Footer from "@/app/components/global/Footer";

  export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
  }

  export default async function LocaleLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { locale: string };
  }) {
    const { locale } = params;
    if (!hasLocale(routing.locales, locale)) notFound();
    setRequestLocale(locale); // REQUIRED in Next 14 for static rendering
    const messages = await getMessages();
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Providers>
          <Navbar />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </Providers>
      </NextIntlClientProvider>
    );
  }
  ```
- [ ] **2.3** Update `app/[locale]/projects/[project]/page.tsx` `generateStaticParams` to the locale × project cross-product:
  ```ts
  export async function generateStaticParams() {
    const projects = await sanityFetch<Array<{ slug: string }>>({ query: projectsQuery, tags: ["project"] });
    return routing.locales.flatMap((locale) =>
      projects.map((p) => ({ locale, project: p.slug }))
    );
  }
  ```
  Add `locale` to the page `Props` type and call `setRequestLocale(locale)`.
- [ ] **2.4** Remove `export const revalidate = 3600;` from all pages (no-op).
- [ ] **2.5** Run `npm run build`. Expect `out/en/`, `out/fr/`, `out/en/projects/<slug>/`, `out/fr/projects/<slug>/`.

**Exit criteria**: Both locales build; every route exists under both prefixes.

---

## 10. Phase 3 — Auto-Detection, Root Redirect, Language Switcher

### 10.1 Inline detection script (`app/layout.tsx` `<head>`)
Runs before paint; sets `<html lang>` and redirects only when needed. No localStorage on first visit; localStorage wins after an explicit switch.

```html
<script id="locale-detect" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `
(function () {
  try {
    var SUPPORTED = ['en','fr'], DEFAULT = 'en', KEY = 'locale';
    var seg = location.pathname.split('/')[1];
    if (SUPPORTED.indexOf(seg) !== -1) { document.documentElement.lang = seg; return; }
    var stored = localStorage.getItem(KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) { document.documentElement.lang = stored; return; }
    var langs = navigator.languages || (navigator.language ? [navigator.language] : []);
    for (var i = 0; i < langs.length; i++) {
      var base = (langs[i] || '').split('-')[0].toLowerCase();
      if (SUPPORTED.indexOf(base) !== -1) {
        document.documentElement.lang = base;
        location.replace('/' + base + (location.pathname === '/' ? '/' : location.pathname) + location.search);
        return;
      }
    }
    location.replace('/en/' + location.search);
  } catch (e) {}
})();`}} />
```
> Keep `<html lang="en" suppressHydrationWarning>` as the SSR default; the script overrides it before paint.

### 10.2 `app/components/global/HtmlLang.tsx`
Client component that, on mount, syncs `document.documentElement.lang` from `useLocale()`. Guards against hydration mismatch.

### 10.3 `app/components/global/LanguageSwitcher.tsx` (NEW, client)
- Mirrors the compact CV button styling exactly: `flex items-center gap-x-2 font-incognito font-semibold rounded-md border border-transparent dark:bg-primary-bg bg-zinc-100 dark:text-zinc-100 text-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 min-h-11 px-3 text-sm`.
- Trigger: `Globe` icon + current locale code (`EN`/`FR`) + `CaretDown`.
- Dropdown: `English` / `Français` with `Check` on the active one; `role="menu"`, `role="menuitem"`, `aria-current`.
- Keyboard: ArrowUp/Down, Enter/Space, Escape, Tab; click-outside close; focus return to trigger.
- Uses `usePathname`/`useRouter` from `@/i18n/navigation`; navigates to the same internal path under the other locale.
- Persists choice to `localStorage["locale"]`.
- **No emoji flags** (Windows Chrome renders them as letters) — use text codes `EN`/`FR`.

### 10.4 Navbar swap (`app/components/global/Navbar.tsx`)
- Remove `import CvDownload` and `<CvDownload variant="compact" className="hidden md:flex" />`.
- Add `<LanguageSwitcher className="hidden md:flex" />` in the same `<div className="flex items-center gap-x-4">`.
- Switch `next/link` → `@/i18n/navigation` `Link`.

### 10.5 Mobile menu (`app/components/global/MobileMenu.tsx`)
- Add a `<LanguageSwitcher />` row inside the mobile menu (below nav links) so mobile users can switch.
- Translate all labels; use i18n navigation.

**Exit criteria**: FR-preferring browser lands on `/fr/`; switcher preserves path; no flash of wrong language; keyboard accessible.

---

## 11. Phase 4 — Per-Locale Metadata, hreflang, JSON-LD

### 11.1 Add a `metadata` namespace to `messages/en.json` + `fr.json`
Keys (per locale): `siteTitle`, `siteDescription`, `siteName`, `keywords[]`, and `home/about/projects/services/dossera` `{title, description}`.

### 11.2 Convert static `metadata` exports → `generateMetadata`
For each page (`home`, `about`, `projects`, `projects/[project]`, `services`, `dossera`):
```ts
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = "/about"; // internal, no prefix, no trailing slash
  return {
    title: t("about.title"),
    description: t("about.description"),
    alternates: {
      canonical: getCanonicalUrl(locale, path),
      languages: getAlternateUrls(path), // { en, fr, "x-default" }
    },
    openGraph: {
      title: t("about.title"),
      description: t("about.description"),
      url: getCanonicalUrl(locale, path),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}
```

### 11.3 Helpers
- `lib/metadata.ts`: `getCanonicalUrl(locale, path)`, `getAlternateUrls(path)`, `ensureTrailingSlash`.
- `lib/alternates.ts`: `alternatesFor(locale, href)` → `{ en, fr, "x-default" }`.
- Fix `metadataBase` to the origin once (`https://zakariamirinioui.surge.sh`).
- Fix `openGraph.locale` format to `en_US` / `fr_FR` (underscore).
- Create `public/og.png` (1200×630) — currently referenced but missing. Ideally `og-en.png` / `og-fr.png`.

### 11.4 Localized JSON-LD
Move the `jsonLd` object out of `app/layout.tsx` into `app/[locale]/layout.tsx` as a server component using `getTranslations({ locale, namespace: "jsonLd" })`. Localize `jobTitle`, `org.description`, `addressLocality`. Use **absolute** URLs for `image`/`logo` (schema.org requirement). Add `inLanguage: locale`.

**Exit criteria**: Every page emits correct `<title>`, `canonical`, `hreflang` (en/fr/x-default), `og:locale`, and localized JSON-LD in both locales.

---

## 12. Phase 5 — Sitemap & Robots

### 12.1 `app/sitemap.ts`
- Build a locale × path matrix for static routes: `/`, `/about`, `/projects`, `/services`, `/dossera`.
- Add dynamic project routes: `/projects/<slug>`.
- **Remove** non-existent routes (`/projects/<slug>/case-study`, `/services/<slug>`).
- Each entry: `url`, `lastModified`, `changeFrequency`, `priority`, and `alternates.languages` (`en`, `fr`, `x-default`).
- Append trailing slashes to match `trailingSlash: true`.

### 12.2 `app/robots.ts`
- Keep `allow: "/"` (covers `/fr/`). No change required; optionally add `host`.

**Exit criteria**: `out/sitemap.xml` contains both `/en/...` and `/fr/...` entries with matching alternates; every `<loc>` returns 200.

---

## 13. Phase 6 — Translate Global Components

All strings → `t()` (client: `useTranslations`; server: `getTranslations`).

| File | Strings |
|------|---------|
| `Navbar.tsx` | "Skip to main content", logo aria-label |
| `NavLinks.tsx` | Home/About/Projects/Services/Dossera |
| `MobileMenu.tsx` | nav labels, "Open/Close navigation menu", "Navigation menu" |
| `Footer.tsx` | "Built with:", copyright with `{year}` |
| `Theme.tsx` | "Toggle Theme" |
| `CvDownload.tsx` | "Download CV", "Saved", "English", "Français", aria-label |
| `PageTransition.tsx` | dynamic `target.title` (no literal) |
| `LanguageSwitcher.tsx` | "Language switcher", "Current language: …", "(current)" |

Use i18n `Link`/`usePathname`/`useRouter` everywhere navigation happens.

---

## 14. Phase 7 — Home Page (`app/[locale]/page.tsx`)

- Hero headline/subheadline: `home.hero.*` (Sanity fallback → EN keys).
- StatsBar: `home.stats.*`.
- ValueProps: `home.valueProps.*` (titles, descriptions, highlights[], cta).
- CaseStudyTeaser: `home.caseStudyTeaser.*` + `caseStudy.caseStudyLabel`.
- ServicesOverview: `home.servicesOverview.*`.
- TestimonialsCarousel: `home.testimonials.title` + carousel aria-labels/fallbacks.
- ClientLogos: `home.clientLogos.title`.
- Job: `job.*` (Work Experience, Present, empty states, logo alt).
- GitHub analytics: `github.*` (all labels, aria-labels, plurals).
- ContributionGraph: `github.contributionGraph*`.
- NextPageTeaser: `nextPageTeaser.continueTo` + target title/description.

---

## 15. Phase 8 — About Page

- AboutHero: `about.subtitle` (interpolate `{name}`, `{location}`), `about.specialties`, `about.bioExtended`, `about.viewProjects`, `common.contact`.
- KpiStrip: `kpiStrip[]`.
- ExperienceTimeline: `experienceTimeline[]` + title/subtitle.
- FeaturedWork: `featuredWork[]` + title/subtitle/viewProject.
- StackGrid: `stackGrid[]` + title/subtitle.
- ClosingBand: `about.closingBand.text`, contact/projects.
- AboutSidebar: `about.*` (job title, badges, languages[], credentials[], education, certifications, portrait alt).
- CV download stays here (hero, sidebar, closing band, sticky mobile).

---

## 16. Phase 9 — Projects Page + Detail

- Projects page heading: `projects.title`, `projects.description`.
- ProjectsClient: `projects.categories.*`, `projects.status.*`, `projects.categoryLabels.*`, `projects.featured`, `projects.viewDetails`, `projects.detailsArrow`, `projects.featuredAriaLabel`, `projects.categoriesAriaLabel`, `projects.emptyStateMessage`.
- Project detail: `projectDetail.*` (meta labels, live/code/case study, private tooltip, tech stack, key metrics, screenshots, architecture, alt texts, not found).
- NextPageTeaser → Services.

---

## 17. Phase 10 — Services Page

- Heading: `services.title`, `services.description`.
- Service cards (Sanity): `services.categories.*`, `services.sections.*` (deliverables/process/engagementModels/techStack), `services.engagementModels.*`, `services.bestFor`, `common.featured`.
- Testimonials: `services.testimonials.title`.
- Client logos: `services.clientLogos.title`.
- CTA: `services.cta.*`.
- NextPageTeaser → Dossera.

---

## 18. Phase 11 — Dossera Page + Form

- Heading/identity: `dossera.title`, `dossera.subtitle`, `dossera.status`, `dossera.liveDemo`, `dossera.cta.requestDemo`, `dossera.callUs` (interpolate `{phone}`).
- What is Dossera: `dossera.whatIsDossera`, `dossera.description.intro/role/results`.
- Features: `dossera.features.*`.
- Deployments: `dossera.deployments.*`.
- Services: `dossera.services.*`.
- Architecture: `dossera.architecture.*`, `dossera.techStack[]` (localize category labels).
- Timeline: `dossera.timeline.*`.
- Testimonials: `dossera.testimonials.title`.
- Contact form: `dossera.contactForm.*` (title, description, fields, roles, placeholders, submit, submitting, success, successDescription, anotherRequest, privacy, errorFallback).
- NextPageTeaser → Home.

---

## 19. Phase 12 — Contact Form Backend (D3)

- [ ] Remove the `fetch("/api/contact")` call from `DosseraContactForm.tsx`.
- [ ] Add a client-side POST to the chosen service (Formspree / Web3Forms / Getform) using its endpoint (e.g. `https://formspree.io/f/<id>`).
- [ ] Include `locale`, `name`, `email`, `organization`, `role`, `phone`, `message`, and the honeypot field in the payload.
- [ ] Map service responses to the localized success/error states already designed.
- [ ] Keep client-side validation; the service provides spam protection.
- [ ] Delete `app/api/contact/route.ts` and `app/api/revalidate/route.ts`.
- [ ] Add `trackDemoRequested` / `trackContactFormSubmitted` analytics with `locale`.

**Exit criteria**: Form submits successfully on static hosting; success/error messages localized.

---

## 20. Phase 13 — SEO, Formatting & Edge Cases

- [ ] **French typography**: non-breaking space (`\u00A0`) before `? ! : ;` and inside `« »` in `fr.json` (or a `frTypography()` helper via `t.rich`).
- [ ] **Dates/numbers**: replace hardcoded `en-US` in `app/utils/date.ts` and `readTime.ts` with locale-aware formatting (`Intl.DateTimeFormat(locale, …)` / `useFormatter`). French decimals use comma; grouping uses narrow no-break space.
- [ ] **CV file sizes**: `CvDownload.formatSize` uses `.` decimal → `Intl.NumberFormat(locale)`.
- [ ] **Missing translations**: `i18n/request.ts` merges EN as fallback; add `getMessageFallback` + `onError` handling.
- [ ] **Hydration**: never read `localStorage`/`navigator` during render; only in `useEffect`/inline script. Keep `suppressHydrationWarning`.
- [ ] **Analytics**: add `locale` to every event; normalize `source_page` to the internal pathname; wire `trackResumeDownloaded` in `CvDownload`.
- [ ] **SharePost**: fix hardcoded `.dev` domain → `window.location.origin` + locale-prefixed path (or remove if unused).
- [ ] **Vercel Analytics**: not mounted and useless on surge — remove or replace with a static-friendly option (optional).
- [ ] **RTL readiness**: add a `getDirection(locale)` helper (`"rtl"` for `ar`) and a comment marking logical-property conversion points, so a future Arabic phase is mechanical.
- [ ] **Trailing slashes**: audit every internal `Link`, canonical, hreflang, sitemap URL.

---

## 21. Phase 14 — Testing & QA

### Automated
- [ ] `scripts/check-i18n-keys.mjs` — assert `en.json` / `fr.json` key parity; block CI on mismatch.
- [ ] `npm run build` green; verify `out/en/`, `out/fr/`, `out/404.html`, `out/sitemap.xml`, `out/robots.txt`.
- [ ] `next lint` + `tsc --noEmit`.
- [ ] Metadata assertion script: fetch built `out/en/about/index.html` and `out/fr/about/index.html`; assert localized `<title>`, `canonical`, `hreflang`, `og:locale`, and parseable JSON-LD.
- [ ] Sitemap test: every `<loc>` returns 200 and has matching `xhtml:link` alternates.

### Manual (per locale EN + FR)
- [ ] `/` redirects to `/en/`; `/fr/` loads French.
- [ ] Switcher preserves path (`/en/projects/x/` ↔ `/fr/projects/x/`).
- [ ] Auto-detect sends FR-preferring browsers to `/fr/`; explicit choice is respected; no redirect loop.
- [ ] `<html lang>` and `<title>` correct on every page.
- [ ] Canonical + hreflang correct on every page.
- [ ] OG/Twitter cards localized with a valid image.
- [ ] JSON-LD validates and is localized.
- [ ] Localized 404 for unknown paths in both locales.
- [ ] Loading states localized.
- [ ] French typography correct; dates/numbers formatted for `fr`.
- [ ] CV labels localized; correct PDF per locale.
- [ ] Contact form submits and shows localized success/error.
- [ ] No console hydration warnings; Lighthouse SEO ≥ 95 on both locales.

---

## 22. Phase 15 — Rollback & Deploy

- [ ] Commit in small, revertable units (see §23).
- [ ] Tag `pre-i18n` before merging; merge only after a Surge preview passes §21.
- [ ] Rollback options: `git revert <sha>`, `git checkout pre-i18n && npm run build`, or a `public/_redirects` kill switch (`/fr/* /en/:splat 302`) without a rebuild.
- [ ] No Sanity schema/content changes → CMS data untouched.

---

## 23. Suggested Commit Sequence

1. `chore: scaffold next-intl (routing/request/navigation/config)`
2. `refactor: move routes under [locale] + generateStaticParams`
3. `feat: root redirect + browser-language detection`
4. `feat: language switcher replaces navbar CV button`
5. `feat: per-locale metadata + hreflang + canonical`
6. `feat: localized JSON-LD`
7. `feat: localized sitemap + robots`
8. `feat: translate global chrome (nav, footer, theme, CV)`
9. `feat: translate home page`
10. `feat: translate about page`
11. `feat: translate projects + detail`
12. `feat: translate services page`
13. `feat: translate dossera page`
14. `fix: contact form via third-party service; delete dead API routes`
15. `feat: French typography + locale-aware formatting`
16. `chore: i18n key-parity CI + tests`
17. `chore: analytics locale-awareness + cleanup`

---

## 24. Appendix A — Missing Translation Keys (to add to `en.json` + `fr.json`)

The existing files cover most content. Add these (FR values proposed):

- `metadata.*` — site title/description/name/keywords + per-page title/description.
- `navigation.openMenu`, `navigation.closeMenu`, `navigation.menuAriaLabel`.
- `theme.toggleAriaLabel` — "Toggle Theme" / "Basculer le thème".
- `cv.download`, `cv.saved`, `cv.language.en`, `cv.language.fr`, `cv.menuAriaLabel`.
- `about.sidebarLabel`, `about.specialties`, `about.bioExtended`, `about.viewProjects`, `about.portraitAlt`, `about.jobTitleSubtitle`, `about.openToOpportunities`, `about.location`, `about.mobility`, `about.cvSectionTitle`, `about.languagesTitle`, `about.educationTitle`, `about.education.*`, `about.certificationsTitle`, `about.languages[]`, `about.credentials[]`, `about.closingBand.text`.
- `projects.categories.mobile`, `projects.categoryLabels.*`, `projects.viewDetails`, `projects.detailsArrow`, `projects.featuredAriaLabel`, `projects.categoriesAriaLabel`, `projects.emptyStateMessage`, `projects.nextPageTeaser.servicesDescription`.
- `projectDetail.notFound`, `projectDetail.meta.*`, `projectDetail.livePreview`, `projectDetail.comingSoon`, `projectDetail.private*`, `projectDetail.techStack`, `projectDetail.keyMetrics`, `projectDetail.screenshots`, `projectDetail.architecture`, `projectDetail.*Alt`.
- `services.categories.*`, `services.bestFor`, `services.nextPageTeaser.dosseraDescription`.
- `dossera.whatIsDossera`, `dossera.callUs`, `dossera.techStack[]`, `dossera.nextPageTeaser.homeDescription`, `dossera.contactForm.placeholders.*`, `dossera.contactForm.errorFallback`.
- `notFound.*`, `emptyState.*`, `testimonials.*`, `sharePost.*`, `easterEgg.imageAlt`, `job.*`, `github.*`, `loading.*`, `contactApi.*`, `nextPageTeaser.continueTo`, `kpiStrip[]`, `stackGrid[]`, `featuredWork[]`, `experienceTimeline[]`, `buymeacoffee.cta`.

## 25. Appendix B — Sanity Dynamic Content Strategy

Content served from Sanity (profile headline/bio, project name/tagline/description/metrics, services, testimonials) is **English-only**. This plan uses the existing English values as the source of truth and keeps the EN locale identical to today. For FR, either:
- (a) Accept English CMS content in the FR UI for now (fallback), or
- (b) Add localized fields (`headline_en`/`headline_fr`, etc.) to the Sanity schemas in a **follow-up phase**.

This plan implements (a) and documents (b) as the future path. No schema changes are made in this phase.

---

*Plan created: 2026-10-17 · Decisions D1–D5 locked · Execute phases 0 → 15 in order.*
