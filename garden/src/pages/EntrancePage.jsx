import CabinetCanvas from "../components/CabinetCanvas";
import RoomOverlay from "../components/RoomOverlay";
import "../styles/EntrancePage.css";

export default function EntrancePage({
  panel,
  panelWidthPx,
  onPanelWidthChange,
  onSelectDimension,
  onOpenSection,
  onClose,
}) {
  return (
    <main className="entrance-page">
      <CabinetCanvas
        panelOpen={Boolean(panel)}
        panelWidthPx={panelWidthPx}
        onSelectDimension={onSelectDimension}
      />
      <RoomOverlay
        panel={panel}
        panelWidthPx={panelWidthPx}
        onPanelWidthChange={onPanelWidthChange}
        onClose={onClose}
        onOpenDimension={onSelectDimension}
        onOpenSection={onOpenSection}
      />
    </main>
  );
}
