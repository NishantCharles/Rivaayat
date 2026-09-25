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
  /* Which way the panel should travel. The entering quote comes from the
     side you are heading towards, so the movement matches the control you
     pressed instead of always drifting the same way. */
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const q = QUOTES[i];

  const go = (d: 1 | -1) => {
    setDir(d);
    setI((n) => (n + d + QUOTES.length) % QUOTES.length);
  };
  const jumpTo = (n: number) => {
    setDir(n > i ? 1 : -1);
    setI(n);
  };

  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /* Advances on its own, but stops the moment someone is reading or
     operating it. Honours prefers-reduced-motion by not starting at all,
     which WCAG 2.2.2 requires of anything auto-updating. */
  useEffect(() => {
    if (paused || reduced.current) return;
    const t = setInterval(() => go(1), ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, i]);

  return (
    <section className="section-xl scheme-dark">
      <div
        className="container-content testimonial"
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
        {/* Pinned to the edges of the content column, vertically centred on
            the quote. Below 1000px they fold back under the panel, where
            there is no longer room beside the text. */}
        <button className="testimonial__arrow testimonial__arrow--prev icon-btn icon-btn-outlined"
                onClick={() => go(-1)} aria-label="Previous testimonial">
          <IconLeft />
        </button>
        <button className="testimonial__arrow testimonial__arrow--next icon-btn icon-btn-outlined"
                onClick={() => go(1)} aria-label="Next testimonial">
          <IconRight />
        </button>

        <div className="testimonial__inner">
          <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>What people write back</p>
          <Rating value={5} className="cluster-center" size={15} />

          {/* key remounts the panel so the entrance animation replays on
              every change; aria-live announces one that happened on its own */}
          <div aria-live="polite" aria-atomic="true">
            <div key={i} className="testimonial__panel" data-dir={dir}>
              <blockquote className="t-h2 testimonial__quote">{q.text}</blockquote>
              <p className="eyebrow testimonial__by">— {q.name}, {q.place}</p>
              <Link to={q.to} className="eyebrow link-quiet testimonial__link">{q.label}</Link>
            </div>
          </div>

          <div className="testimonial__controls">
            <button className="testimonial__arrow--inline icon-btn icon-btn-outlined"
                    onClick={() => go(-1)} aria-label="Previous testimonial" tabIndex={-1}>
              <IconLeft />
            </button>
            <span className="cluster" style={{ gap: '0.4rem' }}>
              {QUOTES.map((quote, n) => (
                <button key={quote.name} onClick={() => jumpTo(n)}
                        className="testimonial-dot" data-on={n === i}
                        aria-label={`Testimonial ${n + 1} of ${QUOTES.length}`}
                        aria-current={n === i} />
              ))}
            </span>
            <button className="testimonial__arrow--inline icon-btn icon-btn-outlined"
                    onClick={() => go(1)} aria-label="Next testimonial" tabIndex={-1}>
              <IconRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
