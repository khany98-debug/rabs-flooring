# RABS Flooring

A new website for **RABS Flooring**, Stoke-on-Trent — flooring, furniture and
professional fitting. *Turning Houses Into Homes.*

This is a **client pitch build**. It is not indexed by search engines, and
several facts about the business are awaiting confirmation. Start with
[`docs/CLIENT-CONFIRMATION.md`](./docs/CLIENT-CONFIRMATION.md).

```bash
npm install
npm run dev     # http://localhost:3000
```

---

## The idea

RABS already has a strong identity on social: bold, promotional, value-driven,
deep red and gold, and genuinely local. The instinct with a project like this
is to sand all of that off and produce another beige minimal interiors site.
That would throw away the only thing RABS has that the national chains do not.

So the brief here was to **elevate the existing brand, not replace it**:

- Keep the promotional energy — but let typography do the shouting instead of
  starbursts. Offers get a proper editorial grid on an ink ground.
- Keep red and gold — but treat gold as an *accent* (rules, icons, one CTA),
  not a coating. The page alternates ink → parchment → oxblood → ivory →
  burgundy so no two adjacent bands share a ground.
- Keep it local — the showroom, the fitters and real Stoke projects are the
  competitive advantage, so they lead rather than sit in a footer.

The test applied throughout: *if the logo were removed, would this still look
like a generic flooring template?*

## What is here

| Area | |
|---|---|
| **Routes** | 39, all statically generated except the enquiry API |
| **Homepage** | Hero → showroom → categories → offers → flooring finder → whole-home → why RABS → projects → reviews → social → closing CTA |
| **Flooring** | Hub plus four bespoke category pages (carpets, LVT, laminate, vinyl) — each with its own buying guidance, room-by-room verdicts and FAQs, not one template with the keyword swapped |
| **Furniture** | Hub plus sofas, beds, dining, living room. Enquiry-led, no fake basket |
| **Find my floor** | Two-question guided tool that recommends a *category* and always shows its reasoning |
| **Quote wizard** | Nine adaptive steps, URL-prefilled, validated both sides, with rate limiting and a honeypot |
| **Search** | In-bundle index across categories, offers, projects and guides — results appear as you type |
| **Guides** | Six articles written to answer a real question, not to hit a keyword |
| **Legal** | Privacy and cookies written accurately; commercial policies await RABS |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Motion · Zod · Vercel.

Server Components by default — the only client components are the header, the
mobile drawer, search, the cookie banner, the flooring finder, the quote wizard
and the scroll reveal. No icon library, no Instagram embed, no map iframe.

## Layout

```
src/
  app/            routes, robots.ts, sitemap.ts, api/enquiry
  components/
    ui/           Button, Layout, Media, Cards, PageHero, Logo, Reveal
    layout/       Header, MobileNav, SearchDialog, Footer, MobileActionBar, CookieBanner
    home/         the homepage sections
    domain/       CategoryPage, OfferCard, ReviewCard, FlooringFinder, LegalPage
    quote/        QuoteWizard
  content/        ← all editable content lives here
  lib/            seo, schema, analytics, search, media, utils, quote-schema
docs/             the handover documents
public/media/     photography, organised by slot (see docs/ASSETS.md)
```

## Three things worth knowing before you edit anything

### 1. Nothing unverified is presented as fact

Public sources give RABS **four different addresses** and two different sets of
opening hours. Rather than pick one and hope, contested facts are wrapped:

```ts
line1: fact("194 Waterloo Road", "needs-confirmation", "RABS brand material (2026)")
```

Components check `status` before publishing a claim. The practical result:

- no price appears anywhere — offers say "Ask in store"
- no star rating or review count, and no `AggregateRating` schema
- no opening-hours schema while the hours conflict is unresolved
- no claims about free measuring, delivery, finance, warranties or parking
- no invented testimonials, projects, brands or years of experience

Each is a one-line switch in `src/content/site.ts` once RABS confirms.

### 2. Images resolve from slots, not paths

Every image is referenced by a slot id. `resolveMedia("flooring/carpets")`
looks for a real file in `public/media/flooring/`; if there is not one yet,
`<Media>` renders a branded plate — oxblood gradient, gold keyline, house motif
— rather than a broken image.

RABS's Instagram photography could not be downloaded programmatically, and
substituting stock or AI-generated rooms was not acceptable. So the site is
built to become real the moment the files land: drop them in with the names in
[`docs/ASSETS.md`](./docs/ASSETS.md), run `npm run build`, done.

### 3. Pitch mode

`NEXT_PUBLIC_PITCH_MODE` controls the concept banner and the example projects,
which carry a visible "Layout example" tag so nothing is mistaken for real RABS
work. Set it to `false` and all of it disappears.

Separately, `NEXT_PUBLIC_INDEXABLE` gates indexing through three independent
layers, so this build cannot compete with rabsflooring.co.uk in search.

## Scripts

```bash
npm run dev          # dev server (re-indexes public/media first)
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run media:index  # re-index public/media
```

## Documentation

| | |
|---|---|
| [CLIENT-CONFIRMATION.md](./docs/CLIENT-CONFIRMATION.md) | **Read first.** Everything RABS needs to confirm before launch |
| [ASSETS.md](./docs/ASSETS.md) | Every photograph needed, with exact filenames |
| [SEO.md](./docs/SEO.md) | Keyword architecture, schema policy, citations, migration |
| [CMS.md](./docs/CMS.md) | How to change offers, hours, prices, projects, reviews |
| [LAUNCH.md](./docs/LAUNCH.md) | Env vars, deployment, analytics, security, checklist |

## Status

Verified in this build: `tsc --noEmit` clean · `eslint` clean · production build
clean · all 39 routes return 200 · no horizontal overflow from 320px to 1440px ·
one `<h1>` per page · unique titles and descriptions within SERP length · all
text/background pairs meet WCAG AA · quote wizard tested end to end through the
API.
