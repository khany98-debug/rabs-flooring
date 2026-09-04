# Editing the site content

All content lives in typed files under `src/content/`. No CMS is wired up yet —
that was a deliberate choice for the pitch stage, and the shapes below map 1:1
onto Sanity or Payload document types when it is time.

**Everything below can be edited without touching a component.** TypeScript
will tell you immediately if a required field is missing.

---

## The quick answers

### How do I change an offer?

`src/content/offers.ts`

```ts
{
  id: "offer-full-house",
  slug: "full-house-package",
  title: "Full house package",
  summary: "Carpet or LVT throughout, measured and fitted by our own team…",
  category: "whole-home",
  image: "full-house",          // → public/media/offers/full-house.jpg
  flash: "Our biggest package", // the diagonal red tag; omit for none
  priceWas: null,               // pence, e.g. 129900 for £1,299
  priceNow: null,               // pence. null → "Ask in store"
  priceUnit: "from",
  conditions: ["…"],            // the small print. Never leave empty on a real promotion
  startsAt: "2026-01-01",
  endsAt: null,                 // null = runs until switched off
  active: true,
  ctaLabel: "Get a quote",
  ctaHref: "/get-a-quote?interest=whole-home",
  featured: true,               // the big card. Keep to one
}
```

**Prices are in pence.** £1,299 is `129900`. That avoids floating-point
rounding, which is exactly the kind of bug that shows a customer £1,298.99.

**Expired offers disappear on their own.** `getActiveOffers()` filters on
`active` plus the start/end window, so nobody has to remember to take a
finished promotion down. This is the most common way a local business site goes
stale, and it is solved in code rather than by discipline.

**To end an offer now:** set `active: false`, or put yesterday's date in
`endsAt`.

**To add a new offer:** copy an existing block, give it a unique `id` and
`slug`, and drop the image at `public/media/offers/<image>.jpg`.

---

### How do I change the opening hours?

`src/content/site.ts` → `openingHours`

```ts
export const openingHours: OpeningHour[] = [
  { day: "Monday", opens: "09:00", closes: "18:00" },
  …
  { day: "Sunday", opens: null, closes: null },  // null = Closed
];
```

Also update `hoursSummary` — the short line used in the header and on cards.

**Important:** while `hoursStatus` is `"conflicting"` or
`"needs-confirmation"`, every hours display carries a "please call to confirm"
caveat and **no opening-hours structured data is sent to Google**. Once the
hours are confirmed:

```ts
export const hoursStatus: FactStatus = "verified";
```

The caveats disappear and the schema switches on. Nothing else to change.

---

### How do I change the address or phone number?

`src/content/site.ts` → `showroom`, `phone`, `email`.

Everything on the site reads from here: header, footer, showroom page, contact
page, structured data, map links, the sitemap. Change it once.

---

### How do I add a project to Our Work?

`src/content/projects.ts`. Add to `realProjects` (not `exampleProjects`), and
set `isExample: false` so it does not carry the "Layout example" tag.

Only fill in fields you actually have. Sections render only when there is
content for them — no empty "The Challenge" heading over invented narrative, no
before/after strip without both halves, no testimonial block without a real
quote.

`testimonial` takes a real, attributable customer quote or `null`. Nothing in
between.

---

### How do I add a review?

`src/content/reviews.ts`. Paste it **verbatim** — reviewer name, date, source,
and a `verifiedUrl` linking to the original so any claim is checkable. Do not
edit for length or tone; an edited testimonial is not a testimonial.

Once the live Google numbers are confirmed, set
`reviewAggregate.publish = true` in `site.ts` to turn on the star rating and
the `AggregateRating` schema.

---

### How do I add a guide?

`src/content/articles.ts`. The route, sitemap entry, `Article` schema and
related-articles links all follow automatically.

---

### How do I add a product?

There is no product catalogue yet, and that is deliberate — RABS's process is
showroom-and-enquiry, not online checkout, and a fake basket would be worse
than none.

The category `filters` arrays (colour, style, format) are presentational: they
communicate the breadth of choice and deep-link into the quote form with the
option prefilled. They do not filter stock the site does not have.

When RABS wants real products, add a `product` type alongside `category` with:
name, collection, images, price, previous price, dimensions, colours,
availability, SKU, and `featured` / `offer` flags. The card components already
assume that shape.

---

## Migrating to a CMS

The files map onto document types directly:

| File | Document type | Notes |
|---|---|---|
| `site.ts` | `siteSettings` (singleton) + `store` | Split the store fields into their own document if a second branch opens |
| `nav.ts` | `navigation` | |
| `categories.ts` | `category` | `group` becomes a reference or an enum |
| `offers.ts` | `offer` | Keep `active` + `startsAt` + `endsAt`; add a scheduled revalidate |
| `projects.ts` | `project` | Images become asset references |
| `reviews.ts` | `review` | |
| `articles.ts` | `article` | `sections` becomes portable text |
| `social.ts` | `socialPost` | |
| `areas.ts` | `serviceArea` | |

Suggested route:

1. Model the types in Sanity, matching the interfaces exactly.
2. Replace each file's export with an async fetch, keeping the same names and
   shapes. Because pages import named exports rather than reaching into the
   data, most components need no change at all.
3. Add `revalidate` or webhook-driven ISR so publishing an offer goes live
   without a redeploy.
4. Keep `getActiveOffers()` — the date filtering should stay in code, not be
   left to an editor remembering to untick a box.

### The `Fact<T>` wrapper

Several fields in `site.ts` are wrapped:

```ts
line1: fact("194 Waterloo Road", "needs-confirmation", "RABS brand material (2026)")
```

This carries the value, how confident we are in it, and where it came from.
Components check `status` before publishing a claim or emitting schema. Keep
this pattern in the CMS — a `status` field on contested facts is what stops an
unverified detail quietly reaching a customer.
