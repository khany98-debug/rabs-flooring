# Asset request — what RABS needs to send

Every image on the site is referenced by a stable **slot id**, not a file path.
Drop a file into `public/media/` with the matching name and it appears on the
site automatically — no code changes, no redeploy configuration.

Until a file exists, that slot renders a branded plate (oxblood gradient, gold
keyline, house motif) rather than a broken image. The current pitch build also
contains a small set of clearly disclosed AI-generated concept visuals to make
the proposal easier to review; they are not RABS photography or proof of a
completed customer job.

## Why we could not fetch these ourselves

RABS has a large library of genuine showroom, product and installation
photography on Instagram. It could not be downloaded programmatically —
Instagram blocks automated access, and hotlinking their CDN is not an option
because those URLs rotate and would leave dead images across the site.

RABS should replace the concept visuals with approved showroom, product and
installation photography before launch. A generated interior must never be
presented as a RABS installation, a specific product, or a customer result.

## How to supply them

1. Export at the largest size available — ideally 2400px on the long edge.
   JPEG or PNG is fine; the build converts to AVIF/WebP and generates every
   responsive size automatically.
2. Name the file exactly as listed below, including the folder.
3. Drop it into `public/media/<folder>/<name>.jpg`.
4. Run `npm run media:index` (or just `npm run dev` / `npm run build`, which do
   it for you).

Supported extensions, in preference order:
`.avif`, `.webp`, `.jpg`, `.jpeg`, `.png`, `.svg`.

---

## Priority 1 — needed for the pitch to feel real

| Slot | File | What it needs to be |
|---|---|---|
| `brand/logo` | `public/media/brand/logo.svg` | **The vector logo.** Ideally SVG. Everything currently uses a typographic stand-in built from the same ingredients (condensed caps, gold gradient, tagline). This one file changes the whole site. |
| `showroom/hero` | `public/media/showroom/hero.jpg` | The homepage hero. Best wide exterior shot of the Waterloo Road showroom — signage visible, ideally lit. |
| `showroom/interior-wide` | `public/media/showroom/interior-wide.jpg` | Wide interior showing the scale of the floor. Used on the homepage showroom band, category pages and About. |
| `showroom/panorama` | `public/media/showroom/panorama.jpg` | A second wide interior or exterior for the closing CTA and the showroom hero. |
| `flooring/carpets` | `public/media/flooring/carpets.jpg` | Carpet display — rolls or a fitted carpet room. |
| `flooring/lvt` | `public/media/flooring/lvt.jpg` | LVT, ideally a laid floor rather than a sample board. |
| `flooring/laminate` | `public/media/flooring/laminate.jpg` | Laminate — grain and texture visible. |
| `flooring/vinyl` | `public/media/flooring/vinyl.jpg` | Vinyl display or a fitted vinyl floor. |
| `furniture/sofas` | `public/media/furniture/sofas.jpg` | Sofas on the showroom floor. |
| `furniture/beds` | `public/media/furniture/beds.jpg` | Beds area. |
| `furniture/dining` | `public/media/furniture/dining.jpg` | Dining sets. |
| `furniture/living-room` | `public/media/furniture/living-room.jpg` | Living room units, TV units, occasional furniture. |
| `flooring/blinds` | `public/media/flooring/blinds.jpg` | Blinds display. |

## Priority 2 — page heroes

| Slot | File | What it needs to be |
|---|---|---|
| `flooring/hero` | `public/media/flooring/hero.jpg` | Flooring hub hero — a display wall works well. |
| `furniture/hero` | `public/media/furniture/hero.jpg` | Furniture hub hero. |
| `offers/hero` | `public/media/offers/hero.jpg` | Offers page hero. Something promotional. |
| `projects/hero` | `public/media/projects/hero.jpg` | Best finished-room photograph you have. |
| `furniture/showroom-sofas` | `public/media/furniture/showroom-sofas.jpg` | Sofa area, used on the furniture hub. |
| `team/team` | `public/media/team/team.jpg` | The team, or the showroom with people in it. Used on About. |
| `team/fitting` | `public/media/team/fitting.jpg` | A fitter at work. |
| `team/fitting-detail` | `public/media/team/fitting-detail.jpg` | Close-up of fitting — gripper, seam, edge trim. |
| `showroom/map-static` | `public/media/showroom/map-static.png` | **Static map image** of the showroom location. See note below. |

### Why a static map rather than an embedded Google map

An embedded Google Maps iframe sets cookies before the visitor has consented,
adds several hundred kilobytes, and is a common cause of layout shift at the
bottom of a page. The site uses a static image that links out to Google Maps
instead — same job, none of the cost. Export one from Google Maps or the Static
Maps API once the exact pin is confirmed.

## Priority 3 — showroom gallery

`public/media/showroom/gallery-1.jpg` … `gallery-6.jpg`

Six shots covering: carpet display, LVT display, sofa area, beds area, dining
display, blinds display. Gallery slots 1 and 4 render tall (3:4), the rest
square — so shoot or crop accordingly if you can.

## Priority 4 — offers

Named after the `image` field of each offer in `src/content/offers.ts`:

- `public/media/offers/full-house.jpg`
- `public/media/offers/sofas.jpg`
- `public/media/offers/dining.jpg`
- `public/media/offers/lvt.jpg`

Add a matching image whenever a new offer is created.

## Priority 5 — projects (real work)

The four projects currently on `/our-work` are **layout examples**, tagged as
such in the interface. They should be replaced with real jobs. For each one we
need:

- 3–5 photographs of the finished rooms
- the area (a district — never a full customer address)
- which rooms were done
- which products went in
- what was involved (levelling, old floor removal, furniture moving…)
- before photos, if any exist
- a customer quote **only if** the customer is happy to be quoted by name

File names follow the `images` array in `src/content/projects.ts`, e.g.
`public/media/projects/whole-house-1.jpg`.

## Priority 6 — social wall

`public/media/social/post-1.jpg` … `post-6.jpg`

Six curated posts for the homepage social band. Download the images from the
posts you want to feature and add the real post URL to each entry in
`src/content/social.ts`.

Note: the site deliberately does **not** embed the Instagram widget. It pulls a
large third-party script, costs a chunk of the performance budget, sets cookies
before consent, and breaks whenever Meta changes the API. Curated images that
link out are faster, consent-clean, and let RABS choose what a first-time
visitor sees.

---

## Video

The design has room for showroom video (hero background, showroom page). Not
wired up yet because there is no footage to work with. When it is supplied:

- MP4 (H.264) **and** WebM, compressed hard — target under 3MB
- a poster frame so nothing shifts while it loads
- muted, `playsinline`, and paused automatically under `prefers-reduced-motion`
- never more than one video playing on a page at once

## What to do when a slot is filled

Nothing. Run `npm run build` and the placeholder is replaced. To check what is
still outstanding:

```bash
npm run media:index
```

It prints how many files it found under `public/media`.
