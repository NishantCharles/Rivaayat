import type { ReactNode } from 'react';
import { Reveal } from '@/components/primitives/Reveal';

/* [CHA] centred brand-quote band (`.majortitle`) — here in the serif voice. */
export function Manifesto({ quote, attribution, eyebrow }: { quote: string; attribution: string; eyebrow: ReactNode }) {
  return (
    <section className="section-xl scheme-bone">
      <div className="container-content" style={{ textAlign: 'center' }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '2rem' }}>{eyebrow}</p>
          <blockquote className="t-quote" style={{ margin: 0 }}>&ldquo;{quote}&rdquo;</blockquote>
          <p className="eyebrow" style={{ marginTop: '2rem' }}>{attribution}</p>
        </Reveal>
      </div>
    </section>
  );
}
