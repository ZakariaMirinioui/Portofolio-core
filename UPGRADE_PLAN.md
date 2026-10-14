# Zakaria Mirinioui — Portfolio Upgrade Master Plan

> **Goal**: Transform the current portfolio into a world-class, recruiter-magnet platform that positions Zakaria as a Solutions Architect / Technical Lead / Agency Founder.
>
> **Guiding Principles**:
> - No new visual styles — maintain current design system
> - Focus on content depth, credibility signals, and conversion
> - Every page must serve the narrative: "Solutions Architect / Agency Founder"
> - Phased execution — one phase at a time, verify before moving on

---

## Current State Inventory

### Existing Pages
| Page | Route | Status |
|------|-------|--------|
| Home | `/` | Headline + GitHub graph + Jobs |
| About | `/about` | Bio + photo + Usage + Heroes |
| Projects | `/projects` | List + detail (basic) |
| Dossera | `/dossera` | Comprehensive static page |
| Sanity Studio | `/studio` | CMS admin |

### Existing Schemas
- `profile` — basic bio, photo, resume
- `job` — work history
- `project` — name, tagline, description, cover image
- `heroe` — inspiration list
- `blockContent` — portable text

### New Schemas (Phase 1)
- `project` — extended with category, status, featured, techStack, metrics, role, teamSize, duration, clientType, gallery, architectureDiagram
- `caseStudy` — full case study with challenge, approach, architecture, ADRs, outcomes, metrics, testimonials
- `service` — agency service offerings with process, engagement models, certifications
- `testimonial` — client/colleague testimonials with ratings
- `client` — anonymized client references with NDA tracking

---

## Phase 1: Data Foundation (Schema + Content)

### 1.1 Schema Extensions ✅ DONE
- [x] Extended `project` schema with 15+ new fields
- [x] Created `caseStudy` schema (challenge, approach, architecture, ADRs, metrics, testimonials)
- [x] Created `service` schema (process, engagement models, certifications, clients)
- [x] Created `testimonial` schema (ratings, anonymous mode, permission tracking)
- [x] Created `client` schema (NDA tracking, industry, size, anonymization)
- [x] Updated `types/index.ts` with all new TypeScript types
- [x] Updated `sanity.query.ts` with queries for all new schemas
- [x] Registered all schemas in `schemas/index.ts`

### 1.2 Migration Scripts ✅ DONE
- [x] Created `scripts/populate-projects.mjs` — 8 projects with full data
- [x] Created `scripts/populate-services.mjs` — 4 service offerings with full process
- [x] Created `scripts/slugify.ts` — utility for slug generation

### 1.3 Data Population (PENDING — needs Sanity credentials)
- [ ] Run `populate-projects.mjs` — creates 8 projects:
  - Dossera JAMS (flagship)
  - Doctor.pwadcteam.com
  - School.pwadcteam.com
  - Avocat.pwadcteam.com
  - Salon.pwadcteam.com
  - Spa.pwadcteam.com
  - KombatSushi
  - 2 Open Source projects
- [ ] Run `populate-services.mjs` — creates 4 services:
  - Sovereign Digital Transformation
  - Multi-Tenant SaaS Development
  - Legacy Modernization & Cloud Migration
  - Technical Advisory & CTO-as-a-Service
- [ ] Create testimonials (need real client feedback)
- [ ] Create client references (anonymized)
- [ ] Create Dossera case study (link to existing `/dossera` page content)
- [ ] Update profile schema to include: certifications, speaking, timeline

---

## Phase 2: Pages & Narrative

### 2.1 Home Page Rewrite (`/`)
**Current**: Headline + GitHub graph + Jobs
**Target**: Solutions Architect / Agency Founder narrative

- [ ] Hero section rewrite:
  - Headline: "I help institutions & businesses digitize with sovereign, secure systems"
  - Subheadline: 2-3 lines positioning as Solutions Architect + Agency Founder
  - CTA buttons: "View Case Studies" + "Book a Consultation"
