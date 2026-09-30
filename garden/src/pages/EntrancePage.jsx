import CabinetCanvas from "../components/CabinetCanvas";
import "../styles/EntrancePage.css";

export default function EntrancePage({
  panelOpen = false,
  mediaPlaying,
  ambientMuted = false,
  onSelectDimension,
}) {
  return (
    <main className="entrance-page">
      <CabinetCanvas
        panelOpen={panelOpen}
        mediaPlaying={mediaPlaying}
        ambientMuted={ambientMuted}
        onSelectDimension={onSelectDimension}
      />
    </main>
  );
}
