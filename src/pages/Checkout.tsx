// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { LANGUAGE_OPTIONS, CURRENCY_OPTIONS } from '../constants/localeOptions';

export default function EVmartCheckoutV1(){
  const navigate = useNavigate();
  // ===== Theme =====
  const COLORS = { brand:'#03cd8c', brandDark:'#0a7c7a', accent:'#f77f00', grayL:'#f5f7fa' };

  // ===== i18n (subset) =====
  const DICT = { en:{ screen:'Checkout', language:'Language', currency:'Currency',
    contact:'Contact', name:'Full name', email:'Email', phone:'Phone',
    address:'Shipping address', address1:'Address line 1', address2:'Address line 2', city:'City', region:'State/Region', postal:'Postal code', country:'Country',
    shipping:'Shipping', method:'Method', std:'Standard', exp:'Express', eta:'Estimated delivery',
    taxes:'Taxes', pvoc:'PVOC', pvocRequired:'PVOC required?', pvocByBuyer:"I'll handle PVOC", shippingByBuyer:"I'll handle shipping",
    doorstep:'Deliver to my door', scheduleDoor:'Schedule doorstep', doorstepLine:'Doorstep delivery',
    payment:'Payment', card:'Card', mobile:'Mobile Money', wallet:'Wallet', bank:'Bank Transfer',
    cardNo:'Card number', mm:'MM', yy:'YY', cvc:'CVC',
    coupon:'Coupon', apply:'Apply', discount:'Discount',
    network:'Network', other:'Other', specifyNetwork:'Specify network', available:'Available', useWallet:'Use wallet balance', bankInstr:'We will email bank transfer instructions after placing the order.',
    subtotal:'Subtotal', shippingFee:'Shipping', total:'Total', place:'Place order'
  }};

  const [lang,setLang]=useState('en');
  const [currency,setCurrency]=useState('USD');
  const t=(k)=> DICT[lang]?.[k] || k;
  // Currency formatter
  const currentLocale = LANGUAGE_OPTIONS.find(l=>l.code===lang)?.locale || 'en-US';
  const fmt = (value)=> new Intl.NumberFormat(currentLocale, { style:'currency', currency }).format(Number(value)||0);

  // ===== Prefill from cart if available =====
  const [cart,setCart]=useState(null);
  useEffect(()=>{ try{ const s=sessionStorage.getItem('ev_cart'); if(s) setCart(JSON.parse(s)); }catch{} },[]);

  // ===== Form state =====
  const [preApproval,setPreApproval] = useState<Record<string,string>|null>(null);
  useEffect(()=>{ try{ const raw=sessionStorage.getItem('ev_finance_preapproval'); if(raw){ const parsed=Object.fromEntries(new URLSearchParams(raw).entries()); setPreApproval(parsed); sessionStorage.removeItem('ev_finance_preapproval'); } }catch{} },[]);

  const [contact,setContact]=useState({ name:'', email:'', phone:'' });
  const [addr,setAddr]=useState({ line1:'', line2:'', city:'', region:'', postal:'', country:'UG' });

  // Shipping
  const [ship,setShip]=useState('std'); // 'std' | 'exp'
  const [taxRate,setTaxRate]=useState(0.16);
  const supportedDoor=['UG','KE','US','DE'];
  const [door,setDoor]=useState(false);
  const [shippingByBuyer,setShippingByBuyer]=useState(false);
  useEffect(()=>{ if(!supportedDoor.includes(addr.country)) setDoor(false); },[addr.country]);

  // Read doorstep estimate from scheduler (if any)
  const [doorstepUSD, setDoorstepUSD] = useState(0);
  useEffect(()=>{ try{ const s=sessionStorage.getItem('doorstep_estimate_usd'); if(s) setDoorstepUSD(Number(s)||0); }catch{} },[]);

  // PVOC (flat demo; your rate logic can replace)
  const [pvocReq,setPvocReq]=useState(false);
  const [pvocByBuyer,setPvocByBuyer]=useState(false);

  // Payment methods
  const [payMethod, setPayMethod] = useState('card'); // 'card'|'mobile'|'wallet'|'bank'
  const [card,setCard] = useState({ no:'', mm:'', yy:'', cvc:'' });
  const [mobilePM,setMobilePM] = useState({ network:'MTN', other:'', number:'' });
  const [wallet,setWallet] = useState({ available: 50, use:true });

  // ===== Totals =====
  const subtotal = cart?.totals?.subtotal ?? 0;
  const shippingBase = ship==='std'? 15 : 39;
  const shippingCalc = shippingByBuyer ? 0 : shippingBase;
  const pvocFee = (pvocReq && !pvocByBuyer) ? 45 : 0; // demo flat PVOC fee
  const taxes = Math.round(subtotal * taxRate * 100)/100;
  const doorstepCost = door ? doorstepUSD : 0;
  const total = Math.max(0, subtotal + shippingCalc + taxes + pvocFee + doorstepCost);

  // ===== Place order → Order Confirmation =====
  function place(){
    const order = {
      id:'o-'+Date.now(),
      no:'EV-'+new Date().getFullYear()+'-'+Math.floor(Math.random()*9000+1000),
      email:contact.email,
      items: (cart?.items||[]),
      address:{ line1:addr.line1, city:addr.city, country:addr.country },
      payment:{ method: payMethod, last4: (payMethod==='card'? (card.no||'').slice(-4) : payMethod==='mobile'? (mobilePM.number||'').slice(-4) : undefined) },
      totals:{ subtotal, taxes, shipping:shippingCalc, doorstep:doorstepCost, total },
      eta: ship==='std'? '4–8 weeks' : '2–5 weeks',
      needsUtilities: (cart?.items||[]).some((it)=> /charger|\bev\b|install/i.test((it.name||'')))
    };
    try{ sessionStorage.setItem('ev_last_order', JSON.stringify(order)); }catch{}
    navigate(ROUTES.orderConfirmation);
  }

  useEffect(()=>{
    try{ console.assert(document.querySelector('header.sticky'), 'Header exists'); }catch{}
    try{ console.assert(typeof fmt==='function','fmt available'); }catch{}
  },[]);

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{background:COLORS.grayL}}>
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
          leadingSlot={(
            <Link to={ROUTES.cart} className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white" aria-label="Back">
              ◀
            </Link>
          )}
        />
      </header>

      <main className="mx-auto max-w-sm px-4 pt-3 pb-28 space-y-3">
        {preApproval && (
          <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="text-sm font-semibold text-slate-800">Finance pre-approval received</div>
            <div className="mt-1 text-xs text-slate-600">
              {preApproval.name ? `${preApproval.name}, we` : 'We'} will follow up via {preApproval.email || 'email'} and {' '}
              {preApproval.phone || 'phone'} within one business day.
            </div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-[11px] text-slate-700">
              <span className="font-semibold" style={{color:COLORS.brand}}>Requested amount:</span>
              <span>{fmt(preApproval.amount || '0')}</span>
            </div>
          </section>
        )}
        {/* Contact */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid gap-2 text-xs">
            <label className="block">{t('name')}<input value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
            <label className="block">{t('email')}<input value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
            <label className="block">{t('phone')}<input value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
          </div>
        </section>

        {/* Address */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid gap-2 text-xs">
            <label className="block">{t('address1')}<input value={addr.line1} onChange={e=>setAddr({...addr,line1:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
            <label className="block">{t('address2')}<input value={addr.line2} onChange={e=>setAddr({...addr,line2:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
            <div className="grid grid-cols-2 gap-2">
              <label className="block">{t('city')}<input value={addr.city} onChange={e=>setAddr({...addr,city:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
              <label className="block">{t('region')}<input value={addr.region} onChange={e=>setAddr({...addr,region:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="block">{t('postal')}<input value={addr.postal} onChange={e=>setAddr({...addr,postal:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
              <label className="block">{t('country')}
                <select value={addr.country} onChange={e=>setAddr({...addr,country:e.target.value})} className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1">
                  {['UG','KE','TZ','US','DE','CN'].map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
          </div>
        </section>

        {/* Shipping */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-sm font-semibold">{t('shipping')}</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button onClick={()=>setShip('std')} disabled={shippingByBuyer} className={`rounded-lg border px-3 py-2 text-left text-sm ${ship==='std' && !shippingByBuyer? 'border-[#03cd8c] bg-[#03cd8c22]': 'border-slate-200 bg-white'} ${shippingByBuyer? 'opacity-50 cursor-not-allowed':''}`}>
              <div className="font-medium">{t('std')}</div>
              <div className="text-xs text-slate-600">{t('eta')}: 4–8 weeks · {fmt(15)}</div>
            </button>
            <button onClick={()=>setShip('exp')} disabled={shippingByBuyer} className={`rounded-lg border px-3 py-2 text-left text-sm ${ship==='exp' && !shippingByBuyer? 'border-[#03cd8c] bg-[#03cd8c22]': 'border-slate-200 bg-white'} ${shippingByBuyer? 'opacity-50 cursor-not-allowed':''}`}>
              <div className="font-medium">{t('exp')}</div>
              <div className="text-xs text-slate-600">{t('eta')}: 2–5 weeks · {fmt(39)}</div>
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2"><input type="checkbox" checked={shippingByBuyer} onChange={e=>setShippingByBuyer(e.target.checked)} /> {t('shippingByBuyer')}</label>
              <label className={`flex items-center gap-2 ${supportedDoor.includes(addr.country)?'':'opacity-50'}`} title={supportedDoor.includes(addr.country)?'':'Not available in this country'}>
                <input type="checkbox" checked={door} onChange={e=>setDoor(e.target.checked)} disabled={!supportedDoor.includes(addr.country)} /> {t('doorstep')}
              </label>
            </div>
            {door && (<Link to={ROUTES.utilities} className="rounded px-2 py-1 text-white" style={{background:COLORS.brand}}>{t('scheduleDoor')}</Link>)}
          </div>
        </section>

        {/* PVOC section */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-sm font-semibold">{t('pvoc')}</div>
          <div className="mt-2 text-xs">
            <label className="flex items-center gap-2"><input type="checkbox" checked={pvocReq} onChange={e=>setPvocReq(e.target.checked)} /> {t('pvocRequired')}</label>
            {pvocReq && (
              <div className="mt-2 flex items-center justify-between">
                <label className="flex items-center gap-2"><input type="checkbox" checked={pvocByBuyer} onChange={e=>setPvocByBuyer(e.target.checked)} /> {t('pvocByBuyer')}</label>
                {!pvocByBuyer && (<span className="text-slate-600">Fee: <span className="font-semibold">{fmt(45)}</span></span>)}
              </div>
            )}
          </div>
        </section>

        {/* Payment */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-sm font-semibold">{t('payment')}</div>
          {/* Method selector */}
          <div className="mt-2 inline-flex rounded-xl border border-slate-200 bg-white p-1 text-xs">
            {(['card','mobile','wallet','bank'] as const).map(m => (
              <button key={m} onClick={()=>setPayMethod(m)} className={`px-3 py-1.5 rounded-lg ${payMethod===m?'text-white':''}`} style={{background: payMethod===m? COLORS.brand : 'transparent'}}>{t(m)}</button>
            ))}
          </div>
          {/* Card */}
          {payMethod==='card' && (
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <label className="block">{t('cardNo')}<input value={card.no} onChange={e=>setCard({...card,no:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
              <div className="grid grid-cols-3 gap-2">
                <input placeholder={t('mm')} value={card.mm} onChange={e=>setCard({...card,mm:e.target.value})} className="rounded border border-slate-300 px-2 py-1"/>
                <input placeholder={t('yy')} value={card.yy} onChange={e=>setCard({...card,yy:e.target.value})} className="rounded border border-slate-300 px-2 py-1"/>
                <input placeholder={t('cvc')} value={card.cvc} onChange={e=>setCard({...card,cvc:e.target.value})} className="rounded border border-slate-300 px-2 py-1"/>
              </div>
            </div>
          )}
          {/* Mobile money */}
          {payMethod==='mobile' && (
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <label className="block">{t('network')}
                <select value={mobilePM.network} onChange={e=>setMobilePM({...mobilePM,network:e.target.value})} className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1">
                  {['MTN','Airtel','Other'].map(n=> <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              {mobilePM.network==='Other' && (
                <label className="block">{t('specifyNetwork')}<input value={mobilePM.other} onChange={e=>setMobilePM({...mobilePM,other:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
              )}
              <label className="col-span-2 block">Phone number<input value={mobilePM.number} onChange={e=>setMobilePM({...mobilePM,number:e.target.value})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
            </div>
          )}
          {/* Wallet */}
          {payMethod==='wallet' && (
            <div className="mt-2 grid gap-2 text-xs">
              <div className="text-slate-600">{t('available')}: <span className="font-semibold">{fmt(wallet.available)}</span></div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={wallet.use} onChange={e=>setWallet({...wallet,use:e.target.checked})}/> {t('useWallet')}</label>
            </div>
          )}
          {/* Bank transfer */}
          {payMethod==='bank' && (
            <div className="mt-2 text-xs text-slate-600">{t('bankInstr')}</div>
          )}
        </section>

        {/* Totals */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between text-sm"><span>{t('subtotal')}</span><span className="font-semibold">{fmt(subtotal)}</span></div>
          <div className="flex items-center justify-between text-sm"><span>{t('taxes')}</span><span className="font-semibold">{fmt(taxes)}</span></div>
          <div className="flex items-center justify-between text-sm"><span>{t('shippingFee')}</span><span className="font-semibold">{fmt(shippingCalc)}</span></div>
          {pvocFee>0 && (<div className="flex items-center justify-between text-sm"><span>{t('pvoc')}</span><span className="font-semibold">{fmt(pvocFee)}</span></div>)}
          {door && doorstepUSD>0 && (<div className="flex items-center justify-between text-sm"><span>{t('doorstepLine')}</span><span className="font-semibold">{fmt(doorstepCost)}</span></div>)}
          <div className="mt-1 flex items-center justify-between text-base"><span className="font-semibold">{t('total')}</span><span className="font-extrabold">{fmt(total)}</span></div>
          <div className="mt-3 flex gap-2">
            <button onClick={place} className="flex-1 rounded-lg px-3 py-2 text-sm text-white" style={{background:COLORS.brand}}>{t('place')}</button>
          </div>
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

// ===== Small UI =====
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
