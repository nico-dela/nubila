import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  applyThemeToDocument,
  readStoredTheme,
  writeStoredTheme,
} from "./theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStoredTheme);

  useEffect(() => {
    applyThemeToDocument(theme);
    writeStoredTheme(theme);
  }, [theme]);

  const value = useMemo(() => {
    const setTheme = (next) => {
      setThemeState(next === "dark" ? "dark" : "light");
    };
    const toggleTheme = () => {
      setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
    };
    return { theme, setTheme, toggleTheme, isDark: theme === "dark" };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
