# Deployment, analytics and launch checklist

## Environment variables

Copy `.env.example` to `.env.local` for development, and set the same keys in
the Vercel project settings for deployment.

| Variable | Required | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical origin. Drives canonicals, OG URLs, sitemap and schema. No trailing slash. |
| `NEXT_PUBLIC_INDEXABLE` | Yes | `"true"` allows indexing. **Anything else blocks it.** Leave unset for the pitch. |
| `NEXT_PUBLIC_PITCH_MODE` | Yes | `"false"` removes the concept banner and all example content. Any other value keeps pitch mode on. |
| `RESEND_API_KEY` | For live enquiries | Server-side only. Without it the form still works and logs instead of sending. |
| `ENQUIRY_TO_EMAIL` | For live enquiries | Where enquiries land. |
| `ENQUIRY_FROM_EMAIL` | For live enquiries | Must be a verified sender on the Resend domain. |
| `NEXT_PUBLIC_GA_ID` | Optional | GA4 measurement ID. Without it, events log to the console in development only. |
| `TURNSTILE_SECRET_KEY` | Optional | Cloudflare Turnstile. Without it, the honeypot and rate limiter still apply. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional | Public half of the Turnstile pair. |

Note the naming: only `NEXT_PUBLIC_*` variables reach the browser. The Resend
key and the Turnstile secret are read exclusively in the server route and never
appear in a client bundle.

---

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

`npm run dev` and `npm run build` both run `scripts/generate-media-manifest.mjs`
first, which indexes `public/media`. Drop a photo in, restart, and it appears.

Other scripts:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run build        # production build
npm run start        # serve the production build
npm run media:index  # re-index public/media on its own
```

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel: **New Project** → import the repo. The framework is detected
   automatically; no build settings need changing.
3. Add the environment variables above under **Settings → Environment
   Variables**. For the pitch, set:

   ```
   NEXT_PUBLIC_SITE_URL = https://<your-preview>.vercel.app
   NEXT_PUBLIC_PITCH_MODE = true
   ```

   and **leave `NEXT_PUBLIC_INDEXABLE` unset.**
4. Deploy.

### Indexing is blocked three ways

While `NEXT_PUBLIC_INDEXABLE` is not `"true"`:

1. `next.config.ts` sends `X-Robots-Tag: noindex, nofollow, noarchive` on every response
2. `robots.ts` serves `Disallow: /`
3. every page's metadata carries `robots: { index: false, follow: false }`

Three independent layers, so a single missed setting cannot leak a pitch build
into search results and compete with the real rabsflooring.co.uk.

### Going live on the real domain

1. Work through [CLIENT-CONFIRMATION.md](./CLIENT-CONFIRMATION.md) first.
2. Set `NEXT_PUBLIC_INDEXABLE=true`, `NEXT_PUBLIC_PITCH_MODE=false`, and
   `NEXT_PUBLIC_SITE_URL=https://rabsflooring.co.uk`.
