// @ts-nocheck
import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';

export default function EVmartOrdersV2(){
  const navigate = useNavigate();
  // ===== EVzone Colors =====
  const COLORS = { brand:'#03cd8c', brandDark:'#0a7c7a', accent:'#f77f00', grayL:'#f5f7fa' };

  // ===== Languages (15 minimal for demo) & Currency =====
  const LANGS = [
    { code:'en', label:'English', locale:'en-US' },
    { code:'fr', label:'Français', locale:'fr-FR' },
    { code:'zh', label:'中文', locale:'zh-CN' },
    { code:'ar', label:'العربية', locale:'ar-EG' },
    { code:'es', label:'Español', locale:'es-ES' },
    { code:'de', label:'Deutsch', locale:'de-DE' },
    { code:'pt', label:'Português', locale:'pt-PT' },
    { code:'hi', label:'हिन्दी', locale:'hi-IN' },
    { code:'no', label:'Norsk', locale:'nb-NO' },
    { code:'nl', label:'Nederlands', locale:'nl-NL' },
    { code:'da', label:'Dansk', locale:'da-DK' },
    { code:'sv', label:'Svenska', locale:'sv-SE' },
    { code:'ja', label:'日本語', locale:'ja-JP' },
    { code:'ko', label:'한국어', locale:'ko-KR' },
    { code:'tr', label:'Türkçe', locale:'tr-TR' }
  ];
  const CURRENCIES = [ { code:'USD', label:'USD $' }, { code:'EUR', label:'EUR €' }, { code:'UGX', label:'UGX USh' } ];
  const FX:any = { USD:1, EUR:0.93, UGX:3800 };

  // ===== i18n =====
  const DICT:any = {
    en:{ orders:'Orders', search:'Search orders', filter:'Filter', all:'All', inProgress:'In progress', delivered:'Delivered', cancelled:'Cancelled',
         orderNo:'Order #', placed:'Placed', status:'Status', total:'Total', view:'View', track:'Track', shippedFrom:'Shipped from', items:'items', back:'Back',
         detail:'Order detail', summary:'Summary', shippingTo:'Shipping to', payment:'Payment', carrier:'Carrier', trackingNo:'Tracking no.', copy:'Copy',
         timeline:'Timeline', processing:'Processing', packed:'Packed', shipped:'Shipped', outForDelivery:'Out for delivery', delivered2:'Delivered',
         invoice:'Invoice', taxDocs:'Tax Docs', download:'Download', exportDocs:'Export Docs', proforma:'Pro forma', invoicePDF:'Invoice (PDF)',
         startReturn:'Start Return', startWarranty:'Start Warranty Claim', startRepair:'Start Repair', labelQR:'Label / QR', eta:'ETA',
         unitPrice:'Unit price', qty:'Qty', tierApplied:'Tier applied', returns:'Returns' }
  };

  // helpers BEFORE usage
  const [lang,setLang] = useState('en');
  const [currency,setCurrency] = useState('USD');
  const t = (k:string)=> (DICT[lang] && DICT[lang][k]) || DICT.en[k] || k;
  const fmt = (usd:number)=> new Intl.NumberFormat(LANGS.find(l=>l.code===lang)?.locale||'en-US', {style:'currency', currency}).format(usd*(FX[currency]||1));

  // ===== Dataset (with optional tiers) =====
  type Tier = { min:number; unitUSD:number };
  type OItem = { id:string; name:string; img:string; qty:number; priceUSD:number; tiers?:Tier[]; moq?:number; ship:{code:string; flag:string} };
  type Event = { ts:string; title:string; loc?:string };
  type Order = {
    id:string; no:string; date:string; status:'processing'|'packed'|'shipped'|'out'|'delivered'|'cancelled';
    totalUSD:number; items:OItem[]; address:{ name:string; line1:string; city:string; country:string; phone:string };
    payment:{ method:'card'|'wallet'|'bank'|'mobile'; last4?:string };
    carrier:{ name:string; code:string }; tracking:{ number:string; url?:string; eta?:string };
    timeline: Event[]
  };

  const ORDERS:Order[] = [
    {
      id:'o2001', no:'EV-2025-0101', date:'2025-10-01', status:'out', totalUSD: 589,
      items:[
        { id:'i1', name:'Home Charger 7.4kW', img:'https://images.unsplash.com/photo-1604147706284-9e27f42e4bd5?w=800', qty:1, priceUSD:449, ship:{code:'CN', flag:'🇨🇳'} },
        { id:'i2', name:'Smart Dash Cam 4K', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', qty:1, priceUSD:140, ship:{code:'US', flag:'🇺🇸'} }
      ],
      address:{ name:'Jane Doe', line1:'Plot 10, Kampala Rd', city:'Kampala', country:'UG', phone:'+256 700 123456' },
      payment:{ method:'mobile' },
      carrier:{ name:'DHL', code:'DHL' },
      tracking:{ number:'DHL123456789UG', eta:'2025-10-05' },
      timeline:[ {ts:'2025-10-01 09:10', title:'Order placed'}, {ts:'2025-10-01 12:40', title:'Payment confirmed'}, {ts:'2025-10-02 10:20', title:'Packed'}, {ts:'2025-10-03 08:10', title:'Shipped'}, {ts:'2025-10-04 07:30', title:'Out for delivery', loc:'Kampala Central'} ]
    },
    {
      id:'o2002', no:'EV-2025-0102', date:'2025-09-22', status:'delivered', totalUSD: 720,
      items:[
        { id:'i3', name:'Aero Wheel Rims 20″ (Set of 4)', img:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800', qty:4, priceUSD:200, moq:2, tiers:[{min:2,unitUSD:190},{min:4,unitUSD:180}], ship:{code:'DE', flag:'🇩🇪'} }
      ],
      address:{ name:'John Smith', line1:'500 Market St', city:'San Francisco', country:'US', phone:'+1 (415) 555-0199' },
      payment:{ method:'card', last4:'4242' },
      carrier:{ name:'UPS', code:'UPS' },
      tracking:{ number:'1Z999AA10123456784', eta:'2025-09-26' },
      timeline:[ {ts:'2025-09-22 10:05', title:'Order placed'}, {ts:'2025-09-22 12:11', title:'Payment confirmed'}, {ts:'2025-09-23 09:30', title:'Packed'}, {ts:'2025-09-24 11:45', title:'Shipped'}, {ts:'2025-09-26 14:25', title:'Delivered', loc:'Front desk'} ]
    }
  ];

  // ===== State =====
  const [view,setView] = useState<'list'|'detail'>('list');
  const [q,setQ] = useState('');
  const [statusFilter,setStatusFilter] = useState<'all'|'inProgress'|'delivered'|'cancelled'>('all');
  const [active,setActive] = useState<Order|null>(null);

  // Derived
  const filtered = useMemo(()=>{
    const match = (o:Order)=>{
      const inQ = q.trim()? (o.no.toLowerCase().includes(q.trim().toLowerCase()) || o.items.some(i=>i.name.toLowerCase().includes(q.trim().toLowerCase()))) : true;
      const st = statusFilter==='all'? true : statusFilter==='delivered'? o.status==='delivered' : statusFilter==='cancelled'? o.status==='cancelled' : (o.status!=='delivered' && o.status!=='cancelled');
      return inQ && st;
    };
    return ORDERS.filter(match);
  },[q,statusFilter]);

  useEffect(()=>{ try{ console.assert(typeof t==='function'); }catch{} },[]);

  // Pricing helper (tiers)
  function unitFor(item:OItem){
    if(!item.tiers || !item.tiers.length) return item.priceUSD;
    const eligible = item.tiers.filter(t=> item.qty>=t.min).sort((a,b)=>b.min-a.min)[0];
    return eligible? eligible.unitUSD : item.priceUSD;
  }

  // step mapping for Stepper
  function stepIndexFromStatus(st:string){
    const map:any = { processing:0, packed:1, shipped:2, outForDelivery:3, delivered2:4 };
    return map[st] ?? 0;
  }

  // Start return handoff
  function isReturnEligible(order:Order){
    const delivered = order.timeline.find(e=> /Delivered/i.test(e.title));
    if(!delivered) return { ok:false, reason:'Not delivered yet' };
    const d = new Date(delivered.ts.replace(' ','T')); const days = Math.floor((Date.now()-d.getTime())/86400000);
    return days<=14? {ok:true} : { ok:false, reason:`Outside window (${days}d)` };
  }
  function startReturn(order:Order, item:OItem){
    try{
      sessionStorage.setItem('ev_return_start', JSON.stringify({ orderId:order.id, orderNo:order.no, itemId:item.id, name:item.name, qty:item.qty, priceUSD:item.priceUSD, ship:item.ship }));
    }catch{}
    navigate(ROUTES.returns);
  }

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{ backgroundColor: COLORS.grayL }}>
      {/* Header */}
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder={view==='list' ? t('search') : t('detail')}
          searchValue={view==='list' ? q : undefined}
          onSearchChange={view==='list' ? setQ : undefined}
          language={lang}
          currency={currency}
          languageOptions={LANGS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={CURRENCIES.map(c => ({ value: c.code, label: c.label }))}
          onLanguageChange={setLang}
          onCurrencyChange={setCurrency}
          leadingSlot={view==='detail' ? (
            <button
              onClick={()=>{ setView('list'); setActive(null); }}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white"
              aria-label={t('back')}
            >
              <ChevronLeft/>
            </button>
          ) : undefined}
        />
      </header>

      {view==='list'? (
        <>
          {/* Filters */}
          <section className="mx-auto max-w-sm px-4 pt-3">
            <div className="flex flex-wrap gap-2 pb-1">
              {(['all','inProgress','delivered','cancelled'] as const).map(k=> (
                <button key={k} onClick={()=>setStatusFilter(k)} className={`rounded-full border px-3 py-1 text-sm whitespace-nowrap ${statusFilter===k? 'border-[#03cd8c] bg-[#03cd8c22]':'border-slate-200 bg-white'}`}>{t(k)}</button>
              ))}
            </div>
          </section>

          {/* Orders list */}
          <section className="mx-auto max-w-sm px-4 pt-2 pb-24">
            {filtered.length===0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-600">No orders found.</div>
            )}
            <div className="space-y-3">
              {filtered.map(o => (
                <article key={o.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 p-3 text-sm">
                    <div>
                      <div className="font-semibold">{t('orderNo')}{o.no}</div>
                      <div className="text-xs text-slate-500">{t('placed')}: {o.date}</div>
                    </div>
                    <StatusPill status={o.status==='out'?'outForDelivery': (o.status==='delivered'?'delivered2': o.status)} />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      {o.items.slice(0,4).map(i=> (<img key={i.id} src={i.img} alt="" className="h-12 w-12 rounded-lg object-cover" />))}
                      {o.items.length>4 && (<span className="text-xs text-slate-500">+{o.items.length-4}</span>)}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <div className="text-slate-600">{t('total')}: <span className="font-semibold">{fmt(o.totalUSD)}</span></div>
                      <div className="text-xs text-slate-500">{t('shippedFrom')}: {Array.from(new Set(o.items.map(i=>i.ship.flag+" "+i.ship.code))).join(' · ')}</div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={()=>{ setActive(o); setView('detail'); }} className="flex-1 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: COLORS.accent, color: COLORS.accent }}>{t('view')}</button>
                      <button onClick={()=>{ setActive(o); setView('detail'); }} className="flex-1 rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.accent }}>{t('track')}</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        active && (
          <section className="mx-auto max-w-sm px-4 pt-3 pb-24">
            {/* Summary */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-3 text-sm font-semibold text-slate-800">{t('summary')}</div>
              <div className="p-3 text-sm">
                <div className="flex items-center justify-between"><span>{t('orderNo')}{active.no}</span><StatusPill status={active.status==='out'?'outForDelivery': (active.status==='delivered'?'delivered2': active.status)} /></div>
                <div className="mt-1 text-xs text-slate-600">{t('placed')}: {active.date}</div>
                <div className="mt-1 text-xs text-slate-600">{t('shippedFrom')}: {Array.from(new Set(active.items.map(i=>i.ship.flag+" "+i.ship.code))).join(' · ')}</div>
                <div className="mt-2 text-sm font-semibold">{t('total')}: {fmt(active.totalUSD)}</div>
              </div>
            </div>

            {/* Shipping To */}
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-3 text-sm font-semibold text-slate-800">{t('shippingTo')}</div>
              <div className="p-3 text-sm">
                <div className="font-medium">{active.address.name} · {active.address.phone}</div>
                <div className="text-xs text-slate-600">{active.address.line1}, {active.address.city}, {active.address.country}</div>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-3 text-sm font-semibold text-slate-800">{t('payment')}</div>
              <div className="p-3 text-sm">{active.payment.method.toUpperCase()} {active.payment.last4? `• • • • ${active.payment.last4}`:''}</div>
            </div>

            {/* Tracking */}
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-3 text-sm font-semibold text-slate-800">{t('track')}</div>
              <div className="p-3 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{active.carrier.name}</div>
                    <div className="text-xs text-slate-600">{t('trackingNo')}: {active.tracking.number}</div>
                    <div className="text-xs text-slate-600">{t('eta')}: {active.tracking.eta || '-'}</div>
                    <div className="text-xs text-slate-600">Latest: {active.timeline?.slice(-1)[0]?.title} · {active.timeline?.slice(-1)[0]?.ts}</div>
                  </div>
                  <button onClick={()=>{ try { navigator.clipboard?.writeText(active.tracking.number); } catch{} }} className="rounded border px-2 py-1 text-xs"><CopyIcon/> {t('copy')}</button>
                </div>
                <div className="mt-3">
                  <Stepper steps={[t('processing'),t('packed'),t('shipped'),t('outForDelivery'),t('delivered2')]} current={stepIndexFromStatus(active.status==='out'?'outForDelivery': (active.status==='delivered'?'delivered2': active.status))} />
                </div>
                <div className="mt-3">
                  <div className="mb-1 text-xs font-semibold text-slate-600">Map</div>
                  <MapPlaceholder />
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-3 text-sm font-semibold text-slate-800">{t('items')}</div>
              <div className="divide-y divide-slate-200">
                {active.items.map(it => (
                  <div key={it.id} className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={it.img} alt="" className="h-14 w-14 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold">{it.name}</div>
                        <div className="text-[11px] text-slate-500">{t('shippedFrom')}: {it.ship.flag} {it.ship.code}</div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-semibold">{fmt(it.priceUSD)}</div>
                        <div className="text-xs text-slate-500">×{it.qty}</div>
                      </div>
                    </div>
                    {it.tiers && it.tiers.length>0 && (
                      <div className="mt-1 text-xs text-slate-600">
                        {t('tierApplied')}: ≥{Math.max(...it.tiers.map(t=>t.min)) <= it.qty ? Math.max(...it.tiers.map(t=>t.min)) : it.tiers.filter(ti=> it.qty>=ti.min).sort((a,b)=>b.min-a.min)[0].min} → {fmt(unitFor(it))}
                      </div>
                    )}
                    <div className="mt-2 flex justify-end gap-2">
                      <button onClick={()=> startReturn(active, it)} className="rounded-lg border px-3 py-1.5 text-sm" style={{ borderColor: COLORS.accent, color: COLORS.accent }}>{t('startReturn')}</button>
                      <button onClick={()=>{ try{ sessionStorage.setItem('ev_claim_start', JSON.stringify({ orderId: active.id, type:'warranty'})); }catch{} alert('Opening Warranty screen…'); }} className="rounded-lg border px-3 py-1.5 text-sm">{t('startWarranty')}</button>
                      <button onClick={()=>{ try{ sessionStorage.setItem('ev_claim_start', JSON.stringify({ orderId: active.id, type:'repair'})); }catch{} alert('Opening Repair screen…'); }} className="rounded-lg border px-3 py-1.5 text-sm">{t('startRepair')}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoices & Tax Docs */}
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-3 text-sm font-semibold text-slate-800">{t('invoice')} / {t('taxDocs')}</div>
              <div className="p-3 text-sm flex flex-wrap gap-2">
                <button className="rounded-lg border px-3 py-2 text-sm">{t('invoicePDF')}</button>
                <button className="rounded-lg border px-3 py-2 text-sm">{t('proforma')}</button>
                <button className="rounded-lg border px-3 py-2 text-sm">{t('exportDocs')}</button>
                <div className="text-xs text-slate-500">(PDFs are placeholders here; wire to your document service)</div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex gap-2">
              <button onClick={()=>navigate(ROUTES.returns)} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm">{t('returns')}</button>
              <button className="flex-1 rounded-lg bg-black px-3 py-2 text-sm text-white">{t('reorder')}</button>
            </div>
          </section>
        )
      )}

      {/* Footer nav */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-sm items-center justify-between px-6 py-2 text-[11px]">
          <NavItem label="Home" color={COLORS.brandDark} icon={<HomeIcon />} to={ROUTES.home} />
          <NavItem label="Orders" active color={COLORS.brand} icon={<BoxIcon />} to={ROUTES.orders} />
          <NavItem label="Search" color={COLORS.brandDark} icon={<SearchIcon />} to={ROUTES.productList} />
          <NavItem label="Cart" color={COLORS.brandDark} icon={<CartIcon />} to={ROUTES.cart} />
          <NavItem label="Profile" color={COLORS.brandDark} icon={<UserIcon />} to={ROUTES.dashboard} />
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}

// ===== Icons & small helpers =====
function SearchIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function ChevronLeft(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>); }
function MapPlaceholder(){ return (<div className="grid h-40 w-full place-items-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-500">Map placeholder</div>); }
function Stepper({ steps, current }:{ steps:string[]; current:number }){
  return (
    <div className="flex items-center justify-between">
      {steps.map((s,i)=> (
        <div key={i} className="flex flex-1 items-center">
          <div className={`grid h-6 w-6 place-items-center rounded-full text-white ${i<=current? 'bg-[#03cd8c]':'bg-slate-300'}`}>{i<=current? <CheckIcon/> : i+1}</div>
          {i<steps.length-1 && <div className={`mx-2 h-1 flex-1 rounded ${i<current? 'bg-[#03cd8c]':'bg-slate-300'}`} />}
          <div className="sr-only">{s}</div>
        </div>
      ))}
    </div>
  );
}
function CheckIcon(){ return (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>); }
function CopyIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><rect x="3" y="3" width="13" height="13" rx="2" ry="2"/></svg>); }
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function BoxIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }

function StatusPill({ status }:{ status:string }){
  const map:any = { processing:'#64748b', packed:'#6366f1', shipped:'#0ea5e9', outForDelivery:'#f59e0b', delivered2:'#22c55e', cancelled:'#ef4444' };
  const color = map[status] || '#64748b';
  return <span className="rounded-full px-2 py-0.5 text-xs font-medium text-white" style={{ background: color }}>{status}</span>;
}

// Footer nav helper
function NavItem({ label, icon, active, color, to }:{ label:string; icon:React.ReactNode; active?:boolean; color:string; to:string }){
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 ${active? '' : 'text-slate-500'}`} style={{ color: active ? color : undefined }}>
      <span className={`grid h-8 w-8 place-items-center rounded-full ${active? '' : ''}`} style={{ background: active? `${color}22` : 'transparent' }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
