# Before this site goes live — questions for RABS

This is the single most important document in the repository.

Everything below is either **unknown** or **contradicted by public sources**.
None of it has been guessed at on the site: where a fact could not be verified,
the page either omits it, states it neutrally, or says plainly that it needs
confirming. That is why some sections read as deliberately cautious — they are.

Work through this list with RABS and the site is ready to launch.

---

## 1. CRITICAL — the trading address

**Three different addresses are currently published about RABS.**

| Source | Address |
|---|---|
| Recent RABS brand material (2026) | 194 Waterloo Road, Burslem, Stoke-on-Trent, **ST6 3HF** |
| Yell / FindOpen directory listings | Portland House, 45 Church Street, Stoke-on-Trent, **ST4 1DQ** |
| Companies House (registered office) | 188 Lightwood Road, Stoke-on-Trent, **ST3 4LA** |
| 192.com | Unit 18 Castlefield Street, Stoke-on-Trent, **ST4 7AQ** |

The site currently uses 194 Waterloo Road, and every reference to it comes from
one place (`src/content/site.ts`) so it can be corrected in seconds.

**Confirm:**

1. Which address is the customer-facing showroom?
2. Is Church Street still trading, closed, or something else (warehouse, second site)?
3. Is Lightwood Road purely the registered office?
4. What is Castlefield Street — a stale citation to be removed?
5. Exact postcode, and the exact Google Business Profile pin (for the map and schema).

**Why this matters more than anything else on the list:** inconsistent name,
address and phone across the web is the fastest way to damage local search
rankings, and sending a customer to a closed shop is the worst experience the
site can produce. This also drives the citation clean-up in
[SEO.md](./SEO.md#local-seo-and-citations).

---

## 2. CRITICAL — opening hours

Brand material implies **seven days, 9:00am–6:00pm**. Directories say
**Mon–Sat 10:00–18:00, closed Sunday**.

The site currently shows seven days 9–6, but flagged: every hours display
carries "please call before travelling", and **no `openingHoursSpecification`
is emitted in structured data** until this is settled — publishing wrong hours
to Google is worse than publishing none.

**Confirm:** the real hours, including bank holidays and any seasonal change.

Once confirmed, set `hoursStatus = "verified"` in `src/content/site.ts` and the
caveats disappear and the schema switches on automatically.

---

## 3. CRITICAL — contact details

| Field | Currently | Question |
|---|---|---|
| Phone | 07774 596596 | Correct? Any second/landline number? |
| Email | info.rabsflooring@gmail.com | Is this inbox actually monitored? A branded address (`hello@rabsflooring.co.uk`) would present considerably better. |
| WhatsApp | Same number | Is WhatsApp genuinely monitored? The site promotes it prominently — if nobody watches it, we should remove it. |

The email is only published in schema once `email.status` is set to `"verified"`.

---

## 4. Reviews and ratings

A **4.7 average across roughly 30 reviews** appears on a review-syndication
site. That is not a primary source, so:

- no star rating appears anywhere on the site,
- no review count appears anywhere,
- no `AggregateRating` structured data is emitted,
- the reviews page shows an honest "we're gathering these" state.

**To publish reviews:**

1. Export the reviews from the Google Business Profile.
2. Paste each one **verbatim** into `src/content/reviews.ts` with reviewer name,
   date, source and a link back to the original.
3. Confirm the live average and count, then set
   `reviewAggregate.publish = true` in `src/content/site.ts`.

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