3. Add the redirect map to `next.config.ts` — see
   [SEO.md](./SEO.md#migration). **301 only, and never blanket-redirect to the
   homepage.**
4. Add the domain in Vercel and update the DNS.
5. Redeploy, then verify `https://rabsflooring.co.uk/robots.txt` allows
   crawling and `/sitemap.xml` lists the real domain.
6. Submit the sitemap in Search Console. Keep the old property and watch 404s
   for a month.

---

## Analytics

Every event goes through `track()` in `src/lib/analytics.ts`. Nothing talks to
GA4 directly, so swapping to Plausible, Fathom or a server endpoint means
editing one function.

### Consent ordering

This is the part most implementations get wrong. `track()`:

1. drops the event outright if the visitor rejected analytics,
2. **queues** events fired before a choice is made, and replays them only if
   consent is later granted,
3. sends only once consent is granted.

Nothing analytics-related loads before the banner is answered. The banner gives
Accept and Reject equal prominence, as UK PECR requires.

### Events wired up

| Event | Fires when |
|---|---|
| `quote_start` | Quote wizard mounts |
| `quote_step` | Each step is shown (carries step id and index) |
| `quote_complete` | Enquiry submitted successfully |
| `quote_error` | Submission failed |
| `form_error` | A step failed validation (carries which fields) |
| `phone_click` | Any phone link (carries `location`: header, hero, footer, mobile bar…) |
| `whatsapp_click` | Any WhatsApp link |
| `directions_click` | Any map or directions link |
| `offer_view` / `offer_click` | Offer interactions |
| `category_view` | Category entry, including from the flooring finder |
| `product_enquiry` | Product-level enquiry |
| `showroom_view` | Showroom page |
| `search_open` / `search_query` | Site search |

`location` is attached to every contact event, so you can see whether the
mobile action bar or the header drives more calls — which directly informs
where to put the next CTA.

### Recommended GA4 setup

Mark as conversions: `quote_complete`, `phone_click`, `whatsapp_click`,
`directions_click`.

For a showroom business, phone calls and direction requests are the real
revenue signal — arguably more than form fills.

---

## Security

| Measure | Where |
|---|---|
| Server-side validation with the same Zod schema as the client | `src/app/api/enquiry/route.ts` |
| Honeypot field (accepted silently, then discarded) | Quote wizard + API |
| Rate limit: 5 submissions per IP per 10 minutes | API route |
| Turnstile verification when configured | API route |
| Upload type/size/count limits | `src/lib/quote-schema.ts` |
| No secrets in client bundles | Only `NEXT_PUBLIC_*` is exposed |
| `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` | `next.config.ts` |

The rate limiter is in-memory, which is fine for a single-region deployment.
If this ever runs multi-region, move it to Upstash or Vercel KV — the map is
per-instance.

### Photo uploads

The wizard currently sends **filenames and sizes**, not the binaries. Accepting
real uploads needs somewhere to put them (Vercel Blob, S3, UploadThing) plus
virus scanning and a retention policy — that is a decision for RABS, not a
default. Until then, the enquiry names the photos and the team asks for them by
reply.

---

## Performance notes

- Everything except `/api/enquiry` is statically generated
- Fonts self-hosted via `next/font`, Latin subset only, no render-blocking request to Google
- AVIF/WebP with responsive `sizes` on every image
- No icon library — every icon is inline SVG
- No Instagram embed, no map iframe, no analytics before consent
- One small motion library, used for a single restrained scroll reveal
- Search index ships in-bundle (tens of entries) so results appear with no network round trip

Run Lighthouse against the **production** build (`npm run build && npm run
start`), not `npm run dev` — dev mode is not representative.

Once real photography is in place, re-check LCP on the homepage. The hero image
is already marked `priority`; if it lands slowly, compress it harder before
reaching for anything cleverer.

---

## Launch checklist

### Content
- [ ] Trading address confirmed and updated
- [ ] Opening hours confirmed; `hoursStatus` set to `"verified"`
- [ ] Phone, email and WhatsApp confirmed
- [ ] Real prices added to offers, or offers removed
- [ ] Real reviews added; `reviewAggregate.publish` set
- [ ] Real projects added; example projects deleted
- [ ] Delivery, returns, warranty and terms written by RABS
- [ ] Logo and showroom photography supplied

### Technical
- [ ] `NEXT_PUBLIC_INDEXABLE=true`
- [ ] `NEXT_PUBLIC_PITCH_MODE=false`
- [ ] `NEXT_PUBLIC_SITE_URL` set to the live domain
- [ ] Enquiry email configured and a test enquiry received
- [ ] Redirect map added to `next.config.ts`
- [ ] `robots.txt` and `sitemap.xml` verified on the live domain
- [ ] GA4 property connected, conversions marked
- [ ] Search Console verified, sitemap submitted

### Off-site
- [ ] Google Business Profile updated (address, hours, photos, services)
- [ ] Bing Places, Apple Business Connect
- [ ] Facebook and Instagram bio/location updated
- [ ] Yell, 192.com, FindOpen and other citations corrected
- [ ] Instagram link-in-bio pointed at the new site
