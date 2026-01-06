// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { ACCESSORY_PRODUCTS } from '../data/accessories';
import { useCart } from '../contexts/CartContext';

const COLORS = { brand: '#03cd8c', brandDark: '#0a7c7a', accent: '#f77f00', grayL: '#f5f7fa' };

const LANGS = [
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'fr', label: 'Français', locale: 'fr-FR' },
  { code: 'ar', label: 'العربية', locale: 'ar-EG' },
  { code: 'es', label: 'Español', locale: 'es-ES' },
  { code: 'zh', label: '中文', locale: 'zh-CN' },
  { code: 'de', label: 'Deutsch', locale: 'de-DE' },
  { code: 'pt', label: 'Português', locale: 'pt-PT' },
  { code: 'hi', label: 'हिन्दी', locale: 'hi-IN' },
  { code: 'no', label: 'Norsk', locale: 'nb-NO' },
  { code: 'nl', label: 'Nederlands', locale: 'nl-NL' },
  { code: 'da', label: 'Dansk', locale: 'da-DK' },
  { code: 'sv', label: 'Svenska', locale: 'sv-SE' },
  { code: 'ja', label: '日本語', locale: 'ja-JP' },
  { code: 'ko', label: '한국어', locale: 'ko-KR' },
  { code: 'tr', label: 'Türkçe', locale: 'tr-TR' }
];

const CURRENCIES = [
  { code: 'USD', label: 'USD $' }, { code: 'EUR', label: 'EUR €' }, { code: 'GBP', label: 'GBP £' },
  { code: 'CNY', label: 'CNY ¥' }, { code: 'JPY', label: 'JPY ¥' }, { code: 'KRW', label: 'KRW ₩' },
  { code: 'INR', label: 'INR ₹' }, { code: 'AED', label: 'AED د.إ' }, { code: 'SAR', label: 'SAR ر.س' },
  { code: 'NGN', label: 'NGN ₦' }, { code: 'KES', label: 'KES KSh' }, { code: 'UGX', label: 'UGX USh' },
  { code: 'ZAR', label: 'ZAR R' }, { code: 'TRY', label: 'TRY ₺' }, { code: 'BRL', label: 'BRL R$' }
];

const FX: Record<string, number> = {
  USD: 1, EUR: 0.93, GBP: 0.79, CNY: 7.2, JPY: 158, KRW: 1380, INR: 83,
  AED: 3.67, SAR: 3.75, NGN: 1500, KES: 128, UGX: 3800, ZAR: 18, TRY: 33, BRL: 5.2
};

const DICT: Record<string, Record<string,string>> = {
  en: {
    search:'Search car accessories', sort:'Sort', filters:'Filters', retail:'Retail', wholesale:'Wholesale',
    moq:'MOQ', perUnit:'/unit', results:'results', showing:'Showing', to:'to', of:'of', shippedFrom:'Shipped from'
  },
  fr: {
    search:'Rechercher des accessoires auto', sort:'Trier', filters:'Filtres', retail:'Détail', wholesale:'Gros',
    moq:'MOQ', perUnit:'/unité', results:'résultats', showing:'Affichage', to:'à', of:'sur', shippedFrom:"Expédié depuis"
  },
  zh: {
    search:'搜索汽车配件', sort:'排序', filters:'筛选', retail:'零售', wholesale:'批发',
    moq:'起订量', perUnit:'/件', results:'个结果', showing:'显示', to:'到', of:'共', shippedFrom:'发货地'
  }
};

const flagFor = (code?: string) => {
  switch (code) {
    case 'US': return '🇺🇸';
    case 'DE': return '🇩🇪';
    case 'CN': return '🇨🇳';
    case 'JP': return '🇯🇵';
    case 'UG': return '🇺🇬';
    case 'FR': return '🇫🇷';
    default: return '🌍';
  }
};

const baseProducts = ACCESSORY_PRODUCTS.map((prod, idx) => ({
  ...prod,
  id: prod.id,
  stock: 24 - idx * 2,
  moq: prod.category === 'Tools' ? 1 : 3,
  ship: { code: prod.shipFrom, flag: flagFor(prod.shipFrom) }
}));

