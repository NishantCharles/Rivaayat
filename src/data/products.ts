import type { Product, Category, JournalPost } from './types';

/* Clean paths. asset() in lib/image.ts applies the deploy base at render,
   so the catalogue stays portable. */
const img = (n: string) => `/img/${n}.svg`;

/* Four garment categories. "New Arrivals" and "Custom Orders" also sit in the
   nav, but neither is a category a product belongs to — New Arrivals is a view
   over the `new` label, and Custom Orders is the made-to-measure service. Both
   are defined in navigation.ts, not here. */
export const categories: Category[] = [
  { slug: 'sherwani',       name: 'Sherwani',        tagline: 'For the wedding you are standing at the front of.', image: img('cat-sherwani'),       count: 3 },
  { slug: 'shalwar-kameez', name: 'Shalwar Kameez',  tagline: 'The everyday cut, made properly and made to you.',                  image: img('cat-shalwar-kameez'), count: 3 },
  { slug: 'kurta',          name: 'Kurta',           tagline: 'Occasion kurtas, with the churidar cut to match.',       image: img('cat-kurta'),          count: 3 },
  { slug: 'waistcoat',      name: 'Waistcoat',       tagline: 'Worn over a kurta, or worn entirely on its own.',                         image: img('cat-waistcoat'),      count: 3 },
];

const CARE = [
  'Dry clean only, by a specialist familiar with hand embroidery',
  'Store on a broad wooden hanger, shoulders supported',
  'Keep away from direct sunlight and cologne',
];
const WASHABLE = [
  'Machine wash cold, gentle cycle',
  'Line dry in shade',
  'Warm iron while slightly damp',
];

const CHEST = (except: string[] = []) => ({
  label: 'Chest',
  values: ['36', '38', '40', '42', '44', '46'].map((v) => ({ value: v, available: !except.includes(v) })),
});

