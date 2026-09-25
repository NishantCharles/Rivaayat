import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/data/types';
import { Price } from '@/components/primitives/Price';
import { Rating } from '@/components/primitives/Rating';
import { SwatchRow } from '@/components/primitives/Swatch';
import { IconHeart } from '@/components/primitives/Icon';
import { ProductImage } from './ProductImage';
import { shotsFor } from '@/data/productImages';
import { SIZES } from '@/lib/image';
import { useCart } from '@/store/cart';
import { cx, discountPct } from '@/lib/utils';

const LABEL_TEXT: Record<string, string> = {
  new: 'New', bestseller: 'Bestseller', 'made-to-order': 'Made to order',
  'sold-out': 'Sold out', archive: 'One of one',
};

export function ProductCard({ product, onQuickView, showSwatches = true, className }:
  { product: Product; onQuickView?: (p: Product) => void; showSwatches?: boolean; className?: string }) {
  const wishlist = useCart((s) => s.wishlist);
  const toggleWish = useCart((s) => s.toggleWish);
  const wished = wishlist.includes(product.id);
  const off = discountPct(product.price, product.compareAt);
  const shots = shotsFor(product);
  /* Drives the save animation. Kept in state rather than derived from
     `wished`, so it fires on the toggle and not on every mount of an
     already-saved card.

     Cleared on a timer rather than onAnimationEnd: the animation runs on the
     svg while the handler sits on the button, and the event did not reach it
     reliably — leaving data-pulse stuck on and the animation unable to
     replay. A timer matched to the keyframe duration has no such dependency. */
  const [pulse, setPulse] = useState(false);
  const pulseTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(pulseTimer.current), []);

  const save = () => {
    toggleWish(product.id);
    setPulse(false);
    window.clearTimeout(pulseTimer.current);
    /* next frame, so removing and re-adding the attribute restarts the
       animation instead of the browser treating it as unchanged */
    requestAnimationFrame(() => {
      setPulse(true);
      pulseTimer.current = window.setTimeout(() => setPulse(false), 460);
    });
  };

  return (
    <article className={cx('product-card group', className)}>
      {/* One positioning context for the image and its three overlays. The
          media is a link, so the wishlist and quick-view buttons have to be
          siblings of it rather than children — nesting a button inside an
          anchor is invalid and breaks keyboard activation. */}
      <div className="product-card__frame">
        <Link to={`/product/${product.slug}`} className="product-card__media" aria-label={product.title}>
          {shots.map((shot, idx) => (
            <ProductImage key={idx} shot={shot} sizes={SIZES.productGrid}
                          alt={idx === 0 ? product.title : ''}
                          className={cx('product-card__shot', idx === 1 && 'product-card__shot--alt')} />
          ))}
        </Link>

        <div className="product-card__labels">
          {off > 0 && <span className="badge badge-sale">{off}% off</span>}
          {product.labels.map((l) => (
            <span key={l} className={cx('badge', l === 'archive' ? 'badge-solid' : l === 'sold-out' && 'badge-sold')}>
              {LABEL_TEXT[l]}
            </span>
          ))}
        </div>

        <button type="button" className="product-card__wish" data-active={wished}
                onClick={save}
                data-pulse={pulse || undefined}
                aria-pressed={wished} aria-label={wished ? `Remove ${product.title} from saved` : `Save ${product.title}`}>
          <IconHeart size={20} fill={wished ? 'currentColor' : 'none'} />
        </button>

        {onQuickView && (
          <div className="product-card__quickbuy">
            <button type="button" className="btn btn-overlay btn-sm btn-block"
                    onClick={() => onQuickView(product)}>
              Quick view
            </button>
          </div>
        )}
      </div>

      <div className="product-card__body">
        <Link to={`/product/${product.slug}`}><h3 className="product-card__title link-quiet">{product.title}</h3></Link>
        <Price price={product.price} compareAt={product.compareAt} from={product.priceFrom} />
        <div className="cluster" style={{ justifyContent: 'space-between', marginTop: '0.25rem' }}>
          {showSwatches && product.colors.length > 1
            ? <SwatchRow colors={product.colors} />
            : <span className="t-meta">{product.fabric.split(',')[0]}</span>}
          <Rating value={product.rating} count={product.reviewCount} size={12} />
        </div>
      </div>
    </article>
  );
}
