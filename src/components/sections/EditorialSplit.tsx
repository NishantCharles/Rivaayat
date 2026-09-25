import { ButtonLink } from '@/components/primitives/Button';
import { Reveal } from '@/components/primitives/Reveal';
import { srcSet, fallbackSrc, SIZES } from '@/lib/image';
import { cx } from '@/lib/utils';

/* [CHA] image + text feature block; [EOI] "Made to wander" long-copy editorial.
   `flip` puts the image on the right at ≥900px and keeps it first on mobile,
   which is the reading order both references use.

   Pass `base` for a photograph off the pipeline (responsive WebP) or `image`
   for a single file such as a generated placeholder. */
export function EditorialSplit({ image, base, alt = '', eyebrow, title, body, cta, to, flip, scheme = 'scheme-default', tall }: {
  image?: string; base?: string; alt?: string;
  eyebrow: string; title: string; body: string[]; cta?: string; to?: string;
  flip?: boolean; scheme?: string; tall?: boolean;
}) {
  return (
    <section className={cx('section-lg', scheme)}>
      <div className="container">
        <div className="split">
          <Reveal className={cx('split__media', flip && 'split__media--flip')}>
            {/* No media-zoom: this image is not a link, and only controls should
                  react to the pointer. The band's CTA is the control. */}
              <div className={cx('media', tall ? 'media-portrait' : 'media-editorial')}>
              {base ? (
                <picture>
                  <source type="image/webp" srcSet={srcSet(base, 'sections')} sizes={SIZES.half} />
                  <img src={fallbackSrc(base)} alt={alt} loading="lazy" decoding="async" />
                </picture>
              ) : (
                <img src={image} alt={alt} loading="lazy" decoding="async" />
              )}
            </div>
          </Reveal>
          <Reveal delay={110} className="split__copy">
            <div className="stack-md">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="t-display">{title}</h2>
              {body.map((p, i) => <p key={i} className="t-lead measure">{p}</p>)}
              {cta && to && <div style={{ paddingTop: '0.5rem' }}><ButtonLink to={to} variant="secondary">{cta}</ButtonLink></div>}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
