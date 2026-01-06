import React from 'react';
import brandLogoDefault from '../assets/hilder-logo.svg';

type Option = {
  value: string;
  label: string;
};

type Props = {
  gradientFrom: string;
  gradientTo?: string;
  locationLabel?: string;
  brandName?: string;
  brandLogoSrc?: string;
  brandLogoAlt?: string;
  brandTagline?: string;
  searchPlaceholder: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  language: string;
  currency: string;
  languageOptions: Option[];
  currencyOptions: Option[];
  onLanguageChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export default function MobileHeaderCard({
  gradientFrom,
  gradientTo = '#07b77b',
  locationLabel = 'Kampala',
  brandName = 'Hilder',
  brandLogoSrc,
  brandLogoAlt,
  brandTagline = 'Hilder Car Accessories',
  searchPlaceholder,
  searchValue,
  onSearchChange,
  language,
  currency,
  languageOptions,
  currencyOptions,
  onLanguageChange,
  onCurrencyChange,
  leadingSlot,
  trailingSlot,
  children,
  className = ''
}: Props) {
  const controlledSearch = typeof onSearchChange === 'function';
  const logoSrc = brandLogoSrc ?? brandLogoDefault;
  const inputProps = controlledSearch
    ? { value: searchValue ?? '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value) }
    : searchValue !== undefined
      ? { defaultValue: searchValue }
      : {};

  return (
    <div
      className={`mx-4 mt-3 sm:mx-auto sm:max-w-sm ${className}`.trim()}
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px))' }}
    >
      <div
        className="rounded-2xl px-4 pt-3 pb-3 shadow-lg sm:px-5"
        style={{ background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 100%)`, color: '#fff' }}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {leadingSlot}
              <div className="flex items-center gap-1 text-[11px] font-medium text-white/90">
                <span role="img" aria-label="Location">📍</span>
                <span className="truncate">{locationLabel}</span>
              </div>
            </div>
            <div className="flex items-center">
              {trailingSlot ?? (
                <button
                  aria-label="Notifications"
                  className="grid h-9 w-9 place-items-center rounded-full border border-transparent bg-white text-slate-500 shadow-sm transition hover:text-slate-700"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {logoSrc ? (
              <div className="flex h-9 w-full items-center gap-1.5 rounded-full border border-transparent bg-white px-3 shadow-sm sm:flex-1">
                <div className="flex h-6 w-12 items-center justify-center overflow-hidden rounded-md bg-slate-900/95">
                  <img
                    src={logoSrc}
                    alt={brandLogoAlt ?? brandName}
                    className="max-h-full w-full object-contain"
                    style={{ imageRendering: 'auto' }}
                  />
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="truncate text-[12px] font-semibold text-slate-900">{brandName}</div>
                  <div className="truncate text-[9px] uppercase tracking-[0.12em] text-emerald-500">{brandTagline}</div>
                </div>
              </div>
            ) : (
              <div className="text-sm font-semibold leading-tight tracking-tight">{brandName}</div>
            )}
            <label className="group relative w-full min-w-[10rem] sm:flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="search"
                placeholder={searchPlaceholder}
                className="h-9 w-full rounded-full border border-transparent bg-white pl-9 pr-3 text-sm text-slate-900 outline-none shadow-sm transition focus:ring-2"
                style={{ ['--tw-ring-color' as any]: `${gradientFrom}55` }}
                {...inputProps}
              />
            </label>
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-1.5">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="h-9 w-full rounded-full border border-transparent bg-white px-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 sm:flex-1"
            style={{ ['--tw-ring-color' as any]: `${gradientFrom}55` }}
            aria-label="Select language"
          >
            {languageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="h-9 w-full rounded-full border border-transparent bg-white px-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 sm:flex-1"
            style={{ ['--tw-ring-color' as any]: `${gradientFrom}55` }}
            aria-label="Select currency"
          >
            {currencyOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {children ? <div className="mt-3">{children}</div> : null}
      </div>
    </div>
  );
}
