// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { LANGUAGE_OPTIONS, CURRENCY_OPTIONS } from '../constants/localeOptions';

export default function EVmartPermissions(){
  const COLORS = { brand:'#03cd8c', brandDark:'#0a7c7a', accent:'#f77f00', grayL:'#f5f7fa' };
  const DICT = { en:{ screen:'Permissions & Privacy', language:'Language', currency:'Currency',
    locationTitle:'Location access', locationDesc:'Used to find nearby chargers, shipping ETA, and country pricing.', allowLocation:'Allow location',
    notifTitle:'Notifications', notifDesc:'Price drops, back‑in‑stock, delivery updates. You can turn this off anytime.', enableNotif:'Enable notifications',
    status:'Status', granted:'Granted', denied:'Denied', prompt:'Prompt', unknown:'Unknown', policy:'Privacy Policy' } };
  const [lang,setLang]=useState('en');
  const [currency,setCurrency]=useState('USD');
  const t=(k)=>DICT[lang]?.[k]||k;

  const [locStatus,setLocStatus]=useState<'unknown'|'granted'|'denied'|'prompt'>('unknown');
  const [notiStatus,setNotiStatus]=useState<'unknown'|'granted'|'denied'|'prompt'>('unknown');

  // probe permissions where supported
  useEffect(()=>{ try{ if(navigator.permissions){ navigator.permissions.query({name:'geolocation'} as any).then(r=> setLocStatus(r.state==='granted'?'granted': r.state==='denied'?'denied':'prompt')); } }catch{} },[]);
  useEffect(()=>{ try{ if('Notification' in window){ const s = Notification.permission; setNotiStatus(s==='granted'?'granted': s==='denied'?'denied':'prompt'); } }catch{} },[]);

  async function requestLocation(){ try{ await new Promise((res,rej)=> navigator.geolocation.getCurrentPosition(()=>res(true),()=>rej(false))); setLocStatus('granted'); }catch{ setLocStatus('denied'); } }
  async function requestNotifications(){ try{ if(!('Notification' in window)) return; const p = await Notification.requestPermission(); setNotiStatus(p==='granted'?'granted': p==='denied'?'denied':'prompt'); }catch{} }

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
        {/* Location */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-1 text-sm font-semibold text-slate-800">{t('locationTitle')}</div>
          <div className="text-xs text-slate-600">{t('locationDesc')}</div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span>{t('status')}: <StatusChip s={locStatus}/></span>
            <button onClick={requestLocation} className="rounded px-3 py-1 text-xs text-white" style={{background:COLORS.brand}}>{t('allowLocation')}</button>
          </div>
        </section>
        {/* Notifications */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-1 text-sm font-semibold text-slate-800">{t('notifTitle')}</div>
          <div className="text-xs text-slate-600">{t('notifDesc')}</div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span>{t('status')}: <StatusChip s={notiStatus}/></span>
            <button onClick={requestNotifications} className="rounded px-3 py-1 text-xs text-white" style={{background:COLORS.brand}}>{t('enableNotif')}</button>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600">
          <div className="mb-1 font-semibold">{t('policy')}</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>We only request location to power features like local pricing, shipping ETA and nearby charging.</li>
            <li>Notifications are opt‑in. You can change them in system settings or in Profile → Notifications.</li>
            <li>We never sell personal data. See the privacy policy in the EVmart app for full details.</li>
          </ul>
        </section>
      </main>

      <FooterNav COLORS={COLORS} />
    </div>
  );
}

function StatusChip({s}){ const map={granted:'#03cd8c',denied:'#ef4444',prompt:'#f59e0b',unknown:'#94a3b8'}; const label=s?.[0]?.toUpperCase()+s?.slice(1) || 'Unknown'; return (<span className="rounded-full px-2 py-0.5 text-white" style={{background:map[s]||map.unknown}}>{label}</span>); }

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
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function SearchIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