- [ ] Value props section (3 columns):
  - Enterprise Systems (Dossera, courts, government)
  - SaaS Products (5 live platforms, 100+ businesses)
  - Custom Engineering (full-stack, cloud, on-prem)
- [ ] Featured case study teaser (Dossera → link to case study)
- [ ] Stats bar: projects delivered, users served, uptime, team size
- [ ] Testimonials carousel (top 3 featured)
- [ ] Services overview (4 pillars → link to `/services`)
- [ ] Client logos strip
- [ ] CTA section: "Have a project in mind?" → contact

### 2.2 Projects Page (`/projects`)
**Current**: Basic list with logo + name + tagline
**Target**: Filterable, rich project cards with case study links

- [ ] Featured projects row (large cards with metrics, tech stack, links)
- [ ] Category filter tabs (All, Judicial, Healthcare, Education, Legal, Wellness, E-commerce, Open Source)
- [ ] Project cards with:
  - Logo, name, tagline
  - Status badge (Production, Active, etc.)
  - Category badge
  - Tech stack tags (first 6 + count)
  - Links: Live URL, GitHub, Case Study
  - Metrics preview (key numbers)
- [ ] ISR caching for performance

### 2.3 Case Study Page (`/projects/[slug]/case-study`)
**Current**: Does not exist
**Target**: Deep-dive case study template

- [ ] Hero: title, tagline, cover image, project meta (role, team, duration, client type)
- [ ] Client Context section
- [ ] The Challenge section
- [ ] Our Approach section
- [ ] Architecture Overview + diagrams
- [ ] Key Technologies table (name, category, why this choice)
- [ ] Architecture Decision Records (ADRs)
- [ ] Outcomes & Metrics (before/after comparisons)
- [ ] Testimonials (linked to project)
- [ ] Lessons Learned
- [ ] Gallery (screenshots)
- [ ] CTA: "Discuss your project" → contact form

### 2.4 Services Page (`/services`)
**Current**: Does not exist
**Target**: Agency/freelance service offerings

- [ ] Page heading: "How I Can Help"
- [ ] Service cards (4 pillars):
  - Sovereign Digital Transformation
  - Multi-Tenant SaaS Development
  - Legacy Modernization & Cloud Migration
  - Technical Advisory & CTO-as-a-Service
- [ ] Each service expands to show:
  - Full description
  - What we deliver (checklist)
  - Process timeline (step-by-step)
  - Engagement models (pricing approaches)
  - Tech stack
  - Related case studies
  - Related certifications
- [ ] CTA: "Start a project" → contact

### 2.5 About Page Enhancement (`/about`)
**Current**: Bio + photo + Usage + Heroes
**Target**: Complete professional profile

- [ ] Extended bio with career narrative
- [ ] Timeline component (education → roles → lead → founder)
- [ ] Certifications section (AWS, Azure, Scrum, etc.)
- [ ] Speaking & community section (conferences, meetups, open source)
- [ ] "How I Work" section (methodology, tools, communication style)
- [ ] Download CV button (already exists)
- [ ] Keep existing Heroes section

### 2.6 Dossera Page Enhancement (`/dossera`)
**Current**: Comprehensive static page (425 lines)
**Target**: Add interactive elements + lead capture

- [ ] Keep all existing content (features, deployments, services, tech stack, timeline)
- [ ] Add contact/demo request form:
  - Name, email, organization, role
  - Message textarea
  - Validation (React Hook Form + Zod)
  - API route → email notification (Resend/EmailJS)
  - Success/error states
- [ ] Add downloadable 1-pager PDF brochure
- [ ] Add architecture diagram (Mermaid or image)
- [ ] Add "Book a Demo" CTA with Cal.com embed (optional)
- [ ] Link to full case study when created

---

## Phase 3: Credibility & Conversion

### 3.1 Testimonials System
- [ ] Create `TestimonialsCarousel` component (auto-advance + manual controls)
- [ ] Add to Home page (top 3 featured)
- [ ] Add to Services page (per-service testimonials)
- [ ] Add to Dossera page (client feedback)
- [ ] Add to Case Study pages (project-specific)
- [ ] Anonymous mode support (hide name/photo, show role + org)

