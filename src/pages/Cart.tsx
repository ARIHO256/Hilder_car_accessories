// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { useCart } from '../contexts/CartContext';

export default function EVmartCartV2(){
  const navigate = useNavigate();
  const COLORS = { brand:'#03cd8c', brandDark:'#0a7c7a', accent:'#f77f00', grayL:'#f5f7fa' };
  const DICT = { en:{ screen:'Cart', language:'Language', currency:'Currency',
    shippedFrom:'Shipped from', unitPrice:'Unit price', qty:'Qty', remove:'Remove', subtotal:'Subtotal', taxes:'Taxes', shipping:'Shipping', total:'Total', checkout:'Checkout', shareCart:'Share Cart', eta:'Estimated delivery',
    door:'Deliver to my door', schedule:'Schedule doorstep', doorNote:'Doorstep delivery available in selected countries.' } };
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
  const [lang,setLang]=useState('en');
  const [currency,setCurrency]=useState('USD');
  const { count: cartCount } = useCart();
  const cartBadge = cartCount > 99 ? '99+' : String(cartCount);
  const t=(k)=> DICT[lang]?.[k]||k;

  // mock lines
  const [lines,setLines]=useState([
    { id:'l1', name:'Home Charger 7.4kW', img:'https://images.unsplash.com/photo-1604147706284-9e27f42e4bd5?w=800', ship:{flag:'🇨🇳',code:'CN'}, priceUSD:449, qty:1 },
    { id:'l2', name:'Aero Wheel Rims 20″ (Set of 4)', img:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800', ship:{flag:'🇩🇪',code:'DE'}, priceUSD:799, qty:1 }
  ]);
  function fmt(n:number){ return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n||0); }
  const subtotal = useMemo(()=> lines.reduce((s,l)=> s + l.priceUSD*l.qty,0),[lines]);
  const taxes = Math.round(subtotal*0.12*100)/100; const shipping=15; const total=subtotal+taxes+shipping;

  // Share cart (Web Share API or clipboard)
  async function shareCart(){
    const data = { items: lines.map(l=>({id:l.id,name:l.name,qty:l.qty,priceUSD:l.priceUSD})) };
    const url = '/cart/share?data='+encodeURIComponent(JSON.stringify(data));
    try{
      if(navigator.share){ await navigator.share({ title:'My EVmart Cart', text:'Checkout my cart', url }); return; }
      await navigator.clipboard.writeText(window.location.origin+url);
      alert('Share link copied');
    }catch{}
  }

  // Doorstep delivery option
  const supported=['UG','KE','US','DE'];
  const [dest,setDest]=useState('UG');
  const [door,setDoor]=useState(false);
  useEffect(()=>{ if(!supported.includes(dest)) setDoor(false); },[dest]);
  function goCheckout(){
    const order = { items: lines, totals:{ subtotal,taxes,shipping,total }, dest, door, eta:'4–8 weeks' };
    try{ sessionStorage.setItem('ev_cart', JSON.stringify(order)); }catch{}
    navigate(ROUTES.checkout);
  }

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{background:COLORS.grayL}}>
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder={t('screen')}
          language={lang}
          currency={currency}
          languageOptions={LANGS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={CURRENCIES.map(c => ({ value: c.code, label: c.label }))}
          onLanguageChange={setLang}
          onCurrencyChange={setCurrency}
        />
      </header>

      <main className="mx-auto max-w-sm px-4 pt-3 pb-36 space-y-3">
        {lines.map(l=> (
          <section key={l.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <img src={l.img} className="h-14 w-14 rounded-lg object-cover"/>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{l.name}</div>
                <div className="text-[11px] text-slate-500">{t('shippedFrom')}: {l.ship.flag} {l.ship.code}</div>
              </div>
              <div className="text-right text-sm">
                <div className="font-semibold">{fmt(l.priceUSD)}</div>
                <div className="text-xs text-slate-500">{t('qty')}: <button onClick={()=>setLines(prev=> prev.map(x=> x.id===l.id? {...x, qty:Math.max(1,x.qty-1)}:x))} className="rounded border px-1">-</button> <span className="px-1">{l.qty}</span> <button onClick={()=>setLines(prev=> prev.map(x=> x.id===l.id? {...x, qty:x.qty+1}:x))} className="rounded border px-1">+</button></div>
              </div>
            </div>
          </section>
        ))}

        {/* Destination + Doorstep */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="block">Ship to country
              <select value={dest} onChange={e=>setDest(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-2 py-1">
                {['UG','KE','TZ','US','DE','CN'].map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <div className="flex items-end justify-end">
              <button onClick={shareCart} className="inline-flex items-center gap-1 rounded border px-3 py-2 text-xs" style={{borderColor:COLORS.accent,color:COLORS.accent}}><ShareIcon/> {t('shareCart')}</button>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <label className={`flex items-center gap-2 ${supported.includes(dest)?'':'opacity-50'}`} title={supported.includes(dest)?'':'Not available for this country'}>
              <input type="checkbox" checked={door} onChange={e=>setDoor(e.target.checked)} disabled={!supported.includes(dest)} /> {t('door')}
            </label>
            {door && (<Link to={ROUTES.utilities} className="rounded px-2 py-1 text-white" style={{background:COLORS.brand}}>{t('schedule')}</Link>)}
          </div>
          <div className="mt-2 text-xs text-slate-600">{t('eta')}: <span className="font-semibold">4–8 weeks</span></div>
          <div className="mt-1 text-[11px] text-slate-500">{t('doorNote')}</div>
        </section>

        {/* Totals */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between text-sm"><span>{t('subtotal')}</span><span className="font-semibold">{fmt(subtotal)}</span></div>
          <div className="flex items-center justify-between text-sm"><span>{t('taxes')}</span><span className="font-semibold">{fmt(taxes)}</span></div>
          <div className="flex items-center justify-between text-sm"><span>{t('shipping')}</span><span className="font-semibold">{fmt(shipping)}</span></div>
          <div className="mt-1 flex items-center justify-between text-base"><span className="font-semibold">{t('total')}</span><span className="font-extrabold">{fmt(total)}</span></div>
          <div className="mt-3 flex gap-2">
            <button onClick={goCheckout} className="flex-1 rounded-lg px-3 py-2 text-sm text-white" style={{background:COLORS.brand}}>{t('checkout')}</button>
          </div>
        </section>
      </main>

      {/* Footer nav */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-sm items-center justify-between px-6 py-2 text-[11px]">
          <NavItem label="Home" color={COLORS.brandDark} icon={<HomeIcon />} to={ROUTES.home} />
          <NavItem label="Categories" color={COLORS.brandDark} icon={<GridIcon />} to={ROUTES.categories} />
          <NavItem label="Search" color={COLORS.brandDark} icon={<SearchIcon />} to={ROUTES.productList} />
          <NavItem label="Cart" color={COLORS.brandDark} icon={<CartIcon />} to={ROUTES.cart} badge={cartBadge} />
          <NavItem label="Profile" color={COLORS.brandDark} icon={<UserIcon />} to={ROUTES.dashboard} />
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}

function ShareIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>); }
function NavItem({ label, icon, active, color, to, badge }:{ label:string; icon:React.ReactNode; active?:boolean; color:string; to:string; badge?:string }){
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 ${active? '' : 'text-slate-500'}`} style={{ color: active ? color : undefined }}>
      <span className={`relative grid h-8 w-8 place-items-center rounded-full ${active? '' : ''}`} style={{ background: active? `${color}22` : 'transparent' }}>
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 rounded-full bg-emerald-500 px-1 text-[9px] font-semibold text-white">{badge}</span>
        )}
      </span>
      <span>{label}</span>
    </Link>
  );
}
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function SearchIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
