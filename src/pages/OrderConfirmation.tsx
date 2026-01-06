// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { LANGUAGE_OPTIONS, CURRENCY_OPTIONS } from '../constants/localeOptions';

export default function EVmartOrderConfirmationV11(){
  const COLORS = { brand:'#03cd8c', brandDark:'#0a7c7a', accent:'#f77f00', grayL:'#f5f7fa' };
  const DICT = { en:{ screen:'Order Confirmation', thanks:'Thank you!', placed:'Your order has been placed', orderNo:'Order #',
    emailSent:'A confirmation email has been sent to', items:'Items', shipping:'Shipping to', payment:'Payment', subtotal:'Subtotal', taxes:'Taxes', shippingFee:'Shipping', total:'Total', track:'Track order', continue:'Continue shopping',
    utils:'Open EV Utilities' } };
  const [order,setOrder]=useState<any|null>(null);
  const [lang,setLang] = useState('en');
  const [currency,setCurrency] = useState('USD');
  useEffect(()=>{ try{ const s=sessionStorage.getItem('ev_last_order'); if(s) setOrder(JSON.parse(s)); }catch{} },[]);
  const fmt=(n:number)=> new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n||0);
  const oid = useMemo(()=> order?.no || `EV-${new Date().getFullYear()}-${Math.floor(Math.random()*9000+1000)}`,[order]);

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{background:COLORS.grayL}}>
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder={DICT.en.screen}
          language={lang}
          currency={currency}
          onLanguageChange={setLang}
          onCurrencyChange={setCurrency}
          languageOptions={LANGUAGE_OPTIONS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={CURRENCY_OPTIONS.map(c => ({ value: c.code, label: c.label }))}
        />
      </header>

      <main className="mx-auto max-w-sm px-4 pt-3 pb-28 space-y-3">
        <section className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
          <div className="text-2xl">🎉 {DICT.en.thanks}</div>
          <div className="text-sm text-slate-600">{DICT.en.placed}</div>
          <div className="mt-1 text-sm font-semibold">{DICT.en.orderNo} {oid}</div>
          {order?.email && (<div className="mt-1 text-xs text-slate-600">{DICT.en.emailSent} <span className="font-medium">{order.email}</span></div>)}
          {/* EV Utilities CTA if needed */}
          {order?.needsUtilities && (
            <div className="mt-3"><Link to={ROUTES.utilities} className="rounded px-3 py-2 text-xs text-white" style={{background:COLORS.brand}}>{DICT.en.utils}</Link></div>
          )}
        </section>

        {/* Items */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-1 text-sm font-semibold">{DICT.en.items}</div>
          <div className="divide-y divide-slate-200">
            {(order?.items||[]).map((it:any)=> (
              <div key={it.id} className="flex items-center gap-3 py-2">
                <div className="h-12 w-12 rounded-lg bg-slate-100"/>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{it.name}</div>
                  <div className="text-[11px] text-slate-500">×{it.qty}</div>
                </div>
                <div className="text-sm font-semibold">{fmt(it.priceUSD*it.qty)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping & Payment */}
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
            <div className="mb-1 font-semibold">{DICT.en.shipping}</div>
            <div className="text-xs text-slate-600">{order?.address?.line1}<br/>{order?.address?.city} {order?.address?.country}</div>
            {order?.eta && (<div className="mt-1 text-[11px] text-slate-600">ETA: <span className="font-semibold">{order.eta}</span></div>)}
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
            <div className="mb-1 font-semibold">{DICT.en.payment}</div>
            <div className="text-xs text-slate-600">{order?.payment?.method?.toUpperCase()} {order?.payment?.last4? `• • • • ${order.payment.last4}`:''}</div>
          </div>
        </section>

        {/* Totals */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between text-sm"><span>{DICT.en.subtotal}</span><span className="font-semibold">{fmt(order?.totals?.subtotal)}</span></div>
          <div className="flex items-center justify-between text-sm"><span>{DICT.en.taxes}</span><span className="font-semibold">{fmt(order?.totals?.taxes)}</span></div>
          <div className="flex items-center justify-between text-sm"><span>{DICT.en.shippingFee}</span><span className="font-semibold">{fmt(order?.totals?.shipping)}</span></div>
          <div className="mt-1 flex items-center justify-between text-base"><span className="font-semibold">{DICT.en.total}</span><span className="font-extrabold">{fmt(order?.totals?.total)}</span></div>
        </section>

        {/* Actions */}
        <section className="flex gap-2">
          <Link to={ROUTES.orders} className="flex-1 rounded-lg px-3 py-2 text-center text-sm text-white" style={{background:COLORS.brand}}>{DICT.en.track}</Link>
          <Link to={ROUTES.home} className="flex-1 rounded-lg border px-3 py-2 text-center text-sm" style={{borderColor:COLORS.accent,color:COLORS.accent}}>{DICT.en.continue}</Link>
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

function NavItem({ label, icon, active, color, to }:{ label:string; icon:React.ReactNode; active?:boolean; color:string; to:string }){
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 ${active? '' : 'text-slate-500'}`} style={{ color: active ? color : undefined }}>
      <span className={`grid h-8 w-8 place-items-center rounded-full ${active? '' : ''}`} style={{ background: active? `${color}22` : 'transparent' }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function SearchIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
