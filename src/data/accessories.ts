import floorMatsImg from '../assets/floor-mats.avif';
import seatCoversImg from '../assets/seat-covers.avif';
import dashCamImg from '../assets/dash-cam.avif';
import detailKitImg from '../assets/detail-kit.jpeg';
import engineRenderImg from '../assets/engine-render.jpg';
import oilFilterImg from '../assets/oil-filter.jpg';
import oilFilter2Img from '../assets/oil-filter-2.jpg';
import shiftingGearImg from '../assets/shifting-gear.jpg';
import metalWheelImg from '../assets/metal-wheel.jpg';
import interiorDetailsImg from '../assets/interior-details.jpg';
import luxurySeatImg from '../assets/luxury-seat.jpg';
import accessoriesArr1Img from '../assets/accessories-arrangement-1.jpg';
import accessoriesArr2Img from '../assets/accessories-arrangement-2.jpg';
import accessoriesCompImg from '../assets/accessories-composition.jpg';
import airconGrilleImg from '../assets/aircon-grille.jpg';
import startButtonsImg from '../assets/start-buttons.jpg';
import steeringWheelImg from '../assets/steering-wheel.jpg';
import pivotVentMountImg from '../assets/pivot-vent-mount.jpg';
import pivotVentMountV2Img from '../assets/pivot-vent-mount-v2.jpg';
import ventGrilleImg from '../assets/vent-grille.jpg';

export type AccessoryProduct = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  priceUSD: number;
  category: 'Interior' | 'Exterior' | 'Electronics' | 'Care & Detailing' | 'Safety' | 'Tools';
  material: string;
  fitment: 'Universal' | 'Vehicle-specific';
  brandLine: 'Hilder Select' | 'Hilder Pro' | 'Hilder Essentials';
  shipFrom: string;
  description: string;
  highlights: string[];
  colors?: { id: string; label: string; swatch: string }[];
};

