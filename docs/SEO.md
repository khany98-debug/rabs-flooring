# SEO strategy

## The situation

RABS competes locally against carpet retailers and nationally-backed chains
(Tapi, United Carpets, Flooring Superstore) that outspend them on content and
domain authority. Trying to beat those on head terms is not a winnable fight.

What RABS **can** win is local intent — the searches with a place name in them,
where a real showroom, real fitters and real local projects beat a national
site's generic landing page.

The architecture is built around that.

---

## Keyword architecture

One page owns one intent. No page competes with another for the same term.

### Core commercial — flooring

| Page | Primary intent | Supporting |
|---|---|---|
| `/flooring` | flooring Stoke-on-Trent, flooring shop Stoke-on-Trent | flooring showroom Stoke-on-Trent |
| `/flooring/carpets` | carpets Stoke-on-Trent, carpet shop Stoke-on-Trent | carpet fitting Stoke-on-Trent, carpets Burslem |
| `/flooring/lvt` | LVT flooring Stoke-on-Trent | luxury vinyl tile Stoke-on-Trent, LVT fitters |
| `/flooring/laminate` | laminate flooring Stoke-on-Trent | wood effect flooring Stoke-on-Trent |
| `/flooring/vinyl` | vinyl flooring Stoke-on-Trent | cushion floor, sheet vinyl Stoke-on-Trent |
| `/fitting` | carpet fitting Stoke-on-Trent, flooring fitters Stoke-on-Trent | supply only flooring Stoke-on-Trent |

### Core commercial — furniture

| Page | Primary intent |
|---|---|
| `/furniture` | furniture shop Stoke-on-Trent, furniture store Stoke-on-Trent |
| `/furniture/sofas` | sofas Stoke-on-Trent, corner sofas Stoke-on-Trent |
| `/furniture/beds` | beds Stoke-on-Trent, mattresses Stoke-on-Trent |
| `/furniture/dining` | dining furniture Stoke-on-Trent, dining table and chairs Stoke-on-Trent |
| `/furniture/living-room` | living room furniture Stoke-on-Trent |
| `/blinds` | blinds Stoke-on-Trent |

### Transactional / navigational

| Page | Intent |
|---|---|
| `/offers` | carpet deals Stoke-on-Trent, full house carpet deals |
| `/get-a-quote` | flooring quote Stoke-on-Trent, carpet prices |
| `/showroom` | carpet showroom Stoke-on-Trent, "near me", opening hours, directions |
| `/our-work` | trust and long-tail from product + room combinations |

### Informational — the guides

These are the ones that pick up national long-tail traffic and feed internal
links back into the commercial pages:

| Article | Target |
|---|---|
| `carpet-vs-lvt` | carpet vs LVT, which is better |
| `best-flooring-for-stairs` | best flooring for stairs, best carpet for stairs |
| `best-flooring-for-pets` | best flooring for dogs, pet-friendly flooring |
| `how-much-flooring-do-i-need` | how much carpet do I need, measuring for flooring |
| `how-to-choose-carpet-colour` | choosing carpet colour |
| `how-to-choose-a-sofa-size` | what size sofa, will a sofa fit |

Six articles that genuinely answer a question, not thirty thin ones.

---

## What this architecture deliberately does NOT do

**No location doorway pages.** The obvious play is "Carpets in Hanley",
"Carpets in Tunstall", "Carpets in Kidsgrove" — twenty near-identical pages
with the town swapped. Google has spent years demoting exactly that pattern,
and it makes an established business look like an affiliate farm.

Instead `/areas-we-cover` is one honest page. A town earns its own page only
when RABS confirms they serve it **and** there is something unique to put on it
— real projects there, real reviews from there. The switch is `hasOwnPage` in
`src/content/areas.ts`, currently false everywhere.

**No keyword stuffing.** Category copy is written to be read by a customer
deciding what to buy. "Stoke-on-Trent" appears where it is natural — in titles,
descriptions and the showroom context — not sprayed through body copy.

**No duplicated category template.** Each flooring category has its own
headline, its own buying advice, its own room-by-room verdicts and its own
FAQs. Sharing a *layout* is good engineering; sharing the *copy* with the
keyword swapped is a doorway page.

