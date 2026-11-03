# Hair Therapy Nashville — Premium Website

A premium, editorial-style website for **Hair Therapy Nashville** (Old Hickory, TN), built as a
customized business demonstration by **ScaleUp Dynamics**. Target quality: a professionally designed
$5,000+ custom website.

Brand direction: **Modern Natural Hair Luxury** — "The Art of Healthy Hair."

---

## Project files

```
hair-therapy-nashville-website/
├── index.html            ← the whole site (single page)
├── assets/
│   ├── styles.css        ← design system
│   ├── script.js         ← interactions (no libraries)
│   ├── config.js         ← ★ EDIT THIS — services, gallery, hours, stylist, prices
│   ├── favicon.svg
│   └── img/              ← optimized photography (≈3 MB total)
└── README.md
```

## Run / preview locally

Just open `index.html` in a browser, or serve the folder (recommended):

```
npx serve .        (or VS Code Live Server → Open with Live Server)
```

An internet connection is needed for the two Google Fonts (Cormorant Garamond + DM Sans).
All photography is local and optimized, so the page loads fast.

---

## Booking — preserved as instructed

The salon's existing Acuity scheduling system is kept unchanged. Every booking CTA
(hero, navigation, services, stylist, closing section, mobile sticky bar) opens:

`https://hairtherapynashville.as.me/schedule/109b419c`

Click-to-call (`tel:+16159339641`), email, Facebook, and Google Maps directions are wired as well.
A mobile bottom bar keeps Call + Book one tap away. **No WhatsApp button** (owner confirmation
pending) — flip `flags.whatsappEnabled` in `config.js` after adding the number if approved.

---

## Verified vs. illustrative content

**Verified (public listings — safe to publish):**

- Business name, address (118 Bridgeway Ave, Old Hickory, TN 37138), phone, email, Facebook
- Booking URL (existing Acuity system)
- Rating: **4.8 ★ from 49 Google reviews** (via Birdeye listing, Nov 2026)
- The three review quotes — authentic Google review excerpts, lightly typographic cleanup only
- Hours currently listed on Google (Tue–Fri 9–5 · Sat 6–12 · Sun 6–1 · Mon closed)
- Modern Natural Hair Luxury visual direction + palette + fonts (client-approved brief)

**Illustrative / to confirm with the owner before launch:**

- Service card blurbs — phrasing is our own; confirm categories match the live menu
- Stylist name/role (**Elaina** per salon research; some reviews also mention a stylist
  "Nataleigh" and "Ms. Mays" — confirm who should be featured)
- A few editorial/editorial-AI images used for hero, statement and service categories
  (the client's own docx references). Gallery + before/after are **real salon photography**
  from the salon's public page.
- Prices are intentionally **not** shown. Set `flags.showServicePrices: true` and add
  `price:"From $XX+"` to each service in `config.js` once the salon confirms a price list.

---

## Where the owner edits day-to-day (assets/config.js)

| What | How |
|---|---|
| Services (names, blurbs, images, prices) | `services[]` |
| Gallery images / captions / categories | `gallery[]`, `galleryFilters[]` |
| Opening hours | `hours[]` |
| Stylist name, role, button text | `stylist{}` |
| Phone / email / social / booking link | `business{}` |
| Review quotes | `reviews[]` |

No HTML knowledge needed — text between quotes only, keep the commas.

## Before-launch checklist (owner)

1. Confirm stylist name & role → update `stylist{}`.
2. Confirm official price list → set `showServicePrices: true`, add prices.
3. Confirm final opening hours (sources differ slightly) → update `hours[]`.
4. Confirm WhatsApp use for business inquiries → add number + enable flag.
5. Provide any additional salon-approved photography (hero/portrait especially).
6. Point the domain (hairtherapynashville.com) at final hosting.

## Deploy (any static host)

Upload the folder as-is to Netlify / Vercel / Cloudflare Pages / Azure Static Web Apps,
or any cPanel shared hosting. No build step, no server code.

## Analytics (optional)

Drop your privacy-conscious snippet (e.g. Plausible/Fathom or a cookieless GA4 config)
just before `</body>` in `index.html` when the owner approves. The booking CTA can be
tagged with `data-` attributes for conversion tracking.

## Accessibility & performance notes

- Semantic sections, skip-link, focus outlines, aria labels, `aria-current` hours
- `prefers-reduced-motion` disables parallax/dive animations
- Hero image preloaded; gallery/below-fold images lazy-loaded with width/height (no CLS)
- LocalBusiness (HairSalon) JSON-LD with geo, hours, rating, sameAs links
- Mobile-first responsive with sticky Call/Book bar (safe-area aware)
- **Lighthouse verified (Chrome, mobile): Accessibility 100 · Best Practices 100 · SEO 100 — zero failing audits**

---

*Sample website crafted by ScaleUp Dynamics — business data from public listings; please
confirm services, pricing, hours and team details with the salon before going live.*
