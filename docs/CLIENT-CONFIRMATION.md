# Before this site goes live — questions for RABS

This is the single most important document in the repository.

Everything below is either **unknown** or **contradicted by public sources**.
None of it has been guessed at on the site: where a fact could not be verified,
the page either omits it, states it neutrally, or says plainly that it needs
confirming. That is why some sections read as deliberately cautious — they are.

Work through this list with RABS and the site is ready to launch.

---

## 1. RESOLVED — the trading address

**Confirmed by the client and cross-checked against RABS's live Google
Business Profile** ("RABS Carpets Furniture Store"), which is a primary source
for a trading address:

> **194 Waterloo Road, Burslem, Stoke-on-Trent, ST6 3HF**

`hoursStatus`-adjacent flags are cleared; `showroom.line1` and
`showroom.postcode` are now `"verified"` in `src/content/site.ts`, and
`openingHoursSpecification` is emitted in structured data (see section 2).

Three other addresses still circulate publicly and are **stale citations to
correct, not alternatives to weigh up**:

| Source | Address | What it actually is |
|---|---|---|
| Yell / FindOpen | Portland House, 45 Church Street, ST4 1DQ | Old listing — update or remove |
| Companies House (registered office) | 188 Lightwood Road, ST3 4LA | Registered office only, not customer-facing — no action needed unless it changes |
| 192.com | Unit 18 Castlefield Street, ST4 7AQ | Old listing — update or remove |