export const ACCESSORY_CATEGORIES = [
  { label: 'Interior Comfort', image: floorMatsImg },
  { label: 'Exterior Styling', image: seatCoversImg },
  { label: 'Electronics', image: dashCamImg },
  { label: 'Care & Detailing', image: detailKitImg },
  { label: 'Performance & Engine', image: engineRenderImg },
  { label: 'Safety & Emergency', image: accessoriesArr1Img },
  { label: 'Tools & Garage', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600' }
] as const;

export const ACCESSORY_PRODUCTS: AccessoryProduct[] = [
  {
    id: 'floor-mats',
    name: 'Hilder Pivot All-Weather Floor Mats',
    image: floorMatsImg,
    rating: 4.8,
    reviews: 182,
    priceUSD: 189,
    category: 'Interior',
    material: 'Thermo-polymer',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'US',
    description: 'Laser-measured walls and textured surface cradle snow, mud, and spills without sacrificing grip.',
    highlights: ['Raised perimeter lip', 'OEM attachment system', 'Easy pressure-wash cleanup'],
    colors: [
      { id: 'blk', label: 'Black', swatch: '#111827' },
      { id: 'tan', label: 'Tan', swatch: '#b08b4f' }
    ]
  },
  {
    id: 'seat-covers',
    name: 'Hilder Forma Seat Covers (Vegan Leather)',
    image: seatCoversImg,
    rating: 4.6,
    reviews: 114,
    priceUSD: 259,
    category: 'Interior',
    material: 'Vegan leather & mesh',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'DE',
    description: 'Breathable panels wrap OEM seats and safeguard stitching from daily wear.',
    highlights: ['Zip-off center panels', 'Mesh lumbar inserts', 'Integrated headrest protectors'],
    colors: [
      { id: 'blk', label: 'Black', swatch: '#0f172a' },
      { id: 'char', label: 'Charcoal', swatch: '#475569' }
    ]
  },
  {
    id: 'dash-cam',
    name: 'Hilder Horizon Dash Cam (4K Dual)',
    image: dashCamImg,
    rating: 4.9,
    reviews: 210,
    priceUSD: 229,
    category: 'Electronics',
    material: 'Engineered composite',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'CN',
    description: 'Dual 4K capture with HDR and parking monitoring for city and highway driving.',
    highlights: ['2.5K front / 1080p rear', 'Voice control', 'Impact detection + cloud backup']
  },
  {
    id: 'detail-kit',
    name: 'Hilder Shine Detail Kit',
    image: detailKitImg,
    rating: 4.9,
    reviews: 146,
    priceUSD: 89,
    category: 'Care & Detailing',
    material: 'Chemical kit',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'pH-neutral soap, foam cannon, microfiber towels, and ceramic sealant keep finishes glossy.',
    highlights: ['Ceramic top coat', 'Foam applicator', 'Two plush microfiber towels']
  },
  {
    id: 'headlights',
    name: 'Hilder Luma LED Headlight Bulbs',
    image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?w=1200',
    rating: 4.7,
    reviews: 132,
    priceUSD: 129,
    category: 'Exterior',
    material: 'Cree LED + aluminum',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'JP',
    description: '12000 lumens per bulb with dedicated heat sinks for quiet cooling on long trips.',
    highlights: ['Plug-and-play harness', '6000K daylight tone', '3-year corrosion warranty']
  },
  {
    id: 'phone-mount',
    name: 'Hilder Pivot Vent Phone Mount',
    image: pivotVentMountImg,
    rating: 4.5,
    reviews: 167,
    priceUSD: 49,
    category: 'Electronics',
    material: 'Aluminum + polymer',
    fitment: 'Universal',
    brandLine: 'Hilder Essentials',
    shipFrom: 'US',
    description: 'Compact magnetic mount keeps phones centered without blocking view.',
    highlights: ['MagSafe ready', '360° rotation', 'Tool-free install']
  },
  {
    id: 'phone-mount-pro',
    name: 'Hilder Pivot Vent Phone Mount Pro',
    image: pivotVentMountV2Img,
    rating: 4.8,
    reviews: 198,
    priceUSD: 59,
    category: 'Electronics',
    material: 'Anodized aluminum + polymer',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'Magnetic vent clip with swappable arms for larger phones and tablets.',
    highlights: ['Dual-lock clamp', 'Wireless charger compatible', 'Ratcheting pivot']
  },
  {
    id: 'roof-rack',
    name: 'Hilder Terrain Roof Rack',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    rating: 4.4,
    reviews: 78,
    priceUSD: 519,
    category: 'Exterior',
    material: 'Aluminum alloy',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'JP',
    description: 'Low-profile cross bars, aerodynamic end caps, and hardware clipped per make/model.',
    highlights: ['165 lbs load rating', 'Powder-coated finish', 'Quick-release clamps']
  },
  {
    id: 'vent-grille',
    name: 'Hilder Apex Vent Grille Kit',
    image: ventGrilleImg,
    rating: 4.4,
    reviews: 103,
    priceUSD: 139,
    category: 'Exterior',
    material: 'Stainless + powder coat',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'US',
    description: 'Diamond-mesh grille kit with powder-coated slats that bolt into factory openings.',
    highlights: ['Direct-fit brackets', 'Matte black finish', '12-month rust warranty']
  },
  {
    id: 'inflator-pack',
    name: 'Hilder QuickAir Compressor + Power Pack',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
    rating: 4.7,
    reviews: 82,
    priceUSD: 179,
    category: 'Tools',
    material: 'Polycarbonate',
    fitment: 'Universal',
    brandLine: 'Hilder Essentials',
    shipFrom: 'CN',
    description: 'Portable inflator, LED scene light, and jump starter for roadside readiness.',
    highlights: ['160 PSI max', 'Jump starter with USB-C', 'Integrated LED beam']
  },
  {
    id: 'vacuum',
    name: 'Hilder Flow Handheld Vacuum',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&w=1200&q=80',
    rating: 4.3,
    reviews: 95,
    priceUSD: 139,
    category: 'Tools',
    material: 'ABS + stainless wand',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'Cordless vacuum, dual filtration, and onboard crevice tools for quick pickups.',
    highlights: ['25 kPa suction', '35-minute run time', 'Washable HEPA filter']
  }
  ,
  {
    id: 'oil-filter',
    name: 'Hilder Pro Oil Filter & Seal Kit',
    image: oilFilterImg,
    rating: 4.7,
    reviews: 68,
    priceUSD: 119,
    category: 'Tools',
    material: 'High-flow media',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'Precision-engineered filter with anti-drainback valve and reinforced seal to protect turbo engines.',
    highlights: ['Dual-layer media', 'Stainless steel base', 'Includes OEM-grade gasket']
  },
  {
    id: 'gear-knob',
    name: 'Hilder Titanium Shift Knob',
    image: shiftingGearImg,
    rating: 4.5,
    reviews: 58,
    priceUSD: 79,
    category: 'Interior',
    material: 'Titanium + Alcantara',
    fitment: 'Universal',
    brandLine: 'Hilder Essentials',
    shipFrom: 'CN',
    description: 'Weighted titanium knob with Alcantara sleeve for precise tactile shifts.',
    highlights: ['Magnetic retention', 'Heated option-ready', 'Thread adapters included']
  },
  {
    id: 'wheel-trim',
    name: 'Hilder Halo Wheel Trim Set',
    image: metalWheelImg,
    rating: 4.6,
    reviews: 74,
    priceUSD: 159,
    category: 'Exterior',
    material: 'Anodized aluminum',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'JP',
    description: 'Precision-machined trim rings highlight ET-sport wheels with low-profile clamps.',
    highlights: ['Corrosion-resistant', 'Easy snap-on installation', 'Laser logo etching']
  },
  {
    id: 'ambient-lighting',
    name: 'Hilder Ambient Lighting Strip Kit',
    image: interiorDetailsImg,
    rating: 4.4,
    reviews: 84,
    priceUSD: 129,
    category: 'Electronics',
    material: 'RGB LED strip',
    fitment: 'Universal',
    brandLine: 'Hilder Essentials',
    shipFrom: 'CN',
    description: 'Multi-zone RGB strips with app control, perfect for doors and footwells.',
    highlights: ['Syncs with music', 'Waterproof cabling', '12V direct harness']
  },
  {
    id: 'steering-wrap',
    name: 'Hilder Aero Steering Wrap',
    image: steeringWheelImg,
    rating: 4.8,
    reviews: 91,
    priceUSD: 99,
    category: 'Interior',
    material: 'Leather + microfiber',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'US',
    description: 'Perforated leather wrap with 12h red accent and embossed Hilder crest.',
    highlights: ['Thermo locked stitching', 'Grip zones', 'Includes trim tape']
  },
  {
    id: 'air-purifier',
    name: 'Hilder Climate Cabin Purifier',
    image: airconGrilleImg,
    rating: 4.7,
    reviews: 62,
    priceUSD: 159,
    category: 'Care & Detailing',
    material: 'HEPA + carbon',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'Plug-and-play purifier mounts in cupholder with real-time AQI display.',
    highlights: ['HEPA 13 filter', '5 fan speeds', 'USB-C power']
  },
  {
    id: 'cargo-organizer',
    name: 'Hilder Cargo & Accessories Organizer',
    image: accessoriesArr2Img,
    rating: 4.6,
    reviews: 54,
    priceUSD: 149,
    category: 'Tools',
    material: 'Composite + rubber',
    fitment: 'Universal',
    brandLine: 'Hilder Select',
    shipFrom: 'US',
    description: 'Modular organizer with magnetic trays, tie-down loops, and tool pockets.',
    highlights: ['Fold-flat design', 'Magnetic closures', 'Tool-ready pockets']
  },
  {
    id: 'oil-additives',
    name: 'Hilder Oil Additive & Filter Pack',
    image: oilFilter2Img,
    rating: 4.6,
    reviews: 58,
    priceUSD: 129,
    category: 'Care & Detailing',
    material: 'Synthetic blend',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'High-mileage oil additive paired with a premium filter for smoother starts.',
    highlights: ['Cleans seals', 'Reduces wear', 'Includes turbo-safe filter']
  },
  {
    id: 'console-trim',
    name: 'Hilder Luxe Interior Trim Kit',
    image: luxurySeatImg,
    rating: 4.5,
    reviews: 63,
    priceUSD: 199,
    category: 'Interior',
    material: 'Carbon + leather',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'DE',
    description: 'Carbon fiber console, vent, and door trim for high-end cabin upgrades.',
    highlights: ['Color-matched inserts', 'Self-adhesive backing', 'Precision templates']
  },
  {
    id: 'push-start',
    name: 'Hilder Push-Start Button Kit',
    image: startButtonsImg,
    rating: 4.7,
    reviews: 37,
    priceUSD: 89,
    category: 'Electronics',
    material: 'Anodized aluminum + billet cover',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Essentials',
    shipFrom: 'CN',
    description: 'Red aluminum push-start trim with ambient halo and backlit ring.',
    highlights: ['Direct plug fit', 'Water-resistant', 'Add-on ignition guard']
  },
  {
    id: 'accessory-bundle',
    name: 'Hilder Essentials Kit',
    image: accessoriesCompImg,
    rating: 4.4,
    reviews: 42,
    priceUSD: 99,
    category: 'Care & Detailing',
    material: 'Hybrid kit',
    fitment: 'Universal',
    brandLine: 'Hilder Essentials',
    shipFrom: 'US',
    description: 'Tracker for wipers, mats, and interior cleaning—perfect as a first-time bundle.',
    highlights: ['Pre-packaged kit', 'Dust covers', 'Instructions']
  }
];

export const CARE_GUIDES = [
  { title: 'Install floor liners', summary: 'Trim the rear edge and secure the factory anchors for a flush fit.' },
  { title: 'Mount a dash cam cleanly', summary: 'Hide the cable under the headliner and tap into the accessory fuse for tidy wiring.' },
  { title: 'Detail like a pro', summary: 'Two-bucket wash, clay-bar prep, then let Hilder Shine cure overnight.' }
] as const;

export const FITMENT_MAKES = ['Toyota', 'Honda', 'Ford', 'Nissan', 'Subaru'] as const;

export const FITMENT_MODELS: Record<typeof FITMENT_MAKES[number], string[]> = {
  Toyota: ['Camry', 'RAV4', 'Tacoma'],
  Honda: ['Civic', 'CR-V', 'Accord'],
  Ford: ['F-150', 'Mustang', 'Explorer'],
  Nissan: ['Rogue', 'Altima', 'Frontier'],
  Subaru: ['Outback', 'Forester', 'Impreza']
};

export const BUNDLE_FOCUS = [
  { title: 'Road Warrior Bundle', subtitle: 'Interior + Safety', items: ['Floor Mats', 'QuickAir Pack', 'Safety Triangle Kit'] },
  { title: 'Detailer’s Pack', subtitle: 'Care & Trim', items: ['Seat Covers', 'Shine Detail Kit', 'Dash Cam'] },
  { title: 'Tech Essentials', subtitle: 'Electronics', items: ['Pivot Mount', 'Dash Cam', 'USB-C Cable Set'] }
] as const;