export const products: Product[] = [
  /* ── Sherwani ────────────────────────────────────────────── */
  {
    id: 'p-001', slug: 'mehr-sherwani', title: 'Mehr Sherwani',
    subtitle: 'Indigo wool-silk sherwani with tonal zari piping',
    category: 'sherwani', collection: 'Mehtab · AW26',
    price: 74000,
    images: [img('sherwani-mehr'), img('sherwani-mehr-alt')],
    colors: [{ name: 'Deep Indigo', hex: '#2B3A4A' }, { name: 'Slate', hex: '#4A443C' }],
    sizes: CHEST(['46']),
    labels: ['bestseller'], rating: 4.8, reviewCount: 27,
    fabric: 'Wool-silk blend, 340gsm', craft: 'Tonal zari piping, hand-set buttons', origin: 'Delhi',
    care: CARE, includes: ['Sherwani', 'Churidar', 'Stole'],
    description: 'Cut close through the chest and released at the hip, so it reads as a coat rather than a costume. The zari is the same colour as the cloth — you only find it when you are close enough to shake a hand.',
    leadTimeDays: 21, inStock: true,
  },
  {
    id: 'p-002', slug: 'daraab-sherwani', title: 'Daraab Sherwani',
    subtitle: 'Raw silk sherwani with hand-worked zardozi at the placket',
    category: 'sherwani', collection: 'Mehtab · AW26',
    price: 128000, priceFrom: true,
    images: [img('sherwani-daraab'), img('sherwani-daraab-alt')],
    colors: [{ name: 'Saffron Dusk', hex: '#C08A2E' }, { name: 'Henna', hex: '#9C4A21' }, { name: 'Ivory', hex: '#F2EDE4' }],
    sizes: CHEST(),
    labels: ['new', 'made-to-order'], rating: 4.9, reviewCount: 38,
    fabric: 'Raw silk with cotton canvas interlining', craft: 'Zardozi and dori work', origin: 'Lucknow, Uttar Pradesh',
    care: CARE, includes: ['Sherwani', 'Churidar', 'Organza stole', 'Muslin storage bag'],
    description: 'The zardozi runs only where the light catches it — the placket, the cuffs, and a single band above the hem. Everything else is left alone. Six weeks on the frame, three artisans, one piece.',
    leadTimeDays: 42, inStock: true,
  },
  {
    id: 'p-003', slug: 'aftab-sherwani', title: 'Aftab Sherwani',
    subtitle: 'Archive sherwani in tissue and old zari — one piece only',
    category: 'sherwani', collection: 'The Archive',
    price: 145000,
    images: [img('sherwani-aftab'), img('sherwani-aftab-alt')],
    colors: [{ name: 'Burnished Copper', hex: '#9C4A21', hex2: '#C08A2E' }],
    sizes: { label: 'Chest', values: [{ value: '40', available: true }, { value: '42', available: false }] },
    labels: ['archive'], rating: 5.0, reviewCount: 4,
    fabric: 'Tissue silk with reclaimed zari', craft: 'Kamdani over a knife-pleated skirt', origin: 'Hyderabad, Telangana',
    care: CARE, includes: ['Sherwani', 'Churidar', 'Stole', 'Certificate of provenance'],
    description: 'Built around a length of zari-worked tissue found in a Hyderabad trunk, dated to the 1940s. The old cloth sets the skirt; everything above and below was made to meet it. There is one. There will not be another.',
    leadTimeDays: 0, inStock: true,
  },

  /* ── Shalwar Kameez ──────────────────────────────────────── */
  {
    id: 'p-004', slug: 'sartaj-shalwar-kameez', title: 'Sartaj Shalwar Kameez',
    subtitle: 'Handspun khadi shalwar kameez, unlined and unhurried',
    category: 'shalwar-kameez', collection: 'Everyday Handloom',
    price: 12900, compareAt: 15500,
    images: [img('shalwar-sartaj'), img('shalwar-sartaj-alt')],
    colors: [{ name: 'Moss', hex: '#4F5B44' }, { name: 'Undyed', hex: '#F2EDE4' }, { name: 'Ink', hex: '#1A1714' }],
    sizes: CHEST(),
    labels: [], rating: 4.7, reviewCount: 156,
    fabric: 'Handspun khadi cotton', craft: 'Pit-loom woven, hand-finished seams', origin: 'Kutch, Gujarat',
    care: WASHABLE, includes: ['Kameez', 'Shalwar'],
    description: 'Khadi off a pit loom, which means it breathes and it creases and it gets better for both. The side seams are finished by hand so there is nothing to scratch. It will shrink about two percent on the first wash; we cut for that.',
    leadTimeDays: 4, inStock: true,
  },
  {
    id: 'p-005', slug: 'nazm-shalwar-kameez', title: 'Nazm Shalwar Kameez',
    subtitle: 'Chanderi shalwar kameez with a mukaish scatter',
    category: 'shalwar-kameez', collection: 'Shab · Resort',
    price: 32000, compareAt: 39000,
    images: [img('shalwar-nazm'), img('shalwar-nazm-alt')],
    colors: [{ name: 'Terracotta', hex: '#9C4A21' }, { name: 'Bone', hex: '#F2EDE4' }],
    sizes: CHEST(['38']),
    labels: ['bestseller'], rating: 4.6, reviewCount: 64,
    fabric: 'Handwoven chanderi', craft: 'Mukaish badla scatter', origin: 'Chanderi, Madhya Pradesh',
    care: CARE, includes: ['Kameez', 'Shalwar', 'Stole'],
    description: 'Chanderi is half silk, half cotton, and it holds a shape without weight. The mukaish is scattered rather than patterned, which is the older way — the badla is pushed through the weave and folded back by hand.',
    leadTimeDays: 14, inStock: true,
  },
  {
    id: 'p-006', slug: 'rehan-shalwar-kameez', title: 'Rehan Shalwar Kameez',
    subtitle: 'Silk shalwar kameez with a tonal thread-worked yoke',
    category: 'shalwar-kameez', collection: 'Mehtab · AW26',
    price: 38500,
    images: [img('shalwar-rehan'), img('shalwar-rehan-alt')],
    colors: [{ name: 'Sea Glass', hex: '#3F5C58' }, { name: 'Ivory', hex: '#FAF8F4' }],
    sizes: CHEST(),
    labels: ['new'], rating: 4.5, reviewCount: 33,
    fabric: 'Mulberry silk, 22 momme', craft: 'Tonal thread work, French seams', origin: 'Mumbai, Maharashtra',
    care: CARE, includes: ['Kameez', 'Shalwar'],
    description: 'The yoke is worked in thread the same colour as the ground, so it reads as texture rather than pattern. For the occasions where you would rather not be the photograph.',
    leadTimeDays: 12, inStock: true,
  },

  /* ── Kurta ───────────────────────────────────────────────── */
  {
    id: 'p-007', slug: 'zafar-kurta-set', title: 'Zafar Kurta Set',
    subtitle: 'Banarasi tissue kurta with a real-zari placket',
    category: 'kurta', collection: 'Mehtab · AW26',
    price: 46000,
    images: [img('kurta-zafar'), img('kurta-zafar-alt')],
    colors: [{ name: 'Marigold', hex: '#C08A2E' }, { name: 'Champagne', hex: '#E7DFD2' }],
    sizes: CHEST(),
    labels: ['new'], rating: 4.9, reviewCount: 21,
    fabric: 'Katan silk with tissue ground', craft: 'Kadhwa weave, gold-tested zari', origin: 'Varanasi, Uttar Pradesh',
    care: CARE, includes: ['Kurta', 'Churidar'],
    description: 'Woven kadhwa, so each motif is worked in separately and there are no floats to cut on the reverse. Four months on the loom. The zari is tested — you can have it assayed and it will hold.',
    leadTimeDays: 7, inStock: true,
  },
  {
    id: 'p-008', slug: 'gulzar-kurta-set', title: 'Gulzar Kurta Set',
    subtitle: 'Silk kurta with a hand-worked butti yoke',
    category: 'kurta', collection: 'Shab · Resort',
    price: 28500,
    images: [img('kurta-gulzar'), img('kurta-gulzar-alt')],
    colors: [{ name: 'Mulberry', hex: '#5C3B4A' }, { name: 'Clay Rose', hex: '#A8676B' }],
    sizes: CHEST(),
    labels: [], rating: 4.5, reviewCount: 47,
    fabric: 'Mulberry silk, 22 momme', craft: 'Hand-worked butti, French seams', origin: 'Mumbai, Maharashtra',
    care: CARE, includes: ['Kurta', 'Churidar'],
    description: 'Small worked motifs scattered across the yoke and nowhere else, so the kurta reads plain from across a room and does not from beside you.',
    leadTimeDays: 12, inStock: true,
  },
  {
    id: 'p-009', slug: 'raahat-kurta', title: 'Raahat Kurta',
    subtitle: 'Handloom khadi kurta, unlined and unhurried',
    category: 'kurta', collection: 'Everyday Handloom',
    price: 8900, compareAt: 11500,
    images: [img('kurta-raahat'), img('kurta-raahat-alt')],
    colors: [{ name: 'Moss', hex: '#4F5B44' }, { name: 'Undyed', hex: '#F2EDE4' }, { name: 'Ink', hex: '#1A1714' }],
    sizes: CHEST(),
    labels: [], rating: 4.7, reviewCount: 156,
    fabric: 'Handspun khadi cotton', craft: 'Pit-loom woven, hand-finished seams', origin: 'Kutch, Gujarat',
    care: WASHABLE, includes: ['Kurta'],
    description: 'Khadi off a pit loom, which means it breathes and it creases and it gets better for both. The side seams are finished by hand so there is nothing to scratch.',
    leadTimeDays: 4, inStock: true,
  },

  /* ── Waistcoat ───────────────────────────────────────────── */
  {
    id: 'p-010', slug: 'meher-waistcoat', title: 'Meher Waistcoat',
    subtitle: 'Brocade waistcoat cut to sit under a closed jacket',
    category: 'waistcoat', collection: 'Mehtab · AW26',
    price: 18500,
    images: [img('waistcoat-meher'), img('waistcoat-meher-alt')],
    colors: [{ name: 'Antique Gold', hex: '#C08A2E' }, { name: 'Henna', hex: '#9C4A21' }, { name: 'Ink', hex: '#1A1714' }],
    sizes: CHEST(),
    labels: ['made-to-order'], rating: 4.7, reviewCount: 52,
    fabric: 'Silk brocade with cotton back', craft: 'Hand-finished bindings, adjustable cinch', origin: 'Jaipur, Rajasthan',
    care: CARE, includes: ['Waistcoat'],
    description: 'Cut short enough to disappear under a sherwani and finished well enough to wear without one. The back is plain cotton, as it should be — nobody is paying for brocade they will never see.',
    leadTimeDays: 25, inStock: true,
  },
  {
    id: 'p-011', slug: 'parvaaz-waistcoat', title: 'Parvaaz Waistcoat',
    subtitle: 'Quilted kantha waistcoat over reclaimed cotton',
    category: 'waistcoat', collection: 'Shab · Resort',
    price: 16500,
    images: [img('waistcoat-parvaaz'), img('waistcoat-parvaaz-alt')],
    colors: [{ name: 'Indigo', hex: '#2B3A4A', hex2: '#4A443C' }, { name: 'Rust', hex: '#9C4A21', hex2: '#C08A2E' }],
    sizes: CHEST(),
    labels: ['new'], rating: 4.9, reviewCount: 41,
    fabric: 'Reclaimed cotton, three layers', craft: 'Running-stitch kantha quilting', origin: 'Bolpur, West Bengal',
    care: ['Gentle hand wash, cold', 'Dry flat in shade', 'Do not bleach'],
    includes: ['Waistcoat'],
    description: 'Three layers of cotton that had a life before this one, held together by a running stitch that goes edge to edge. Reversible. No two are the same because no two sets of old cloth ever are.',
    leadTimeDays: 10, inStock: true,
  },
  {
    id: 'p-012', slug: 'shahzada-waistcoat', title: 'Shahzada Waistcoat',
    subtitle: 'Structured raw-silk waistcoat with a hand-cut jaali placket',
    category: 'waistcoat', collection: 'Mehtab · AW26',
    price: 24000, priceFrom: true,
    images: [img('waistcoat-shahzada'), img('waistcoat-shahzada-alt')],
    colors: [{ name: 'Plum Shadow', hex: '#5C3B4A' }, { name: 'Deep Indigo', hex: '#2B3A4A' }],
    sizes: CHEST(['36']),
    labels: ['made-to-order', 'bestseller'], rating: 5.0, reviewCount: 41,
    fabric: 'Raw silk, canvassed front', craft: 'Jaali cutwork placket, hand-padded shoulder', origin: 'Jaipur, Rajasthan',
    care: CARE, includes: ['Waistcoat'],
    description: 'The placket is cut by hand, not punched — every arch in the jaali is a little different, which is how you know a person made it. Fully canvassed, so it takes the shape of whoever wears it and keeps it.',
    leadTimeDays: 35, inStock: true,
  },
];

