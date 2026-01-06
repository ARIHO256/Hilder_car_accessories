import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';

export default function ReturnsPage() {
  const navigate = useNavigate();

  const COLORS = {
    brand: '#03cd8c',
    brandDark: '#0a7c7a',
    accent: '#f77f00',
    grayL: '#f5f7fa'
  };

  const DICT = {
    en: {
      screen: 'Returns',
      language: 'Language',
      currency: 'Currency',
      item: 'Item',
      reason: 'Reason for return',
      condition: 'Condition',
      photos: 'Photos (optional)',
      method: 'Return method',
      pickup: 'Courier pickup',
      dropoff: 'Drop-off',
      when: 'Preferred date & time',
      refund: 'Refund option',
      original: 'Original payment method',
      credit: 'Store credit',
      replace: 'Replacement',
      summary: 'Summary',
      qty: 'Qty',
      estRefund: 'Estimated refund',
      submit: 'Submit return',
      back: 'Back to Orders',
      none: 'No item selected',
      toOrders: 'Go to Orders',
      note: 'We’ll email you pickup/drop-off instructions after approval.'
    }
  };

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
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const t = (k) => DICT[lang]?.[k] || k;

  const [payload, setPayload] = useState(null);
  useEffect(() => {
    try {
      const s = sessionStorage.getItem('ev_return_start');
      if (s) setPayload(JSON.parse(s));
    } catch {
      /* noop */
    }
  }, []);

  const [reason, setReason] = useState('damaged');
  const [cond, setCond] = useState('unopened');
  const [method, setMethod] = useState('pickup');
  const [when, setWhen] = useState('');
  const [refund, setRefund] = useState('original');
  const [files, setFiles] = useState([]);

  const priceUSD = payload?.priceUSD || 0;
  const qty = payload?.qty || 1;
  const est = useMemo(
    () => Math.max(0, priceUSD * qty * (cond === 'unopened' ? 1 : cond === 'unused' ? 0.95 : 0.85)),
    [priceUSD, qty, cond]
  );
  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  function submit() {
    const req = {
      ...payload,
      reason,
      cond,
      method,
      when,
      refund,
      files,
      estUSD: est,
      createdAt: new Date().toISOString()
    };
    try {
      sessionStorage.setItem('ev_return_submit', JSON.stringify(req));
    } catch {
      /* noop */
    }
    alert('Return submitted');
    navigate(ROUTES.orders);
  }

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{ background: COLORS.grayL }}>
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
          leadingSlot={(
            <Link
              to={ROUTES.orders}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white"
              aria-label={t('back')}
            >
              ◀
            </Link>
          )}
        />
      </header>

      <main className="mx-auto max-w-sm px-4 pt-3 pb-28 space-y-3">
        {!payload && (
          <section className="rounded-xl border border-slate-200 bg-white p-3 text-center text-sm">
            <div className="font-semibold">{t('none')}</div>
            <Link
              to={ROUTES.orders}
              className="mt-2 inline-block rounded border px-3 py-1 text-xs"
              style={{ borderColor: COLORS.accent, color: COLORS.accent }}
            >
              {t('toOrders')}
            </Link>
          </section>
        )}

        {payload && (
          <>
            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-slate-800">{t('item')}</div>
              <div className="flex items-center gap-3 text-sm">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-100">📦</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{payload.name}</div>
                  <div className="text-xs text-slate-600">
                    {t('qty')}: {payload.qty}
                  </div>
                </div>
                <div className="text-right">{fmt(priceUSD)}</div>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-slate-800">{t('reason')}</div>
              <div className="grid gap-2 text-xs">
                {[
                  ['damaged', 'Arrived damaged'],
                  ['wrong', 'Wrong item / color'],
                  ['fit', "Doesn't fit / incompatible"],
                  ['desc', 'Not as described'],
                  ['other', 'Other']
                ].map(([id, label]) => (
                  <label key={id} className="flex items-center gap-2">
                    <input type="radio" name="r" checked={reason === id} onChange={() => setReason(id)} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-slate-800">{t('condition')}</div>
              <div className="grid gap-2 text-xs">
                {[
                  ['unopened', 'Unopened - original packaging'],
                  ['unused', 'Unused - package opened'],
                  ['used', 'Used - tried / tested'],
                  ['refurb', 'Refurbished / repaired by buyer']
                ].map(([id, label]) => (
                  <label key={id} className="flex items-center gap-2">
                    <input type="radio" name="c" checked={cond === id} onChange={() => setCond(id)} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-slate-800">{t('photos')}</div>
              <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs">
                <span className="text-sm">📷</span>
                <span>Upload photos</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const next = Array.from(e.target.files || []).map((file) => file.name);
                    setFiles(next);
                  }}
                  className="hidden"
                />
              </label>
              {files.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-slate-500">
                  {files.map((file) => (
                    <div key={file} className="truncate rounded border border-slate-200 bg-white px-2 py-1">
                      {file}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-slate-800">{t('method')}</div>
              <div className="flex gap-2 text-xs">
                {[
                  ['pickup', t('pickup')],
                  ['dropoff', t('dropoff')]
                ].map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setMethod(id)}
                    className={`flex-1 rounded-lg border px-3 py-2 ${
                      method === id ? 'border-transparent text-white shadow-sm' : ''
                    }`}
                    style={{ background: method === id ? COLORS.brand : 'transparent', borderColor: COLORS.brand }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <input
                type="datetime-local"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-slate-800">{t('refund')}</div>
              <div className="grid gap-2 text-xs">
                {[
                  ['original', t('original')],
                  ['credit', t('credit')],
                  ['replace', t('replace')]
                ].map(([id, label]) => (
                  <label
                    key={id}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
                      refund === id ? 'border-transparent text-white shadow-sm' : ''
                    }`}
                    style={{ background: refund === id ? COLORS.brand : 'transparent', borderColor: COLORS.brand }}
                  >
                    <input type="radio" name="refund" checked={refund === id} onChange={() => setRefund(id)} />
                    <span className="flex-1">{label}</span>
                    {refund === id && <span>✔</span>}
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-1 text-sm font-semibold">{t('summary')}</div>
              <div className="flex items-center justify-between text-sm">
                <span>{payload.name}</span>
                <span className="font-semibold">
                  {fmt(priceUSD)} × {qty}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span>{t('estRefund')}</span>
                <span className="text-lg font-bold">{fmt(est)}</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-500">{t('note')}</div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={submit}
                  className="flex-1 rounded-lg px-3 py-2 text-sm text-white"
                  style={{ background: COLORS.brand }}
                >
                  {t('submit')}
                </button>
                <Link
                  to={ROUTES.orders}
                  className="rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: COLORS.accent, color: COLORS.accent }}
                >
                  {t('back')}
                </Link>
              </div>
            </section>
          </>
        )}
      </main>

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

function NavItem({
  label,
  icon,
  active = false,
  color,
  to
}:{
  label:string;
  icon:React.ReactNode;
  active?:boolean;
  color:string;
  to:string;
}) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-0.5 ${active ? '' : 'text-slate-500'}`}
      style={{ color: active ? color : undefined }}
    >
      <span
        className={`grid h-8 w-8 place-items-center rounded-full ${active ? '' : ''}`}
        style={{ background: active ? `${color}22` : 'transparent' }}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
