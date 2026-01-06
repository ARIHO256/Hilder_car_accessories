// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { LANGUAGE_OPTIONS, CURRENCY_OPTIONS } from '../constants/localeOptions';

export default function EVmartEmptyStates(){
  const COLORS = { brand:'#03cd8c', brandDark:'#0a7c7a', accent:'#f77f00', grayL:'#f5f7fa' };
  const DICT = { en:{ screen:'Empty States', search:'Search', language:'Language', currency:'Currency',
    // empty copy
    noResults:'No results found', tryAdjust:'Try adjusting your search or filters',
    clear:'Clear', refine:'Refine', browseCats:'Browse categories',
    plpEmptyTitle:'Nothing matches your filters', plpEmptyBody:'Tip: widen price range, change location, or remove a brand filter.', resetFilters:'Reset filters',
    pdpGoneTitle:'This product is unavailable', pdpGoneBody:'It may be out of stock or discontinued.', notifyMe:'Notify me', seeSimilar:'See similar items' } };
  const [lang,setLang] = useState('en');
  const [currency,setCurrency]=useState('USD');
  const t=(k)=>DICT[lang]?.[k]||k;
  useEffect(()=>{ try{ console.assert(document.querySelector('header.sticky'),'header ok'); }catch{} },[]);

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{background:COLORS.grayL}}>
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder={t('screen')}
          language={lang}
          currency={currency}
          onLanguageChange={setLang}
          onCurrencyChange={setCurrency}
          languageOptions={LANGUAGE_OPTIONS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={CURRENCY_OPTIONS.map(c => ({ value: c.code, label: c.label }))}
        />
      </header>

      <main className="mx-auto max-w-sm px-4 pt-3 pb-24 space-y-3">
        {/* Search Empty */}
        <Card title={`${t('search')} — ${t('noResults')}`}>
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100"><SearchIcon/></div>
            <div className="min-w-0 text-sm">
              <div className="font-semibold">{t('noResults')}</div>
              <div className="text-xs text-slate-600">{t('tryAdjust')}</div>
              <div className="mt-2 flex gap-2">
                <button className="rounded border px-3 py-1 text-xs" style={{borderColor:COLORS.accent,color:COLORS.accent}}>{t('clear')}</button>
                <button className="rounded bg-white px-3 py-1 text-xs" style={{border:`1px solid ${COLORS.brand}`,color:COLORS.brand}}>{t('refine')}</button>
                <button className="rounded bg-white px-3 py-1 text-xs" style={{border:`1px solid ${COLORS.brand}`,color:COLORS.brand}}>{t('browseCats')}</button>
              </div>
            </div>
          </div>
        </Card>

        {/* PLP Empty */}
        <Card title={t('plpEmptyTitle')}>
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100"><FilterIcon/></div>
            <div className="min-w-0 text-sm">
              <div className="text-xs text-slate-600">{t('plpEmptyBody')}</div>
              <div className="mt-2 flex gap-2">
                <button className="rounded px-3 py-1 text-xs text-white" style={{background:COLORS.accent}}>{t('resetFilters')}</button>
              </div>
            </div>
          </div>
        </Card>

        {/* PDP Unavailable */}
        <Card title={t('pdpGoneTitle')}>
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100"><BoxIcon/></div>
            <div className="min-w-0 text-sm">
              <div className="text-xs text-slate-600">{t('pdpGoneBody')}</div>
              <div className="mt-2 flex gap-2">
                <button className="rounded border px-3 py-1 text-xs" style={{borderColor:COLORS.accent,color:COLORS.accent}}>{t('notifyMe')}</button>
                <button className="rounded bg-white px-3 py-1 text-xs" style={{border:`1px solid ${COLORS.brand}`,color:COLORS.brand}}>{t('seeSimilar')}</button>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer nav */}
      <FooterNav COLORS={COLORS} />
    </div>
  );
}

function Card({title,children}){
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 text-sm font-semibold text-slate-800">{title}</div>
      {children}
    </section>
  );
}

function FooterNav({COLORS}){
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-sm items-center justify-between px-6 py-2 text-[11px]">
        <NavItem label="Home" color={COLORS.brandDark} icon={<HomeIcon />} to={ROUTES.home} />
        <NavItem label="Categories" color={COLORS.brandDark} icon={<GridIcon />} to={ROUTES.categories} />
        <NavItem label="Search" color={COLORS.brandDark} icon={<SearchIcon />} to={ROUTES.productList} />
        <NavItem label="Cart" color={COLORS.brandDark} icon={<CartIcon />} to={ROUTES.cart} />
        <NavItem label="Profile" color={COLORS.brandDark} icon={<UserIcon />} to={ROUTES.dashboard} />
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

function NavItem({ label, icon, active, color, to }:{ label:string; icon:React.ReactNode; active?:boolean; color:string; to:string }){
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 ${active? '' : 'text-slate-500'}`} style={{ color: active ? color : undefined }}>
      <span className={`grid h-8 w-8 place-items-center rounded-full ${active? '' : ''}`} style={{ background: active? `${color}22` : 'transparent' }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

// Icons
function SearchIcon(){ return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function FilterIcon(){ return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3"/></svg>); }
function BoxIcon(){ return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>); }
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
