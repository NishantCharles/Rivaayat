import { useState } from 'react';
import type { Product } from '@/data/types';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { CategoryTiles } from '@/components/sections/CategoryTiles';
import { FeaturedRail } from '@/components/sections/FeaturedRail';
import { EditorialSplit } from '@/components/sections/EditorialSplit';
import { Manifesto } from '@/components/sections/Manifesto';
import { Countdown } from '@/components/sections/Countdown';
import { PromoTrio } from '@/components/sections/PromoTrio';
import { ValueProps } from '@/components/sections/ValueProps';
import { Testimonials } from '@/components/sections/Testimonials';
import { JournalGrid } from '@/components/sections/JournalGrid';
import { QuickView } from '@/components/product/QuickView';
import { products, newArrivals, bestsellers, uniqueById } from '@/data/products';

export function HomePage() {
  const [quick, setQuick] = useState<Product | null>(null);

  /* Two rails, twelve pieces. Eight each overlapped on five — the same
     garment twice within a screen of scrolling, which reads as a thin
     catalogue rather than a curated one. Six each divides the twelve exactly,
     so the second rail is whatever the first did not take and nothing repeats.
     Both rails scroll, so six is not a visible shortfall.
     Raise RAIL_SIZE once the catalogue outgrows it. */
  const RAIL_SIZE = 6;
  const firstRail = uniqueById([...newArrivals(), ...products]).slice(0, RAIL_SIZE);
  const shown = new Set(firstRail.map((p) => p.id));
  const rest = products.filter((p) => !shown.has(p.id));
  const secondRail = uniqueById([
    ...bestsellers().filter((p) => !shown.has(p.id)),
    ...rest,
  ]).slice(0, RAIL_SIZE);

  return (
    <>
      <Hero />

      <Marquee items={[
        'Hand-embroidered in eight Indian states',
        'Made to measure at no surcharge',
        'Natural fibres only',
        'Seventy-one artisan families',
      ]} />

      <FeaturedRail
        eyebrow="Introducing"
        title="New arrivals"
        products={firstRail}
        link="/shop/all" linkLabel="Shop all new"
        onQuickView={setQuick}
      />

      <EditorialSplit
        base="/sections/homes1"
        alt="A hand-embroidered jacket photographed close, the stitching visible"
        eyebrow="Made to last longer than you"
        title="Meet the piece that outlives the occasion."
        body={[
          'Hand-embroidered by people who have never rushed a stitch. Suzani vines, marigold suns and jaali arches worked into cloth that was always going to end up yours.',
          'Cut for the ones who keep things. From a pit loom in Kutch to wherever you are wearing it next — and then, with luck, to whoever you hand it down to.',
        ]}
        cta="Shop the collection" to="/shop/sherwani"
      />

      <CategoryTiles />

      <Manifesto
        eyebrow={<>Rivaayat — <span className="deva">रिवायत</span> — tradition, carried</>}
        quote="We believe in two things: that a garment should be worth keeping, and that the person who made it should be able to sign it."
        attribution="Ira Sengupta · Founder, 1974"
      />

      <FeaturedRail
        eyebrow="Most requested"
        title="The pieces people come back for"
        products={secondRail}
        link="/shop/all" linkLabel="View all"
        onQuickView={setQuick}
        scheme="scheme-alabaster"
      />

      <Countdown />

      <EditorialSplit
        base="/sections/homes2"
        alt="Two artisans at a wooden embroidery frame in the atelier"
        eyebrow="Inside the atelier"
        title="Seventy-one families, eight states, one order card."
        body={[
          'We do not use the word artisan loosely. Every piece leaves with a card naming the people who made it — the weaver, the karigar at the frame, the finisher.',
          'They are paid per piece and they set the rate. It makes things slower and it makes them cost more, and we have not found a version of this we would rather run.',
        ]}
        cta="Meet the makers" to="/atelier#artisans"
        flip scheme="scheme-bone"
      />

      <PromoTrio />
      <ValueProps />
      <Testimonials />
      <JournalGrid />

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