const categoryOptions = Array.from(new Set(ACCESSORY_PRODUCTS.map(p => p.category)));
const materialOptions = Array.from(new Set(ACCESSORY_PRODUCTS.map(p => p.material)));
const fitmentOptions = Array.from(new Set(ACCESSORY_PRODUCTS.map(p => p.fitment)));
const brandLineOptions = Array.from(new Set(ACCESSORY_PRODUCTS.map(p => p.brandLine)));

export default function HilderProductList(){
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [mode, setMode] = useState<'retail'|'wholesale'>('retail');
  const { count: cartCount } = useCart();
  const cartBadge = cartCount > 99 ? '99+' : String(cartCount);
  const [q, setQ] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'featured'|'priceAsc'|'priceDesc'|'rating'|'newest'>('featured');
  const [categoryFilter, setCategoryFilter] = useState<Set<string>>(new Set());
  const [materialFilter, setMaterialFilter] = useState<Set<string>>(new Set());
  const [fitmentFilter, setFitmentFilter] = useState<Set<string>>(new Set());
  const [brandFilter, setBrandFilter] = useState<Set<string>>(new Set());
  const [inStock, setInStock] = useState(false);
  const [pMin, setPMin] = useState<number|''>('');
  const [pMax, setPMax] = useState<number|''>('');
  const [shipCodes, setShipCodes] = useState<Set<string>>(new Set());

  const t = (k: string) => DICT[lang]?.[k] || DICT.en[k] || k;
  const fmt = (usd: number) => new Intl.NumberFormat((LANGS.find(l => l.code === lang) || { locale: 'en-US' }).locale, {
    style: 'currency', currency
  }).format(usd * (FX[currency] ?? 1));

  const resetFilters = () => {
    setCategoryFilter(new Set());
    setMaterialFilter(new Set());
    setFitmentFilter(new Set());
    setBrandFilter(new Set());
    setShipCodes(new Set());
    setInStock(false);
    setPMin('');
    setPMax('');
  };

  const toggleSet = (value: string, state: Set<string>, setter: (next: Set<string>) => void) => {
    const next = new Set(state);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filtered = useMemo(() => {
    let items = baseProducts.slice();
    const query = q.trim().toLowerCase();
    if (query) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.highlights?.some(h => h.toLowerCase().includes(query)) ?? false)
      );
    }
    if (categoryFilter.size) items = items.filter(item => categoryFilter.has(item.category));
    if (materialFilter.size) items = items.filter(item => materialFilter.has(item.material));
    if (fitmentFilter.size) items = items.filter(item => fitmentFilter.has(item.fitment));
    if (brandFilter.size) items = items.filter(item => brandFilter.has(item.brandLine));
    if (shipCodes.size) items = items.filter(item => item.ship && shipCodes.has(item.ship.code));
    const min = typeof pMin === 'number' ? pMin : -Infinity;
    const max = typeof pMax === 'number' ? pMax : Infinity;
    if (pMin !== '') items = items.filter(item => item.priceUSD >= min);
    if (pMax !== '') items = items.filter(item => item.priceUSD <= max);
    if (inStock) items = items.filter(item => item.stock > 0);
    switch (sortBy) {
      case 'priceAsc': items.sort((a,b) => a.priceUSD - b.priceUSD); break;
      case 'priceDesc': items.sort((a,b) => b.priceUSD - a.priceUSD); break;
      case 'rating': items.sort((a,b) => b.rating - a.rating); break;
      case 'newest': items.sort((a,b) => b.reviews - a.reviews); break;
      default: break;
    }
    return items;
  }, [q, categoryFilter, materialFilter, fitmentFilter, brandFilter, shipCodes, pMin, pMax, inStock, sortBy]);

  useEffect(() => {
    try {
      const stats = document.querySelectorAll('.item-card');
      console.assert(stats.length > 0, 'Accessory items rendered');
    } catch {}
  }, [filtered]);

  const nextShipCodes = Array.from(new Set(baseProducts.map(p => p.ship?.code).filter(Boolean)));

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{ backgroundColor: COLORS.grayL }}>
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder={t('search')}
          searchValue={q}
          onSearchChange={setQ}
          language={lang}
          currency={currency}
          languageOptions={LANGS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={CURRENCIES.map(c => ({ value: c.code, label: c.label }))}
          onLanguageChange={setLang}
          onCurrencyChange={setCurrency}
        />
      </header>

      <section className="mx-auto max-w-sm px-4 pt-3">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setMode('retail')}
              className={`px-3 py-1.5 text-sm rounded-lg ${mode === 'retail' ? 'text-white' : 'text-slate-600'}`}
              style={{ background: mode === 'retail' ? COLORS.brand : 'transparent' }}
            >{t('retail')}</button>
            <button
              onClick={() => setMode('wholesale')}
              className={`px-3 py-1.5 text-sm rounded-lg ${mode === 'wholesale' ? 'text-white' : 'text-slate-600'}`}
              style={{ background: mode === 'wholesale' ? COLORS.accent : 'transparent' }}
            >{t('wholesale')}</button>
          </div>
          <div className="flex items-center gap-2">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 shadow-sm focus:outline-none">
              <option value="featured">Featured</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm" onClick={() => setSheetOpen(true)}>{t('filters')}</button>
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-600">
          {t('showing')} <strong>1–{Math.min(filtered.length, 6)}</strong> {t('to')} <strong>{filtered.length}</strong> {t('of')} <strong>{baseProducts.length}</strong> {t('results')}
        </div>
      </section>

      <section className="mx-auto max-w-sm px-4 pt-3 pb-24">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(item => (
            <Card key={item.id} item={item} mode={mode} fmt={fmt} brand={COLORS.brand} accent={COLORS.accent} t={t} />
          ))}
        </div>
      </section>

      <FiltersSheet open={sheetOpen} onClose={() => setSheetOpen(false)} brand={COLORS.brand} title={t('filters')}>
        <Facet title="Category" options={categoryOptions} values={categoryFilter} onToggle={(val) => toggleSet(val, categoryFilter, setCategoryFilter)} />
        <Facet title="Material" options={materialOptions} values={materialFilter} onToggle={(val) => toggleSet(val, materialFilter, setMaterialFilter)} />
        <Facet title="Fitment" options={fitmentOptions} values={fitmentFilter} onToggle={(val) => toggleSet(val, fitmentFilter, setFitmentFilter)} />
        <Facet title="Brand line" options={brandLineOptions} values={brandFilter} onToggle={(val) => toggleSet(val, brandFilter, setBrandFilter)} />
        <Facet title="Shipped from" options={nextShipCodes} values={shipCodes} onToggle={(val) => toggleSet(val, shipCodes, setShipCodes)} chips={(code) => `${flagFor(code).trim()} ${code}`} />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <NumInput label="Min" value={pMin} onChange={setPMin} />
          <NumInput label="Max" value={pMax} onChange={setPMax} />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} /> In stock</label>
        </div>
        <div className="mt-5 flex gap-3">
          <button className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" onClick={resetFilters}>Reset</button>
          <button className="flex-1 rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.brand }} onClick={() => setSheetOpen(false)}>Apply</button>
        </div>
      </FiltersSheet>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-sm items-center justify-between px-6 py-2 text-[11px]">
          <NavItem label="Home" color={COLORS.brandDark} icon={<HomeIcon />} to={ROUTES.home} />
          <NavItem label="Categories" color={COLORS.brandDark} icon={<GridIcon />} to={ROUTES.categories} />
          <NavItem label="Search" active color={COLORS.brand} icon={<SearchIconNav />} to={ROUTES.productList} />
          <NavItem label="Cart" color={COLORS.brandDark} icon={<CartIcon />} to={ROUTES.cart} badge={cartBadge} />
          <NavItem label="Profile" color={COLORS.brandDark} icon={<UserIcon />} to={ROUTES.dashboard} />
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}

