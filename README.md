# Rivaayat

An ecommerce storefront for a **menswear** couture house — sherwanis,
bandhgalas, kurta sets and accessories — built on a design system derived from
the two client references.

**Live:** https://microlentdesign.github.io/Rivaayat/

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # images → typecheck → bundle → SPA fallback, into dist/
npm run preview  # serve the built output at /Rivaayat/, as Pages does
npm run images   # regenerate WebP from the originals in media/
npm run art      # regenerate the placeholder artwork in public/img/
```

## Deployment

```bash
npm run deploy
```

Builds and force-pushes `dist/` to the `gh-pages` branch. The repo needs
**Settings → Pages → Source = Deploy from a branch → `gh-pages` / root** set
once; after that every `npm run deploy` publishes.

`docs/github-pages-workflow.yml` is the GitHub Actions version, which deploys
automatically on every push to `main` instead of on command. It is not in
`.github/workflows/` because adding a workflow file needs a token with the
`workflow` scope. To switch: grant that scope (or paste the file in through
GitHub's web editor), move it to `.github/workflows/deploy.yml`, and set
Pages Source back to **GitHub Actions**.

Three things make a project page work that a root deploy would not need:

- **`base: '/Rivaayat/'`** in `vite.config.ts`, applied to `build` and
  `preview` only, so `npm run dev` stays at the root locally. It has to apply
  to preview as well — without it, preview mounts at `/` and answers requests
  for `/Rivaayat/assets/*.js` with the SPA fallback HTML, so the bundle never
  evaluates and the page renders blank, looking exactly like a broken build.
- **`asset()`** in `src/lib/image.ts` prefixes every path out of `public/`.
  It is applied at the single point where a stored path becomes a URL, so the
  image manifest, hero data and image roles stay portable. Moving to a root
  domain means setting `BASE` to `'/'` and dropping the router `basename` —
  nothing else references it.
- **`dist/404.html`**, a copy of `index.html` written by
  `scripts/spa-fallback.mjs`. Pages serves static files only, so a deep link
  like `/Rivaayat/shop/kurta` has no file behind it; Pages serves `404.html`
  for unmatched paths, which boots the SPA and lets the router read the URL it
  was actually asked for. Without it the site works only from its front door.

The workflow regenerates every WebP from `media/` on the runner, which is why
those originals are committed while the derivatives under `public/` are not.

React 19 · Vite 7 · TypeScript · Tailwind v4 · React Router 7 · Zustand.

---

## Where the design came from

Two references were supplied. Neither sells this product, so the brief was to
take their **visual language** and rebuild it around Indian couture.

| | [echoesofindiastudio.com] | [chantilly.myshopify.com] |
|---|---|---|
| Canvas | `#FFFFFF` | `#FFFFFF` |
| Ink | `rgb(3,3,2)` at 76% | `#232323` |
| Hairline | `#D3CEC5` warm stone | `#C8C8C8` |
| Accent | none — fully mono | `#BF570A` burnt sienna |
| Display | Geist 400, 72px h1 | Montserrat **200**, −0.04em, 60px |
| Body | Geist 400 | Montserrat 300, 14px / 1.6 |
| Buttons | radius 0, black fill | radius 0, uppercase 12px / 0.08em |
| Radius | 0 everywhere | 0 everywhere; swatches 100px |
| Page width | 120rem | 1600px |
| Section rhythm | — | 50 / 80 / 110px |
| Grounds | white only | `#fff` · `#f7f7f7` · `#efefef` + dark footer |

Both are hard-edged, near-monochrome, and lean on hairlines instead of shadow.
That is the spine of the system. Every token in `src/styles/tokens.css` carries
an inline `[EOI]` / `[CHA]` / `[RVT]` provenance note saying which reference it
came from and what was changed.

**What we kept:** radius 0, the uppercase micro-label, hairline-over-shadow
depth, Chantilly's section rhythm and tinted colour-scheme system, Echoes of
India's motion timings and gallery hover, the product-card anatomy, the
1600 / 720px measures.

**What we changed, and why:**

- **Neutrals warmed.** Both references are cool-to-neutral greys. Silk, khadi
  and chanderi photograph warm, so every neutral was pulled toward the cloth
  (`#F2EDE4` bone, `#DDD6CA` line). Cool greys make natural fibre look dusty.
- **One accent, deepened.** Chantilly's `#BF570A` reads as a clearance orange.
  Ours is `#9C4A21` — closer to madder and henna, so it reads as dye.
- **A fourth ground.** Chantilly ships three tints; we added `clay` for
  editorial bands that need to sit apart from product bands.
- **Countdown repurposed.** The same component, re-aimed from "flash sale" to
  the atelier's commission deadline. Couture does not do flash sales.

[echoesofindiastudio.com]: https://echoesofindiastudio.com
[chantilly.myshopify.com]: https://chantilly.myshopify.com

### Typography — the client's own faces

The references' typefaces were replaced by the two the client supplied:

- **Calone** (prime) — self-hosted from `public/fonts/calone.otf`. A geometric
  display sans, **single weight (400)**, 214 glyphs, Latin only. Carries the
  wordmark and every heading.
- **Manrope** (secondary) — variable 200–800, from Google Fonts. Body, UI,
  buttons, eyebrows, navigation, prices, and any non-Latin fallback.

This has one consequence worth knowing. Chantilly's display signature is
Montserrat at **weight 200** — the airiness comes from the stem. Calone ships
one weight, so that cannot be copied. It is reproduced instead through **size,
leading and tracking**, and `font-synthesis: none` is set on every display
class so no browser fakes a weight the family does not have.

Calone's tracking was also retuned: −0.04em was measured on a condensed
200-weight sans and closes Calone's counters up. Display sizes sit at −0.012em;
everything below h2 sits at its natural fit.

The fallback stack is geometric (`Futura, Avenir Next, Century Gothic`) rather
than a serif, so a failed webfont degrades to something of the same species.

> `calone.otf` also sits at the project root where it was dropped. The build
> reads only `public/fonts/calone.otf`; the root copy can be deleted.

---

## Structure

```
src/
  styles/
    tokens.css        every design decision, with provenance notes
    base.css          @font-face, element defaults, containers, schemes
    components.css    component classes, all built from tokens
  components/
    primitives/       Button, Icon, Price, Rating, Swatch, Rail, Reveal…
    product/          ProductCard, ProductGrid, QuickView
    layout/           Header, Footer, CartDrawer, AnnouncementBar, Layout
    sections/         the 13-band homepage library (see below)
  pages/              Home, Collection, Product, Atelier, Journal, Wishlist,
                      NotFound
  data/               types + catalogue (12 products, 6 categories, 3 posts)
  store/cart.ts       Zustand cart + wishlist, persisted to localStorage
  lib/                utils, useReveal, useScrolled, useBodyLock
scripts/
  generate-art.mjs    generates the 46 placeholder SVGs
```

### Section library

Each band maps to a section on one of the two references and can be reordered
or dropped without touching any other:

`Hero` (Chantilly slideshow) · `Marquee` (EOI statement band) · `FeaturedRail`
(Trending Styles carousel) · `EditorialSplit` (image + copy feature) ·
`CategoryTiles` (EOI Shop the Look) · `Manifesto` (Chantilly brand quote) ·
`Countdown` · `PromoTrio` (three-up cards) · `ValueProps` (Our Values) ·
`Testimonials` · `JournalGrid` (Blog posts) · `SocialStrip` (Instagram
footer).

---

## Using the system

**Never write a literal colour, size or duration.** Everything comes from a
token or a component class:

```tsx
// yes
<h2 className="t-display">…</h2>
<p className="eyebrow">New arrivals</p>
<section className="section-lg scheme-bone">…</section>
<Button variant="secondary">Shop the collection</Button>

// no
<h2 style={{ fontSize: 48, color: '#1A1714' }}>…</h2>
```

To reskin the whole site, edit the `@theme static` block in `tokens.css` and
nothing else. `static` is required — a plain `@theme` makes Tailwind v4
tree-shake tokens nothing references yet, and they silently resolve to nothing
the first time a component asks for one.

The design system is documented in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). It no
longer ships as a page on the site.

---

## Buttons

Outline and rule, not blocks. The weight sits on hover rather than at rest:
a button shows an edge or a 1px rule until you reach for it, then commits to
a fill.

| Variant | Shape | For |
|---|---|---|
| `primary` | hairline box, fills on hover | the action on a screen |
| `secondary` | label over a rule, no box | editorial CTA |
| `ghost` | rule on hover only | a repeated control beside others that already show an edge |
| `accent` | accent hairline | sale, urgency |
| `overlay` / `on-dark` | hairline in white / cream | over imagery, on the dark ground |
| `solid` | filled | **opt-in**, see below |

Two things are deliberate and should survive future edits:

- **44px minimum height on every variant.** Removing a fill must not cost a
  touch target. WCAG 2.5.8 asks 24px; 44 is what a thumb actually needs.
- **A visible resting state on all but `ghost`.** A control that only appears
  on hover cannot be found on a touchscreen, where there is no hover at all.

### The one judgement call

`Add to bag` is currently `primary` — a hairline outline like everything
else, which is consistent and quiet. Taking weight out of the highest-intent
control on a shop is a conversion decision, not a styling one, so `solid` is
kept as an escape hatch:

```tsx
<Button variant=solid block>Add to bag</Button>
```

One word per call site. Worth A/B testing before deciding.

## Accessibility

- Colour: `ink`, `ink-soft`, `ink-muted`, `accent` and body copy all clear WCAG
  AA (≥4.5:1) on **all four** light grounds. `ink-muted` was originally set by
  eye at `#857D71` and measured 4.06:1 — below AA for the 11px eyebrows that
  use it — and was darkened to `#675F53` (4.76:1 on the worst ground, clay).
  `ink-faint` is placeholders and disabled states only.
- Visible focus ring on every interactive element, offset 3px.
- Skip link, landmark regions, labelled form controls, `aria-pressed` on all
  toggles, live region on the announcement bar.
- Full keyboard operation for drawers, filters, accordions and carousels.
- Everything collapses under `prefers-reduced-motion`, including the reveal
  entrances and the marquee.
- Reveal animations fail *open*: anything already in view on mount shows
  immediately, and a timeout backstop reveals content even if the observer
  never fires — a reveal that silently fails should never hide real content.

---

## Placeholder imagery

There is no photography yet, so `npm run art` generates 46 SVGs in the brand
palette — suzani, ikat, bandhani, block-print butti, zari, jaali, khadi and
kantha motifs over tonal grounds with a paper grain. They are deliberately
abstract: they read as textile, they never break, and they weigh a few KB.

Images that carry overlay text have a tonal wash baked in (`depth` in
`generate-art.mjs`), because a CSS scrim alone cannot rescue an image that is
pale all the way down.

To swap in real photography, replace the paths in `src/data/products.ts` —
no component changes needed. Shoot product at 3:4 and editorial at 4:3.

---

## Catalogue

Menswear only. Six categories — Sherwani, Bandhgala, Kurta Sets, Everyday,
Accessories, The Archive — and twelve pieces in `src/data/products.ts`. Sizing
runs on chest measurements (36–46) plus a made-to-measure option, except where
a piece is genuinely one-size (stoles, dupattas) or S–XL (unstructured
jackets).

## Not built yet

Checkout, accounts, search, product reviews, journal article pages, size guide,
and the legal pages. All are routed in the footer and header so the
information architecture is settled; the pages themselves are the next step.
The catalogue is a static file — swapping `src/data/products.ts` for a
commerce API is the other half.
