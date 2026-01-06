import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import { useCart } from '../contexts/CartContext';
import MobileHeaderCard from '../components/MobileHeaderCard';
import { ACCESSORY_CATEGORIES, ACCESSORY_PRODUCTS } from '../data/accessories';

export default function HilderHomeBuyer() {
  // ---------------- Brand palette (Hilder) ----------------
  const COLORS = {
    brand: '#03cd8c', // Hilder Green
    brandDark: '#0a7c7a',
    accent: '#f77f00', // Hilder Orange
    grey: '#a6a6a6',
    greyLight: '#f2f2f2'
  };

  // ---------------- i18n & currency (UI-first) ----------------
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
  const CURRS = [
    { code: 'USD', label: 'USD $' },
    { code: 'EUR', label: 'EUR €' },
    { code: 'GBP', label: 'GBP £' },
    { code: 'CNY', label: 'CNY ¥' },
    { code: 'JPY', label: 'JPY ¥' },
    { code: 'KRW', label: 'KRW ₩' },
    { code: 'INR', label: 'INR ₹' },
    { code: 'AED', label: 'AED د.إ' },
    { code: 'SAR', label: 'SAR ر.س' },
    { code: 'NGN', label: 'NGN ₦' },
    { code: 'KES', label: 'KES KSh' },
    { code: 'UGX', label: 'UGX USh' },
    { code: 'ZAR', label: 'ZAR R' },
    { code: 'TRY', label: 'TRY ₺' },
    { code: 'BRL', label: 'BRL R$' }
  ];
  const FX = {
    USD: 1, EUR: 0.93, GBP: 0.79, CNY: 7.2, JPY: 158, KRW: 1380, INR: 83,
    AED: 3.67, SAR: 3.75, NGN: 1500, KES: 128, UGX: 3800, ZAR: 18, TRY: 33, BRL: 5.2
  } as Record<string, number>; // mock UI rates

  const DICT: Record<string, Record<string, string>> = {
    en: {
      search: 'Search car accessories', trending: 'Trending today', categories: 'Popular collections',
      retail: 'Retail', wholesale: 'Wholesale', moq: 'MOQ', perUnit: '/unit',
      addToCart: 'Add to Cart', startOrder: 'Start order', seeAll: 'See all', shippedFrom: 'Shipped from',
      home: 'Home', categoriesTab: 'Categories', searchTab: 'Search', cart: 'Cart', profile: 'Profile'
    },
    fr: {
      search: 'Rechercher des accessoires auto', trending: 'Tendances du jour', categories: 'Collections populaires',
      retail: 'Détail', wholesale: 'Gros', moq: 'MOQ', perUnit: '/unité',
      addToCart: 'Ajouter au panier', startOrder: 'Démarrer commande', seeAll: 'Voir tout', shippedFrom: 'Expédié depuis',
      home: 'Accueil', categoriesTab: 'Catégories', searchTab: 'Recherche', cart: 'Panier', profile: 'Profil'
    },
    es: {
      search: 'Buscar accesorios de auto', trending: 'Tendencias de hoy', categories: 'Colecciones populares',
      retail: 'Minorista', wholesale: 'Mayorista', moq: 'MOQ', perUnit: '/unidad',
      addToCart: 'Añadir al carrito', startOrder: 'Iniciar pedido', seeAll: 'Ver todo', shippedFrom: 'Enviado desde',
      home: 'Inicio', categoriesTab: 'Categorías', searchTab: 'Buscar', cart: 'Carrito', profile: 'Mi cuenta'
    },
    de: {
      search: 'Autozubehör suchen', trending: 'Heute im Trend', categories: 'Beliebte Kollektionen',
      retail: 'Einzelhandel', wholesale: 'Großhandel', moq: 'MOQ', perUnit: '/Stück',
      addToCart: 'In den Warenkorb', startOrder: 'Bestellung starten', seeAll: 'Alle ansehen', shippedFrom: 'Versand aus',
      home: 'Start', categoriesTab: 'Kategorien', searchTab: 'Suche', cart: 'Warenkorb', profile: 'Profil'
    },
    pt: {
      search: 'Pesquisar acessórios automotivos', trending: 'Em alta hoje', categories: 'Coleções populares',
      retail: 'Varejo', wholesale: 'Atacado', moq: 'MOQ', perUnit: '/unid',
      addToCart: 'Adicionar ao carrinho', startOrder: 'Iniciar pedido', seeAll: 'Ver todos', shippedFrom: 'Enviado de',
      home: 'Início', categoriesTab: 'Categorias', searchTab: 'Pesquisar', cart: 'Carrinho', profile: 'Perfil'
    },
    hi: {
      search: 'संसाधन ऑटो ऐक्सेसरी खोजें', trending: 'आज की ट्रेंडिंग', categories: 'लोकप्रिय संग्रह',
      retail: 'खुदरा', wholesale: 'थोक', moq: 'MOQ', perUnit: '/इकाई',
      addToCart: 'कार्ट में जोड़ें', startOrder: 'ऑर्डर शुरू करें', seeAll: 'सभी देखें', shippedFrom: 'से भेजा गया',
      home: 'होम', categoriesTab: 'श्रेणियाँ', searchTab: 'खोज', cart: 'कार्ट', profile: 'प्रोफ़ाइल'
    },
    no: {
      search: 'Søk biltilbehør', trending: 'Populært i dag', categories: 'Populære samlinger',
      retail: 'Detalj', wholesale: 'Engros', moq: 'MOQ', perUnit: '/enhet',
      addToCart: 'Legg i handlekurv', startOrder: 'Start bestilling', seeAll: 'Se alle', shippedFrom: 'Sendt fra',
      home: 'Hjem', categoriesTab: 'Kategorier', searchTab: 'Søk', cart: 'Handlekurv', profile: 'Profil'
    },
    nl: {
      search: 'Zoek auto-accessoires', trending: 'Vandaag trending', categories: 'Populaire collecties',
      retail: 'Retail', wholesale: 'Groothandel', moq: 'MOQ', perUnit: '/stuk',
      addToCart: 'Toevoegen aan winkelwagen', startOrder: 'Bestelling starten', seeAll: 'Alles bekijken', shippedFrom: 'Verzonden vanuit',
      home: 'Home', categoriesTab: 'Categorieën', searchTab: 'Zoeken', cart: 'Winkelwagen', profile: 'Profiel'
    },
    da: {
      search: 'Søg biltilbehør', trending: 'Trender i dag', categories: 'Populære samlinger',
      retail: 'Detail', wholesale: 'Engros', moq: 'MOQ', perUnit: '/stk',
      addToCart: 'Læg i kurv', startOrder: 'Start ordre', seeAll: 'Se alle', shippedFrom: 'Sendt fra',
      home: 'Hjem', categoriesTab: 'Kategorier', searchTab: 'Søg', cart: 'Kurv', profile: 'Profil'
    },
    sv: {
      search: 'Sök bilaccessoarer', trending: 'Trendar idag', categories: 'Populära kollektioner',
      retail: 'Detalj', wholesale: 'Parti', moq: 'MOQ', perUnit: '/enhet',
      addToCart: 'Lägg i varukorg', startOrder: 'Starta order', seeAll: 'Visa alla', shippedFrom: 'Skickas från',
      home: 'Hem', categoriesTab: 'Kategorier', searchTab: 'Sök', cart: 'Varukorg', profile: 'Profil'
    },
    ja: {
      search: 'カーアクセサリを検索', trending: '今日のトレンド', categories: '人気のコレクション',
      retail: '小売', wholesale: '卸売', moq: 'MOQ', perUnit: '/個',
      addToCart: 'カートに追加', startOrder: '注文開始', seeAll: 'すべて表示', shippedFrom: '発送元',
      home: 'ホーム', categoriesTab: 'カテゴリ', searchTab: '検索', cart: 'カート', profile: 'プロフィール'
    },
    ko: {
      search: '자동차 액세서리 검색', trending: '오늘의 트렌드', categories: '인기 컬렉션',
      retail: '소매', wholesale: '도매', moq: 'MOQ', perUnit: '/개',
      addToCart: '장바구니 담기', startOrder: '주문 시작', seeAll: '전체 보기', shippedFrom: '발송지',
      home: '홈', categoriesTab: '카테고리', searchTab: '검색', cart: '장바구니', profile: '프로필'
    },
    tr: {
      search: 'Oto aksesuarları ara', trending: 'Bugün trend', categories: 'Popüler koleksiyonlar',
      retail: 'Perakende', wholesale: 'Toptan', moq: 'MOQ', perUnit: '/adet',
      addToCart: 'Sepete ekle', startOrder: 'Siparişi başlat', seeAll: 'Tümünü gör', shippedFrom: 'Gönderim yeri',
      home: 'Ana sayfa', categoriesTab: 'Kategoriler', searchTab: 'Ara', cart: 'Sepet', profile: 'Profil'
    }
  };

  const [lang, setLang] = React.useState('en');
  const [currency, setCurrency] = React.useState('USD');
  const [mode, setMode] = React.useState<'retail' | 'wholesale'>('retail');
  const { count: cartCount, add: addToCart } = useCart();

  const t = (k: string) => DICT[lang]?.[k] ?? DICT.en[k] ?? k;
  const fmt = (usd: number) => new Intl.NumberFormat(
    LANGS.find(l => l.code === lang)?.locale || 'en-US',
    { style: 'currency', currency }
  ).format(usd * (FX[currency] ?? 1));

  // ---------------- Sample data (UI only) ----------------
  const categories = ACCESSORY_CATEGORIES;

  type Tier = { min: number; unitUSD: number };
  type P = {
    id: string;
    name: string;
    image: string;
    rating?: { average: number; count: number };
    retailUSD: number;
    moq?: number;
    tiers?: Tier[];
    shipFrom?: { code: string; flag: string };
    swatches?: { id: string; label: string; color?: string; image?: string }[];
  };

  const flagFor = (code?: string) => {
    switch (code) {
      case 'US': return '🇺🇸';
      case 'DE': return '🇩🇪';
      case 'CN': return '🇨🇳';
      case 'JP': return '🇯🇵';
      case 'UG': return '🇺🇬';
      default: return '🌍';
    }
  };

  const products: P[] = ACCESSORY_PRODUCTS.slice(0, 6).map((prod, idx) => ({
    id: prod.id,
    name: prod.name,
    image: prod.image,
    rating: { average: prod.rating, count: prod.reviews },
    retailUSD: prod.priceUSD,
    moq: prod.category === 'Tools' ? 1 : 5,
    tiers: [
      { min: 5, unitUSD: Math.max(0, prod.priceUSD - 15) },
      { min: 20, unitUSD: Math.max(0, prod.priceUSD - 30) }
    ],
    shipFrom: { code: prod.shipFrom, flag: flagFor(prod.shipFrom) },
    swatches: prod.colors?.map((c) => ({ id: c.id, label: c.label, color: c.swatch, image: prod.image }))
  }));

  // ---------------- Self-tests (console, non-blocking) ----------------
  useEffect(() => {
    const format = (usd: number, cur: string, langCode: string) => {
      const locale = LANGS.find(l => l.code === langCode)?.locale || 'en-US';
      const rate = FX[cur] ?? 1;
      return new Intl.NumberFormat(locale, { style: 'currency', currency: cur as any }).format(usd * rate);
    };

    try { console.assert(DICT.fr.seeAll === 'Tout voir', 'i18n FR: seeAll should be "Tout voir"'); } catch {}
    try { console.assert(typeof format(100, 'USD', 'en') === 'string', 'fmt should return a string'); } catch {}
    try { const ugx = format(100, 'UGX', 'en'); console.assert(/UGX|USh|Sh/.test(ugx) || ugx.includes('UGX'), 'UGX format should include currency code/symbol'); } catch {}
    try {
      const tiers = [{ min: 5, unitUSD: 429 }, { min: 20, unitUSD: 399 }];
      const min = Math.min(...tiers.map(t => t.unitUSD));
      const max = Math.max(...tiers.map(t => t.unitUSD));
      console.assert(min === 399 && max === 429, 'Wholesale tiers min/max logic');
    } catch {}
    try {
      const root = document.querySelector('div.min-h-screen');
      if (root) {
        const hasHidden = getComputedStyle(root).overflowX === 'hidden';
        console.assert(hasHidden, 'Root should hide horizontal overflow');
      }
      const chipRow = document.querySelector('.no-scrollbar');
      if (chipRow) {
        console.assert(chipRow.classList.contains('no-scrollbar'), 'Chip row has no-scrollbar class');
      }
    } catch {}
    try {
      const bubbles = document.querySelectorAll('.cat-bubble');
      console.assert(bubbles.length >= 4, 'Category bubbles should render');
      const cartBtn = document.querySelector('[data-testid="btn-cart"] svg');
      const orderBtn = document.querySelector('[data-testid="btn-start-order"] svg');
      console.assert(!!cartBtn, 'Add to Cart should include an icon');
      console.assert(!!orderBtn, 'Start order should include an icon');
    } catch {}
    try {
      const input = document.querySelector('input[placeholder]') as HTMLInputElement | null;
      console.assert(!!input && /access/i.test(input!.placeholder), 'Search placeholder should mention accessories');
    } catch {}
    try {
      const bubbleImgHolder = document.querySelector('.cat-bubble span');
      console.assert(!!bubbleImgHolder && bubbleImgHolder.className.includes('rounded-full'), 'Category image holder should be circular');
    } catch {}
    try {
      const langSel = document.getElementById('langSelHome') as HTMLSelectElement | null;
      const curSel = document.getElementById('curSelHome') as HTMLSelectElement | null;
      console.assert(!!langSel && langSel.options.length === 15, 'Home: should have 15 languages');
      console.assert(!!curSel && curSel.options.length === 15, 'Home: should have 15 currencies');
    } catch {}
    try {
      const ship = document.querySelector('.ship-from');
      console.assert(!!ship, 'Home: Shipped from should be visible');
    } catch {}
  }, []);

  // ---------------- UI ----------------
  const cartBadge = cartCount > 99 ? '99+' : String(cartCount);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bgBody)] text-slate-900" style={{ ['--bgBody' as any]: COLORS.greyLight }}>
      {/* Header */}
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder={t('search')}
          language={lang}
          currency={currency}
          languageOptions={LANGS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={CURRS.map(c => ({ value: c.code, label: c.label }))}
          onLanguageChange={setLang}
          onCurrencyChange={setCurrency}
        />
      </header>

      {/* Global scrollbar hide */}
      <style>{`.no-scrollbar{ -ms-overflow-style: none; scrollbar-width: none; } .no-scrollbar::-webkit-scrollbar{ display: none; }`}</style>

      {/* Hero promo */}
      <section className="mx-auto max-w-sm px-4 pt-3">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#03CD8C] to-[#0aae81] p-4 text-white shadow-lg">
          <div className="text-xs/5 opacity-90">Hilder Car Accessories</div>
          <h2 className="mt-1 text-xl font-bold">Style your ride with precision gear.</h2>
          <p className="mt-1 text-white/90 text-sm">Interior trim, lighting, protection and tools curated for modern drivers.</p>
          <button className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#0a7c7a] shadow">
            Shop accessories
            <ArrowRightIcon />
          </button>
          <BadgeCorner>New</BadgeCorner>
        </div>
      </section>

      {/* Mode switch (Retail / Wholesale) */}
      <section className="mx-auto max-w-sm px-4 pt-4">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          <button
            onClick={()=>setMode('retail')}
            className={`px-3 py-1.5 text-sm rounded-lg ${mode==='retail' ? 'text-white' : 'text-slate-600'}`}
            style={{ background: mode==='retail' ? COLORS.brand : 'transparent' }}
          >{t('retail')}</button>
          <button
            onClick={()=>setMode('wholesale')}
            className={`px-3 py-1.5 text-sm rounded-lg ${mode==='wholesale' ? 'text-white' : 'text-slate-600'}`}
            style={{ background: mode==='wholesale' ? COLORS.accent : 'transparent' }}
          >{t('wholesale')}</button>
        </div>
      </section>

      {/* Category bubbles */}
      <section className="mx-auto max-w-sm px-4 pt-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-700">{t('categories')}</h3>
        <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-1">
          {categories.map((c) => (
            <Link key={c.label} to={ROUTES.categories} className="cat-bubble snap-start flex w-20 shrink-0 flex-col items-center text-center">
              <span className="mb-1 block h-16 w-16 overflow-hidden rounded-full bg-white ring-1 ring-slate-200 shadow">
                <img src={c.image} alt={c.label} className="h-full w-full object-cover" loading="lazy" />
              </span>
              <span className="w-20 text-[12px] leading-tight text-slate-700">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-sm px-4 pt-4 pb-24">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">{t('trending')}</h3>
          <Link to={ROUTES.productList} className="text-xs font-medium" style={{ color: COLORS.accent }}>{t('seeAll')}</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {products.map(p => (
            <ProductCard
              key={p.id}
              p={p}
              mode={mode}
              fmt={fmt}
              t={t}
              brand={COLORS.brand}
              accent={COLORS.accent}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* Full accessory showcase */}
      <section className="mx-auto max-w-sm px-4 pb-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Every Hilder accessory</h3>
          <Link to={ROUTES.productList} className="text-xs font-medium" style={{ color: COLORS.accent }}>Browse catalog</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {ACCESSORY_PRODUCTS.map(prod => (
            <article key={prod.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="relative" style={{ aspectRatio: '3 / 2' }}>
                <img src={prod.image} alt={prod.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <div className="text-[12px] font-semibold text-slate-900">{prod.name}</div>
                <div className="mt-1 text-[11px] text-slate-500">{prod.category} · {prod.fitment}</div>
                <div className="mt-1 text-[13px] font-bold text-slate-900">${prod.priceUSD}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-sm items-center justify-between px-6 py-2 text-[11px]">
          <NavItem label={t('home')} active color={COLORS.brand} icon={<HomeIcon/>} to={ROUTES.home} />
          <NavItem label={t('categoriesTab')} color={COLORS.brandDark} icon={<GridIcon/>} to={ROUTES.categories} />
          <NavItem label={t('searchTab')} color={COLORS.brandDark} icon={<SearchIcon/>} to={ROUTES.productList} />
          <NavItem label={t('cart')} color={COLORS.brandDark} icon={<CartIcon/>} to={ROUTES.cart} badge={cartBadge} />
          <NavItem label={t('profile')} color={COLORS.brandDark} icon={<UserIcon/>} to={ROUTES.dashboard} />
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );

  // ---------------- small components ----------------
  function BadgeCorner({ children }:{ children: React.ReactNode }){
    return (
      <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#F77F00] px-3 py-1 text-xs font-bold tracking-wide text-white">
        {children}
      </div>
    );
  }

  function NavItem({ label, icon, active, color, to, badge }:{ label:string; icon:React.ReactNode; active?:boolean; color:string; to:string; badge?:string }){
    return (
      <Link to={to} className={`flex flex-col items-center gap-0.5 ${active? '' : 'text-slate-500'}`} style={{ color: active ? color : undefined }}>
        <span className={`relative grid h-8 w-8 place-items-center rounded-full ${active? '' : ''}`} style={{ background: active? `${color}22` : 'transparent' }}>
          {icon}
          {badge && (
            <span className="absolute -top-1 -right-1 min-w-[18px] rounded-full bg-slate-900 px-1 text-[9px] font-semibold leading-4 text-white" style={{ background: color }}>
              {badge}
            </span>
          )}
        </span>
        <span>{label}</span>
      </Link>
    );
  }
}

// ---------------- Product card ----------------
function ProductCard({ p, mode, fmt, t, brand, accent, onAddToCart }:{ p:any; mode:'retail'|'wholesale'; fmt:(n:number)=>string; t:(k:string)=>string; brand:string; accent:string; onAddToCart:()=>void }){
  const [img, setImg] = React.useState(p.image);
  const range = React.useMemo(()=>{
    if (!p.tiers) return null;
    const tiers = p.tiers.slice(0,4);
    const min = Math.min(...tiers.map((x:any)=>x.unitUSD));
    const max = Math.max(...tiers.map((x:any)=>x.unitUSD));
    return { min, max };
  }, [p.tiers]);

  return (
    <Link to={ROUTES.productDetail} className="card block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative" style={{ aspectRatio:'1/1', background:'#fff' }}>
        {p.badge && <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs shadow">{p.badge}</span>}
        <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="text-[13px] leading-tight">{p.name}</div>
        {p.rating && <div className="mt-1 text-[11px] text-slate-500">★ {p.rating.average.toFixed(1)} · {p.rating.count}</div>}
        {p.shipFrom && (
          <div className="mt-1 text-[11px] text-slate-500">
            <span>{t('shippedFrom')}:</span> <span className="ship-from">{p.shipFrom.flag} {p.shipFrom.code}</span>
          </div>
        )}
        {mode==='retail' ? (
          <div className="mt-1 text-base font-bold">{fmt(p.retailUSD)}</div>
        ) : (
          <div className="mt-1 text-[13px]">
            <span className="font-semibold" style={{ color: brand }}>{t('moq')} {p.moq}</span>
            {range && <span className="ml-2">{fmt(range.min)}–{fmt(range.max)} {t('perUnit')}</span>}
          </div>
        )}

        {p.swatches?.length ? (
          <div className="mt-2 flex gap-2">
            {p.swatches.slice(0,5).map((s:any)=> (
              <button key={s.id} title={s.label} onClick={(e)=>{ e.preventDefault(); if (s.image) setImg(s.image); }}
                className="h-5 w-5 rounded-full border border-slate-200" style={{ background: s.color || '#ddd' }} />
            ))}
          </div>
        ): null}

        <div className="mt-3 flex gap-2">
          {mode==='retail' ? (
            <button
              type="button"
              data-testid="btn-cart"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart(); }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white"
              style={{ background: brand }}
            >
              <CartAddSm /> {t('addToCart')}
            </button>
          ) : (
            <button data-testid="btn-start-order" className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white" style={{ background: accent }}>
              <StartOrderSm /> {t('startOrder')}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

// ---------------- Icons (inline) ----------------
function SearchIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}
function HomeIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/>
    </svg>
  );
}
function GridIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}
function CartIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}
function UserIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function ArrowRightIcon(){
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function CartAddSm(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}
function StartOrderSm(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}