type AccessoryItem = typeof baseProducts[number];

function Card({ item, mode, fmt, brand, accent, t }:{ item: AccessoryItem; mode:'retail'|'wholesale'; fmt:(n:number)=>string; brand:string; accent:string; t:(k:string)=>string }){
  const range = useMemo(() => {
    if (!item.tiers) return null;
    const prices = item.tiers.map(t => t.unitUSD);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [item.tiers]);
  const [img, setImg] = useState(item.image);
  return (
    <Link to={ROUTES.productDetail} className="item-card block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative" style={{ aspectRatio:'1/1' }}>
        <img src={img} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="text-[13px] leading-tight text-slate-800">{item.name}</div>
        <div className="mt-1 text-[11px] text-slate-500">★ {item.rating.toFixed(1)} · {item.reviews}</div>
        <div className="mt-1 text-[11px] text-slate-500">{item.category} · {item.material}</div>
        {item.ship && (
          <div className="mt-1 text-[11px] text-slate-500">
            {t('shippedFrom')}: <span className="ship-from">{item.ship.flag} {item.ship.code}</span>
          </div>
        )}
        {mode === 'retail' ? (
          <div className="mt-1 text-base font-bold">{fmt(item.priceUSD)}</div>
        ) : (
          <div className="mt-1 text-[13px] text-slate-600">
            {item.moq && <span className="font-semibold" style={{ color: brand }}>{t('moq')} {item.moq}</span>}
            {range && <span className="ml-2">{fmt(range.max)}–{fmt(range.min)} {t('perUnit')}</span>}
          </div>
        )}
        {item.colors?.length ? (
          <div className="mt-2 flex gap-2">
            {item.colors.slice(0,5).map(c => (
              <button key={c.id} title={c.label}
                onMouseEnter={() => c.image && setImg(c.image)}
                onFocus={() => c.image && setImg(c.image)}
                onClick={(e) => e.preventDefault()}
                className="h-5 w-5 rounded-full border border-slate-200"
                style={{ background: c.swatch || '#ddd' }}
              />
            ))}
          </div>
        ) : null}
        <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-slate-500">{item.brandLine}</div>
        <div className="mt-3 flex gap-2">
          {mode === 'retail' ? (
            <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-white" style={{ background: brand }}>
              <CartAddSm/> Add
            </button>
          ) : (
            <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-white" style={{ background: accent }}>
              <StartOrderSm/> Order
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

function NumInput({ label, value, onChange }:{ label:string; value:string|number; onChange:(v:any)=>void }){
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs text-slate-500">{label}</span>
      <input type="number" value={value as any} onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2" />
    </label>
  );
}

function FiltersSheet({ open, onClose, brand, title, children }:{ open:boolean; onClose:()=>void; brand:string; title?: string; children:any }){
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.35)', opacity: open?1:0, pointerEvents: open?'auto':'none', transition:'opacity .2s', zIndex:80 }} />
      <aside role="dialog" aria-modal="true" aria-label="Filters" style={{ position:'fixed', left:0, right:0, bottom:0, background:'white', borderTopLeftRadius:16, borderTopRightRadius:16, boxShadow:'0 -12px 32px rgba(0,0,0,.2)', transform: open? 'translateY(0%)' : 'translateY(105%)', transition: 'transform .22s cubic-bezier(.2,.8,.2,1)', zIndex:90 }}>
        <div id="filters-sheet" className="mx-auto max-w-sm px-4 py-4">
          <div className="mb-2 h-1.5 w-10 rounded-full bg-slate-300 mx-auto" />
          <h3 className="mb-2 text-sm font-semibold text-slate-700">{title || 'Filters'}</h3>
          {children}
          <div className="h-2" />
        </div>
      </aside>
    </>
  );
}

function Facet({ title, options, values, onToggle, chips }:{ title:string; options:(string|undefined)[]; values:Set<string>; onToggle:(v:string)=>void; chips?:(v:string)=>string }){
  return (
    <section className="mt-3">
      <div className="mb-2 text-xs font-semibold text-slate-600">{title}</div>
      <div className="flex flex-wrap gap-2">
        {options.filter(Boolean).map((o:any) => (
          <button key={o} onClick={() => onToggle(o)} className="badge rounded-full border px-3 py-1 text-sm" style={{ borderColor: values.has(o) ? COLORS.brand : '#e5e7eb', background: values.has(o) ? `${COLORS.brand}22` : 'white', color: values.has(o) ? COLORS.brandDark : 'inherit' }}>
            {chips ? chips(o) : o}
          </button>
        ))}
      </div>
    </section>
  );
}

function NavItem({ label, icon, active, color, to, badge }:{ label:string; icon:React.ReactNode; active?:boolean; color:string; to:string; badge?:string }){
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 ${active ? '' : 'text-slate-500'}`} style={{ color: active ? color : undefined }}>
      <span className={`relative grid h-8 w-8 place-items-center rounded-full`} style={{ background: active ? `${color}22` : 'transparent' }}>
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">{badge}</span>
        )}
      </span>
      <span>{label}</span>
    </Link>
  );
}

function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function SearchIconNav(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }

function CartAddSm(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h8.5"/><path d="M17 6h5"/><path d="M19.5 3.5v5"/></svg>); }
function StartOrderSm(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="2 12 12 2 22 12"/><path d="M12 2v20"/></svg>); }
