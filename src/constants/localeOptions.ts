export const LANGUAGE_OPTIONS = [
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
] as const;

export const CURRENCY_OPTIONS = [
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
] as const;

export type LanguageOption = typeof LANGUAGE_OPTIONS[number];
export type CurrencyOption = typeof CURRENCY_OPTIONS[number];

