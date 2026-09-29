import { useLocale } from "../i18n/LocaleContext";
import { useTheme } from "../theme/ThemeContext";
import "../styles/ThemeSwitcher.css";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { tUi } = useLocale();

  return (
    <div className="theme-switcher" role="group" aria-label={tUi("theme")}>
      <button
        type="button"
        className={`theme-switcher__btn${theme === "light" ? " is-active" : ""}`}
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
      >
        {tUi("themeLight")}
      </button>
      <span className="theme-switcher__sep" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`theme-switcher__btn${theme === "dark" ? " is-active" : ""}`}
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        {tUi("themeDark")}
      </button>
    </div>
  );
}