---

## On-page implementation

Every indexable page has:

- a unique title (all under 62 characters, verified)
- a unique meta description (all 70–165 characters, verified)
- exactly one `<h1>` (verified across all 39 routes)
- a self-referencing canonical
- an OG image and Twitter card
- breadcrumbs, both visual and `BreadcrumbList` schema
- internal links into related commercial pages

`src/lib/seo.ts` builds all of it from one `buildMetadata()` call, so no page
can quietly ship without them.

---

## Structured data

Emitted:

| Schema | Where | Note |
|---|---|---|
| `HomeGoodsStore` | Every page | Name, address, phone, geo, social profiles |
| `WebSite` | Every page | |
| `BreadcrumbList` | Every deep page | |
| `FAQPage` | Category + fitting pages | Only where the FAQs genuinely are the page's content |
| `Article` | Guides | |

**Deliberately withheld until verified:**

| Schema | Why |
|---|---|
| `AggregateRating` | The 4.7/30 figure is from a syndication site, not a primary source |
| `Review` | No verbatim, attributable reviews supplied yet |
| `openingHoursSpecification` | The hours conflict is unresolved |
| `Offer` / `Product` with price | No confirmed prices |
| `email` | Inbox not confirmed as monitored |

Each is a one-line switch in `src/content/site.ts` once confirmed. Marking up a
price or rating you cannot evidence is a manual-action risk, not just poor
taste.

---

## Local SEO and citations

The single highest-value SEO task for RABS is **not on this website**. It is
making name, address and phone identical everywhere on the internet.

Right now four different addresses are published (see
[CLIENT-CONFIRMATION.md](./CLIENT-CONFIRMATION.md#1-critical--the-trading-address)).
That inconsistency actively suppresses local rankings.

Once the address is confirmed, update — in this order:

1. **Google Business Profile** — address, hours, category, photos, services. This is the big one.
2. **Bing Places**
3. **Apple Business Connect**
4. **Facebook page** — address and hours
5. **Instagram** — bio location and link
6. **Yell** — currently shows Church Street
7. **192.com** — currently shows Castlefield Street
8. **FindOpen, Cylex** and similar aggregators
9. **Companies House** — only if the registered office has genuinely moved

The website's NAP must match all of these exactly, including punctuation.

We have deliberately **not** made any of these changes — they are the client's
own listings and are not ours to edit.

---

## Migration

Before pointing `rabsflooring.co.uk` at this build:

1. **Crawl the existing site** (Screaming Frog free tier covers 500 URLs).
   Export URL, title, meta, status code and indexability.
2. **Pull Search Console data** for the current domain — which URLs actually
   receive impressions and clicks. Those are the ones that matter.
3. **Check backlinks** (Ahrefs free tools, or Search Console's links report).
   Any URL with links pointing at it must redirect somewhere sensible.
4. **Build the redirect map**: old URL → closest equivalent new URL.

   Likely shape:

   | Old | New |
   |---|---|
   | `/carpets` | `/flooring/carpets` |
   | `/vinyl` | `/flooring/vinyl` |
   | `/laminate` | `/flooring/laminate` |
   | `/lvt` | `/flooring/lvt` |
   | `/contact-us` | `/contact` |
   | `/about-us` | `/about` |
   | `/gallery` | `/our-work` |

5. **301 only.** Never 302 for a permanent move.
6. **Never blanket-redirect to the homepage.** It throws away the relevance
   signal on every URL and Google increasingly treats it as a soft 404.
7. Add redirects to `next.config.ts` under a `redirects()` function.
8. After the switch: submit the new sitemap in Search Console, keep the old
   property, and watch the coverage report for 404s for a month.

---

## Measuring it

- **Google Search Console** — the primary tool. Watch impressions on
  "<product> Stoke-on-Trent" terms.
- **GA4** — configured through the analytics abstraction (see
  [LAUNCH.md](./LAUNCH.md#analytics)). Conversion events are already wired.
- **Google Business Profile insights** — calls and direction requests are the
  real KPI for a showroom business, and they mostly happen without anyone
  visiting the website at all.
