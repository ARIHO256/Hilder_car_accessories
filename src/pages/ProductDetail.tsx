import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { useCart } from '../contexts/CartContext';
import { ACCESSORY_PRODUCTS } from '../data/accessories';

const COLORS = { brand: '#03cd8c', brandDark: '#0a7c7a', accent: '#f77f00', grayL: '#f2f2f2' };

const LANGS = [
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'fr', label: 'Français', locale: 'fr-FR' },
  { code: 'es', label: 'Español', locale: 'es-ES' }
];

const defaultProduct = ACCESSORY_PRODUCTS[0];

export default function HilderProductDetail(){
  const [language, setLanguage] = React.useState('en');
  const [currency, setCurrency] = React.useState('USD');
  const { add, count } = useCart();
  const cartBadge = count > 99 ? '99+' : String(count);
  const fmt = (usd: number) => new Intl.NumberFormat(
    LANGS.find(l => l.code === language)?.locale || 'en-US',
    { style: 'currency', currency }
  ).format(usd);

  const handleAdd = () => add(1);

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{ backgroundColor: COLORS.grayL }}>
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder="Search Hilder accessories"
          language={language}
          currency={currency}
          languageOptions={LANGS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={[{ value: 'USD', label: 'USD $' }, { value: 'EUR', label: 'EUR €' }]}
          onLanguageChange={setLanguage}
          onCurrencyChange={setCurrency}
        />
      </header>

      <main className="mx-auto max-w-sm px-4 pb-24 pt-3">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <img src={defaultProduct.image} alt={defaultProduct.name} className="h-60 w-full object-cover" loading="lazy" />
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{defaultProduct.category}</p>
                <h1 className="text-xl font-semibold text-slate-900">{defaultProduct.name}</h1>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500">{defaultProduct.fitment}</div>
                <div className="text-sm text-slate-500">{defaultProduct.material}</div>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{fmt(defaultProduct.priceUSD)}</div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">{defaultProduct.brandLine}</div>
              </div>
              <button onClick={handleAdd} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#03cd8c] to-[#0a7c7a] px-4 py-2 text-sm font-semibold text-white shadow">
                Add to cart ({count > 0 ? count : '0'})
              </button>
            </div>
            <p className="text-sm text-slate-600">{defaultProduct.description}</p>
            <ul className="space-y-1 text-sm text-slate-600">
              {defaultProduct.highlights.map(highlight => (
                <li key={highlight} className="flex items-center gap-2">
                  <span className="text-slate-400">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-slate-200 p-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Shipping from</span>
                <span>{defaultProduct.shipFrom}</span>
              </div>
              <div className="flex justify-between">
                <span>Fitment</span>
                <span>{defaultProduct.fitment}</span>
              </div>
              <div className="flex justify-between">
                <span>Stock</span>
                <span>Limited</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-sm items-center justify-between px-6 py-2 text-[11px]">
          <NavItem label="Home" color={COLORS.brand} icon={<HomeIcon />} to={ROUTES.home} />
          <NavItem label="Categories" color={COLORS.brandDark} icon={<GridIcon />} to={ROUTES.categories} />
          <NavItem label="Search" color={COLORS.brandDark} icon={<SearchIconNav />} to={ROUTES.productList} />
          <NavItem label="Cart" color={COLORS.brandDark} icon={<CartIcon />} to={ROUTES.cart} badge={cartBadge} />
          <NavItem label="Profile" color={COLORS.brandDark} icon={<UserIcon />} to={ROUTES.dashboard} />
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}

function NavItem({ label, icon, color, to, badge }:{ label:string; icon:React.ReactNode; color:string; to:string; badge?:string }){
  return (
    <Link to={to} className="flex flex-col items-center gap-0.5 text-slate-500" style={{ color }}>
      <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white/60">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 rounded-full bg-[#03cd8c] px-1 text-[9px] font-semibold text-white">{badge}</span>
        )}
      </span>
      <span>{label}</span>
    </Link>
  );
}

function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function SearchIconNav(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
