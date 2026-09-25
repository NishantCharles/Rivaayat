# Wordmark

Classical roman capitals, widely tracked, in the house green — set from the
logo the client supplied.

| | |
|---|---|
| Typeface | Cormorant Garamond, weight 400 |
| Case | All caps |
| Tracking | 0.20em (0.22em above ~28px, 0.18em below ~18px) |
| Colour | `--color-brand` `#0B2312` |
| Reversed | `--color-on-dark` `#FAF8F4` |

## On the site it is live text, not an image

`<Wordmark />` in `src/components/layout/Wordmark.tsx`. That keeps it crisp at
every size, lets it inherit the surface colour over hero imagery and in the
dark footer, and keeps it selectable and readable by screen readers. Don't
swap it for an `<img>`.

One optical correction worth knowing about: letter-spacing adds a trailing
space after the final **T**, which would sit the mark visibly off-centre in a
centred header. `.wordmark` compensates with a `padding-left` of one tracking
unit — change one and change the other.

## Colour

`#0B2312` is read from the supplied artwork. Their earlier brand guide recorded
the house green as `#001D00`; if that is still the official value, change
`--color-brand` in `src/styles/tokens.css` and everything follows.

Green is an **identity** colour here, not a UI colour — the wordmark, the
favicon and the seal use it, and nothing else does. The interface palette stays
warm-neutral with the henna accent.

## The files here

`wordmark.svg` and `wordmark-on-dark.svg` are for off-site use — email
signatures, socials, decks.

⚠️ **They set live text, not outlines.** They render correctly anywhere
Cormorant Garamond is installed or embedded, and fall back to Garamond/Georgia
elsewhere, which is close but not the mark. Before anything goes to **print, a
manufacturer, or a third party**, export a version with the glyphs converted to
outlines from a vector tool. Do not send these to a printer as-is.
