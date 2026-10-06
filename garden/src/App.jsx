import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import AmbientMute from "./components/AmbientMute";
import LanguageSwitcher from "./components/LanguageSwitcher";
import LinktreeLink from "./components/LinktreeLink";
import PoeticMenu from "./components/PoeticMenu";
import ThemeSwitcher from "./components/ThemeSwitcher";
import EntrancePage from "./pages/EntrancePage";
import { getDimensionById } from "./data/dimensions";
import { LocaleProvider } from "./i18n/LocaleContext";
import { ThemeProvider } from "./theme/ThemeContext";
import "./styles/App.css";
import "./styles/ChromeControls.css";

const RoomOverlay = lazy(() => import("./components/RoomOverlay"));
const PdfViewer = lazy(() => import("./components/PdfViewer"));
const EmbedViewer = lazy(() => import("./components/EmbedViewer"));

const AMBIENT_MUTE_KEY = "nubila-garden-ambient-muted";

function readAmbientMuted() {
  try {
    return window.localStorage.getItem(AMBIENT_MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

function PdfSuspenseFallback() {
  return (
    <div
      className="pdf-viewer pdf-viewer--fullscreen pdf-viewer--fallback"
      aria-hidden="true"
    />
  );
}

function EmbedSuspenseFallback() {
  return (
    <div
      className="embed-viewer embed-viewer--fullscreen embed-viewer--fallback"
      aria-hidden="true"
    />
  );
}

function GardenShell() {
  const [panel, setPanel] = useState(null);
  const [pdfDimension, setPdfDimension] = useState(null);
  const [embedDimension, setEmbedDimension] = useState(null);
  const [mediaPlaying, setMediaPlaying] = useState(false);
  const [ambientMuted, setAmbientMuted] = useState(readAmbientMuted);

  useEffect(() => {
    try {
      window.localStorage.setItem(AMBIENT_MUTE_KEY, ambientMuted ? "1" : "0");
    } catch {
      /* ignore quota / private mode */
    }
  }, [ambientMuted]);

  const closePanel = useCallback(() => {
    setMediaPlaying(false);
    setPanel(null);
    setPdfDimension(null);
    setEmbedDimension(null);
  }, []);

  const openDimension = (id) => {
    if (!id) {
      closePanel();
      return;
    }
    setMediaPlaying(false);
    const dimension = getDimensionById(id);
    if (dimension?.pdf) {
      setPanel(null);
      setEmbedDimension(null);
      setPdfDimension(dimension);
      return;
    }
    if (dimension?.embed) {
      setPanel(null);
      setPdfDimension(null);
      setEmbedDimension(dimension);
      return;
    }
    setPdfDimension(null);
    setEmbedDimension(null);
    setPanel({ type: "dimension", id });
  };

  const openSection = (id) => {
    setMediaPlaying(false);
    setPdfDimension(null);
    setEmbedDimension(null);
    setPanel({ type: "section", id });
  };

  const onMenuSelect = (id) => {
    if (id === "room") {
      closePanel();
      return;
    }
    openSection(id);
  };

  const panelOpen = Boolean(panel || pdfDimension || embedDimension);

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
      {pdfDimension?.pdf ? (
        <Suspense fallback={<PdfSuspenseFallback />}>
          <PdfViewer
            key={pdfDimension.pdf.src}
            pdf={pdfDimension.pdf}
            onClose={closePanel}
          />
        </Suspense>
      ) : null}
      {embedDimension?.embed ? (
        <Suspense fallback={<EmbedSuspenseFallback />}>
          <EmbedViewer
            key={embedDimension.id}
            embed={embedDimension.embed}
            onClose={closePanel}
            onPlaybackChange={setMediaPlaying}
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
