import { useLocale } from "../i18n/LocaleContext";
import "../styles/LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { locale, setLocale, tUi } = useLocale();

  return (
    <div className="language-switcher" role="group" aria-label={tUi("language")}>
      <button
        type="button"
        className={`language-switcher__btn${locale === "es" ? " is-active" : ""}`}
        aria-pressed={locale === "es"}
        onClick={() => setLocale("es")}
      >
        ES
      </button>
      <span className="language-switcher__sep" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`language-switcher__btn${locale === "en" ? " is-active" : ""}`}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  );
}
