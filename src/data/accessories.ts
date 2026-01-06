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
import engineCutawayImg from '../assets/engine-cutaway.avif';
import vehicleEngineRenderImg from '../assets/vehicle-engine-render.jpg';
import oilFilterKit1Img from '../assets/oil-filter-kit-1.jpg';
import oilFilterKit2Img from '../assets/oil-filter-kit-2.jpg';
import shiftingGearCloseImg from '../assets/shifting-gear-close.jpg';
import metalWheelCloseImg from '../assets/metal-wheel-close.jpg';
import steeringCallButtonsImg from '../assets/steering-call-buttons.jpg';
import engineStartButtonsImg from '../assets/engine-start-buttons.jpg';
import interiorDetailsCloseImg from '../assets/interior-details-close.jpg';
import accessoriesArrangementAlt1Img from '../assets/accessories-arrangement-alt-1.jpg';
import accessoriesArrangementAlt2Img from '../assets/accessories-arrangement-alt-2.jpg';
import accessoriesCompositionAltImg from '../assets/accessories-composition-alt.jpg';
import wheelchairAdaptImg from '../assets/wheelchair-adapt.jpg';
import adaptiveEquipmentImg from '../assets/adaptive-equipment.avif';
import airConditionerFrontImg from '../assets/air-conditioner-front.jpg';
import metalWheelIsolatedImg from '../assets/metal-wheel-isolated.jpg';
import shiftButtonsImg from '../assets/shift-buttons.jpg';
import motorcycleHeadlightImg from '../assets/motorcycle-headlight.jpg';
import highAngleInteriorImg from '../assets/high-angle-interior.jpg';
import hardwareSplashImg from '../assets/hardware-splash.jpg';
import dashboardCloseImg from '../assets/dashboard-close.avif';
import carInteriorAmbientImg from '../assets/car-interior-ambient.jpeg';
import redCupHeadphonesImg from '../assets/red-cup-headphones.jpg';
import steeringWheelAltImg from '../assets/steering-wheel-alt.jpg';

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
  },
  {
    id: 'adaptive-mobility',
    name: 'Hilder Adaptive Mobility Kit',
    image: wheelchairAdaptImg,
    rating: 4.5,
    reviews: 56,
    priceUSD: 229,
    category: 'Safety',
    material: 'Composite + rubber',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'DE',
    description: 'Modular mobility kit for drivers and passengers who need adaptive touchpoints.',
    highlights: ['Easy-to-grip knobs', 'Wheelchair lock mounts', 'Lightweight aluminum base']
  },
  {
    id: 'engine-guard',
    name: 'Hilder Titan Engine Guard',
    image: engineCutawayImg,
    rating: 4.6,
    reviews: 88,
    priceUSD: 349,
    category: 'Exterior',
    material: 'Ceramic-coated steel',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'Heat-diffusing underbody shield protects headers and intake from road debris.',
    highlights: ['Precision laser cuts', 'Powder-coated finish', 'Field-upgradable brackets']
  },
  {
    id: 'dashboard-ambient',
    name: 'Hilder Ambient Dashboard Trim',
    image: carInteriorAmbientImg,
    rating: 4.7,
    reviews: 61,
    priceUSD: 179,
    category: 'Interior',
    material: 'Microfiber + resin',
    fitment: 'Universal',
    brandLine: 'Hilder Essentials',
    shipFrom: 'US',
    description: 'Soft-touch trim kit with dynamic LED halo and dust-resistant microfiber surfaces.',
    highlights: ['Every color option', 'Easy peel-and-stick install', 'Ships with cleaning wipes']
  },
  {
    id: 'hardware-organizer',
    name: 'Hilder Garage Hardware Organizer',
    image: hardwareSplashImg,
    rating: 4.5,
    reviews: 44,
    priceUSD: 139,
    category: 'Tools',
    material: 'Powder-coated steel',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'CN',
    description: 'Magnetic wall rack with labeled bins to keep sockets, plugs, and fittings tidy.',
    highlights: ['Cable management', 'Dry-labelling', 'Clips for torque adapters']
  },
  {
    id: 'shift-precision',
    name: 'Hilder Shift Precision Buttons',
    image: shiftButtonsImg,
    rating: 4.8,
    reviews: 53,
    priceUSD: 89,
    category: 'Electronics',
    material: 'Anodized aluminum',
    fitment: 'Universal',
    brandLine: 'Hilder Select',
    shipFrom: 'JP',
    description: 'High-contrast shift buttons with LED illumination and haptic feedback.',
    highlights: ['Bluetooth pairing', 'Ambient ring', 'Weatherproof housing']
  }
  ,
  {
    id: 'engine-shield',
    name: 'Hilder Thermal Engine Shield',
    image: vehicleEngineRenderImg,
    rating: 4.6,
    reviews: 64,
    priceUSD: 279,
    category: 'Exterior',
    material: 'Graphite-composite',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'Low-profile shield that keeps thermal radiation down at high revs without blocking airflow.',
    highlights: ['Composite fins', 'Washable mesh', 'Direct-fit hardware']
  },
  {
    id: 'high-flow-oil-kit',
    name: 'Hilder High-Flow Oil & Filter Set',
    image: oilFilterKit1Img,
    rating: 4.7,
    reviews: 72,
    priceUSD: 149,
    category: 'Care & Detailing',
    material: 'Synthetic media',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'US',
    description: 'High-flow oil with premium filter and new drain plug for track-ready maintenance.',
    highlights: ['Upgraded gasket', 'Magnetic drain plug', 'Turbo-safe oil blend']
  },
  {
    id: 'seal-kit',
    name: 'Hilder Turbo Seal Kit',
    image: oilFilterKit2Img,
    rating: 4.5,
    reviews: 58,
    priceUSD: 129,
    category: 'Tools',
    material: 'Alloy & PTFE',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Pro',
    shipFrom: 'JP',
    description: 'Oil filter, drain plug, and seal set built for forced induction service.',
    highlights: ['OEM gauges', 'Includes gaskets', 'Anti-crossover design']
  },
  {
    id: 'shift-collar',
    name: 'Hilder Precision Shift Collar',
    image: shiftingGearCloseImg,
    rating: 4.6,
    reviews: 47,
    priceUSD: 99,
    category: 'Electronics',
    material: 'Titanium + leather',
    fitment: 'Universal',
    brandLine: 'Hilder Essentials',
    shipFrom: 'CN',
    description: 'Weighted collar captures gear intent and keeps tactile feedback consistent.',
    highlights: ['Magnetic retention', 'Ambient lighting', 'Ratcheting insert']
  },
  {
    id: 'wheel-rings',
    name: 'Hilder Halo Wheel Rings',
    image: metalWheelCloseImg,
    rating: 4.6,
    reviews: 52,
    priceUSD: 169,
    category: 'Exterior',
    material: 'Anodized aluminum',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'JP',
    description: 'Laser-cut accent rings that lock around OEM wheel faces.',
    highlights: ['Snap-on clamps', 'Matte or polished finish', 'Surface protector film']
  },
  {
    id: 'command-swap',
    name: 'Hilder Command Switch Pod',
    image: steeringCallButtonsImg,
    rating: 4.5,
    reviews: 38,
    priceUSD: 119,
    category: 'Electronics',
    material: 'Aluminum + polymer',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'Pod for reassigning climate, media, or drive mode controls mid-cabin.',
    highlights: ['Swappable caps', 'Macro buttons', 'Tool-less install']
  },
  {
    id: 'ignition-trim',
    name: 'Hilder Ignition Accent Kit',
    image: engineStartButtonsImg,
    rating: 4.4,
    reviews: 36,
    priceUSD: 79,
    category: 'Interior',
    material: 'Carbon + billet',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Essentials',
    shipFrom: 'JP',
    description: 'Ambient-lit ring and billet deck for push-button ignitions.',
    highlights: ['Magnetic cap', 'Water resistant', 'Fits most square bezels']
  },
  {
    id: 'luxe-diffuser',
    name: 'Hilder Luxe Interior Diffuser',
    image: interiorDetailsCloseImg,
    rating: 4.7,
    reviews: 44,
    priceUSD: 129,
    category: 'Interior',
    material: 'Brushed aluminum',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'DE',
    description: 'Linear diffuser panel with hidden cables for ambient airflow control.',
    highlights: ['Matte finish', 'Wireless remote', 'Easy-step install']
  },
  {
    id: 'essentials-organizer',
    name: 'Hilder Essentials Organizer',
    image: accessoriesArrangementAlt1Img,
    rating: 4.4,
    reviews: 33,
    priceUSD: 89,
    category: 'Tools',
    material: 'Recycled plastics',
    fitment: 'Universal',
    brandLine: 'Hilder Essentials',
    shipFrom: 'US',
    description: 'Stackable organizer for jump leads, wrenches, and detailing kits.',
    highlights: ['Snap-lid', 'Label kit', 'Carabiner loops']
  },
  {
    id: 'expedition-kit',
    name: 'Hilder Expedition Kit',
    image: accessoriesArrangementAlt2Img,
    rating: 4.5,
    reviews: 40,
    priceUSD: 239,
    category: 'Exterior',
    material: 'Composite + rubber',
    fitment: 'Universal',
    brandLine: 'Hilder Select',
    shipFrom: 'CN',
    description: 'Rack-ready kit with gear straps, organizer, and lighting.',
    highlights: ['Quick-release straps', 'Reflective trim', 'Weatherproof bag']
  },
  {
    id: 'detailer-combo',
    name: 'Hilder Detailer Combo',
    image: accessoriesCompositionAltImg,
    rating: 4.6,
    reviews: 38,
    priceUSD: 119,
    category: 'Care & Detailing',
    material: 'Chemical + textile',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'Foam cannon, ceramic polish, and microfiber system for weekend detailing.',
    highlights: ['Ceramic sealant', 'Foam gun', 'Microfiber set']
  },
  {
    id: 'adaptive-tech',
    name: 'Hilder Adaptive Tech Pack',
    image: adaptiveEquipmentImg,
    rating: 4.7,
    reviews: 41,
    priceUSD: 189,
    category: 'Tools',
    material: 'Composite + rubber',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'Portable torque wrench, leveling blocks, and attachable fixture for adaptive installs.',
    highlights: ['Smart torque readout', 'Magnetic tray', 'Carry case']
  },
  {
    id: 'climate-grille',
    name: 'Hilder Climate Grille Cover',
    image: airConditionerFrontImg,
    rating: 4.4,
    reviews: 30,
    priceUSD: 99,
    category: 'Exterior',
    material: 'Powder-coated metal',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'CN',
    description: 'Mesh grille cover with integrated vents that tidy over-sized climate fronts.',
    highlights: ['Direct bolt-on', 'Matte black', 'Includes mounting clips']
  },
  {
    id: 'motor-wheel-cap',
    name: 'Hilder Motorsport Wheel Cap',
    image: metalWheelIsolatedImg,
    rating: 4.6,
    reviews: 34,
    priceUSD: 59,
    category: 'Exterior',
    material: 'Anodized aluminum',
    fitment: 'Universal',
    brandLine: 'Hilder Essentials',
    shipFrom: 'JP',
    description: 'Red-accent caps for center lock wheels with quick-snap tabs.',
    highlights: ['Grab handles', 'Dust seal', 'Logo engraving']
  },
  {
    id: 'rally-headlight',
    name: 'Hilder Rally Headlight Pods',
    image: motorcycleHeadlightImg,
    rating: 4.5,
    reviews: 21,
    priceUSD: 199,
    category: 'Exterior',
    material: 'LED + aluminum',
    fitment: 'Universal',
    brandLine: 'Hilder Pro',
    shipFrom: 'US',
    description: 'Slim LED pods for adventure-ready bikes and SUVs.',
    highlights: ['12000 lumens', 'Integrated guards', '3-year warranty']
  },
  {
    id: 'cabin-cover',
    name: 'Hilder Luxe Cabin Cover',
    image: highAngleInteriorImg,
    rating: 4.5,
    reviews: 45,
    priceUSD: 149,
    category: 'Interior',
    material: 'Satin microfiber',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'DE',
    description: 'Cover that keeps steering, dash, and door sills clean during maintenance.',
    highlights: ['Velcro tabs', 'Breathable mesh', 'Contrasting stitching']
  },
  {
    id: 'instrument-trim',
    name: 'Hilder Instrument Trim',
    image: dashboardCloseImg,
    rating: 4.6,
    reviews: 39,
    priceUSD: 129,
    category: 'Interior',
    material: 'Laser-cut alloy',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Pro',
    shipFrom: 'JP',
    description: 'Precision trim that wraps around gauges with subtle ambient light.',
    highlights: ['Snap-on install', 'Color-matched shield', 'Low-profile sensor cutouts']
  },
  {
    id: 'mobile-console',
    name: 'Hilder Mobile Console',
    image: redCupHeadphonesImg,
    rating: 4.4,
    reviews: 29,
    priceUSD: 139,
    category: 'Interior',
    material: 'Polycarbonate + rubber',
    fitment: 'Universal',
    brandLine: 'Hilder Essentials',
    shipFrom: 'US',
    description: 'Cupholder plate that organizes cables, phones, and earbuds for daily commutes.',
    highlights: ['Wireless pad', 'Cable guides', 'Soft-touch grip']
  },
  {
    id: 'signature-wheel',
    name: 'Hilder Signature Steering Wheel',
    image: steeringWheelAltImg,
    rating: 4.6,
    reviews: 51,
    priceUSD: 389,
    category: 'Interior',
    material: 'Leather + wood',
    fitment: 'Vehicle-specific',
    brandLine: 'Hilder Select',
    shipFrom: 'US',
    description: 'Flat-bottom wheel with custom stitching and 12h marker.',
    highlights: ['Heated rim', 'Micro-perforated grip', 'Comes with trim kit']
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
