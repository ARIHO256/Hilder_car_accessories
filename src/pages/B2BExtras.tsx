// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';

export default function EVmartB2BExtras(){
  // ===== EVzone Colors =====
  const COLORS = { brand:'#03cd8c', brandDark:'#0a7c7a', accent:'#f77f00', grayL:'#f5f7fa' };

  // ===== Languages (15) =====
  const LANGS = [
    { code:'en', label:'English', locale:'en-US' }, { code:'fr', label:'Français', locale:'fr-FR' }, { code:'ar', label:'العربية', locale:'ar-EG' },
    { code:'es', label:'Español', locale:'es-ES' }, { code:'zh', label:'中文', locale:'zh-CN' }, { code:'de', label:'Deutsch', locale:'de-DE' },
    { code:'pt', label:'Português', locale:'pt-PT' }, { code:'hi', label:'हिन्दी', locale:'hi-IN' }, { code:'no', label:'Norsk', locale:'nb-NO' },
    { code:'nl', label:'Nederlands', locale:'nl-NL' }, { code:'da', label:'Dansk', locale:'da-DK' }, { code:'sv', label:'Svenska', locale:'sv-SE' },
    { code:'ja', label:'日本語', locale:'ja-JP' }, { code:'ko', label:'한국어', locale:'ko-KR' }, { code:'tr', label:'Türkçe', locale:'tr-TR' }
  ];
  const CURRENCIES = [
    { code:'USD', label:'USD $' }, { code:'EUR', label:'EUR €' }, { code:'GBP', label:'GBP £' }, { code:'CNY', label:'CNY ¥' }, { code:'JPY', label:'JPY ¥' },
    { code:'KRW', label:'KRW ₩' }, { code:'INR', label:'INR ₹' }, { code:'AED', label:'AED د.إ' }, { code:'SAR', label:'SAR ر.س' }, { code:'NGN', label:'NGN ₦' },
    { code:'KES', label:'KES KSh' }, { code:'UGX', label:'UGX USh' }, { code:'ZAR', label:'ZAR R' }, { code:'TRY', label:'TRY ₺' }, { code:'BRL', label:'BRL R$' }
  ];
  const FX:Record<string,number> = { USD:1, EUR:0.93, GBP:0.79, CNY:7.2, JPY:158, KRW:1380, INR:83, AED:3.67, SAR:3.75, NGN:1500, KES:128, UGX:3800, ZAR:18, TRY:33, BRL:5.2 };

  // ===== i18n (subset) =====
  const DICT:Record<string,Record<string,string>> = {
    en: {
      b2b:'B2B Extras', rfq:'RFQ', messages:'Chat', audio:'Audio', live:'Live Chat', schedule:'Schedule', meetingAt:'Meeting time',
      proforma:'Pro‑forma', company:'Company', shipping:'Shipping',
      search:'Search', language:'Language', currency:'Currency',
      // RFQ
      rfqTitle:'Request a Quote', companyName:'Company name', contact:'Contact', email:'Email', phone:'Phone', incoterm:'Incoterm', leadTime:'Desired lead time', validity:'Quote validity (days)', destination:'Destination', attachments:'Attachments', addLine:'Add line', submitRFQ:'Submit RFQ',
      product:'Product', specs:'Specs', qty:'Qty', target:'/target', notes:'Notes', remove:'Remove', exw:'EXW', fob:'FOB', cif:'CIF', ddu:'DDU',
      // Chat
      chatTitle:'Buyer–Seller Chat', typeMessage:'Type a message…', attach:'Attach', send:'Send', priceReq:'Request better price', changeMOQ:'Change MOQ', whatsapp:'WhatsApp', wechat:'WeChat', openWhatsApp:'Open WhatsApp', openWeChat:'Open WeChat',
      // Proforma
      proTitle:'Pro‑forma Invoice', seller:'Seller', buyer:'Buyer', items:'Items', unitPrice:'Unit price', subtotal:'Subtotal', freight:'Freight', tax:'Tax', total:'Total', approvePay:'Approve & Pay', download:'Render PDF', deposit:'Deposit %', dueNow:'Due now', balance:'Balance',
      // Company
      profile:'Company Profile', regNo:'Registration No.', vat:'VAT/GST', taxExempt:'Tax Exemption', status:'Status', pending:'Pending', approved:'Approved', rejected:'Rejected', certificates:'Certificates', addCert:'Add certificate', save:'Save', docType:'Document type', expiry:'Expiry', delete:'Delete',
      // Shipping
      bulkTitle:'Bulk Shipping & Lead Time', packType:'Packaging', cartons:'Cartons', pallets:'Pallets', crates:'Crates', unitsPer:'Units per carton', weightKg:'Weight (kg)', dims:'Dimensions (cm)', length:'L', width:'W', height:'H',
      splitShip:'Allow split shipments', splits:'Splits', splitPlan:'Split plan', leadWeeks:'Weeks',
      origin:'Origin warehouses', add:'Add', orderQty:'Order quantity', suggested:'Suggested packs', carrierSim:'Carrier simulator', carrier:'Carrier', rate:'Rate'
    }
  };

  // ===== Localized helpers =====
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const t = (k:string)=> (DICT[lang]?.[k]) ?? DICT.en[k] ?? k;
  const fmt = (usd:number)=> new Intl.NumberFormat((LANGS.find(l=>l.code===lang)||{}).locale||'en-US', { style:'currency', currency }).format(usd * (FX[currency]||1));

  // ===== View State =====
  const [tab, setTab] = useState<'rfq'|'messages'|'proforma'|'company'|'shipping'>('rfq');

  // ===== RFQ State =====
  type Break = { id:string; min:number; unitUSD:number };
  type RFQLine = { id:string; product:string; specs:string; qty:number; targetUSD?:number; notes?:string; breaks:Break[] };
  const [rfq, setRfq] = useState({ company:'EVmart Ltd', contact:'Jane Doe', email:'buyer@evmart.com', phone:'+256 700 123456', incoterm:'FOB', lead:'4-6 weeks', validity:30, dest:'UG' });
  const [rfqLines, setRfqLines] = useState<RFQLine[]>([
    { id:'r1', product:'Wallbox 11kW', specs:'Type 2 • Wi‑Fi', qty:50, targetUSD:520, breaks:[{id:'b1',min:50,unitUSD:520},{id:'b2',min:100,unitUSD:500}], notes:'' },
    { id:'r2', product:'DC Fast 60kW', specs:'CCS • Outdoor', qty:5, breaks:[{id:'b3',min:5,unitUSD:13500}], notes:'' }
  ]);
  const addRfqLine = ()=> setRfqLines(prev=> [{ id:'r'+(prev.length+1), product:'', specs:'', qty:1, targetUSD:0, notes:'', breaks:[] }, ...prev]);
  const removeRfqLine = (id:string)=> setRfqLines(prev=> prev.filter(l=>l.id!==id));
  const addBreak = (lineId:string)=> setRfqLines(prev=> prev.map(l=> l.id===lineId? {...l, breaks:[...l.breaks, { id:'b'+(l.breaks.length+1), min:1, unitUSD:0 }]}:l));
  const updateBreak = (lineId:string, bid:string, patch:any)=> setRfqLines(prev=> prev.map(l=> l.id===lineId? {...l, breaks:l.breaks.map(b=> b.id===bid? {...b, ...patch}:b)}:l));
  const removeBreak = (lineId:string, bid:string)=> setRfqLines(prev=> prev.map(l=> l.id===lineId? {...l, breaks:l.breaks.filter(b=> b.id!==bid)}:l));
  const [rfqFiles, setRfqFiles] = useState<string[]>([]);

  // ===== Chat State =====
  type Msg = { id:string; from:'buyer'|'seller'; text:string; ts:string; attach?:string; read?:boolean };
  const [msgs, setMsgs] = useState<Msg[]>([
    { id:'m1', from:'buyer', text:'Hello, can you quote pallet pricing for 50 units 11kW wallboxes?', ts:'10:10', read:true },
    { id:'m2', from:'seller', text:'Sure, what lead time works? 4–6 weeks?', ts:'10:12' }
  ]);
  const [draft, setDraft] = useState('');
  const [upFiles, setUpFiles] = useState<string[]>([]);
  const [audioFiles, setAudioFiles] = useState<string[]>([]);
  const [sellerTyping, setSellerTyping] = useState(false);
  const [chatMode, setChatMode] = useState<'whatsapp'|'wechat'|'messages'|'audio'|'live'|'schedule'>('messages');
  const sendMsgWithMeta = (text:string)=>{
    if(!text.trim() && upFiles.length===0) return;
    const attach = upFiles[0];
    setMsgs(prev=> [...prev, { id:'m'+(prev.length+1), from:'buyer', text: text || (attach? 'Attachment sent':''), ts:new Date().toLocaleTimeString().slice(0,5), attach, read:false }]);
    setDraft(''); setUpFiles([]); setSellerTyping(true);
    setTimeout(()=>{
      setMsgs(prev=> {
        const next = [...prev, { id:'m'+(prev.length+1), from:'seller', text:'Noted. We will revert.', ts:new Date().toLocaleTimeString().slice(0,5), read:true }];
        for(let i=next.length-1;i>=0;i--){ if(next[i].from==='buyer'){ next[i] = {...next[i], read:true}; break; } }
        return next;
      });
      setSellerTyping(false);
    }, 1200);
  };

  // ===== Pro‑forma State =====
  type PIItem = { id:string; name:string; qty:number; unitUSD:number };
  const [pi, setPI] = useState({ seller:'EV Supplier Co.', buyer:'EVmart Ltd', incoterm:'FOB', depositPct:30, items:[
    { id:'p1', name:'Wallbox 11kW', qty:50, unitUSD:515 },
    { id:'p2', name:'DC Fast 60kW', qty:5, unitUSD:13500 }
  ] as PIItem[], freightUSD:2800, taxRate:0.0 });
  const piSubtotal = useMemo(()=> pi.items.reduce((s,it)=> s + it.qty*it.unitUSD, 0), [pi.items]);
  const piInsurance = useMemo(()=> pi.incoterm==='CIF'? Math.round(piSubtotal*0.01): 0, [piSubtotal, pi.incoterm]);
  const piTax = useMemo(()=> Math.max(0, piSubtotal* (pi.taxRate||0)), [piSubtotal, pi.taxRate]);
  const piTotal = useMemo(()=> piSubtotal + (pi.freightUSD||0) + piInsurance + piTax, [piSubtotal, pi.freightUSD, piInsurance, piTax]);
  const piDueNow = useMemo(()=> Math.round((pi.depositPct/100)*piTotal), [pi.depositPct, piTotal]);
  const piBalance = useMemo(()=> Math.max(0, piTotal - piDueNow), [piTotal, piDueNow]);

  // ===== Company State =====
  type Cert = { id:string; name:string; type:string; expiry:string };
  const [company, setCompany] = useState({ name:'EVmart Ltd', regNo:'12345678', vat:'UG123456', exempt:false, status:'pending' as 'pending'|'approved'|'rejected', certs:[{ id:'c1', name:'Certificate.pdf', type:'COI', expiry:'2026-12-31' }] });
  const addCert = ()=> setCompany(c=> ({...c, certs:[...c.certs, { id:'c'+(c.certs.length+1), name:'NewCert.pdf', type:'COI', expiry:'2026-12-31' }]}));

  // ===== Shipping (Bulk) State =====
  const [pack, setPack] = useState<'carton'|'pallet'|'crate'>('carton');
  const [unitsPer, setUnitsPer] = useState(10);
  const [weight, setWeight] = useState(18);
  const [dims, setDims] = useState({ l:60, w:40, h:35 });
  const [split, setSplit] = useState(false);
  const [splits, setSplits] = useState([{ id:1, weeks:2, pct:50 }, { id:2, weeks:4, pct:50 }]);
  const [origins, setOrigins] = useState<string[]>(['CN','DE']);
  const [orderQty, setOrderQty] = useState(50);
  const maxPerPallet = 48;
  const suggestedPacks = useMemo(()=> pack==='pallet' ? Math.ceil(orderQty / maxPerPallet) : Math.ceil(orderQty / Math.max(1, unitsPer)), [pack, orderQty, unitsPer]);
  const carriers = [{code:'DHL', base:6.5},{code:'UPS', base:6.2},{code:'FedEx', base:6.7}];
  const volumetricKg = useMemo(()=> (dims.l*dims.w*dims.h)/5000, [dims]);
  const carrierRate = useMemo(()=> (
    carriers.map(c=> ({ code:c.code, rate: Math.round((c.base * Math.max(weight, volumetricKg) + origins.length*12) * 100)/100 }))
  ), [weight, volumetricKg, origins]);

  // ===== UI tests =====
  useEffect(()=>{
    try { console.assert(document.querySelector('header.sticky'), 'Header exists'); } catch{}
    try { console.assert(typeof CalendarIcon === 'function', 'CalendarIcon exists'); } catch{}
  },[]);

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{ backgroundColor: COLORS.grayL }}>
      <style>{`.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
      {/* Header */}
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder={t('search')}
          language={lang}
          currency={currency}
          languageOptions={LANGS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={CURRENCIES.map(c => ({ value: c.code, label: c.label }))}
          onLanguageChange={setLang}
          onCurrencyChange={setCurrency}
        />
      </header>

      {/* Tabs */}
      <section className="mx-auto max-w-sm px-4 pt-3">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto pb-1">
          {(['rfq','messages','proforma','company','shipping'] as const).map(k=> (
            <button key={k} onClick={()=>setTab(k)} className={`rounded-full border px-3 py-1 text-sm ${tab===k? 'border-[#03cd8c] bg-[#03cd8c22]':'border-[#f77f00] text-[#f77f00] bg-white'}`}>{t(k)}</button>
          ))}
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-sm px-4 pt-2 pb-28">
        {tab==='rfq' && (
          <Card title={t('rfqTitle')}>
            <div className="grid gap-2">
              <Input label={t('companyName')} value={rfq.company} onChange={v=>setRfq({...rfq, company:v})} />
              <div className="grid grid-cols-2 gap-2">
                <Input label={t('contact')} value={rfq.contact} onChange={v=>setRfq({...rfq, contact:v})} />
                <Input label={t('phone')} value={rfq.phone} onChange={v=>setRfq({...rfq, phone:v})} />
              </div>
              <Input label={t('email')} value={rfq.email} onChange={v=>setRfq({...rfq, email:v})} />
              <div className="grid grid-cols-2 gap-2">
                <label className="block text-xs text-slate-500">{t('incoterm')}
                  <select value={rfq.incoterm} onChange={e=>setRfq({...rfq, incoterm:e.target.value})} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1">
                    {['EXW','FOB','CIF','DDU'].map(i=> <option key={i} value={i}>{i}</option>)}
                  </select>
                </label>
                <Input label={t('leadTime')} value={rfq.lead} onChange={v=>setRfq({...rfq, lead:v})} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input label={t('destination')} value={rfq.dest} onChange={v=>setRfq({...rfq, dest:v})} />
                <label className="block text-xs text-slate-500">{t('validity')}
                  <input type="number" value={rfq.validity} onChange={e=>setRfq({...rfq, validity:Number(e.target.value)||0})} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1"/>
                </label>
              </div>
            </div>

            {/* Lines */}
            <div className="mt-3">
              <div className="mb-1 text-xs font-semibold text-slate-600">Lines</div>
              <div className="space-y-2">
                {rfqLines.map(l=> (
                  <div key={l.id} className="rounded-lg border border-slate-200 bg-white p-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <Input label={t('product')} value={l.product} onChange={v=>setRfqLines(prev=> prev.map(x=> x.id===l.id? {...x, product:v}:x))} />
                      <Input label={t('specs')} value={l.specs} onChange={v=>setRfqLines(prev=> prev.map(x=> x.id===l.id? {...x, specs:v}:x))} />
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <label className="block text-xs text-slate-500">{t('qty')}
                        <input type="number" min={1} value={l.qty} onChange={e=>setRfqLines(prev=> prev.map(x=> x.id===l.id? {...x, qty:Math.max(1, Number(e.target.value)||1)}:x))} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1"/>
                      </label>
                      <label className="block text-xs text-slate-500">{t('unitPrice')} {t('target')}
                        <input type="number" min={0} value={l.targetUSD||''} onChange={e=>setRfqLines(prev=> prev.map(x=> x.id===l.id? {...x, targetUSD:Number(e.target.value)}:x))} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1"/>
                      </label>
                      <Input label={t('notes')} value={l.notes||''} onChange={v=>setRfqLines(prev=> prev.map(x=> x.id===l.id? {...x, notes:v}:x))} />
                    </div>

                    {/* Tiered breaks */}
                    <div className="mt-2">
                      <div className="mb-1 text-slate-600">Tiered breaks</div>
                      <div className="space-y-1">
                        {l.breaks.map(b=> (
                          <div key={b.id} className="grid grid-cols-2 gap-2">
                            <label className="text-xs">Min <input type="number" value={b.min} onChange={e=>updateBreak(l.id,b.id,{min:Number(e.target.value)||0})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
                            <label className="text-xs">USD <input type="number" value={b.unitUSD} onChange={e=>updateBreak(l.id,b.id,{unitUSD:Number(e.target.value)||0})} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/></label>
                          </div>
                        ))}
                        <button onClick={()=>addBreak(l.id)} className="mt-1 rounded border px-2 py-1 border-[#f77f00] text-[#f77f00]">+ Break</button>
                        {l.breaks.length>0 && <button onClick={()=>removeBreak(l.id, l.breaks[l.breaks.length-1].id)} className="ml-2 rounded border px-2 py-1">{t('remove')}</button>}
                      </div>
                    </div>

                    <div className="mt-2 flex justify-end"><button onClick={()=>removeRfqLine(l.id)} className="rounded border px-2 py-1">{t('remove')}</button></div>
                  </div>
                ))}
              </div>
              <div className="mt-2"><button onClick={addRfqLine} className="rounded border px-3 py-2 text-sm border-[#f77f00] text-[#f77f00]">+ {t('addLine')}</button></div>
            </div>

            {/* Attachments drag & drop */}
            <div className="mt-3">
              <div className="mb-1 text-xs font-semibold text-slate-600">{t('attachments')}</div>
              <div onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>{ e.preventDefault(); const files=Array.from(e.dataTransfer.files||[]).map(f=>f.name); setRfqFiles(prev=>[...prev, ...files]); }} className="grid place-items-center rounded-lg border border-dashed border-slate-300 p-6 text-xs text-slate-500">Drag & drop files here</div>
              {rfqFiles.length>0 && (
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  {rfqFiles.map((f,i)=> (<span key={i} className="rounded border px-2 py-1">{f}</span>))}
                  <button onClick={()=>setRfqFiles([])} className="text-xs underline">Clear</button>
                </div>
              )}
            </div>

            <div className="mt-3 flex justify-end"><button onClick={()=> alert('RFQ submitted (mock)')} className="rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.accent }}>{t('submitRFQ')}</button></div>
          </Card>
        )}

        {tab==='messages' && (
          <Card title={t('chatTitle')}>
            {/* Chat modes */}
            <div className="mb-2 flex flex-wrap gap-2 text-xs">
              {(['whatsapp','wechat','messages','audio','live','schedule'] as const).map(m => (
                <button key={m} onClick={()=>setChatMode(m)} className={`rounded-full border px-3 py-1 ${chatMode===m? 'border-[#03cd8c] bg-[#03cd8c22]':'border-[#f77f00] text-[#f77f00]'}`}>
                  <span className="inline-flex items-center gap-1"><ModeIcon mode={m}/> {t(m) || m}</span>
                </button>
              ))}
            </div>

            {chatMode==='whatsapp' && (
              <div className="text-sm">
                <div className="mb-2">Connect via WhatsApp to continue negotiation (mock).</div>
                <button onClick={()=>alert('Opening WhatsApp (mock)')} className="rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.accent }}>{t('openWhatsApp')}</button>
              </div>
            )}
            {chatMode==='wechat' && (
              <div className="text-sm">
                <div className="mb-2">Connect via WeChat to continue negotiation (mock).</div>
                <button onClick={()=>alert('Opening WeChat (mock)')} className="rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.accent }}>{t('openWeChat')}</button>
              </div>
            )}

            {chatMode==='messages' && (
              <>
                <div className="space-y-2">
                  {msgs.map(m=> (
                    <div key={m.id} className={`flex ${m.from==='buyer'? 'justify-end':'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.from==='buyer'? 'bg-[#03cd8c] text-white':'bg-white border border-slate-200'}`}>
                        {m.text}
                        {!!m.attach && (
                          <div className="mt-1 text-[11px]">
                            <button type="button" onClick={(e)=>e.preventDefault()} className="underline">
                              {m.attach}
                            </button>
                          </div>
                        )}
                        <div className={`mt-1 text-[10px] flex items-center gap-1 ${m.from==='buyer'? 'text-white/80':'text-slate-500'}`}>
                          {m.ts} {m.from==='buyer' && m.read? <span>✓✓</span> : null}
                        </div>
                      </div>
                    </div>
                  ))}
                  {sellerTyping && (<div className="text-[11px] text-slate-500">Seller is typing…</div>)}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={()=>document.getElementById('chatFile')?.click()} className="rounded border px-2 py-1 text-xs border-[#f77f00] text-[#f77f00]"><AttachIcon/> {t('attach')}</button>
                  <input id="chatFile" type="file" multiple accept="image/*,.pdf" className="hidden" onChange={(e)=>{ const names=Array.from(e.target.files||[]).map(f=>f.name); setUpFiles(prev=>[...prev,...names]); }}/>
                  <button onClick={()=>document.getElementById('chatAudio')?.click()} className="rounded border px-2 py-1 text-xs border-[#f77f00] text-[#f77f00]"><MicIcon/> Audio</button>
                  <input id="chatAudio" type="file" accept="audio/*" className="hidden" onChange={(e)=>{ const names=Array.from(e.target.files||[]).map(f=>f.name); setAudioFiles(prev=>[...prev,...names]); }}/>
                  <input value={draft} onChange={e=>setDraft(e.target.value)} placeholder={t('typeMessage')} className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"/>
                  <button onClick={()=>{ sendMsgWithMeta(draft); }} className="rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.accent }}>{t('send')}</button>
                </div>
                {(upFiles.length>0 || audioFiles.length>0) && (
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                    {upFiles.map((f,i)=> (<span key={'f'+i} className="rounded border px-2 py-1">{f}</span>))}
                    {audioFiles.map((f,i)=> (<span key={'a'+i} className="rounded border px-2 py-1">🔊 {f}</span>))}
                    <button onClick={()=>{ setUpFiles([]); setAudioFiles([]); }} className="text-xs underline">Clear</button>
                  </div>
                )}
              </>
            )}

            {chatMode==='audio' && (
              <div className="text-sm">
                <div className="mb-2">Audio call controls (mock)</div>
                <div className="flex gap-2">
                  <button className="rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.accent }}><PhoneIcon/> Start</button>
                  <button className="rounded-lg border px-3 py-2 text-sm border-[#f77f00] text-[#f77f00]">End</button>
                </div>
              </div>
            )}

            {chatMode==='live' && (
              <div className="text-sm"><SignalIcon/> Live chat enabled. Use Messages tab above to converse.</div>
            )}

            {chatMode==='schedule' && (
              <div className="grid gap-2 text-sm">
                <label className="block text-xs text-slate-500"><CalendarIcon/> {t('meetingAt')}
                  <input type="datetime-local" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1"/>
                </label>
                <button className="rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.accent }}><CalendarIcon/> Schedule</button>
              </div>
            )}
          </Card>
        )}

        {tab==='proforma' && (
          <Card title={t('proTitle')}>
            <div className="text-sm">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><div className="font-semibold">{t('seller')}</div><div>{`EV Supplier Co.\nNo.8 Industrial Rd, CN`}</div></div>
                <div><div className="font-semibold">{t('buyer')}</div><div>{`EVmart Ltd\nPlot 10, Kampala Rd, UG`}</div></div>
              </div>
              <div className="mt-2">
                <div className="mb-1 text-xs font-semibold">{t('items')}</div>
                <div className="divide-y divide-slate-200">
                  {pi.items.map(it=> (
                    <div key={it.id} className="flex items-center justify-between py-2">
                      <div className="text-xs">{it.name} × {it.qty}</div>
                      <div className="text-xs">{fmt(it.unitUSD)} {t('unitPrice')}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <label className="block text-xs text-slate-500">{t('incoterm')}
                  <select value={pi.incoterm} onChange={e=>setPI({...pi, incoterm:e.target.value})} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1">
                    {['EXW','FOB','CIF','DDU'].map(i=> <option key={i} value={i}>{i}</option>)}
                  </select>
                </label>
                <label className="block text-xs text-slate-500">{t('deposit')}
                  <input type="number" min={0} max={100} value={pi.depositPct} onChange={e=>setPI({...pi, depositPct: Math.max(0, Math.min(100, Number(e.target.value)||0))})} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1"/>%
                </label>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <Row label={t('subtotal')}>{fmt(piSubtotal)}</Row>
                <Row label={t('freight')}>
                  <input type="number" value={pi.freightUSD} onChange={e=>setPI({...pi, freightUSD:Number(e.target.value)||0})} className="w-28 rounded border border-slate-300 px-2 py-1 text-xs"/>
                </Row>
                {piInsurance>0 && <Row label={'Insurance'}>{fmt(piInsurance)}</Row>}
                <Row label={t('tax')}>
                  <input type="number" value={Math.round((pi.taxRate||0)*100)} onChange={e=>setPI({...pi, taxRate:Math.max(0, Math.min(0.3, Number(e.target.value)/100))})} className="w-14 rounded border border-slate-300 px-2 py-1 text-xs"/>%
                </Row>
                <Row label={t('total')}>{fmt(piTotal)}</Row>
                <Row label={t('dueNow')}>{fmt(piDueNow)}</Row>
                <Row label={t('balance')}>{fmt(piBalance)}</Row>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={()=> alert('Render PDF (mock)')} className="flex-1 rounded-lg border px-3 py-2 text-sm border-[#f77f00] text-[#f77f00]">{t('download')}</button>
                <button onClick={()=> alert('Proceed to payment (mock)')} className="flex-1 rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.accent }}>{t('approvePay')}</button>
              </div>
            </div>
          </Card>
        )}

        {tab==='company' && (
          <Card title={t('profile')}>
            <div className="grid gap-2">
              <Input label={t('companyName')} value={company.name} onChange={v=>setCompany({...company, name:v})} />
              <div className="grid grid-cols-2 gap-2">
                <Input label={t('regNo')} value={company.regNo} onChange={v=>setCompany({...company, regNo:v})} />
                <Input label={t('vat')} value={company.vat} onChange={v=>setCompany({...company, vat:v})} />
              </div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={company.exempt} onChange={e=>setCompany({...company, exempt:e.target.checked})}/> {t('taxExempt')}</label>
              <div className="text-xs">{t('status')}: <StatusChip state={company.status} /></div>
              <div className="mt-1">
                <div className="mb-1 text-xs font-semibold">{t('certificates')}</div>
                <div className="space-y-1 text-xs">
                  {company.certs.map((c: Cert)=> (
                    <div key={c.id} className="flex items-center justify-between rounded border border-slate-200 bg-white px-2 py-1">
                      <span>{c.name} · {t('docType')}: {c.type} · {t('expiry')}: {c.expiry}</span>
                      <button onClick={()=> setCompany(s=> ({...s, certs:s.certs.filter((x:Cert)=>x.id!==c.id)}))} className="rounded border px-2 py-1">{t('delete')}</button>
                    </div>
                  ))}
                </div>
                <div className="mt-2"><button onClick={addCert} className="rounded border px-3 py-2 text-sm border-[#f77f00] text-[#f77f00]">+ {t('addCert')}</button></div>
              </div>
              <div className="mt-2 flex justify-end"><button onClick={()=> alert('Saved (mock)')} className="rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.accent }}>{t('save')}</button></div>
            </div>
          </Card>
        )}

        {tab==='shipping' && (
          <Card title={t('bulkTitle')}>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="block text-xs text-slate-500">{t('packType')}
                <select value={pack} onChange={e=>setPack(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1">
                  <option value="carton">{t('cartons')}</option>
                  <option value="pallet">{t('pallets')}</option>
                  <option value="crate">{t('crates')}</option>
                </select>
              </label>
              <label className="block text-xs text-slate-500">{t('unitsPer') || 'Units per carton'}
                <input type="number" value={unitsPer} onChange={e=>setUnitsPer(Math.max(1, Number(e.target.value)||1))} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1"/>
              </label>
              <label className="block text-xs text-slate-500">{t('weightKg')}
                <input type="number" value={weight} onChange={e=>setWeight(Math.max(1, Number(e.target.value)||1))} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1"/>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <label className="block text-xs text-slate-500">{t('length')}<input type="number" value={dims.l} onChange={e=>setDims({...dims, l:Number(e.target.value)||0})} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1"/></label>
                <label className="block text-xs text-slate-500">{t('width')}<input type="number" value={dims.w} onChange={e=>setDims({...dims, w:Number(e.target.value)||0})} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1"/></label>
                <label className="block text-xs text-slate-500">{t('height')}<input type="number" value={dims.h} onChange={e=>setDims({...dims, h:Number(e.target.value)||0})} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1"/></label>
              </div>
            </div>
            <div className="mt-3 text-sm">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={split} onChange={e=>setSplit(e.target.checked)}/> {t('splitShip')}</label>
              {split && (
                <div className="mt-2 space-y-2">
                  {splits.map(s=> (
                    <div key={s.id} className="flex items-center gap-2">
                      <span className="text-xs">{t('splits')} #{s.id}</span>
                      <label className="text-xs">{t('leadWeeks')}: <input type="number" value={s.weeks} onChange={e=>setSplits(prev=> prev.map(x=> x.id===s.id? {...x, weeks:Number(e.target.value)||0}:x))} className="w-14 rounded border border-slate-300 px-2 py-1"/></label>
                      <label className="text-xs">% <input type="number" value={s.pct} onChange={e=>setSplits(prev=> prev.map(x=> x.id===s.id? {...x, pct:Math.max(0, Math.min(100, Number(e.target.value)||0))}:x))} className="w-14 rounded border border-slate-300 px-2 py-1"/></label>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-2">
                <div className="mb-1 text-xs font-semibold">{t('origin')}</div>
                <div className="flex flex-wrap gap-2 no-scrollbar overflow-x-hidden">
                  {['CN','DE','US','UG','KE'].map(c=> (
                    <button key={c} onClick={()=> setOrigins(prev=> prev.includes(c)? prev.filter(x=>x!==c) : [...prev, c])} className={`rounded-full border px-3 py-1 text-xs ${origins.includes(c)? 'border-[#03cd8c] bg-[#03cd8c22]':'border-[#f77f00] text-[#f77f00] bg-white'}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <label className="block">{t('orderQty')}
                  <input type="number" value={orderQty} onChange={e=>setOrderQty(Math.max(1, Number(e.target.value)||1))} className="mt-1 w-full rounded border border-slate-300 px-2 py-1"/>
                </label>
                <div className="rounded border border-slate-200 bg-white p-2">{t('suggested')}: <span className="font-semibold">{suggestedPacks}</span></div>
              </div>
              <div className="mt-3 text-xs">
                <div className="font-semibold">{t('carrierSim')}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {carrierRate.map(c=> (
                    <span key={c.code} className="rounded-full border px-3 py-1">{t('carrier')}: {c.code} · {t('rate')}: {fmt(c.rate)}</span>
                  ))}
                </div>
              </div>
              <div className="mt-3 text-xs">
                <div className="font-semibold">{t('splitPlan')}</div>
                <ul className="mt-1 list-disc pl-5">
                  {(split? splits: [{id:1,weeks:unitsPer>0?2:0,pct:100}]).map(s=> (
                    <li key={s.id}>Ship {s.pct}% in {s.weeks} {t('leadWeeks')}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
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

// ===== Small UI helpers =====
function Card({ title, children }:{ title:string; children:any }){
  return (
    <section className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-3 text-sm font-semibold text-slate-800">{title}</div>
      <div className="space-y-3 p-3">{children}</div>
    </section>
  );
}
function Row({ label, children }:{ label:string; children:any }){
  return (
    <div className="flex items-center justify-between text-sm"><div className="text-slate-500">{label}</div><div className="font-semibold">{children}</div></div>
  );
}
function Input({ label, value, onChange, optional }:{ label:string; value:string|number; onChange:(v:any)=>void; optional?:boolean }){
  return (
    <label className="block text-xs text-slate-500">
      {label}{optional? ' (optional)':''}
      <input value={value as any} onChange={e=>onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"/>
    </label>
  );
}
function StatusChip({ state }:{ state:'pending'|'approved'|'rejected' }){
  const map:any = { pending:'#f59e0b', approved:'#03cd8c', rejected:'#ef4444' };
  const label:any = { pending:'Pending', approved:'Approved', rejected:'Rejected' };
  return <span className="rounded-full px-2 py-0.5 text-xs font-medium text-white" style={{ background:map[state] }}>{label[state]}</span>;
}
function NavItem({ label, icon, active, color, to }:{ label:string; icon:React.ReactNode; active?:boolean; color:string; to:string }){
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 ${active? '' : 'text-slate-500'}`} style={{ color: active ? color : undefined }}>
      <span className={`grid h-8 w-8 place-items-center rounded-full ${active? '' : ''}`} style={{ background: active? `${color}22` : 'transparent' }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

// ===== Icons =====
function ModeIcon({mode}:{mode:string}){
  switch(mode){
    case 'whatsapp': return <WhatsAppIcon/>;
    case 'wechat': return <WeChatIcon/>;
    case 'messages': return <ChatIcon/>;
    case 'audio': return <MicIcon/>;
    case 'live': return <SignalIcon/>;
    case 'schedule': return <CalendarIcon/>;
    default: return <ChatIcon/>;
  }
}
function SearchIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function AttachIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 1 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.2a2 2 0 1 1-2.83-2.83l8.49-8.49"/></svg>); }
function ChatIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>); }
function MicIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>); }
function PhoneIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.86.37 1.7.72 2.47a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.58 6.58l1.27-1.27a2 2 0 0 1 2.11-.45c.77.35 1.61.6 2.47.72A2 2 0 0 1 22 16.92z"/></svg>); }
function SignalIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h2"/><path d="M7 20h2"/><path d="M12 20h2"/><path d="M17 20h2"/><path d="M22 20h2"/><path d="M4 20v-4"/><path d="M9 20v-7"/><path d="M14 20v-10"/><path d="M19 20v-13"/></svg>); }
function CalendarIcon(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function WhatsAppIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a9 9 0 1 1-3-6.7l3 1.7-1 5z"/></svg>); }
function WeChatIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="10" r="4"/><circle cx="17" cy="14" r="4"/></svg>); }
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
