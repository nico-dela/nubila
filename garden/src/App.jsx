import { lazy, Suspense, useEffect, useState } from "react";
import AmbientMute from "./components/AmbientMute";
import LanguageSwitcher from "./components/LanguageSwitcher";
import LinktreeLink from "./components/LinktreeLink";
import PoeticMenu from "./components/PoeticMenu";
import ThemeSwitcher from "./components/ThemeSwitcher";
import EntrancePage from "./pages/EntrancePage";
import { LocaleProvider } from "./i18n/LocaleContext";
import { ThemeProvider } from "./theme/ThemeContext";
import "./styles/App.css";
import "./styles/ChromeControls.css";

const RoomOverlay = lazy(() => import("./components/RoomOverlay"));

const AMBIENT_MUTE_KEY = "nubila-garden-ambient-muted";

function readAmbientMuted() {
  try {
    return window.localStorage.getItem(AMBIENT_MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

function GardenShell() {
  const [panel, setPanel] = useState(null);
  const [mediaPlaying, setMediaPlaying] = useState(false);
  const [ambientMuted, setAmbientMuted] = useState(readAmbientMuted);

  useEffect(() => {
    try {
      window.localStorage.setItem(AMBIENT_MUTE_KEY, ambientMuted ? "1" : "0");
    } catch {
      /* ignore quota / private mode */
    }
  }, [ambientMuted]);

  const closePanel = () => {
    setMediaPlaying(false);
    setPanel(null);
  };

  const openDimension = (id) => {
    if (!id) {
      closePanel();
      return;
    }
    setMediaPlaying(false);
    setPanel({ type: "dimension", id });
  };

  const openSection = (id) => {
    setMediaPlaying(false);
    setPanel({ type: "section", id });
  };

  const onMenuSelect = (id) => {
    if (id === "room") {
      closePanel();
      return;
    }
    openSection(id);
  };

  const panelOpen = Boolean(panel);

  return (
    <div className={`garden-app${panelOpen ? " is-panel-open" : ""}`}>
      <div className="garden-app__backdrop" inert={panelOpen || undefined}>
        <PoeticMenu onSelect={onMenuSelect} />
        <div className="chrome-controls">
          <AmbientMute
            muted={ambientMuted}
            onToggle={() => setAmbientMuted((v) => !v)}
          />
          <ThemeSwitcher />
          <LanguageSwitcher />
          <LinktreeLink />
        </div>
        <EntrancePage
          panelOpen={panelOpen}
          mediaPlaying={mediaPlaying}
          ambientMuted={ambientMuted}
          onSelectDimension={openDimension}
        />
      </div>
      {panel ? (
        <Suspense fallback={null}>
          <RoomOverlay
            panel={panel}
            onMediaPlaybackChange={setMediaPlaying}
            onClose={closePanel}
            onOpenDimension={openDimension}
            onOpenSection={openSection}
          />
        </Suspense>
      ) : null}
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
