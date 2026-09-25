import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconLeft, IconRight } from '@/components/primitives/Icon';
import { Rating } from '@/components/primitives/Rating';

/* [CHA] testimonial carousel with a "Shop the X collection" tail link. */
const QUOTES = [
  { text: 'The sherwani took ninety-one days and arrived with a note listing everyone who touched it. I have worn it twice and it still feels like the first time.', name: 'Arjun M.', place: 'Bengaluru', to: '/shop/sherwani', label: 'Shop sherwani' },
  { text: 'I sent my measurements at midnight from Toronto with no expectations. The fit is better than anything I have had made in person.', name: 'Rohan R.', place: 'Toronto', to: '/custom', label: 'Made to measure' },
  { text: 'My father wore his waistcoat to two weddings and a funeral this year and it looks exactly as it did in March.', name: 'Karan S.', place: 'London', to: '/shop/waistcoat', label: 'Shop waistcoat' },
];

const ADVANCE_MS = 8000;

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const q = QUOTES[i];
  const go = (d: number) => setI((n) => (n + d + QUOTES.length) % QUOTES.length);

  /* Advances on its own, but stops the moment someone is reading or
     operating it — an auto-advancing panel that moves under a reader is
     worse than one that never moves. Honours prefers-reduced-motion by not
     starting at all, which WCAG 2.2.2 requires for anything auto-updating. */
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % QUOTES.length), ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, i]);

  return (
    <section className="section-xl scheme-dark">
      <div
        ref={region}
        className="container-reading"
        style={{ textAlign: 'center' }}
        aria-roledescription="carousel"
        aria-label="What customers wrote back"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
          if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
        }}
      >
        <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>What people write back</p>
        <Rating value={5} className="cluster-center" size={15} />

        {/* polite, so the quote is announced when it changes on its own */}
        <div aria-live="polite" aria-atomic="true">
          <blockquote className="t-h2" style={{ margin: '1.5rem 0 0', color: 'var(--color-on-dark)', fontWeight: 200 }}>
            {q.text}
          </blockquote>
          <p className="eyebrow" style={{ marginTop: '1.75rem', color: 'var(--color-on-dark-muted)' }}>— {q.name}, {q.place}</p>
        </div>

        <Link to={q.to} className="eyebrow link-quiet" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--color-on-dark)' }}>{q.label}</Link>

        <div className="cluster cluster-center" style={{ gap: '0.75rem', marginTop: '2.5rem' }}>
          <button className="icon-btn icon-btn-outlined" onClick={() => go(-1)} aria-label="Previous testimonial">
            <IconLeft />
          </button>

          {/* Dots carry position at a glance; the counter alone made the set
              look like a single panel with a stray number under it. */}
          <span className="cluster" style={{ gap: '0.4rem' }}>
            {QUOTES.map((quote, n) => (
              <button
                key={quote.name}
                onClick={() => setI(n)}
                className="testimonial-dot"
                data-on={n === i}
                aria-label={`Testimonial ${n + 1} of ${QUOTES.length}`}
                aria-current={n === i}
              />
            ))}
          </span>

          <button className="icon-btn icon-btn-outlined" onClick={() => go(1)} aria-label="Next testimonial">
            <IconRight />
          </button>
        </div>
      </div>
    </section>
  );
}
