// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { LANGUAGE_OPTIONS, CURRENCY_OPTIONS } from '../constants/localeOptions';

export default function EVmartErrorOffline(){
  const COLORS = { brand:'#03cd8c', brandDark:'#0a7c7a', accent:'#f77f00', grayL:'#f5f7fa' };
  const DICT = { en:{ screen:'Error & Offline', language:'Language', currency:'Currency',
    offline:'You are offline', retry:'Retry', backOnline:'Back online',
    loadError:'Something went wrong', tryAgain:'Try again', details:'Details',
    loading:'Loading', skeletonDemo:'Skeleton loader demo',
  }};
  const [lang,setLang]=useState('en');
  const [currency,setCurrency]=useState('USD'); const t=(k)=>DICT[lang]?.[k]||k;

  // Offline detection
  const [online, setOnline] = useState(typeof navigator!=='undefined'? navigator.onLine : true);
  useEffect(()=>{ const on=()=>setOnline(true), off=()=>setOnline(false); window.addEventListener('online',on); window.addEventListener('offline',off); return ()=>{ window.removeEventListener('online',on); window.removeEventListener('offline',off); }; },[]);

  // Simulated fetch with error & retry
  const [state, setState] = useState<'idle'|'loading'|'error'|'ok'>('idle');
  const [errMsg,setErr]=useState('');
  function fetchData(){ setState('loading'); setErr(''); setTimeout(()=>{ if(Math.random()<0.5){ setState('ok'); } else { setErr('Timeout contacting server'); setState('error'); } }, 900); }
  useEffect(()=>{ fetchData(); },[]);

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

      {/* Offline banner */}
      {!online && (
        <div className="sticky top-10 z-40 mx-auto max-w-sm px-4">
          <div className="mt-2 flex items-center justify-between rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <span>⚠️ {t('offline')}</span>
            <button onClick={()=>window.location.reload()} className="rounded bg-white px-2 py-1" style={{border:`1px solid ${COLORS.accent}`, color:COLORS.accent}}>{t('retry')}</button>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-sm px-4 pt-3 pb-24 space-y-3">
        {/* Error/Retry */}
        {state==='error' && (
          <section className="overflow-hidden rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <div className="mb-1 font-semibold">{t('loadError')}</div>
            <div className="text-xs">{t('details')}: {errMsg}</div>
            <div className="mt-2 flex gap-2">
              <button onClick={fetchData} className="rounded px-3 py-1 text-xs text-white" style={{background:COLORS.accent}}>{t('tryAgain')}</button>
            </div>
          </section>
        )}

        {/* Skeleton Loader Demo */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
          <div className="mb-2 text-sm font-semibold text-slate-800">{t('skeletonDemo')}</div>
          <Skeleton loading={state==='loading'}>
            <div className="space-y-2 text-sm">
              <div className="font-medium">EVmart 11kW Wallbox</div>
              <div className="text-xs text-slate-600">In stock · Type 2</div>
            </div>
          </Skeleton>
          <div className="mt-2 flex gap-2 text-xs">
            <button onClick={fetchData} className="rounded border px-3 py-1" style={{borderColor:COLORS.accent,color:COLORS.accent}}>{t('retry')}</button>
          </div>
        </section>
      </main>

      <FooterNav COLORS={COLORS} />
    </div>
  );
}

function Skeleton({loading,children}){
  if(!loading) return children;
  return (
    <div className="animate-pulse">
      <div className="h-4 w-40 rounded bg-slate-200" />
      <div className="mt-2 h-3 w-28 rounded bg-slate-200" />
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="h-20 rounded bg-slate-200" />
        <div className="h-20 rounded bg-slate-200" />
        <div className="h-20 rounded bg-slate-200" />
      </div>
    </div>
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

// icons
function SearchIcon(){ return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
