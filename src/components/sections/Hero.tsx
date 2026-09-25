import { useEffect, useState } from 'react';
import { ButtonLink } from '@/components/primitives/Button';
import { heroSlides } from '@/data/hero';
import { srcSet, fallbackSrc, asset, SIZES } from '@/lib/image';

/* Hero slideshow — [CHA] eyebrow / light display line / uppercase CTA over
   full-bleed imagery with the [CHA] --image-overlay scrim.

   Art direction is the whole job here. The supplied frames are 16:9 with the
   model right of centre and a lot of open landscape; a phone crops that to
   roughly a third of its width, so `object-position: center` would show empty
   sky and cut the model out of frame. Two mechanisms, in order of preference:

     1. `imageMobile` — a purpose-made portrait crop, served under 768px via
        <picture>. Always better, because a human chose what to keep.
     2. `focal` — a per-slide object-position that pulls the crop window onto
        the model. Costs no extra assets and is what runs until the crops
        exist.

   `onError` falls back to the generated placeholder rather than showing a
   broken image, so the hero survives a missing or mistyped file. */

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Featured collections">
      {heroSlides.map((s, n) => (
        <div key={s.base} className="hero__slide" data-on={n === i} aria-hidden={n !== i}>
          <div className="hero__media scrim">
            <picture>
              {/* purpose-made portrait crop first, then the landscape ladder,
                  then a JPEG for anything without WebP. */}
              {s.baseMobile && (
                <source media="(max-width: 767px)" type="image/webp"
                        srcSet={srcSet(s.baseMobile, 'hero')} sizes={SIZES.full} />
              )}
              <source type="image/webp" srcSet={srcSet(s.base, 'hero')} sizes={SIZES.full} />
              <img src={fallbackSrc(s.base)} alt={n === i ? s.alt : ''}
                   style={{ objectPosition: s.focal }}
                   loading={n === 0 ? 'eager' : 'lazy'}
                   fetchPriority={n === 0 ? 'high' : 'low'}
                   onError={(e) => {
                     /* Nothing in the pipeline output resolved — most likely the
                        photography has not been dropped into media/ yet. Strip
                        the <source> siblings too, or they keep winning over the
                        src we are about to set. */
                     const el = e.currentTarget;
                     if (el.dataset.fell) return;              // never loop
                     el.dataset.fell = '1';
                     el.parentElement?.querySelectorAll('source').forEach((n) => n.remove());
                     el.srcset = '';
                     el.src = asset(s.fallback);
                     el.style.objectPosition = 'center';
                   }} />
            </picture>
          </div>

          <div className="overlay-content overlay-bl hero__copy">
            <div className="container" style={{ paddingInline: 0 }}>
              <div className="stack-md">
                <p className="eyebrow">{s.eyebrow}</p>
                {/* Only the visible slide is the document's h1. Three slides
                    each carrying one gave the homepage three h1 elements —
                    aria-hidden keeps screen readers out of the inactive ones,
                    but a heading outline and a crawler still see all three. */}
                {n === i
                  ? <h1 className="t-hero hero__title">{s.title}</h1>
                  : <p className="t-hero hero__title" aria-hidden="true">{s.title}</p>}
                <div><ButtonLink to={s.to} variant="overlay" tabIndex={n === i ? 0 : -1}>{s.cta}</ButtonLink></div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="container hero__dots">
        {heroSlides.map((s, n) => (
          <button key={s.base} onClick={() => setI(n)}
                  aria-label={`Go to slide ${n + 1} of ${heroSlides.length}`}
                  aria-current={n === i}
                  className="hero__dot" data-on={n === i} />
        ))}
      </div>
    </section>
  );
}
