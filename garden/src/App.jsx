import { useState } from "react";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ThemeSwitcher from "./components/ThemeSwitcher";
import EntrancePage from "./pages/EntrancePage";
import { LocaleProvider } from "./i18n/LocaleContext";
import { ThemeProvider } from "./theme/ThemeContext";
import "./styles/App.css";
import "./styles/ThemeSwitcher.css";

const PANEL_DEFAULT = 328;

function GardenShell() {
  const [panel, setPanel] = useState(null);
  const [panelWidthPx, setPanelWidthPx] = useState(PANEL_DEFAULT);

  const closePanel = () => setPanel(null);

  const openDimension = (id) => {
    if (!id) {
      closePanel();
      return;
    }
    setPanel({ type: "dimension", id });
  };

  const openSection = (id) => {
    setPanel({ type: "section", id });
  };

  return (
    <div
      className={`garden-app${panel ? " is-panel-open" : ""}`}
      style={{ "--panel-w": `${panelWidthPx}px` }}
    >
      <div className="chrome-controls">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      <EntrancePage
        panel={panel}
        panelWidthPx={panelWidthPx}
        onPanelWidthChange={setPanelWidthPx}
        onSelectDimension={openDimension}
        onOpenSection={openSection}
        onClose={closePanel}
      />
    </div>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <GardenShell />
      </ThemeProvider>
    </LocaleProvider>
  );
}
