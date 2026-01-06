// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { LANGUAGE_OPTIONS, CURRENCY_OPTIONS } from '../constants/localeOptions';

export default function EVmartConfiguratorV12(){
  const navigate = useNavigate();
  const COLORS = { brand:'#03cd8c', brandDark:'#0a7c7a', accent:'#f77f00', grayL:'#f2f2f2' };
  const t=(k)=>k; // trim for brevity; reuse text from V1 canvas in app

  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');

  // minimal config mock
  const priceUSD = 49990; const [qty,setQty]=useState(1); const total=priceUSD*qty;
  const [finMode,setFinMode]=useState<'cash'|'loan'|'lease'>('cash');
  const [loanAPR,setLoanAPR]=useState(7.49), [loanTerm,setLoanTerm]=useState(72), [loanDPct,setLoanDPct]=useState(10);
  const loanDown = total*(loanDPct/100); const r=(loanAPR/100)/12; const monthly = finMode==='loan'? ( (total-loanDown)*r*Math.pow(1+r,loanTerm) ) / (Math.pow(1+r,loanTerm)-1) : 0;
  const [pre,setPre]=useState({ name:'', email:'', phone:'', income:'', down:'5000' });

  function lenderHandoff(){
    const params = new URLSearchParams({ name:pre.name||'', email:pre.email||'', phone:pre.phone||'', income:pre.income||'', down:pre.down||'', amount:String(total) });
    try{ sessionStorage.setItem('ev_finance_preapproval', params.toString()); }catch{}
    navigate(`${ROUTES.checkout}?pre-approval=1`);
  }

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{background:COLORS.grayL}}>
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder="Car Configurator — V1.2"
          language={lang}
          currency={currency}
          onLanguageChange={setLang}
          onCurrencyChange={setCurrency}
          languageOptions={LANGUAGE_OPTIONS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={CURRENCY_OPTIONS.map(c => ({ value: c.code, label: c.label }))}
        />
      </header>

      <main className="mx-auto max-w-sm px-4 pt-3 pb-28 space-y-3">
        <section className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
          <div className="flex items-center justify-between"><span>Price</span><span className="font-bold">${(priceUSD).toLocaleString()}</span></div>
          <div className="mt-2 inline-flex items-center gap-2 text-xs"><span>QTY</span><button onClick={()=>setQty(q=>Math.max(1,q-1))} className="rounded border px-2">-</button><span className="w-6 text-center">{qty}</span><button onClick={()=>setQty(q=>q+1)} className="rounded border px-2">+</button></div>
        </section>

        {/* Sticky finance bar (simplified) */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-sm px-4 py-3">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
              <span>Estimated delivery: 4–8 weeks</span>
              <div className="inline-flex rounded-full border border-slate-200 bg-white p-0.5">
                {(['cash','loan','lease'] as const).map(m=> (
                  <button key={m} onClick={()=>setFinMode(m)} className={`px-2 py-0.5 text-[11px] rounded-full ${finMode===m?'text-white':''}`} style={{background: finMode===m? COLORS.brand : 'transparent'}}>{m}</button>
                ))}
              </div>
            </div>

            {finMode==='cash' && (
              <div className="flex items-center justify-between"><span className="text-xs text-slate-500">Purchase</span><span className="text-xl font-bold">${(total).toLocaleString()}</span></div>
            )}

            {finMode==='loan' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs"><span>Down: {loanDPct}%</span><input type="range" min={0} max={50} value={loanDPct} onChange={e=>setLoanDPct(Number(e.target.value))}/></div>
                <div className="flex items-center justify-between text-xs"><span>APR: {loanAPR}%</span><input type="range" min={0} max={15} step={0.01} value={loanAPR} onChange={e=>setLoanAPR(Number(e.target.value))}/></div>
                <div className="flex items-center justify-between text-xs"><span>Term: {loanTerm} mo</span><input type="range" min={24} max={84} step={12} value={loanTerm} onChange={e=>setLoanTerm(Number(e.target.value))}/></div>
                <div className="flex items-center justify-between"><span className="text-[12px] text-slate-500">/mo</span><span className="text-xl font-bold">${Math.round(monthly).toLocaleString()}</span></div>
                {/* Inline Pre-Approval form */}
                <div className="border-t border-slate-200 pt-2">
                  <div className="text-[12px] font-semibold">Finance/Lease Pre‑Approval</div>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-[11px]">
                    <input placeholder="Full name" value={pre.name} onChange={e=>setPre({...pre,name:e.target.value})} className="rounded border px-2 py-1"/>
                    <input placeholder="Phone" value={pre.phone} onChange={e=>setPre({...pre,phone:e.target.value})} className="rounded border px-2 py-1"/>
                    <input placeholder="Email" value={pre.email} onChange={e=>setPre({...pre,email:e.target.value})} className="rounded border px-2 py-1"/>
                    <input placeholder="Monthly income" value={pre.income} onChange={e=>setPre({...pre,income:e.target.value})} className="rounded border px-2 py-1"/>
                  </div>
                  <div className="mt-1 flex justify-end"><button onClick={lenderHandoff} className="rounded px-2 py-1 text-white" style={{background:COLORS.brand}}>Submit</button></div>
                </div>
              </div>
            )}

            {finMode==='lease' && (
              <div className="space-y-2">
                {/* Keep form same as loan for demo */}
                <div className="text-xs text-slate-600">Lease calculator omitted for brevity.</div>
                <div className="border-t border-slate-200 pt-2">
                  <div className="text-[12px] font-semibold">Finance/Lease Pre‑Approval</div>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-[11px]">
                    <input placeholder="Full name" value={pre.name} onChange={e=>setPre({...pre,name:e.target.value})} className="rounded border px-2 py-1"/>
                    <input placeholder="Phone" value={pre.phone} onChange={e=>setPre({...pre,phone:e.target.value})} className="rounded border px-2 py-1"/>
                    <input placeholder="Email" value={pre.email} onChange={e=>setPre({...pre,email:e.target.value})} className="rounded border px-2 py-1"/>
                    <input placeholder="Monthly income" value={pre.income} onChange={e=>setPre({...pre,income:e.target.value})} className="rounded border px-2 py-1"/>
                  </div>
                  <div className="mt-1 flex justify-end"><button onClick={lenderHandoff} className="rounded px-2 py-1 text-white" style={{background:COLORS.brand}}>Submit</button></div>
                </div>
              </div>
            )}
          </div>
          <div className="h-[env(safe-area-inset-bottom)]"/>
        </div>
      </main>
    </div>
  );
}
