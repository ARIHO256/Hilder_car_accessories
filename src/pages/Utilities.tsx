// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { LANGUAGE_OPTIONS, CURRENCY_OPTIONS } from '../constants/localeOptions';

// ===== i18n (module-scope) =====
const DICT = {
  en: {
    screen: 'EV Utilities',
    handoffNote: 'This functionality lives in separate modules.',
    evTechs: 'EV Technicians',
    evTechsDesc: 'Book certified EV technicians for diagnostics, repairs, upgrades.',
    chargerInstallers: 'EV Charger Installers',
    chargerInstallersDesc: 'Home/Commercial installers, site surveys, permits & commissioning.',
    myVehicles: 'My Vehicles',
    myVehiclesDesc: 'Your EVs, trim/builds, warranties, service history.',
    privateStations: 'Private Charging Stations',
    privateStationsDesc: 'Manage home/office chargers, access control, usage reports.',
    publicStations: 'Public Charging Stations',
    publicStationsDesc: 'Find & pay at public chargers; live availability.',
    evDiagnostics: 'EV Diagnostics',
    evDiagnosticsDesc: 'Remote health checks, error codes, firmware & OTA.',
    routePlanner: 'EV Route Planner',
    routePlannerDesc: 'Plan trips with charge stops, elevation & weather.',
    open: 'Open',
    language: 'Language', currency: 'Currency'
  }
};

export default function EVmartEVUtilities(){
  // ===== EVzone Colors =====
  const COLORS = { brand:'#03cd8c', brandDark:'#0a7c7a', accent:'#f77f00', grayL:'#f5f7fa' };

  // ===== Languages/Currencies (UI only) =====
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const t = (k)=> (DICT[lang]?.[k]) ?? DICT.en[k] ?? k;

  useEffect(()=>{ try { console.assert(document.querySelector('header.sticky'), 'Header exists'); } catch{} },[]);

  const openModule = (key)=>{
    // Replace these with real deep links or router pushes
    const map = {
      techs: 'evtechs://home',
      installers: 'evinstallers://home',
      myvehicles: 'evvehicles://home',
      private: 'evprivatecharge://home',
      public: 'evpubliccharge://map',
      diagnostics: 'evdiagnostics://home',
      route: 'evroute://planner'
    };
    alert(`Open module: ${key} → ${map[key] || '#'}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{ backgroundColor: COLORS.grayL }}>
      {/* Header */}
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

      {/* Handoff Cards */}
      <main className="mx-auto max-w-sm px-4 pt-3 pb-28">
        <p className="mb-3 text-xs text-slate-600">{t('handoffNote')}</p>

        <section className="space-y-3">
          {/* 1. EV Technicians */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100"><WrenchIcon/></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{t('evTechs')}</div>
                <div className="mt-0.5 text-xs text-slate-600">{t('evTechsDesc')}</div>
                <div className="mt-2 flex justify-end">
                  <button onClick={()=>openModule('techs')} className="rounded-lg px-3 py-2 text-xs text-white" style={{ background: COLORS.accent }}>{t('open')}</button>
                </div>
              </div>
            </div>
          </article>

          {/* 2. EV Charger Installers */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100"><BoltIcon/></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{t('chargerInstallers')}</div>
                <div className="mt-0.5 text-xs text-slate-600">{t('chargerInstallersDesc')}</div>
                <div className="mt-2 flex justify-end">
                  <button onClick={()=>openModule('installers')} className="rounded-lg px-3 py-2 text-xs text-white" style={{ background: COLORS.accent }}>{t('open')}</button>
                </div>
              </div>
            </div>
          </article>

          {/* 3. My Vehicles */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100"><CarIcon/></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{t('myVehicles')}</div>
                <div className="mt-0.5 text-xs text-slate-600">{t('myVehiclesDesc')}</div>
                <div className="mt-2 flex justify-end">
                  <button onClick={()=>openModule('myvehicles')} className="rounded-lg px-3 py-2 text-xs text-white" style={{ background: COLORS.accent }}>{t('open')}</button>
                </div>
              </div>
            </div>
          </article>

          {/* 4. Private Charging Stations */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100"><HomePlugIcon/></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{t('privateStations')}</div>
                <div className="mt-0.5 text-xs text-slate-600">{t('privateStationsDesc')}</div>
                <div className="mt-2 flex justify-end">
                  <button onClick={()=>openModule('private')} className="rounded-lg px-3 py-2 text-xs text-white" style={{ background: COLORS.accent }}>{t('open')}</button>
                </div>
              </div>
            </div>
          </article>

          {/* 5. Public Charging Stations */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100"><MapPinIcon/></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{t('publicStations')}</div>
                <div className="mt-0.5 text-xs text-slate-600">{t('publicStationsDesc')}</div>
                <div className="mt-2 flex justify-end">
                  <button onClick={()=>openModule('public')} className="rounded-lg px-3 py-2 text-xs text-white" style={{ background: COLORS.accent }}>{t('open')}</button>
                </div>
              </div>
            </div>
          </article>

          {/* 6. EV Diagnostics */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100"><ChipIcon/></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{t('evDiagnostics')}</div>
                <div className="mt-0.5 text-xs text-slate-600">{t('evDiagnosticsDesc')}</div>
                <div className="mt-2 flex justify-end">
                  <button onClick={()=>openModule('diagnostics')} className="rounded-lg px-3 py-2 text-xs text-white" style={{ background: COLORS.accent }}>{t('open')}</button>
                </div>
              </div>
            </div>
          </article>

          {/* 7. EV Route Planner */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100"><RouteIcon/></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{t('routePlanner')}</div>
                <div className="mt-0.5 text-xs text-slate-600">{t('routePlannerDesc')}</div>
                <div className="mt-2 flex justify-end">
                  <button onClick={()=>openModule('route')} className="rounded-lg px-3 py-2 text-xs text-white" style={{ background: COLORS.accent }}>{t('open')}</button>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>

      {/* Footer nav */}
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
    </div>
  );
}

// ===== Icons & Nav =====
function NavItem({ label, icon, active, color, to }:{ label:string; icon:React.ReactNode; active?:boolean; color:string; to:string }){
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 ${active? '' : 'text-slate-500'}`} style={{ color: active ? color : undefined }}>
      <span className={`grid h-8 w-8 place-items-center rounded-full ${active? '' : ''}`} style={{ background: active? `${color}22` : 'transparent' }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
function SearchIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
function CalendarIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>); }
function WrenchIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 1 0-5.4 5.4l-7 7 1.4 1.4 7-7a4 4 0 0 0 5.4-5.4z"/></svg>); }
function BoltIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>); }
function MapPinIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>); }
function CarIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="6" rx="2"/><path d="M5 11l2-4h10l2 4"/><circle cx="7.5" cy="17" r="1.25"/><circle cx="16.5" cy="17" r="1.25"/></svg>); }
function HomePlugIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M10 14v4"/><path d="M14 14v4"/></svg>); }
function ChipIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M4 10h3M4 14h3M17 4v3M13 4v3M9 4v3M20 10h-3M20 14h-3M17 20v-3M13 20v-3M9 20v-3"/></svg>); }
function RouteIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M7.5 7.5L13 13"/><path d="M11 7h6v6"/></svg>); }
