import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LOCALE,
  pickLocale,
  readStoredLocale,
  writeStoredLocale,
} from "./locale";
import { ui } from "./ui";

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    writeStoredLocale(locale);
  }, [locale]);

  const value = useMemo(() => {
    const setLocale = (next) => {
      setLocaleState(next === "en" ? "en" : "es");
    };
    const t = (value) => pickLocale(value, locale);
    const tUi = (key) => pickLocale(ui[key], locale);
    return { locale, setLocale, t, tUi, ui };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