### 3.2 Client Logos Strip
- [ ] Create `ClientLogos` component
- [ ] Add to Home page
- [ ] Add to Services page
- [ ] Anonymized names where needed ("Court of First Instance — Khouribga")
- [ ] Hover tooltip with project count / industry

### 3.3 Dossera Contact Form
- [ ] Create `/api/contact` API route
- [ ] Form fields: name, email, organization, role, phone (optional), message
- [ ] Validation: Zod schema
- [ ] Email delivery: Resend or EmailJS
- [ ] Slack notification (optional webhook)
- [ ] Rate limiting (prevent spam)
- [ ] Success/error UI states
- [ ] Honeypot field (spam prevention)

### 3.4 Structured Data (JSON-LD)
- [ ] Person schema (name, jobTitle, url, sameAs links)
- [ ] Organization schema (PWADCTeam)
- [ ] Project schema (for each major project)
- [ ] Service schema (for each service offering)
- [ ] BreadcrumbList schema (for navigation)
- [ ] FAQPage schema (for future FAQ section)

### 3.5 SEO & Analytics
- [ ] `sitemap.xml` (dynamic, includes all pages + projects + case studies)
- [ ] `robots.txt`
- [ ] Event tracking:
  - `demo_requested` (contact form submission)
  - `project_viewed` (project detail page)
  - `case_study_read` (case study page)
  - `service_viewed` (service detail)
- [ ] Vercel Analytics (already installed)
- [ ] Open Graph images for all pages

---

## Phase 4: Polish & Scale

### 4.1 Performance
- [ ] ISR for all project pages (revalidate: 3600)
- [ ] Image optimization (already using Next.js Image)
- [ ] Font subsetting (Inter + Incognito)
- [ ] Bundle analysis (check for bloat)
- [ ] Lighthouse audit (target: 90+ all categories)

### 4.2 Accessibility
- [ ] WCAG 2.1 AA audit
- [ ] Focus states on all interactive elements
- [ ] Skip navigation link
- [ ] ARIA labels on icon buttons
- [ ] Color contrast verification
- [ ] Keyboard navigation testing

### 4.3 Internationalization (i18n)
- [ ] Setup `next-intl` or similar
- [ ] French translations (critical for Morocco/France market)
- [ ] Arabic translations (RTL support, critical for Morocco)
- [ ] Language switcher in Navbar
- [ ] hreflang tags for SEO

### 4.4 Blog / Insights (Future)
- [ ] `post` schema in Sanity
- [ ] Blog listing page (`/blog`)
- [ ] Blog post detail page (`/blog/[slug]`)
- [ ] RSS feed
- [ ] Categories: Architecture Decisions, Case Study Deep-Dives, Technical Tutorials

---

## Project Inventory (All Projects to Showcase)

### Enterprise / Government
| Project | URL | Status | Category |
|---------|-----|--------|----------|
| Dossera JAMS | dossera.surge.sh | Production | Judicial |

### PWADCTeam SaaS Suite
| Project | URL | Status | Category |
|---------|-----|--------|----------|
| Doctor | doctor.pwadcteam.com | Production | Healthcare |
| School | school.pwadcteam.com | Production | Education |
| Avocat | avocat.pwadcteam.com | Production | Legal Tech |
| Salon | salon.pwadcteam.com | Production | Wellness |
| Spa | spa.pwadcteam.com | Production | Wellness |

### E-commerce
| Project | URL | Status | Category |
|---------|-----|--------|----------|
| KombatSushi | kombatsushi.com | Production | E-commerce |

### Open Source
| Project | Repo | Status | Category |
|---------|------|--------|----------|
| Sanity Portfolio Starter | github.com/ZakariaMirinioui | Active | Open Source |
| Meilisearch Arabic OCR Pipeline | github.com/ZakariaMirinioui | Active | Open Source |

### Professional Profiles
| Platform | URL |
|----------|-----|
| GitHub | github.com/ZakariaMirinioui |
| LinkedIn | linkedin.com/in/zakaria-mirinioui |
| CV (EN) | Local file |
| CV (FR) | Local file |

