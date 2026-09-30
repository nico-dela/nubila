import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Puff } from "react-loader-spinner";
import FirstPersonRoom from "../components/map/FirstPersonRoom";
import RoomMapHeader from "../components/map/RoomMapHeader";
import RoomLookHint from "../components/map/RoomLookHint";
import MapPlaceholderModal from "../components/map/MapPlaceholderModal";
import {
  hotspotToModalZone,
  roomHotspots,
} from "../data/roomHotspots";
import "../styles/MapPage.css";

const MapPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const debug = searchParams.get("debugRoom") === "1";

  const [selectedZone, setSelectedZone] = useState(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState(null);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [showHint, setShowHint] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const readyTimerRef = useRef(null);

  useEffect(() => {
    readyTimerRef.current = window.setTimeout(() => setSceneReady(true), 400);
    return () => {
      if (readyTimerRef.current) {
        window.clearTimeout(readyTimerRef.current);
      }
    };
  }, []);

  const handleHotspotSelect = (hotspot) => {
    setShowHint(false);
    if (hotspot.album.status === "available" && hotspot.album.route) {
      navigate(hotspot.album.route);
      return;
    }
    setSelectedZone(hotspotToModalZone(hotspot));
  };

  const handleHoverChange = (id, hotspot) => {
    setHoveredHotspotId(id);
    setHoveredHotspot(hotspot);
  };

  const tooltip = useMemo(() => {
    if (!hoveredHotspot) return null;
    return `${hoveredHotspot.album.title} · ${hoveredHotspot.album.year}`;
  }, [hoveredHotspot]);

  return (
    <div className="map-page">
      <RoomMapHeader />

      <Link to="/" className="map-page__back">
        Volver a Oceánica
      </Link>

      <div className="map-page__stage">
        {!sceneReady && (
          <div className="map-page__loading" aria-live="polite">
            <Puff
              height={72}
              width={72}
              radius={1}
              color="#2D6A6A"
              ariaLabel="Cargando habitación"
            />
          </div>
        )}
        <Suspense fallback={null}>
          <FirstPersonRoom
            onHotspotSelect={handleHotspotSelect}
            hoveredHotspotId={hoveredHotspotId}
            onHoverChange={handleHoverChange}
            onInteract={() => setShowHint(false)}
            debug={debug}
          />
        </Suspense>

        {tooltip && <div className="map-page__tooltip">{tooltip}</div>}
        <RoomLookHint visible={showHint} />
      </div>

      <ul className="sr-only">
        {roomHotspots.map((hotspot) => (
          <li key={hotspot.id}>
            <button type="button" onClick={() => handleHotspotSelect(hotspot)}>
              {hotspot.album.title}
            </button>
          </li>
        ))}
      </ul>

      <MapPlaceholderModal
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
      />
    </div>
  );
};

export default MapPage;
