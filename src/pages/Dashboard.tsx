// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import MobileHeaderCard from '../components/MobileHeaderCard';

export default function EVmartDashboard(){
  // ===== EVzone Colors =====
  const COLORS = { brand: '#03cd8c', brandDark: '#0a7c7a', accent: '#f77f00', grayL: '#f5f7fa' };

  // ===== Languages (15) =====
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
  const FX: Record<string, number> = { USD:1, EUR:0.93, GBP:0.79, CNY:7.2, JPY:158, KRW:1380, INR:83, AED:3.67, SAR:3.75, NGN:1500, KES:128, UGX:3800, ZAR:18, TRY:33, BRL:5.2 };

  // ===== i18n (subset) =====
  const DICT: Record<string, Record<string,string>> = {
    en: {
      dashboard:'Dashboard', profile:'Profile', name:'Full name', email:'Email', phone:'Phone', defaultMode:'Default buying mode', retail:'Retail', wholesale:'Wholesale',
      language:'Language', currency:'Currency', save:'Save', saved:'Saved',
      addresses:'Addresses', addNew:'Add new', edit:'Edit', delete:'Delete', cancel:'Cancel', use:'Use',
      paymentMethods:'Payment Methods', addMethod:'Add method', card:'Card', mobileMoney:'Mobile Money', bank:'Bank Transfer',
      number:'Number', network:'Network', other:'Other', specifyNetwork:'Specify network', last4:'Last 4',
      wishlist:'Wishlist', builds:'Configurator Builds', remove:'Remove',
      notifications:'Notifications', channels:'Channels', push:'Push', emailCh:'Email', sms:'SMS',
      topics:'Topics', order:'Order', priceDrop:'Price drop', backInStock:'Back in stock', rfq:'RFQ replies',
      loyalty:'Loyalty', points:'Points', vouchers:'Vouchers', storeCredit:'Store credit', redeem:'Redeem',
      support:'Support & Help', faqs:'FAQs', contact:'Contact', chat:'Chat', ticketing:'Ticketing', newTicket:'New ticket',
      chatTitle:'In-app chat', chatSubtitle:'Chat with EVmart support', messagePlaceholder:'Type a message…', sendMessage:'Send',
      chatWelcome:'Hi Jane! 👋 Thanks for reaching out to EVmart support.', chatPrompt:'Let us know how we can help today.',
      chatAck:'Thanks! An EVmart specialist will get back to you in under 10 minutes.',
      ticketTitle:'New support ticket', ticketSubtitle:'Give us the details so we can assist quickly.',
      ticketSubject:'Subject', ticketCategory:'Category', ticketDetails:'Details',
      ticketOrder:'Order issue', ticketBilling:'Billing & payments', ticketTech:'Technical support',
      submitTicket:'Submit ticket', ticketSuccess:'Ticket created! Reference {{ref}}', ticketError:'Please add a subject and description.',
      confirmDelete:'Delete this item?', close:'Close'
    },
    fr: {
      dashboard:'Tableau de bord', profile:'Profil', name:'Nom complet', email:'Email', phone:'Téléphone', defaultMode:"Mode d'achat par défaut", retail:'Détail', wholesale:'Gros',
      language:'Langue', currency:'Devise', save:'Enregistrer', saved:'Enregistré',
      addresses:'Adresses', addNew:'Ajouter', edit:'Modifier', delete:'Supprimer', cancel:'Annuler', use:'Utiliser',
      paymentMethods:'Moyens de paiement', addMethod:'Ajouter un moyen', card:'Carte', mobileMoney:'Mobile Money', bank:'Virement',
      number:'Numéro', network:'Opérateur', other:'Autre', specifyNetwork:"Préciser l’opérateur", last4:'4 derniers',
      wishlist:"Favoris", builds:'Configurations', remove:'Retirer',
      notifications:'Notifications', channels:'Canaux', push:'Push', emailCh:'Email', sms:'SMS',
      topics:'Sujets', order:'Commande', priceDrop:'Baisse de prix', backInStock:'De retour', rfq:'Réponses RFQ',
      loyalty:'Fidélité', points:'Points', vouchers:'Bons', storeCredit:'Crédit', redeem:'Utiliser',
      support:'Support & Aide', faqs:'FAQs', contact:'Contact', chat:'Chat', ticketing:'Tickets', newTicket:'Nouveau ticket',
      chatTitle:'Chat en direct', chatSubtitle:'Discutez avec le support EVmart', messagePlaceholder:'Écrire un message…', sendMessage:'Envoyer',
      chatWelcome:'Bonjour Jane ! 👋 Merci de contacter le support EVmart.', chatPrompt:'Dites-nous comment nous pouvons vous aider.',
      chatAck:'Merci ! Un spécialiste EVmart vous répond en moins de 10 minutes.',
      ticketTitle:'Nouveau ticket', ticketSubtitle:'Décrivez votre demande pour accélérer la prise en charge.',
      ticketSubject:'Objet', ticketCategory:'Catégorie', ticketDetails:'Détails',
      ticketOrder:'Problème de commande', ticketBilling:'Facturation & paiements', ticketTech:'Assistance technique',
      submitTicket:'Envoyer le ticket', ticketSuccess:'Ticket créé ! Référence {{ref}}', ticketError:'Veuillez indiquer un objet et une description.',
      confirmDelete:"Supprimer cet élément ?", close:'Fermer'
    },
    zh: {
      dashboard:'个人中心', profile:'个人信息', name:'姓名', email:'邮箱', phone:'电话', defaultMode:'默认购买模式', retail:'零售', wholesale:'批发',
      language:'语言', currency:'货币', save:'保存', saved:'已保存',
      addresses:'地址簿', addNew:'新增', edit:'编辑', delete:'删除', cancel:'取消', use:'使用',
      paymentMethods:'支付方式', addMethod:'新增方式', card:'银行卡', mobileMoney:'手机钱包', bank:'银行转账',
      number:'号码', network:'运营商', other:'其他', specifyNetwork:'请指定运营商', last4:'后四位',
      wishlist:'心愿单', builds:'配置保存', remove:'移除',
      notifications:'通知', channels:'渠道', push:'推送', emailCh:'邮件', sms:'短信',
      topics:'主题', order:'订单', priceDrop:'降价', backInStock:'到货提醒', rfq:'询价回复',
      loyalty:'会员', points:'积分', vouchers:'券', storeCredit:'储值', redeem:'兑换',
      support:'支持与帮助', faqs:'常见问题', contact:'联系', chat:'客服', ticketing:'工单', newTicket:'新建工单',
      chatTitle:'在线客服聊天', chatSubtitle:'与 EVmart 支持团队联系', messagePlaceholder:'输入消息…', sendMessage:'发送',
      chatWelcome:'你好 Jane！👋 感谢联系 EVmart 支持。', chatPrompt:'请告诉我们你遇到的问题。',
      chatAck:'收到！客服将在 10 分钟内回复你。',
      ticketTitle:'新建工单', ticketSubtitle:'填写详情以便我们快速处理。',
      ticketSubject:'主题', ticketCategory:'分类', ticketDetails:'详细描述',
      ticketOrder:'订单问题', ticketBilling:'支付与账单', ticketTech:'技术支持',
      submitTicket:'提交工单', ticketSuccess:'工单已创建！参考号 {{ref}}', ticketError:'请填写主题和描述。',
      confirmDelete:'删除此项目？', close:'关闭'
    }
  };

  // ===== Localized helpers =====
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const t = (k:string)=> (DICT[lang] && DICT[lang][k]) || DICT.en[k] || k;
  const fmt = (usd:number)=> new Intl.NumberFormat((LANGS.find(l=>l.code===lang)||{}).locale||'en-US', { style:'currency', currency }).format(usd * (FX[currency]||1));

  // ===== Profile & Prefs =====
  const [profile, setProfile] = useState({ name:'Jane Doe', email:'jane@example.com', phone:'+256 700 123456' });
  const [defaultMode, setDefaultMode] = useState<'retail'|'wholesale'>('retail');
  const [savedMsg, setSavedMsg] = useState('');

  // ===== Address Book =====
  type Address = { id:string; name:string; phone:string; line1:string; line2?:string; city:string; region:string; postal:string; country:string };
  const [addresses, setAddresses] = useState<Address[]>([
    { id:'a1', name:'Jane Doe', phone:'+256 700 123456', line1:'Plot 10, Kampala Rd', city:'Kampala', region:'Central', postal:'10001', country:'UG' },
    { id:'a2', name:'John Smith', phone:'+1 (415) 555‑0199', line1:'500 Market St', city:'San Francisco', region:'CA', postal:'94105', country:'US' }
  ]);
  const [selectedAddrId, setSelectedAddrId] = useState<string>('a1');
  const [editingAddr, setEditingAddr] = useState<Address|null>(null);
  const [confirm, setConfirm] = useState<{open:boolean; id:string|null}>({ open:false, id:null });

  // ===== Payment Methods =====
  type Card = { id:string; brand:string; last4:string };
  type MM = { id:string; network:string; number:string };
  const [cards, setCards] = useState<Card[]>([{ id:'c1', brand:'VISA', last4:'4242' }]);
  const [mobiles, setMobiles] = useState<MM[]>([{ id:'m1', network:'MTN', number:'+256 700 123456' }]);

  // ===== Wishlist & Builds =====
  type WishItem = { id:string; name:string; img:string; priceUSD:number; fav:boolean };
  const [wishlist, setWishlist] = useState<WishItem[]>([
    { id:'w1', name:'Home Charger 7.4kW', img:'https://images.unsplash.com/photo-1604147706284-9e27f42e4bd5?w=800', priceUSD:449, fav:true },
    { id:'w2', name:'Smart Dash Cam 4K', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', priceUSD:140, fav:true }
  ]);
  type Build = { id:string; title:string; desc:string; img:string; priceUSD:number; route?:string };
  const [builds, setBuilds] = useState<Build[]>([
    { id:'b1', title:'My EV Crossover — Long Range', desc:'Pearl White • 20” Induction • Black interior', img:'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800', priceUSD:47990, route: `${ROUTES.configurator}?build=b1` }
  ]);

  // ===== Notifications =====
  const [channels, setChannels] = useState({ push:true, email:true, sms:false });
  const [topics, setTopics] = useState({ order:true, priceDrop:true, backInStock:true, rfq:true });

  // ===== Loyalty =====
  const [points, setPoints] = useState(1250);
  const [vouchers, setVouchers] = useState([{ code:'EV10', desc:'10% off', used:false }, { code:'SAVE50', desc:'$50 off', used:true }]);
  const [credit, setCredit] = useState(35);

  // ===== Support interactions =====
  type ChatMessage = { id:string; sender:'agent'|'user'; text?:string; templateKey?:string; time:number };
  const [supportMode, setSupportMode] = useState<'none'|'chat'|'ticket'>('none');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    { id:'agent-1', sender:'agent', templateKey:'chatWelcome', time: Date.now() - 8 * 60 * 1000 },
    { id:'agent-2', sender:'agent', templateKey:'chatPrompt', time: Date.now() - 7 * 60 * 1000 }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement|null>(null);
  const chatInputRef = useRef<HTMLInputElement|null>(null);
  const ticketSubjectRef = useRef<HTMLInputElement|null>(null);
  const autoReplyTimeout = useRef<number|null>(null);
  const [ticketForm, setTicketForm] = useState({ subject:'', description:'', category:'order' });
  const [ticketError, setTicketError] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState('');

  const formatTime = (value:number) => {
    try {
      return new Intl.DateTimeFormat((LANGS.find(l=>l.code===lang)||{}).locale||'en-US', { hour:'2-digit', minute:'2-digit' }).format(value);
    } catch {
      return '';
    }
  };

  const closeSupport = () => {
    setSupportMode('none');
    setTicketError('');
    setTicketSuccess('');
  };

  const handleOpenChat = () => {
    setTicketError('');
    setTicketSuccess('');
    setSupportMode('chat');
    setTimeout(()=> chatInputRef.current?.focus(), 160);
  };

  const handleOpenTicket = () => {
    setTicketError('');
    setTicketSuccess('');
    setTicketForm({ subject:'', description:'', category:'order' });
    setSupportMode('ticket');
    setTimeout(()=> ticketSubjectRef.current?.focus(), 160);
  };

  const handleSendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    const message:ChatMessage = { id:`user-${Date.now()}`, sender:'user', text, time: Date.now() };
    setChatMessages(prev => [...prev, message]);
    setChatInput('');
    if (autoReplyTimeout.current) {
      window.clearTimeout(autoReplyTimeout.current);
    }
    autoReplyTimeout.current = window.setTimeout(() => {
      autoReplyTimeout.current = null;
      if (supportMode !== 'chat') return;
      setChatMessages(prev => [...prev, { id:`agent-${Date.now()}`, sender:'agent', templateKey:'chatAck', time: Date.now() }]);
    }, 800);
  };

  const handleTicketSubmit = (event?:React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault?.();
    const subject = ticketForm.subject.trim();
    const description = ticketForm.description.trim();
    if (!subject || !description) {
      setTicketError(t('ticketError'));
      return;
    }
    setTicketError('');
    const ref = `EV-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketSuccess(t('ticketSuccess').replace('{{ref}}', ref));
    setTicketForm({ subject:'', description:'', category:ticketForm.category });
    setTimeout(()=> ticketSubjectRef.current?.focus(), 160);
  };

  useEffect(() => {
    if (supportMode === 'chat') {
      const node = chatContainerRef.current;
      if (node) {
        node.scrollTop = node.scrollHeight;
      }
    }
  }, [supportMode, chatMessages]);

  useEffect(() => {
    return () => {
      if (autoReplyTimeout.current) {
        window.clearTimeout(autoReplyTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (supportMode !== 'chat' && autoReplyTimeout.current) {
      window.clearTimeout(autoReplyTimeout.current);
      autoReplyTimeout.current = null;
    }
  }, [supportMode]);

  // ===== UI tests =====
  useEffect(()=>{
    try { console.assert(document.querySelector('header.sticky'), 'Header exists'); } catch{}
    try { console.assert(typeof t==='function', 't helper available'); } catch{}
  },[]);

  // ===== Render =====
  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900" style={{ backgroundColor: COLORS.grayL }}>
      {/* Header */}
      <header className="sticky top-0 z-40">
        <MobileHeaderCard
          gradientFrom={COLORS.brand}
          searchPlaceholder={t('dashboard')}
          language={lang}
          currency={currency}
          languageOptions={LANGS.map(l => ({ value: l.code, label: l.label }))}
          currencyOptions={CURRENCIES.map(c => ({ value: c.code, label: c.label }))}
          onLanguageChange={setLang}
          onCurrencyChange={setCurrency}
        />
      </header>

      <main className="mx-auto max-w-sm px-4 pt-3 pb-28">
        {/* Profile & Preferences */}
        <Card title={t('profile')}>
          <div className="grid gap-2">
            <Input label={t('name')} value={profile.name} onChange={v=>setProfile({...profile,name:v})} />
            <Input label={t('email')} value={profile.email} onChange={v=>setProfile({...profile,email:v})} />
            <Input label={t('phone')} value={profile.phone} onChange={v=>setProfile({...profile,phone:v})} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="block text-xs text-slate-500">{t('language')}
              <select value={lang} onChange={e=>setLang(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1">
                {LANGS.map(l=> (<option key={l.code} value={l.code}>{l.label}</option>))}
              </select>
            </label>
            <label className="block text-xs text-slate-500">{t('currency')}
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1">
                {CURRENCIES.map(c=> (<option key={c.code} value={c.code}>{c.label}</option>))}
              </select>
            </label>
          </div>
          <div className="mt-3">
            <div className="mb-1 text-xs text-slate-500">{t('defaultMode')}</div>
            <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
              <button onClick={()=>setDefaultMode('retail')} className={`px-3 py-1.5 text-xs rounded-lg ${defaultMode==='retail'?'text-white':'text-slate-600'}`} style={{ background: defaultMode==='retail'?COLORS.brand:'transparent' }}>{t('retail')}</button>
              <button onClick={()=>setDefaultMode('wholesale')} className={`px-3 py-1.5 text-xs rounded-lg ${defaultMode==='wholesale'?'text-white':'text-slate-600'}`} style={{ background: defaultMode==='wholesale'?COLORS.accent:'transparent' }}>{t('wholesale')}</button>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button onClick={()=>{ setSavedMsg(t('saved')); setTimeout(()=>setSavedMsg(''),1200); }} className="rounded-lg bg-black px-3 py-2 text-sm text-white">{t('save')}</button>
          </div>
          {savedMsg && (<div className="pt-1 text-right text-xs text-slate-500">{savedMsg}</div>)}
        </Card>

        {/* Addresses */}
        <Card title={t('addresses')}>
          <div className="space-y-2">
            {addresses.map(a => (
              <div key={a.id} className={`flex flex-wrap items-start gap-2 rounded-lg border p-2 text-sm ${selectedAddrId===a.id? 'border-[#03cd8c] bg-[#03cd8c22]':'border-slate-200 bg-white'}`}>
                <input type="radio" name="addr" checked={selectedAddrId===a.id} onChange={()=>setSelectedAddrId(a.id)} />
                <div className="min-w-0 flex-1">
                  {editingAddr?.id===a.id ? (
                    <div className="grid gap-2">
                      <Input label={t('name')} value={editingAddr.name} onChange={v=>setEditingAddr({...editingAddr, name:v})} />
                      <Input label={t('phone')} value={editingAddr.phone} onChange={v=>setEditingAddr({...editingAddr, phone:v})} />
                      <Input label={'Address line 1'} value={editingAddr.line1} onChange={v=>setEditingAddr({...editingAddr, line1:v})} />
                      <Input label={'Address line 2'} value={editingAddr.line2||''} onChange={v=>setEditingAddr({...editingAddr, line2:v})} optional />
                      <div className="grid grid-cols-2 gap-2">
                        <Input label={'City'} value={editingAddr.city} onChange={v=>setEditingAddr({...editingAddr, city:v})} />
                        <Input label={'Region'} value={editingAddr.region} onChange={v=>setEditingAddr({...editingAddr, region:v})} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input label={'Postal code'} value={editingAddr.postal} onChange={v=>setEditingAddr({...editingAddr, postal:v})} />
                        <Input label={'Country'} value={editingAddr.country} onChange={v=>setEditingAddr({...editingAddr, country:v})} />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={()=>{ setAddresses(prev=> prev.map(x=> x.id===editingAddr.id ? editingAddr : x)); setEditingAddr(null); }} className="rounded border px-2 py-1 text-xs">{t('save')}</button>
                        <button onClick={()=>setEditingAddr(null)} className="rounded border px-2 py-1 text-xs">{t('cancel')}</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="font-medium truncate">{a.name} · {a.phone}</div>
                      <div className="text-[11px] text-slate-600 truncate">{a.line1}{a.line2? ", "+a.line2:''}, {a.city}, {a.region}, {a.postal}, {a.country}</div>
                    </>
                  )}
                </div>
                {editingAddr?.id===a.id ? null : (
                  <div className="mt-2 flex w-full items-center justify-end gap-2">
                    <button onClick={()=> setEditingAddr({...a})} className="rounded border px-2 py-1 text-xs" aria-label={t('edit')} title={t('edit')}><EditIcon/></button>
                    <button onClick={()=> setConfirm({ open:true, id:a.id })} className="rounded border px-2 py-1 text-xs text-red-600 border-red-200" aria-label={t('delete')} title={t('delete')}><TrashIcon/></button>
                  </div>
                )}
              </div>
            ))}
            <button onClick={()=>{ const id='a'+(addresses.length+1); const a={ id, name:profile.name, phone:profile.phone, line1:'', city:'', region:'', postal:'', country:'UG' }; setAddresses(prev=>[a,...prev]); setEditingAddr(a); setSelectedAddrId(id); }} className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm">+ {t('addNew')}</button>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card title={t('paymentMethods')}>
          <div className="grid gap-2">
            {/* Cards */}
            {cards.map(c => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2 text-sm">
                <div className="font-medium">{c.brand} •••• {c.last4}</div>
                <button onClick={()=> setCards(prev=> prev.filter(x=>x.id!==c.id))} className="rounded border px-2 py-1 text-xs text-red-600 border-red-200">{t('delete')}</button>
              </div>
            ))}
            {/* Mobile money */}
            {mobiles.map(m => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2 text-sm">
                <div className="font-medium">{m.network}: {m.number}</div>
                <button onClick={()=> setMobiles(prev=> prev.filter(x=>x.id!==m.id))} className="rounded border px-2 py-1 text-xs text-red-600 border-red-200">{t('delete')}</button>
              </div>
            ))}
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button onClick={()=> setCards(prev=>[{ id:'c'+(prev.length+1), brand:'VISA', last4:'1111' }, ...prev])} className="rounded border px-3 py-2 text-xs">+ {t('card')}</button>
              <button onClick={()=> setMobiles(prev=>[{ id:'m'+(prev.length+1), network:'MTN', number:'+256 700 000000' }, ...prev])} className="rounded border px-3 py-2 text-xs">+ {t('mobileMoney')}</button>
            </div>
          </div>
        </Card>

        {/* Wishlist */}
        <Card title={t('wishlist')}>
          <div className="grid grid-cols-2 gap-3">
            {wishlist.map(w => (
              <div key={w.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="relative" style={{ aspectRatio:'1/1' }}>
                  <img src={w.img} alt="" className="h-full w-full object-cover"/>
                  <button onClick={()=> setWishlist(prev=> prev.map(x=> x.id===w.id ? {...x, fav:!x.fav} : x))} className="absolute right-2 top-2 rounded-full bg-white/90 p-1">{w.fav? <HeartFill/> : <HeartIcon/>}</button>
                </div>
                <div className="p-2 text-xs">
                  <div className="truncate font-medium">{w.name}</div>
                  <div className="text-slate-600">{fmt(w.priceUSD)}</div>
                  <div className="mt-1 flex justify-end"><button onClick={()=> setWishlist(prev=> prev.filter(x=> x.id!==w.id))} className="rounded border px-2 py-1">{t('remove')}</button></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Builds */}
        <Card title={t('builds')}>
          <div className="space-y-2">
            {builds.map(b => {
              const buildUrl = b.route ?? `${ROUTES.configurator}?build=${encodeURIComponent(b.id)}`;
              return (
                <div key={b.id} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 text-sm">
                  <img src={b.img} alt="" className="h-16 w-24 rounded-lg object-cover"/>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{b.title}</div>
                    <div className="truncate text-xs text-slate-600">{b.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{fmt(b.priceUSD)}</div>
                    <Link
                      to={buildUrl}
                      className="mt-1 inline-flex items-center justify-center rounded border px-2 py-1 text-xs transition hover:border-[#03cd8c] hover:text-[#03cd8c]"
                      aria-label={`Open ${b.title}`}
                    >
                      Open
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Notifications */}
        <Card title={t('notifications')}>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <label className="flex items-center gap-2"><input type="checkbox" checked={channels.push} onChange={e=> setChannels({...channels, push:e.target.checked})}/> {t('push')}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={channels.email} onChange={e=> setChannels({...channels, email:e.target.checked})}/> {t('emailCh')}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={channels.sms} onChange={e=> setChannels({...channels, sms:e.target.checked})}/> {t('sms')}</label>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <label className="flex items-center gap-2"><input type="checkbox" checked={topics.order} onChange={e=> setTopics({...topics, order:e.target.checked})}/> {t('order')}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={topics.priceDrop} onChange={e=> setTopics({...topics, priceDrop:e.target.checked})}/> {t('priceDrop')}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={topics.backInStock} onChange={e=> setTopics({...topics, backInStock:e.target.checked})}/> {t('backInStock')}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={topics.rfq} onChange={e=> setTopics({...topics, rfq:e.target.checked})}/> {t('rfq')}</label>
          </div>
        </Card>

        {/* Loyalty */}
        <Card title={t('loyalty')}>
          <div className="grid gap-2 text-sm">
            <div className="rounded-lg border border-slate-200 bg-white p-2">{t('points')}: <span className="font-semibold">{points}</span></div>
            <div className="rounded-lg border border-slate-200 bg-white p-2">{t('storeCredit')}: <span className="font-semibold">{fmt(credit)}</span></div>
            <div className="rounded-lg border border-slate-200 bg-white p-2">
              <div className="text-sm font-semibold">{t('vouchers')}</div>
              <div className="mt-1 space-y-1 text-xs">
                {vouchers.map(v => (
                  <div key={v.code} className="flex items-center justify-between rounded border border-slate-200 bg-white px-2 py-1">
                    <span>{v.code} — {v.desc}</span>
                    <button disabled={v.used} onClick={()=> setVouchers(prev=> prev.map(x=> x.code===v.code? {...x, used:true}:x))} className={`rounded px-2 py-1 ${v.used? 'border border-slate-200 text-slate-400' : 'border border-[#03cd8c] text-[#03cd8c]'}`}>{v.used? 'Used': t('redeem')}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Support */}
        <Card title={t('support')}>
          <div className="text-sm">
            <div className="mb-2 font-semibold">{t('faqs')}</div>
            <Accordion items={[
              { q:'How do I track my order?', a:'Go to Orders > Track to view real‑time updates.' },
              { q:'How do returns work?', a:'Returns are accepted within 14 days of delivery for eligible items.' },
              { q:'Which payment methods are supported?', a:'Cards, Mobile Money, and Bank Transfer are supported in most regions.' },
            ]} />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={handleOpenChat} className="rounded-lg border px-3 py-2 text-sm">{t('chat')}</button>
              <button onClick={handleOpenTicket} className="rounded-lg border px-3 py-2 text-sm">{t('newTicket')}</button>
            </div>
          </div>
        </Card>
      </main>

      {supportMode !== 'none' && (
        <div
          className="fixed inset-0 flex items-end justify-center bg-slate-900/40 px-4 pb-6"
          style={{ zIndex: 60 }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200 shadow-2xl backdrop-blur"
            style={{ background: 'var(--ev-surface)', color: 'var(--ev-text)' }}
            aria-labelledby="support-sheet-title"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-200/60 px-4 py-3">
              <div>
                <div id="support-sheet-title" className="text-sm font-semibold">
                  {supportMode === 'chat' ? t('chatTitle') : t('ticketTitle')}
                </div>
                <div className="text-xs opacity-70">
                  {supportMode === 'chat' ? t('chatSubtitle') : t('ticketSubtitle')}
                </div>
              </div>
              <button
                onClick={closeSupport}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs"
                aria-label={t('close')}
              >
                {t('close')}
              </button>
            </div>

            {supportMode === 'chat' ? (
              <div className="px-4 pb-4 pt-3">
                <div
                  ref={chatContainerRef}
                  className="max-h-64 space-y-2 overflow-y-auto pr-1"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {chatMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`inline-flex max-w-[82%] flex-col rounded-2xl px-3 py-2 text-sm ${
                          msg.sender === 'user'
                            ? 'bg-[#03cd8c] text-white'
                            : 'bg-white/90 text-slate-800'
                        }`}
                        style={
                          msg.sender === 'user'
                            ? undefined
                            : { background: 'var(--ev-surface-muted)', color: 'var(--ev-text)' }
                        }
                      >
                        <span>{msg.templateKey ? t(msg.templateKey) : msg.text}</span>
                        <span className="mt-1 text-[10px] opacity-70">{formatTime(msg.time)}</span>
                      </div>
                    </div>
                  ))}
                  {!chatMessages.length && (
                    <div className="rounded-2xl bg-white/80 p-3 text-xs" style={{ background: 'var(--ev-surface-muted)', color: 'var(--ev-text)' }}>
                      {t('chatPrompt')}
                    </div>
                  )}
                </div>
                <form
                  className="mt-3 flex gap-2"
                  onSubmit={e => {
                    e.preventDefault();
                    handleSendChat();
                  }}
                >
                  <input
                    ref={chatInputRef}
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder={t('messagePlaceholder')}
                    className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2"
                    style={{ background: 'var(--ev-surface-muted)', color: 'var(--ev-text)' }}
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#03cd8c] px-4 py-2 text-sm font-semibold text-white shadow-sm"
                  >
                    {t('sendMessage')}
                  </button>
                </form>
              </div>
            ) : (
              <form className="space-y-3 px-4 pb-4 pt-3" onSubmit={handleTicketSubmit}>
                <label className="block text-xs" style={{ color: 'var(--ev-text-muted)' }}>
                  {t('ticketSubject')}
                  <input
                    ref={ticketSubjectRef}
                    value={ticketForm.subject}
                    onChange={e => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2"
                    style={{ background: 'var(--ev-surface-muted)', color: 'var(--ev-text)' }}
                  />
                </label>
                <label className="block text-xs" style={{ color: 'var(--ev-text-muted)' }}>
                  {t('ticketCategory')}
                  <select
                    value={ticketForm.category}
                    onChange={e => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2"
                    style={{ background: 'var(--ev-surface-muted)', color: 'var(--ev-text)' }}
                  >
                    <option value="order">{t('ticketOrder')}</option>
                    <option value="billing">{t('ticketBilling')}</option>
                    <option value="tech">{t('ticketTech')}</option>
                  </select>
                </label>
                <label className="block text-xs" style={{ color: 'var(--ev-text-muted)' }}>
                  {t('ticketDetails')}
                  <textarea
                    value={ticketForm.description}
                    onChange={e => setTicketForm({ ...ticketForm, description: e.target.value })}
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2"
                    style={{ background: 'var(--ev-surface-muted)', color: 'var(--ev-text)' }}
                  />
                </label>
                {ticketError && <div className="text-xs text-red-500">{ticketError}</div>}
                {ticketSuccess && <div className="text-xs text-emerald-600">{ticketSuccess}</div>}
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={closeSupport}
                    className="rounded-full border border-slate-300 px-3 py-2 text-sm"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-[#03cd8c] px-3 py-2 text-sm font-semibold text-white shadow-sm"
                  >
                    {t('submitTicket')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Confirm dialog */}
      {confirm.open && (
        <ConfirmDialog
          title={t('confirmDelete')}
          cancelLabel={t('cancel')}
          confirmLabel={t('delete')}
          onCancel={()=> setConfirm({ open:false, id:null })}
          onConfirm={()=>{
            const id = confirm.id;
            setConfirm({ open:false, id:null });
            setAddresses(prev=> prev.filter(a=> a.id!==id));
            if (selectedAddrId===id) setSelectedAddrId(addresses.find(a=> a.id!==id)?.id || '');
          }}
        />
      )}

      {/* Footer actions (bottom nav) */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-sm items-center justify-between px-6 py-2 text-[11px]">
          <NavItem label="Home" color={COLORS.brandDark} icon={<HomeIcon/>} to={ROUTES.home} />
          <NavItem label="Categories" color={COLORS.brandDark} icon={<GridIcon/>} to={ROUTES.categories} />
          <NavItem label="Search" color={COLORS.brandDark} icon={<SearchIcon/>} to={ROUTES.productList} />
          <NavItem label="Cart" color={COLORS.brandDark} icon={<CartIcon/>} to={ROUTES.cart} />
          <NavItem label="Profile" active color={COLORS.brand} icon={<UserIcon/>} to={ROUTES.dashboard} />
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}

// ===== Reusable components =====
function Card({ title, children }:{ title:string; children:any }){
  return (
    <section className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-3 text-sm font-semibold text-slate-800">{title}</div>
      <div className="space-y-3 p-3">{children}</div>
    </section>
  );
}
function Input({ label, value, onChange, optional }:{ label:string; value:string; onChange:(v:string)=>void; optional?:boolean }){
  return (
    <label className="block text-xs text-slate-500">
      {label}{optional? ' (optional)': ''}
      <input value={value} onChange={e=>onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
    </label>
  );
}
function Accordion({ items }:{ items:{ q:string; a:string }[] }){
  const [open, setOpen] = useState<number|null>(null);
  return (
    <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {items.map((it,idx)=> (
        <div key={idx}>
          <button onClick={()=> setOpen(o=> o===idx? null: idx)} className="flex w-full items-center justify-between px-3 py-2 text-left text-sm">
            <span className="font-medium">{it.q}</span>
            <span className="text-slate-400">{open===idx? '▾':'▸'}</span>
          </button>
          {open===idx && (<div className="px-3 pb-2 text-xs text-slate-600">{it.a}</div>)}
        </div>
      ))}
    </div>
  );
}
function ConfirmDialog({ title, cancelLabel, confirmLabel, onCancel, onConfirm }:{
  title:string;
  cancelLabel:string;
  confirmLabel:string;
  onCancel:()=>void;
  onConfirm:()=>void;
}){
  return (
    <div className="fixed inset-0 z-[999] grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel}/>
      <div className="relative w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
        <div className="mb-2 text-sm font-semibold text-slate-800">{title}</div>
        <div className="mb-3 text-xs text-slate-600">This cannot be undone.</div>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="rounded border px-3 py-1.5 text-sm">{cancelLabel}</button>
          <button onClick={onConfirm} className="rounded bg-red-600 px-3 py-1.5 text-sm text-white">{confirmLabel}</button>
        </div>
      </div>
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
function EditIcon(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
  );
}
function TrashIcon(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M15 6V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2"/></svg>
  );
}
function HeartIcon(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-.9-.9a5.5 5.5 0 1 0-7.8 7.8l.9.9L12 21l7.8-7.6.9-.9a5.5 5.5 0 0 0 0-7.8z"/></svg>
  );
}
function HeartFill(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-.9-.9a5.5 5.5 0 1 0-7.8 7.8l.9.9L12 21l7.8-7.6.9-.9a5.5 5.5 0 0 0 0-7.8z"/></svg>
  );
}
function SearchIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>); }
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>); }
function GridIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>); }
function CartIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>); }
function UserIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
