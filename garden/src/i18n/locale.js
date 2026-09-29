export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";
export const LOCALE_STORAGE_KEY = "nubila-garden-locale";

/** Resolve a bilingual field (`string` or `{ es, en }`) for the active locale. */
export function pickLocale(value, locale) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] ?? value.es ?? value.en ?? "";
}

export function readStoredLocale() {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (LOCALES.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}

export function writeStoredLocale(locale) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}
