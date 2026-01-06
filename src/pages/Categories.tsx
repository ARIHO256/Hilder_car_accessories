import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { ACCESSORY_CATEGORIES } from '../data/accessories';
import { useCart } from '../contexts/CartContext';

const COLORS = { brand: '#03cd8c', brandDark: '#0a7c7a', grayL: '#f5f7fa' };

const LANGS = [
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'fr', label: 'Français', locale: 'fr-FR' },
  { code: 'es', label: 'Español', locale: 'es-ES' }
];

export default function HilderCategories(){
  const [language, setLanguage] = React.useState('en');
  const [currency, setCurrency] = React.useState('USD');
  const { count: cartCount } = useCart();
  const cartBadge = cartCount > 99 ? '99+' : String(cartCount);

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{ backgroundColor: COLORS.grayL }}>
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder="Search car accessories collections"
          language={language}
          currency={currency}
          languageOptions={LANGS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={[{ value: 'USD', label: 'USD $' }, { value: 'EUR', label: 'EUR €' }]}
          onLanguageChange={setLanguage}
          onCurrencyChange={setCurrency}
        />
      </header>

      <main className="mx-auto max-w-sm px-4 pb-24 pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Collections</p>
            <h1 className="text-2xl font-semibold text-slate-900">Accessory families</h1>
          </div>
          <Link to={ROUTES.home} className="text-xs font-semibold text-[#f77f00]">Back</Link>
        </div>
        <div className="space-y-3">
          {ACCESSORY_CATEGORIES.map(cat => (
            <Link key={cat.label} to={ROUTES.productList} className="flex items-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-[#03cd8c]">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                <img src={cat.image} alt={cat.label} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{cat.label}</div>
                <div className="text-xs text-slate-500">Explore curated accessories</div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-sm items-center justify-between px-6 py-2 text-[11px]">
          <NavItem label="Home" color={COLORS.brand} icon={<HomeIcon />} to={ROUTES.home} />
          <NavItem label="Categories" active color={COLORS.brand} icon={<GridIcon />} to={ROUTES.categories} />
          <NavItem label="Search" color={COLORS.brandDark} icon={<SearchIconNav />} to={ROUTES.productList} />
          <NavItem label="Cart" color={COLORS.brandDark} icon={<CartIcon />} to={ROUTES.cart} badge={cartBadge} />
          <NavItem label="Profile" color={COLORS.brandDark} icon={<UserIcon />} to={ROUTES.dashboard} />
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}

function NavItem({ label, icon, active, color, to, badge }:{ label:string; icon:React.ReactNode; active?:boolean; color:string; to:string; badge?:string }){
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 ${active ? '' : 'text-slate-500'}`} style={{ color: active ? color : undefined }}>
      <span className={`relative grid h-8 w-8 place-items-center rounded-full`} style={{ background: active ? `${color}22` : 'transparent' }}>
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
