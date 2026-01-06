// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';

// ===== i18n (module-scope so helpers can use it safely) =====
const DICT:Record<string,Record<string,string>> = {
  en: {
    screen:'Reviews & Q&A', reviews:'Reviews', qa:'Q&A', wishlist:'Wishlist',
    sort:'Sort', mostRecent:'Most recent', topRated:'Top rated', photos:'With photos', verified:'Verified purchase', helpful:'Helpful', report:'Report',
    writeReview:'Write a review', rating:'Rating', title:'Title', content:'Content', addPhotos:'Add photos', submit:'Submit', cancel:'Cancel',
    askQuestion:'Ask a question', yourQuestion:'Your question', answer:'Answer', sellerReply:'Seller reply', addAnswer:'Add answer',
    search:'Search', language:'Language', currency:'Currency',
    emptyReviews:'No reviews yet.', emptyQA:'No questions yet.',
    addToWishlist:'Add to Wishlist', remove:'Remove',
  }
};

export default function EVmartReviewsQA(){
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

  // ===== Localized helpers =====
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const t = (k:string)=> (DICT[lang]?.[k]) ?? DICT.en[k] ?? k;
  const fmt = (usd:number)=> new Intl.NumberFormat((LANGS.find(l=>l.code===lang)||{}).locale||'en-US', { style:'currency', currency }).format(usd * (FX[currency]||1));

  // ===== Tabs =====
  const [tab, setTab] = useState<'reviews'|'qa'|'wishlist'>('reviews');

  // ===== Sample product =====
  const product = { id:'p1', name:'Home Charger 7.4kW', priceUSD:449, img:'https://images.unsplash.com/photo-1604147706284-9e27f42e4bd5?w=1200' };

  // ===== Reviews State =====
  type Review = { id:string; user:string; rating:number; title:string; text:string; date:string; verified:boolean; photos?:string[]; helpful:number };
  const [reviews, setReviews] = useState<Review[]>([
    { id:'r1', user:'Alex K', rating:5, title:'Solid home charger', text:'Easy install and fast charging.', date:'2025-08-11', verified:true, photos:[product.img], helpful:12 },
    { id:'r2', user:'Grace N', rating:4, title:'Works great', text:'UI is simple. Cable could be longer.', date:'2025-07-03', verified:true, helpful:4 },
  ]);
  const [sortKey, setSortKey] = useState<'recent'|'top'>('recent');
  const [onlyPhotos, setOnlyPhotos] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating:0, title:'', text:'', photos:[] as string[] });

  const filteredReviews = useMemo(()=>{
    let list = reviews.slice();
    if (onlyPhotos) list = list.filter(r=> r.photos?.length);
    list.sort((a,b)=> sortKey==='recent' ? (new Date(b.date).getTime()-new Date(a.date).getTime()) : (b.helpful - a.helpful));
    return list;
  }, [reviews, sortKey, onlyPhotos]);

  // ===== Q&A State =====
  type Answer = { id:string; from:'buyer'|'seller'; text:string; ts:string };
  type Question = { id:string; user:string; text:string; ts:string; answers:Answer[] };
  const [qaList, setQaList] = useState<Question[]>([
    { id:'q1', user:'Sam', text:'Is it compatible with Type 2?', ts:'2025-08-05', answers:[{ id:'a1', from:'seller', text:'Yes, fully compatible.', ts:'2025-08-05 12:01' }] },
  ]);
  const [qDraft, setQDraft] = useState('');
  const [aDraft, setADraft] = useState<{[qid:string]:string}>({});

  // ===== Wishlist State =====
  type Wish = { id:string; name:string; priceUSD:number; img:string; fav:boolean };
  const [wishlist, setWishlist] = useState<Wish[]>([
    { id:'w1', name:product.name, priceUSD:product.priceUSD, img:product.img, fav:true },
  ]);

  useEffect(()=>{
    try { console.assert(document.querySelector('header.sticky'), 'Header exists'); } catch{}
  },[]);

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{ backgroundColor: COLORS.grayL }}>
      <style>{`.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
      {/* Header */}
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

      {/* Tabs */}
      <section className="mx-auto max-w-sm px-4 pt-3">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto pb-1">
          {(['reviews','qa','wishlist'] as const).map(k=> (
            <button key={k} onClick={()=>setTab(k)} className={`rounded-full border px-3 py-1 text-sm ${tab===k? 'border-[#03cd8c] bg-[#03cd8c22]':'border-[#f77f00] text-[#f77f00] bg-white'}`}>{t(k)}</button>
          ))}
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-sm px-4 pt-2 pb-28">
        {tab==='reviews' && (
          <>
            {/* Summary */}
            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={product.img} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div>
                  <div className="text-sm font-semibold">{product.name}</div>
                  <div className="text-xs text-slate-600">{fmt(product.priceUSD)}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div className="col-span-1">
                  <div className="text-2xl font-bold">{avgRating(reviews).toFixed(1)}</div>
                  <RatingStars value={avgRating(reviews)} />
                  <div className="mt-1 text-slate-500">{reviews.length} {t('reviews')}</div>
                </div>
                <div className="col-span-2 space-y-1">
                  {[5,4,3,2,1].map(star=> (
                    <div key={star} className="flex items-center gap-2">
                      <span className="w-6 text-right">{star}★</span>
                      <ProgressBar value={ratio(reviews, star)} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <select value={sortKey} onChange={e=>setSortKey(e.target.value)} className="rounded border border-slate-300 bg-white px-2 py-1">
                  <option value="recent">{t('mostRecent')}</option>
                  <option value="top">{t('topRated')}</option>
                </select>
                <label className="flex items-center gap-2"><input type="checkbox" checked={onlyPhotos} onChange={e=>setOnlyPhotos(e.target.checked)} /> {t('photos')}</label>
                <button onClick={()=> setShowForm(true)} className="ml-auto rounded-lg px-3 py-1.5 text-sm text-white" style={{ background: COLORS.accent }}>{t('writeReview')}</button>
              </div>
            </section>

            {/* Reviews list */}
            <section className="mt-3 space-y-2">
              {filteredReviews.length===0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-600">{t('emptyReviews')}</div>
              )}
              {filteredReviews.map(r => (
                <ReviewCard key={r.id} r={r} onHelpful={()=> setReviews(prev=> prev.map(x=> x.id===r.id? {...x, helpful:x.helpful+1}:x))} t={t} />
              ))}
            </section>

            {/* Write Review */}
            {showForm && (
              <div className="fixed inset-0 z-[999] grid place-items-center">
                <div className="absolute inset-0 bg-black/40" onClick={()=>setShowForm(false)} />
                <div className="relative w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                  <div className="text-sm font-semibold mb-2">{t('writeReview')}</div>
                  <div className="grid gap-2 text-sm">
                    <label className="block text-xs text-slate-500">{t('rating')}
                      <div className="mt-1"><RatingInput value={newReview.rating} onChange={(v)=> setNewReview({...newReview, rating:v})} /></div>
                    </label>
                    <Input label={t('title')} value={newReview.title} onChange={v=>setNewReview({...newReview, title:v})} />
                    <Input label={t('content')} value={newReview.text} onChange={v=>setNewReview({...newReview, text:v})} />
                    <div className="flex items-center gap-2 text-xs">
                      <button onClick={()=>document.getElementById('revFile')?.click()} className="rounded border px-2 py-1">{t('addPhotos')}</button>
                      <input id="revFile" type="file" multiple accept="image/*" className="hidden" onChange={(e)=>{ const names=Array.from(e.target.files||[]).map(f=>f.name); setNewReview(r=>({...r, photos:[...(r.photos||[]), ...names]})); }} />
                      {newReview.photos?.length? (<span className="text-slate-500">{newReview.photos.length} photos</span>) : null}
                    </div>
                    <div className="mt-2 flex justify-end gap-2">
                      <button onClick={()=>setShowForm(false)} className="rounded border px-3 py-1.5 text-sm">{t('cancel')}</button>
                      <button onClick={()=>{ if(newReview.rating===0 || !newReview.title) return; const now=new Date(); const ins={ id:'r'+(reviews.length+1), user:'You', rating:newReview.rating, title:newReview.title, text:newReview.text, date:now.toISOString().slice(0,10), verified:true, photos:newReview.photos, helpful:0 }; setReviews([ins, ...reviews]); setShowForm(false); setNewReview({rating:0, title:'', text:'', photos:[]}); }} className="rounded-lg px-3 py-1.5 text-sm text-white" style={{ background: COLORS.accent }}>{t('submit')}</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {tab==='qa' && (
          <>
            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="text-sm font-semibold mb-2">{t('qa')}</div>
              <div className="flex items-center gap-2">
                <input value={qDraft} onChange={e=>setQDraft(e.target.value)} placeholder={t('yourQuestion')} className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                <button onClick={()=>{ if(!qDraft.trim()) return; const now=new Date(); setQaList([{ id:'q'+(qaList.length+1), user:'You', text:qDraft.trim(), ts:now.toISOString().slice(0,10), answers:[]}, ...qaList]); setQDraft(''); }} className="rounded-lg px-3 py-2 text-sm text-white" style={{ background: COLORS.accent }}>{t('askQuestion')}</button>
              </div>
            </section>

            <section className="mt-3 space-y-2">
              {qaList.length===0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-600">{t('emptyQA')}</div>
              )}
              {qaList.map(q => (
                <QAItem key={q.id} q={q} t={t} onAnswer={(txt)=>{ const now=new Date(); setQaList(prev=> prev.map(x=> x.id===q.id? {...x, answers:[...x.answers, { id:'a'+(x.answers.length+1), from:'buyer', text:txt, ts:now.toISOString().slice(0,16).replace('T',' ')}]}:x)); }} />
              ))}
            </section>
          </>
        )}

        {tab==='wishlist' && (
          <section className="grid grid-cols-2 gap-3">
            {wishlist.map(w => (
              <div key={w.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="relative" style={{ aspectRatio:'1/1' }}>
                  <img src={w.img} alt="" className="h-full w-full object-cover"/>
                  <button onClick={()=> setWishlist(prev=> prev.map(x=> x.id===w.id? {...x, fav:!x.fav}:x))} className="absolute right-2 top-2 rounded-full bg-white/90 p-1">{w.fav? <HeartFill/> : <HeartIcon/>}</button>
                </div>
                <div className="p-2 text-xs">
                  <div className="truncate font-medium">{w.name}</div>
                  <div className="text-slate-600">{fmt(w.priceUSD)}</div>
                  <div className="mt-1 flex justify-end"><button onClick={()=> setWishlist(prev=> prev.filter(x=> x.id!==w.id))} className="rounded border px-2 py-1">{t('remove')}</button></div>
                </div>
              </div>
            ))}
          </section>
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

// ===== Components =====
function RatingStars({ value }:{ value:number }){
  const full = Math.floor(value); const half = value-full>=0.5; const arr = [0,1,2,3,4].map(i=> i<full? 'full' : i===full && half? 'half' : 'empty');
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {arr.map((t,i)=> (<span key={i}>{t==='full'? '★' : t==='half'? '☆' : '✩'}</span>))}
    </div>
  );
}
function ProgressBar({ value }:{ value:number }){
  return (
    <div className="h-2 w-full rounded bg-slate-200"><div className="h-2 rounded bg-[#03cd8c]" style={{ width: Math.min(100, Math.max(0,Math.round(value*100)))+'%' }} /></div>
  );
}
function ReviewCard({ r, onHelpful, t }:{ r:any; onHelpful:()=>void; t:(k:string)=>string }){
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between text-sm">
        <div className="font-semibold">{r.user}</div>
        <div className="text-xs text-slate-500">{r.date}</div>
      </div>
      <div className="mt-0.5 flex items-center gap-2 text-xs">
        <RatingStars value={r.rating} />
        {r.verified && (<span className="rounded-full border border-[#03cd8c] bg-[#03cd8c22] px-2 py-0.5 text-[10px] text-[#065f46]">{t('verified')}</span>)}
      </div>
      <div className="mt-2 text-sm font-semibold">{r.title}</div>
      <div className="text-sm text-slate-700">{r.text}</div>
      {r.photos?.length? (
        <div className="mt-2 grid grid-cols-4 gap-2">
          {r.photos.map((p,i)=> (<img key={i} src={p} alt="" className="h-16 w-full rounded object-cover"/>))}
        </div>
      ) : null}
      <div className="mt-2 flex items-center gap-2 text-xs">
        <button onClick={onHelpful} className="rounded border px-2 py-1">{t('helpful')} · {r.helpful}</button>
        <button onClick={()=> alert('Reported (mock)')} className="rounded border px-2 py-1">{t('report')}</button>
      </div>
    </article>
  );
}
function QAItem({ q, onAnswer, t }:{ q:any; onAnswer:(txt:string)=>void; t:(k:string)=>string }){
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between text-sm">
        <div className="font-semibold">{q.user}</div>
        <div className="text-xs text-slate-500">{q.ts}</div>
      </div>
      <div className="mt-1 text-sm">{q.text}</div>
      <div className="mt-2 space-y-1">
        {q.answers.map((a:any)=> (
          <div key={a.id} className="rounded border border-slate-200 bg-slate-50 p-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-medium">{a.from==='seller'? t('sellerReply') : t('answer')}</span>
              <span className="text-slate-500">{a.ts}</span>
            </div>
            <div className="mt-0.5">{a.text}</div>
          </div>
        ))}
      </div>
      {open? (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <input value={draft} onChange={e=>setDraft(e.target.value)} placeholder={t('answer')} className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2"/>
          <button onClick={()=>{ if(!draft.trim()) return; onAnswer(draft.trim()); setDraft(''); setOpen(false); }} className="rounded-lg px-3 py-1.5 text-white" style={{ background: COLORS.accent }}>{t('submit')}</button>
          <button onClick={()=> setOpen(false)} className="rounded border px-3 py-1.5">{t('cancel')}</button>
        </div>
      ) : (
        <div className="mt-2 flex justify-end"><button onClick={()=> setOpen(true)} className="rounded border px-3 py-1.5 text-xs">{t('addAnswer')}</button></div>
      )}
    </article>
  );
}

// ===== Utilities =====
function avgRating(list:any[]){ if(!list.length) return 0; return list.reduce((s,r)=> s+r.rating,0)/list.length; }
function ratio(list:any[], star:number){ const m=list.filter(r=>r.rating===star).length; return list.length? m/list.length : 0; }

// ===== Reusable primitives =====
function Card({ title, children }:{ title:string; children:any }){
  return (
    <section className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-3 text-sm font-semibold text-slate-800">{title}</div>
      <div className="space-y-3 p-3">{children}</div>
    </section>
  );
}
function Input({ label, value, onChange }:{ label:string; value:string; onChange:(v:string)=>void }){
  return (
    <label className="block text-xs text-slate-500">
      {label}
      <input value={value} onChange={e=>onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
    </label>
  );
}

function RatingInput({ value, onChange }:{ value:number; onChange:(v:number)=>void }){
  return (
    <div className="flex items-center gap-1 text-lg text-amber-400">
      {[1,2,3,4,5].map(star=> (
        <button
          key={star}
          type="button"
          onClick={()=>onChange(star)}
          className={`transition ${star<=value? 'text-amber-400' : 'text-slate-300'}`}
          aria-label={`Rate ${star} star${star>1?'s':''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// ===== Footer Nav helper =====
function NavItem({ label, icon, active, color, to }:{ label:string; icon:React.ReactNode; active?:boolean; color:string; to:string }){
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 ${active? '' : 'text-slate-500'}`} style={{ color: active ? color : undefined }}>
      <span className={`grid h-8 w-8 place-items-center rounded-full ${active? '' : ''}`} style={{ background: active? `${color}22` : 'transparent' }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

// ===== Icons =====
function SearchIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
function HeartIcon(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-.9-.9a5.5 5.5 0 1 0-7.8 7.8l.9.9L12 21l7.8-7.6.9-.9a5.5 5.5 0 0 0 0-7.8z"/></svg>); }
function HeartFill(){ return (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-.9-.9a5.5 5.5 0 1 0-7.8 7.8l.9.9L12 21l7.8-7.6.9-.9a5.5 5.5 0 0 0 0-7.8z"/></svg>); }