**Remaining task:** correct the Yell and 192.com listings to Waterloo Road. See
the citation clean-up in [SEO.md](./SEO.md#local-seo-and-citations).

The approximate map coordinates in `showroom.geo` are close enough for the
static map link and schema; swap in the exact Google Business Profile pin if
RABS can share it.

---

## 2. RESOLVED — opening hours

**Read directly from RABS's live Google Business Profile:**

| Day | Hours |
|---|---|
| Monday – Saturday | 10:00am – 8:00pm |
| Sunday | 11:00am – 6:00pm |

`hoursStatus` is now `"verified"` in `src/content/site.ts`. The "please call to
confirm" caveats have been removed from the site, and
`openingHoursSpecification` is now included in the structured data.

**Still worth confirming with RABS directly:** any seasonal change or bank
holiday variation, since a public listing does not always reflect those.

---

## 3. CRITICAL — contact details

| Field | Currently | Question |
|---|---|---|
| Phone | 07774 596596 | Correct? Any second/landline number? |
| Email | info.rabsflooring@gmail.com | Is this inbox actually monitored? A branded address (`hello@rabsflooring.co.uk`) would present considerably better. |
| WhatsApp | Same number | Is WhatsApp genuinely monitored? The site promotes it prominently — if nobody watches it, we should remove it. |

The email is only published in schema once `email.status` is set to `"verified"`.

---

## 4. PARTIALLY RESOLVED — reviews and ratings

**The aggregate rating is now live on the site**, read directly from RABS's
Google Business Profile (a primary source, not a syndicator):

> **4.9 average from 34 reviews**

`reviewAggregate.publish` is `true` in `src/content/site.ts`, so the star
rating appears on the homepage and reviews page, and `AggregateRating`
structured data is emitted. This number will drift as new reviews come in —
worth a periodic re-check rather than treating it as fixed.

**Individual review text is still not published**, and that part of the task
is unchanged:

- no individual reviews appear on the site yet,
- no `Review` structured data is emitted,
- the reviews page shows the honest "we're gathering these" state below the
  now-live star rating.

**To publish individual reviews:**

1. Export them from the Google Business Profile.
2. Paste each one **verbatim** into `src/content/reviews.ts` with reviewer name,
   date, source and a link back to the original.

We did not paste review text in from the Maps listing itself, because the
business owner should choose which ones go up and confirm the wording is
copied exactly.

We have not written a single testimonial. Inventing them is both a
consumer-protection problem and, in a city this size, likely to be noticed.

---

## 5. Offers and pricing

**No price appears anywhere on this site.** Every offer renders "Ask in store
for this week's price" instead.

RABS runs real, changing promotions on social. None of those figures could be
verified, and a stale or invented price on a live retail site is a
trading-standards problem as well as a fast way to lose trust at the door.

**For each offer** (`src/content/offers.ts`) confirm:

- the exact current price, and the previous price if a saving is being claimed
- what the price covers (supply only? fitted? underlay? a specific room size?)
- the conditions and any exclusions
- the end date, if there is one

Offers with an `endsAt` date in the past disappear automatically — nobody has
to remember to take them down.

---

## 6. Services — what RABS actually offers

Evidenced from RABS's own material and safe to state:

- supply **and** fit of carpet, vinyl, laminate and LVT
- supply-only flooring
- furniture (sofas, beds, dining, living room)
- blinds

**Not confirmed, and therefore claimed nowhere on the site:**

| Question | Why it matters |
|---|---|
| Is home measuring free? | A major conversion lever if yes. Currently the site only says "we measure" — never "free". |
| Is furniture delivery free, or charged? | Needed for the delivery page, which currently says the terms are being finalised. |
| What is the delivery radius? | Same. |
| Which areas do you fit in? | `/areas-we-cover` currently lists nearby towns as a guide and tells people to ring. |
| Do you do commercial flooring? | A whole page and keyword set, if yes. |
| Is finance available? | If yes, through whom — this must be FCA-compliant and cannot be improvised. |
| What brands do you stock? | Brand names are strong search terms and strong trust signals. |
| What warranties apply? | Manufacturer periods, plus any RABS guarantee on workmanship. |
| Is there parking? | Mentioned nowhere until confirmed. |
| Do you fit flooring supplied by the customer? | Common question; currently answered with "ask us". |

---

## 7. Commercial policies

`/delivery`, `/returns`, `/warranty` and `/terms` currently explain that the
terms are being finalised and point the customer at a phone call. They cannot
be written by anyone but RABS — an invented returns window or warranty period
creates a contractual promise the business never agreed to.

Each page lists the specific questions to answer. The main ones:

- **Delivery:** radius, charges, whether items are carried into a room, lead times, removal of old furniture.
- **Returns:** window for showroom furniture; cut flooring is normally non-returnable — confirm; special orders; deposits on cancellation.
- **Warranty:** manufacturer periods per category; any RABS workmanship guarantee; what voids cover; how to claim.
- **Terms:** deposits, payment methods, how long a quote stands, what happens if extra subfloor work is found on fitting day.

---

## 8. Privacy (in-store)

The privacy notice accurately describes what **this website** does, because
that is fully known: a quote form that emails the team, a consent flag in
browser storage, and analytics that never run before consent.

It does not describe RABS's wider data handling — customer records, CCTV,
finance applications. If any of those apply, the notice needs extending.

---

## 9. Content that would materially improve the site

Not blockers, but each one is worth real money:

1. **The vector logo.** The site uses a typographic stand-in. See [ASSETS.md](./ASSETS.md).
2. **Showroom photography.** The single biggest visual upgrade available.
3. **Four to six real projects** with photos, rooms, products and — ideally — a customer quote.
4. **Genuine reviews**, exported from Google.
5. **Instagram posts** for the social band (images downloaded, not hotlinked).
6. **A short showroom video.** The design has space for one.

---

## 10. Before switching the domain

- [ ] Everything above confirmed and updated in `src/content/`
- [ ] `NEXT_PUBLIC_INDEXABLE=true` (currently the whole site is `noindex`)
- [ ] `NEXT_PUBLIC_PITCH_MODE=false` (removes the concept banner and all example content)
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain
- [ ] Enquiry email configured (`RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`)
- [ ] Old site crawled and the redirect map built — see [SEO.md](./SEO.md#migration)
- [ ] Google Business Profile and all directory citations corrected to the confirmed address

Full checklist in [LAUNCH.md](./LAUNCH.md).
