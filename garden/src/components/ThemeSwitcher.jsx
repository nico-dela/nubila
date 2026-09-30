import { useLocale } from "../i18n/LocaleContext";
import { useTheme } from "../theme/ThemeContext";
import { IconMoon, IconSun } from "./ChromeIcons";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { tUi } = useLocale();

  return (
    <div className="theme-switcher" role="group" aria-label={tUi("theme")}>
      <button
        type="button"
        className={`theme-switcher__btn chrome-icon-btn${
          theme === "light" ? " is-active" : ""
        }`}
        aria-pressed={theme === "light"}
        aria-label={tUi("themeLight")}
        title={tUi("themeLight")}
        onClick={() => setTheme("light")}
      >
        <IconSun />
      </button>
      <span className="theme-switcher__sep" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`theme-switcher__btn chrome-icon-btn${
          theme === "dark" ? " is-active" : ""
        }`}
        aria-pressed={theme === "dark"}
        aria-label={tUi("themeDark")}
        title={tUi("themeDark")}
        onClick={() => setTheme("dark")}
      >
        <IconMoon />
      </button>
    </div>
  );
}
