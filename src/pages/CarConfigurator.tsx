// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';

export default function EVMartCarConfiguratorV11() {
  // ===== EVzone Colors =====
  const COLORS = { brand: '#03cd8c', brandDark: '#0a7c7a', accent: '#f77f00', grayL: '#f2f2f2' };

  // ===== Languages (15) =====
  const LANGS = [
    { code: 'en', label: 'English', locale: 'en-US' }, { code: 'fr', label: 'Français', locale: 'fr-FR' },
    { code: 'ar', label: 'العربية', locale: 'ar-EG' }, { code: 'es', label: 'Español', locale: 'es-ES' },
    { code: 'zh', label: '中文', locale: 'zh-CN' }, { code: 'de', label: 'Deutsch', locale: 'de-DE' },
    { code: 'pt', label: 'Português', locale: 'pt-PT' }, { code: 'hi', label: 'हिन्दी', locale: 'hi-IN' },
    { code: 'no', label: 'Norsk', locale: 'nb-NO' }, { code: 'nl', label: 'Nederlands', locale: 'nl-NL' },
    { code: 'da', label: 'Dansk', locale: 'da-DK' }, { code: 'sv', label: 'Svenska', locale: 'sv-SE' },
    { code: 'ja', label: '日本語', locale: 'ja-JP' }, { code: 'ko', label: '한국어', locale: 'ko-KR' }, { code: 'tr', label: 'Türkçe', locale: 'tr-TR' }
  ];

  // ===== 15 currencies + Mock FX =====
  const CURRENCIES = [
    { code: 'USD', label: 'USD $' }, { code: 'EUR', label: 'EUR €' }, { code: 'GBP', label: 'GBP £' },
    { code: 'CNY', label: 'CNY ¥' }, { code: 'JPY', label: 'JPY ¥' }, { code: 'KRW', label: 'KRW ₩' },
    { code: 'INR', label: 'INR ₹' }, { code: 'AED', label: 'AED د.إ' }, { code: 'SAR', label: 'SAR ر.س' },
    { code: 'NGN', label: 'NGN ₦' }, { code: 'KES', label: 'KES KSh' }, { code: 'UGX', label: 'UGX USh' },
    { code: 'ZAR', label: 'ZAR R' }, { code: 'TRY', label: 'TRY ₺' }, { code: 'BRL', label: 'BRL R$' }
  ];
  const FX = { USD:1, EUR:0.93, GBP:0.79, CNY:7.2, JPY:158, KRW:1380, INR:83, AED:3.67, SAR:3.75, NGN:1500, KES:128, UGX:3800, ZAR:18, TRY:33, BRL:5.2 };

  // ===== i18n (subset, with Other Specs labels) =====
  const DICT = {
    en: {
      configure:'Configure your EV', edition:'Edition', trim:'Trim', paint:'Paint', wheels:'Wheels', rimColor:'Rim\u00A0color', steering:'Steering', interior:'Interior', packages:'Packages', seats:'Seating', fiveSeat:'Five Seat', sevenSeat:'Seven Seat',
      range:'Range', topspeed:'Top speed', zeroTo100:'0–100 km/h', shipFrom:'Shipped from',
      financing:'Financing', cash:'Cash', loan:'Loan', lease:'Lease', purchase:'Purchase Price', savings:'After Savings', estDelivery:'Estimated delivery', deposit:'Deposit', apr:'APR', term:'Term', months:'months', downPayment:'Down payment', perMonth:'/mo', taxesFees:'Excludes taxes & fees', qty:'QTY', share:'Share', about:'About this vehicle',
      year:'Year', charging:'Charging', torque:'Torque', battery:'Battery', batteryChem:'Battery chemistry', chargingTime:'Charging time', ac:'AC (0–100%)', dc:'DC (10–80%)', dimensions:'Dimensions', weight:'Weight', warranty:'Warranty', condition:'Condition', new:'New', used:'Used', usedDetails:'Used Vehicle Details', mileage:'Mileage', owners:'Owners', registration:'Registration year', serviceHistory:'Service history',
      // pre-approval
      preTitle:'Finance/Lease Pre‑Approval', fullName:'Full name', email:'Email', phone:'Phone', income:'Monthly income', down:'Down payment', submit:'Submit', handoff:'Lender handoff (mock)'
    }
  };

  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const t = (k)=> (DICT[lang] && DICT[lang][k]) || DICT.en[k] || k;
  const fmt = (usd)=> new Intl.NumberFormat((LANGS.find(l=>l.code===lang)||{}).locale || 'en-US', { style:'currency', currency }).format(usd * (FX[currency]||1));

  // ===== Car dataset =====
  const car = {
    name: 'EVmart X Crossover 2025',
    condition: 'new',
    usedSpecs: null,
    shipFrom: { flag:'🇨🇳', code:'CN' },
    trims: [
      { id:'rwd', name:'Rear‑Wheel Drive', baseUSD: 42990, stats:{ range: 455, topspeed: 217, zeroTo100: 6.9 } },
      { id:'long', name:'Long Range AWD', baseUSD: 47990, stats:{ range: 520, topspeed: 217, zeroTo100: 5.0 } },
      { id:'perf', name:'Performance AWD', baseUSD: 53990, stats:{ range: 488, topspeed: 250, zeroTo100: 3.7 } }
    ],
    paints: [
      { id:'white', label:'Pearl White', swatch:'#f5f6f7', priceUSD: 0 },
      { id:'grey',  label:'Stealth Grey', swatch:'#6e7175', priceUSD: 1000 },
      { id:'blue',  label:'Deep Blue', swatch:'#274e8b', priceUSD: 1000 },
      { id:'red',   label:'Ultra Red',  swatch:'#9b0d14', priceUSD: 2000 }
    ],
    wheelSizes: [
      { id:'19', label:"19'' Crossflow", priceUSD: 0,   rangeDelta: 0 },
      { id:'20', label:"20'' Induction", priceUSD: 2000, rangeDelta:-20 },
      { id:'21', label:"21'' Uberturbine", priceUSD: 4000, rangeDelta:-35 }
    ],
    rimColors: [
      { id:'silver',  label:'Silver',  swatch:'#c9c9c9', priceUSD:0 },
      { id:'black',   label:'Black',   swatch:'#222',    priceUSD:500 },
      { id:'graphite',label:'Graphite',swatch:'#555',    priceUSD:500 }
    ],
    steering: [
      { id:'round', label:'Round', priceUSD:0 },
      { id:'yoke',  label:'Yoke',  priceUSD:1000 }
    ],
    interiors: [
      { id:'black', label:'All Black', priceUSD:0, swatch:'#111111' },
      { id:'white', label:'Black & White', priceUSD:1000, swatch:'#f5f6f7' }
    ],
    seats:[ { id:'5', label:'5', priceUSD:0 }, { id:'7', label:'7', priceUSD:3000 } ],
    packages:[ { id:'eap', label:'Enhanced Autopilot', priceUSD:6000 }, { id:'fsd', label:'Full Self‑Driving (Supervised)', priceUSD:12000 }, { id:'tow', label:'Tow Hitch', priceUSD:1000 } ],
    specs:{
      year:2025, chargingStandards:['Type 2','CCS'], torqueNm:660, batteryKWh:75, batteryChemistry:'NCM / Ternary', chargeTimes:{ ac_0_100:'~8h @ 11 kW', dc_10_80:'~25 min @ 150 kW' }, dimensions:'4750×1921×1620 mm', weightKg:1980, warranty:'4y / 80,000 km'
    },
    descriptionLong: `The EVmart X Crossover 2025 is engineered for efficiency and comfort. Its 75 kWh pack balances long-range driving with quick DC charging (10–80% in about 25 minutes under optimal conditions). The chassis is tuned for everyday stability and confident highway manners. Advanced driver assistance is available via Enhanced Autopilot or Full Self‑Driving (Supervised), and the cabin features durable materials with modern ergonomics.\n\nPractical details include a spacious cargo area, a heat‑pump HVAC for efficient climate control, over‑the‑air updates for continual improvements, and broad charging compatibility supporting Type 2 and CCS. Real‑world range varies by driving style, temperature, wheel selection, and payload.`,
    images:{ rwd:{ white:{ '19':{ silver:['https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=1280','https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1280'], black:['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1280','https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=1280'] }, '20':{ black:['https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1280','https://images.unsplash.com/photo-1483721310020-03333e577078?w=1280'] } }, red:{ '21':{ graphite:['https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1280','https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1280'] } } }, long:{ grey:{ '20':{ silver:{ black:['https://images.unsplash.com/photo-1483721310020-03333e577078?w=1280','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1280'], white:['https://images.unsplash.com/photo-1483721310020-03333e577078?w=1280','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1280'] } } } }, perf:{ blue:{ '21':{ black:['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1280','https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1280'] } } } }
  };

  // ===== State =====
  const [trim, setTrim] = useState(car.trims[0].id);
  const [paintId, setPaint] = useState(car.paints[0].id);
  const [wheelSize, setWheelSize] = useState(car.wheelSizes[0].id);
  const [rimColor, setRimColor] = useState(car.rimColors[0].id);
  const [steer, setSteer] = useState(car.steering[0].id);
  const [interior, setInterior] = useState(car.interiors[0].id);
  const [seat, setSeat] = useState(car.seats[0].id);
  const [pkg, setPkg] = useState(new Set());
  const [qty, setQty] = useState(1);
  function decQty(){ setQty(q=> Math.max(1, q-1)); }
  function incQty(){ setQty(q=> Math.min(99, q+1)); }
  async function handleShare(){ try{ const data={ title: car.name, text: 'Check out this EV configuration', url: (typeof window!=='undefined' && window.location ? window.location.href : '') }; if (navigator.share) { await navigator.share(data); } else { if (navigator.clipboard && data.url) await navigator.clipboard.writeText(data.url); alert('Link copied'); } } catch(_){} }

  // ===== Pricing =====
  const base = car.trims.find(x=>x.id===trim).baseUSD;
  const paintDelta = car.paints.find(x=>x.id===paintId).priceUSD;
  const wheelDelta = car.wheelSizes.find(x=>x.id===wheelSize).priceUSD;
  const rimDelta = car.rimColors.find(x=>x.id===rimColor).priceUSD;
  const interiorDelta = car.interiors.find(x=>x.id===interior).priceUSD;
  const seatDelta = car.seats.find(x=>x.id===seat).priceUSD;
  const steeringDelta = car.steering.find(x=>x.id===steer).priceUSD;
  const packagesTotal = Array.from(pkg).reduce((sum,id)=> sum + (car.packages.find(p=>p.id===id).priceUSD||0), 0);
  const unitPriceUSD = base + paintDelta + wheelDelta + rimDelta + interiorDelta + seatDelta + steeringDelta + packagesTotal;
  const totalPriceUSD = unitPriceUSD * qty;

  // ===== Dynamic metrics =====
  const trimStats = car.trims.find(x=>x.id===trim).stats;
  const wheelObj = car.wheelSizes.find(x=>x.id===wheelSize);
  const rangeKm = Math.max(300, trimStats.range + (wheelObj.rangeDelta||0));
  const zeroTo100 = trimStats.zeroTo100;
  const topSpeed = trimStats.topspeed;

  // ===== Gallery pick =====
  const gallery = useMemo(()=>{
    const tnode = car.images[trim] || {}; const pnode = tnode[paintId] || {}; const snode = pnode[wheelSize] || {}; const rnode = snode[rimColor];
    const chosen = Array.isArray(rnode) ? rnode : (rnode && rnode[interior]);
    const baseImgs = chosen || snode.silver || (pnode['19'] && pnode['19'].silver) || (pnode['20'] && pnode['20'].black) || (pnode['21'] && pnode['21'].graphite) || [
      'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=1280',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1280'
    ];
    const extra = [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1280',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?w=1280',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1280'
    ];
    const seen = new Set();
    return [...baseImgs, ...extra].filter(src => { if (seen.has(src)) return false; seen.add(src); return true; });
  }, [trim, paintId, wheelSize, rimColor, interior]);

  // ===== Financing (Cash/Loan/Lease) =====
  const [finMode, setFinMode] = useState('cash');
  const [loanAPR, setLoanAPR] = useState(6.99); const [loanTerm, setLoanTerm] = useState(72); const [loanDPct, setLoanDPct] = useState(10);
  const loanDown = totalPriceUSD * (loanDPct/100); const loanPrincipal = Math.max(0, totalPriceUSD - loanDown);
  const loanR = (loanAPR/100)/12; const loanMonthly = finMode==='loan' && loanR>0 ? (loanPrincipal*loanR*Math.pow(1+loanR,loanTerm))/(Math.pow(1+loanR,loanTerm)-1) : (loanPrincipal/loanTerm || 0);
  const [leaseTerm, setLeaseTerm] = useState(36); const [leaseDPct, setLeaseDPct] = useState(10); const [leaseResidualPct, setLeaseResidualPct] = useState(55); const [leaseMF, setLeaseMF] = useState(0.0021);
  const leaseDown = totalPriceUSD * (leaseDPct/100); const residualVal = totalPriceUSD*(leaseResidualPct/100);
  const depreciation = Math.max(0, (totalPriceUSD - residualVal - leaseDown)/leaseTerm); const financeCharge = ((totalPriceUSD + residualVal) * leaseMF);
  const leaseMonthly = Math.max(0, depreciation + financeCharge);

  // ===== Pre-Approval form (simple) =====
  const [pre, setPre] = useState({ name:'', email:'', phone:'', income:'', down:'5000' });

  // ===== Effects (tests) =====
  useEffect(()=>{ try { const el = document.querySelector('[data-testid="total-price"]'); if (el) { const attr = Number(el.getAttribute('data-totalprice')); console.assert(!Number.isNaN(attr), 'Total price attribute present'); } } catch(e){} },[qty, unitPriceUSD]);
  useEffect(()=>{ try { console.assert(document.querySelector('[data-testid="qty-stepper"]'), 'QTY stepper exists'); } catch(e){} try { console.assert(document.querySelector('[data-testid="btn-share"]'), 'Share button exists'); } catch(e){} try { console.assert(document.querySelector('[data-testid="about-collapsible"]'), 'About collapsible exists'); } catch(e){} try { console.assert(document.querySelector('[data-testid="btn-continue"]'), 'Continue button exists'); } catch(e){} },[]);

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{ backgroundColor: COLORS.grayL }}>
      <style>{`.no-scrollbar{ -ms-overflow-style: none; scrollbar-width: none; } .no-scrollbar::-webkit-scrollbar{ display: none; }`}</style>

      {/* Header (sticky) */}
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder={t('configure')}
          language={lang}
          currency={currency}
          languageOptions={LANGS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={CURRENCIES.map(c => ({ value: c.code, label: c.label }))}
          onLanguageChange={setLang}
          onCurrencyChange={setCurrency}
          leadingSlot={(
            <Link
              to={ROUTES.productDetail}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white"
              aria-label="Back"
            >
              ◀
            </Link>
          )}
        />
      </header>

      {/* Gallery (sticky under header) */}
      <section data-sticky-gallery className="mx-auto max-w-sm px-0 pt-3 sticky z-30" style={{ top: '56px' }}>
        <Gallery images={gallery} />
      </section>

      {/* Product Title */}
      <section className="mx-auto max-w-sm px-4 pt-2"><h1 className="text-lg font-semibold">{car.name}</h1></section>

      {/* Overview metrics (Condition icon; Warranty removed here) */}
      <section className="mx-auto max-w-sm px-4 pt-2">
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex items-center justify-between text-sm"><span>⚡ {t('range')}</span><span className="font-semibold">{rangeKm} km</span></div>
          <div className="flex items-center justify-between text-sm"><span>⏱️ {t('zeroTo100')}</span><span className="font-semibold">{zeroTo100}s</span></div>
          <div className="flex items-center justify-between text-sm"><span>🏁 {t('topspeed')}</span><span className="font-semibold">{topSpeed} km/h</span></div>
          <div className="flex items-center justify-between text-sm"><span className="inline-flex items-center gap-1"><ConditionIcon/> {t('condition')}</span><span className="font-semibold">{car.condition === 'used' ? t('used') : t('new')}</span></div>
          <div className="mt-2 text-xs text-slate-500"><span className="mr-1">{t('shipFrom')}:</span><span>{car.shipFrom.flag} {car.shipFrom.code}</span></div>
        </div>
      </section>

      {/* Other Specs */}
      <section className="mx-auto max-w-sm px-4 pt-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3" data-testid="other-specs">
          <SpecRow label={t('year')} value={car.specs.year} />
          <CollapsibleRow data-testid="spec-battery" label={t('battery')} value={`${car.specs.batteryKWh} kWh`}>
            <SpecSub label={t('batteryChem')} value={car.specs.batteryChemistry} />
          </CollapsibleRow>
          <CollapsibleRow data-testid="spec-charging" label={t('charging')} value={car.specs.chargingStandards.join(' • ')}>
            <SpecSub label={t('ac')} value={car.specs.chargeTimes.ac_0_100} />
            <SpecSub label={t('dc')} value={car.specs.chargeTimes.dc_10_80} />
          </CollapsibleRow>
          <SpecRow label={t('torque')} value={`${car.specs.torqueNm} Nm`} />
          <SpecRow label={t('dimensions')} value={car.specs.dimensions} />
          <SpecRow label={t('weight')} value={`${car.specs.weightKg} kg`} />
          <SpecRow label={t('warranty')} value={car.specs.warranty} />
        </div>
      </section>

      {/* About vehicle */}
      <section className="mx-auto max-w-sm px-4 pt-3">
        <CollapsibleBlock title={t('about')}>
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{car.descriptionLong}</p>
        </CollapsibleBlock>
      </section>

      {/* Step chips */}
      <section className="mx-auto max-w-sm px-4 pt-3">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {['edition','paint','wheels','rimColor','steering','interior','packages'].map(key => (
            <span key={key} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs shadow-sm">{t(key)}</span>
          ))}
        </div>
      </section>

      {/* Edition */}
      <ConfiguratorSection title={t('edition')}>
        <div className="grid grid-cols-1 gap-2">
          {car.trims.map(tr => (
            <button key={tr.id} onClick={()=>setTrim(tr.id)} className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left ${trim===tr.id?'border-[#03cd8c] bg-[#03cd8c22]':'border-slate-200 bg-white'}`}>
              <div>
                <div className="text-sm font-semibold">{tr.name}</div>
                <div className="text-xs text-slate-500">{t('range')}: {tr.stats.range} km · {t('zeroTo100')}: {tr.stats.zeroTo100}s</div>
              </div>
              <div className="text-sm font-bold">{fmt(tr.baseUSD)}</div>
            </button>
          ))}
        </div>
      </ConfiguratorSection>

      {/* Paint */}
      <ConfiguratorSection title={t('paint')}>
        <div className="flex flex-wrap gap-2">
          {car.paints.map(p => (
            <button key={p.id} onClick={()=>setPaint(p.id)} aria-label={p.label}
              className={`h-8 w-8 rounded-full border ${paintId===p.id?'border-[#03cd8c]':'border-slate-300'}`} style={{ background:p.swatch }} title={`${p.label}${p.priceUSD>0?' (+'+fmt(p.priceUSD)+')':''}`} />
          ))}
        </div>
      </ConfiguratorSection>

      {/* Wheels */}
      <ConfiguratorSection title={t('wheels')}>
        <div className="grid grid-cols-1 gap-2">
          {car.wheelSizes.map(w => (
            <button key={w.id} onClick={()=>setWheelSize(w.id)} className={`flex items-center justify-between rounded-xl border px-3 py-2 ${wheelSize===w.id?'border-[#03cd8c] bg-[#03cd8c22]':'border-slate-200 bg-white'}`}>
              <div className="text-sm">{w.label}</div>
              <div className="text-xs font-medium">{w.priceUSD>0?`+${fmt(w.priceUSD)}`:'Included'}</div>
            </button>
          ))}
        </div>
      </ConfiguratorSection>

      {/* Rim color */}
      <ConfiguratorSection title={t('rimColor')}>
        <div className="flex flex-wrap gap-2">
          {car.rimColors.map(rc => (
            <button key={rc.id} onClick={()=>setRimColor(rc.id)} aria-label={rc.label}
              className={`h-7 w-7 rounded-full border ${rimColor===rc.id?'border-[#03cd8c]':'border-slate-300'}`} style={{ background:rc.swatch }} title={`${rc.label}${rc.priceUSD>0?' (+'+fmt(rc.priceUSD)+')':''}`} />
          ))}
        </div>
      </ConfiguratorSection>

      {/* Steering */}
      <ConfiguratorSection title={t('steering')}>
        <div className="grid grid-cols-2 gap-2">
          {car.steering.map(s => (
            <button key={s.id} onClick={()=>setSteer(s.id)} className={`rounded-xl border px-3 py-2 ${steer===s.id?'border-[#03cd8c] bg-[#03cd8c22]':'border-slate-200 bg-white'}`}>
              {s.id==='round'?t('round'):t('yoke')}
              <div className="text-xs text-slate-500">{s.priceUSD>0?`+${fmt(s.priceUSD)}`:'Included'}</div>
            </button>
          ))}
        </div>
      </ConfiguratorSection>

      {/* Interior */}
      <ConfiguratorSection title={t('interior')}>
        <div className="flex flex-wrap gap-2">
          {car.interiors.map(i => (
            <button key={i.id} onClick={()=>setInterior(i.id)} aria-label={i.label}
              className={`h-7 w-7 rounded-full border ${interior===i.id?'border-[#03cd8c]':'border-slate-300'}`} style={{ background:i.swatch }} title={`${i.label}${i.priceUSD>0?' (+'+fmt(i.priceUSD)+')':''}`} />
          ))}
        </div>
      </ConfiguratorSection>

      {/* Seating */}
      <ConfiguratorSection title={t('seats')}>
        <div className="grid grid-cols-2 gap-2">
          {car.seats.map(s => (
            <button key={s.id} onClick={()=>setSeat(s.id)} className={`rounded-xl border px-3 py-2 ${seat===s.id?'border-[#03cd8c] bg-[#03cd8c22]':'border-slate-200 bg-white'}`}>
              {s.id==='5'?t('fiveSeat'):t('sevenSeat')}
              <div className="text-xs text-slate-500">{s.priceUSD>0?`+${fmt(s.priceUSD)}`:'Included'}</div>
            </button>
          ))}
        </div>
      </ConfiguratorSection>

      {/* Packages */}
      <ConfiguratorSection title={t('packages')}>
        <div className="grid grid-cols-1 gap-2">
          {car.packages.map(p => { const on = pkg.has(p.id); return (
            <button key={p.id} onClick={()=>{ const n = new Set(pkg); on? n.delete(p.id): n.add(p.id); setPkg(n); }} className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left ${on?'border-[#03cd8c] bg-[#03cd8c22]':'border-slate-200 bg-white'}`}>
              <div className="text-sm">{p.label}</div>
              <div className="text-xs font-medium">{p.priceUSD>0?`+${fmt(p.priceUSD)}`:'Included'}</div>
            </button>
          ); })}
        </div>
      </ConfiguratorSection>

      {/* Spacer to avoid overlap with sticky bars */}
      <section aria-hidden className="h-72" />

      {/* Sticky financing summary */}
      <div data-testid="sticky-summary" className="fixed inset-x-0 bottom-14 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-sm px-4 py-3">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
            <span>{t('estDelivery')}: 4–8 weeks</span>
            <div className="inline-flex rounded-full border border-slate-200 bg-white p-0.5">
              {['cash','loan','lease'].map(m => (
                <button key={m} onClick={()=>setFinMode(m)} className={`px-2 py-0.5 text-[11px] rounded-full ${finMode===m?'text-white':''}`} style={{ background: finMode===m ? COLORS.brand : 'transparent' }}>{t(m)}</button>
              ))}
            </div>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div data-testid="qty-stepper" className="inline-flex items-center gap-2">
              <span className="text-xs text-slate-600">{t('qty')}</span>
              <button aria-label="decrease" onClick={decQty} className="rounded border px-2">−</button>
              <span className="w-6 text-center text-sm font-semibold">{qty}</span>
              <button aria-label="increase" onClick={incQty} className="rounded border px-2">+</button>
            </div>
            <button data-testid="btn-share" onClick={handleShare} className="inline-flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs"><ShareIcon /> {t('share')}</button>
          </div>
          {finMode==='cash' && (<div className="flex items-baseline justify-between"><div className="text-[12px] text-slate-500">{t('purchase')}</div><div className="text-xl font-bold" data-testid="total-price" data-totalprice={totalPriceUSD}>{fmt(totalPriceUSD)}</div></div>)}
          {finMode==='loan' && (
            <div className="space-y-2">
              <Row label={`${t('downPayment')}: ${loanDPct}%`}><input aria-label="down" type="range" min="0" max="50" value={loanDPct} onChange={e=>setLoanDPct(Number(e.target.value))} /></Row>
              <Row label={`${t('apr')}: ${loanAPR}%`}><input aria-label="apr" type="range" min="0" max="15" step="0.01" value={loanAPR} onChange={e=>setLoanAPR(Number(e.target.value))} /></Row>
              <Row label={`${t('term')}: ${loanTerm} ${t('months')}`}><input aria-label="term" type="range" min="24" max="84" step="12" value={loanTerm} onChange={e=>setLoanTerm(Number(e.target.value))} /></Row>
              <div className="flex items-baseline justify-between"><div className="text-[12px] text-slate-500">{t('purchase')}</div><div className="text-sm font-semibold">{fmt(totalPriceUSD)}</div></div>
              <div className="flex items-baseline justify-between"><div className="text-[12px] text-slate-500">{t('downPayment')}</div><div className="text-sm font-semibold">{fmt(loanDown)}</div></div>
              <div className="flex items-baseline justify-between"><div className="text-[12px] text-slate-500">{t('perMonth')}</div><div className="text-xl font-bold">{fmt(loanMonthly)}</div></div>
              <div className="text-[10px] text-slate-500">{t('taxesFees')}</div>
              <div className="border-t border-slate-200 pt-2" data-testid="preapprove-inline">
                <div className="text-[12px] font-semibold">{t('preTitle')}</div>
                <div className="mt-1 grid grid-cols-2 gap-2 text-[11px]">
                  <input aria-label="name" value={pre.name} onChange={e=>setPre({...pre,name:e.target.value})} placeholder={t('fullName')} className="rounded border px-2 py-1" />
                  <input aria-label="phone" value={pre.phone} onChange={e=>setPre({...pre,phone:e.target.value})} placeholder={t('phone')} className="rounded border px-2 py-1" />
                  <input aria-label="email" value={pre.email} onChange={e=>setPre({...pre,email:e.target.value})} placeholder={t('email')} className="rounded border px-2 py-1" />
                  <input aria-label="income" value={pre.income} onChange={e=>setPre({...pre,income:e.target.value})} placeholder={t('income')} className="rounded border px-2 py-1" />
                </div>
                <div className="mt-1 flex justify-end">
                  <button onClick={()=>alert(t('handoff'))} className="rounded px-2 py-1 text-white" style={{background: COLORS.brand}}>{t('submit')}</button>
                </div>
              </div>
            </div>
          )}
          {finMode==='lease' && (
            <div className="space-y-2">
              <Row label={`${t('downPayment')}: ${leaseDPct}%`}><input aria-label="lease down" type="range" min="0" max="50" value={leaseDPct} onChange={e=>setLeaseDPct(Number(e.target.value))} /></Row>
              <Row label={`${t('term')}: ${leaseTerm} ${t('months')}`}><input aria-label="lease term" type="range" min="24" max="48" step="12" value={leaseTerm} onChange={e=>setLeaseTerm(Number(e.target.value))} /></Row>
              <Row label={`Residual: ${leaseResidualPct}%`}><input aria-label="resid" type="range" min="40" max="65" step="1" value={leaseResidualPct} onChange={e=>setLeaseResidualPct(Number(e.target.value))} /></Row>
              <Row label={`MF: ${leaseMF}`}><input aria-label="mf" type="range" min="0.0001" max="0.004" step="0.0001" value={leaseMF} onChange={e=>setLeaseMF(Number(e.target.value))} /></Row>
              <div className="flex items-baseline justify-between"><div className="text-[12px] text-slate-500">{t('perMonth')}</div><div className="text-xl font-bold">{fmt(leaseMonthly)}</div></div>
              <div className="text-[10px] text-slate-500">{t('taxesFees')}</div>
              <div className="border-t border-slate-200 pt-2" data-testid="preapprove-inline-lease">
                <div className="text-[12px] font-semibold">{t('preTitle')}</div>
                <div className="mt-1 grid grid-cols-2 gap-2 text-[11px]">
                  <input aria-label="name" value={pre.name} onChange={e=>setPre({...pre,name:e.target.value})} placeholder={t('fullName')} className="rounded border px-2 py-1" />
                  <input aria-label="phone" value={pre.phone} onChange={e=>setPre({...pre,phone:e.target.value})} placeholder={t('phone')} className="rounded border px-2 py-1" />
                  <input aria-label="email" value={pre.email} onChange={e=>setPre({...pre,email:e.target.value})} placeholder={t('email')} className="rounded border px-2 py-1" />
                  <input aria-label="income" value={pre.income} onChange={e=>setPre({...pre,income:e.target.value})} placeholder={t('income')} className="rounded border px-2 py-1" />
                </div>
                <div className="mt-1 flex justify-end">
                  <button onClick={()=>alert(t('handoff'))} className="rounded px-2 py-1 text-white" style={{background: COLORS.brand}}>{t('submit')}</button>
                </div>
              </div>
            </div>
          )}
          <div className="mt-3 flex gap-2"><button data-testid="btn-continue" className="flex-1 rounded-xl px-3 py-2 text-white" style={{ background: COLORS.accent }}>{t('continue')}</button><button className="rounded-xl border border-slate-200 px-3 py-2 text-sm">reserve · {t('deposit')}: {fmt(250)}</button></div>
        </div>        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
      {/* Footer nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
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

// ===== Small UI helpers =====
function ConfiguratorSection({ title, children }){ return (<section className="mx-auto max-w-sm px-4 pt-3"><h3 className="mb-2 text-sm font-semibold">{title}</h3>{children}</section>); }
function Row({ label, children }){ return (<div className="flex items-center justify-between text-xs text-slate-600"><span>{label}</span><span className="ml-3 inline-flex items-center gap-2">{children}</span></div>); }
function SpecRow({ label, value }){ return (<div className="flex items-center justify-between border-b border-slate-100 py-2 text-sm"><span className="text-slate-500">{label}</span><span className="font-medium">{value}</span></div>); }
function SpecSub({ label, value }){ return (<div className="ml-3 flex items-center justify-between py-1 text-sm"><span className="text-slate-500">{label}</span><span className="font-medium">{value}</span></div>); }
function CollapsibleRow(props){ const { label, value, children } = props; const [open, setOpen] = useState(false); return (<div className="border-b border-slate-100 py-2 text-sm" {...(props['data-testid']?{'data-testid':props['data-testid']}:{})}><button className="flex w-full items-center justify-between text-left" onClick={()=>setOpen(!open)} aria-expanded={open}><span className="text-slate-500">{label}</span><span className="font-medium">{value} <span className="ml-1 text-slate-400">{open?'▾':'▸'}</span></span></button>{open && (<div className="mt-1">{children}</div>)}</div>); }
function CollapsibleBlock({ title, children }){ const [open, setOpen] = useState(false); return (<div className="rounded-xl border border-slate-200 bg-white p-3" data-testid="about-collapsible"><button className="flex w-full items-center justify-between text-left" onClick={()=>setOpen(o=>!o)} aria-expanded={open}><span className="text-sm font-semibold">{title}</span><span className="text-slate-400">{open?'▾':'▸'}</span></button>{open && <div className="mt-2">{children}</div>}</div>); }
function ShareIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>); }
function ConditionIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"/><path d="M9 12l2 2 4-4"/></svg>); }
function ShieldIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"/></svg>); }
function Gallery({ images }){ const [idx, setIdx] = useState(0); const [open, setOpen] = useState(false); const safeImages = Array.isArray(images) ? images : []; const current = safeImages[idx] || safeImages[0]; return (<><div data-testid="cfg-gallery" className="relative w-full"><img src={current} alt="" className="h-auto w-full rounded-xl object-cover" style={{ aspectRatio:'16/9' }} onClick={()=>setOpen(true)} /><div className="mt-2 grid grid-cols-5 gap-2">{safeImages.slice(0,10).map((src,i)=> (<button key={src+i} data-testid="cfg-thumb" onClick={()=>setIdx(i)} className={`overflow-hidden rounded-md border ${i===idx?'border-[#03cd8c]':'border-slate-200'}`}><img src={src} alt="" className="h-12 w-full object-cover" /></button>))}</div></div>{open && (<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/80"><button aria-label="Close" className="absolute right-4 top-4 rounded bg-white/10 px-3 py-1 text-white" onClick={()=>setOpen(false)}>✕</button><div className="w-full max-w-sm px-4"><img src={current} alt="" className="h-auto w-full rounded-md object-contain" /><div className="mt-2 flex items-center justify-between"><button onClick={()=>setIdx((idx-1+safeImages.length)%safeImages.length)} className="rounded bg-white/10 px-3 py-2 text-white">‹</button><div className="flex gap-1">{safeImages.slice(0,8).map((_,i)=> (<span key={i} className={`h-1.5 w-1.5 rounded-full ${i===idx?'bg-white':'bg-white/40'}`} />))}</div><button onClick={()=>setIdx((idx+1)%safeImages.length)} className="rounded bg-white/10 px-3 py-2 text-white">›</button></div></div></div>)}</>); }

// ===== Footer Nav helpers & icons =====
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