export const journal: JournalPost[] = [
  { slug: 'four-months-on-a-loom', title: 'Four months on a loom in Varanasi', excerpt: 'What actually happens between the first thread and a finished kadhwa placket — and why the wait is the product.', date: '2026-08-14', author: 'Ira Sengupta', image: img('journal-01'), readMinutes: 7 },
  { slug: 'reading-a-jaali-placket', title: 'How to read a jaali placket', excerpt: 'Hand-cut or punched? Six things to look for before you pay sherwani money for either.', date: '2026-07-02', author: 'Devika Rao', image: img('journal-02'), readMinutes: 5 },
  { slug: 'the-case-for-made-to-measure', title: 'The case for made-to-measure', excerpt: 'Off-the-peg menswear was designed for a standard chest. Almost nobody has one.', date: '2026-05-28', author: 'Ira Sengupta', image: img('journal-03'), readMinutes: 6 },
];

/* ── selectors ─────────────────────────────────────────────── */
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (c: string) =>
  c === 'all' ? products : c === 'new' ? newArrivals() : products.filter((p) => p.category === c);
export const featured = (n = 8) => products.slice(0, n);
export const newArrivals = () => products.filter((p) => p.labels.includes('new'));
export const bestsellers = () => products.filter((p) => p.labels.includes('bestseller'));
export const related = (p: Product, n = 4) =>
  products.filter((x) => x.id !== p.id && (x.category === p.category || x.collection === p.collection)).slice(0, n);

/** Dedupes by id while preserving order — rails often concatenate
    overlapping selectors (new + featured) and React needs unique keys. */
export const uniqueById = <T extends { id: string }>(list: T[]) =>
  list.filter((p, i, a) => a.findIndex((x) => x.id === p.id) === i);

export const collections = [...new Set(products.map((p) => p.collection))];
export const fabrics = [...new Set(products.map((p) => p.fabric.split(',')[0].trim()))];