---

## File Structure (Target)

```
app/
├── page.tsx                    # Home (rewritten)
├── layout.tsx                  # Root layout (updated with JSON-LD)
├── providers.tsx
├── not-found.tsx
├── sitemap.ts                  # Dynamic sitemap
├── robots.ts                   # Robots.txt
├── about/
│   └── page.tsx                # Enhanced about
├── projects/
│   ├── page.tsx                # Enhanced projects list
│   └── [project]/
│       ├── page.tsx            # Project detail (enhanced)
│       └── case-study/
│           └── page.tsx        # Case study template
├── services/
│   └── page.tsx                # Services page
├── dossera/
│   └── page.tsx                # Enhanced Dossera page
├── blog/                       # (Future)
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── api/
    └── contact/
        └── route.ts            # Contact form API

components/
├── global/
│   ├── Navbar.tsx              # Updated (add Services link)
│   ├── MobileMenu.tsx          # Updated
│   ├── Footer.tsx              # Updated
│   └── ...
├── pages/
│   ├── Job.tsx                 # Existing
│   ├── Heroes.tsx              # Existing
│   ├── Usage.tsx               # Existing
│   └── ...
├── sections/
│   ├── ValueProps.tsx          # NEW - 3-column value props
│   ├── StatsBar.tsx            # NEW - key metrics
│   ├── TestimonialsCarousel.tsx # NEW
│   ├── ClientLogos.tsx         # NEW
│   ├── ContactForm.tsx         # NEW - reusable form
│   ├── ServicesOverview.tsx    # NEW - 4 pillars
│   └── CaseStudyTeaser.tsx     # NEW
└── shared/
    ├── ... (existing)
    └── TestimonialCard.tsx     # NEW

schemas/
├── index.ts                    # Updated
├── profile.ts                  # Updated (add certifications, timeline)
├── job.ts                      # Existing
├── project.ts                  # Extended
├── caseStudy.ts                # NEW
├── service.ts                  # NEW
├── testimonial.ts              # NEW
├── client.ts                   # NEW
├── heroe.ts                    # Existing
└── blockContent.ts             # Existing

lib/
├── sanity.query.ts             # Updated with all queries
├── sanity.client.ts            # Existing
├── sanity.image.ts             # Existing
└── env.api.ts                  # Existing

scripts/
├── populate-projects.mjs       # NEW
├── populate-services.mjs       # NEW
├── slugify.ts                  # NEW
└── populate-case-studies.mjs   # NEW (Phase 2)
```

---

## Execution Order

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1 | Week 1 | Sanity credentials |
| Phase 2 | Week 2-3 | Phase 1 complete |
| Phase 3 | Week 3-4 | Phase 2 complete |
| Phase 4 | Week 4+ | Phase 3 complete |

---

## Success Metrics

- [ ] All 8 projects populated in Sanity with full metadata
- [ ] 4 services created with process + engagement models
- [ ] At least 3 testimonials with real client feedback
- [ ] Case study template working (Dossera as first case study)
- [ ] Contact form functional (email delivery confirmed)
- [ ] JSON-LD structured data on all pages
- [ ] Lighthouse score 90+ (Performance, Accessibility, SEO)
- [ ] All internal links working (no 404s)
- [ ] Mobile responsive verified

---

## Open Questions

1. **Client permission**: Can we name PWADCTeam projects publicly, or should we anonymize?
2. **Team email**: What email should receive Dossera contact form submissions?
3. **Architecture diagrams**: Do you have existing diagrams for Dossera, or should we create Mermaid diagrams?
4. **NDA constraints**: Any metrics that must be anonymized or shown as ranges?
5. **Form backend**: Preferred email service (Resend, Formspree, custom)?
6. **Timeline urgency**: Are we optimizing for a specific job application deadline?
7. **i18n priority**: How soon do we need French/Arabic versions?

---

*Plan created: 2026-10-13*
*Status: Phase 1 In Progress*
