import { useEffect, useMemo, useRef, useState } from "react";
import { layoutRoomObjects } from "../data/layoutObjects";
import { useLocale } from "../i18n/LocaleContext";
import { useReduceMotion } from "../motion/ReduceMotionContext";
import {
  hasTiltApi,
  requestTiltPermission,
  subscribeTilt,
} from "../lib/tiltParallax";
import polvoTunnelUrl from "../assets/music/Polvo-tunnel.ogg";
import "../styles/CabinetCanvas.css";

const ZOOM_MS = 1150;
const PARALLAX_LERP = 0.18;
const ABOUT_ID = "nubila-about";
/** Matches --panel-w clamp mid for zoom focus math before layout measures. */
const PANEL_RATIO_FALLBACK = 0.3;
const AUDIO_BASE_VOL = 0.32;
const AUDIO_MAX_VOL = 0.62;

function resolveCssLengthPx(host, property) {
  if (!host) return 0;
  const probe = document.createElement("div");
  probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:var(${property})`;
  host.appendChild(probe);
  const width = probe.getBoundingClientRect().width;
  probe.remove();
  return width;
}

function isCoarsePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

export default function CabinetCanvas({
  panelOpen,
  mediaPlaying = false,
  ambientMuted = false,
  onSelectDimension,
}) {
  const { t, tUi } = useLocale();
  const { reduceMotion } = useReduceMotion();
  const debug =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("debugSectors") === "1";
  const [hovered, setHovered] = useState(null);
  const [pressedId, setPressedId] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 50, y: 50 });
  const [focusId, setFocusId] = useState(null);
  /** idle | in | held | out */
  const [zoomPhase, setZoomPhase] = useState("idle");
  const [mobileHint, setMobileHint] = useState(false);
  /** off | pending | on | denied */
  const [tiltState, setTiltState] = useState("off");

  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const targetParallax = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const zoomTimerRef = useRef(0);
  const wasPanelOpen = useRef(false);
  const zoomPhaseRef = useRef(zoomPhase);
  const touchDragRef = useRef(null);
  const audioRef = useRef(null);
  const audioStartedRef = useRef(false);
  const mediaPlayingRef = useRef(mediaPlaying);
  const ambientMutedRef = useRef(ambientMuted);
  const reduceMotionRef = useRef(reduceMotion);
  const tiltAskedRef = useRef(false);
  const tiltUnsubRef = useRef(null);
  const lockedRef = useRef(false);
  mediaPlayingRef.current = mediaPlaying;
  ambientMutedRef.current = ambientMuted;
  reduceMotionRef.current = reduceMotion;
  zoomPhaseRef.current = zoomPhase;

  const zoomMs = reduceMotion ? 0 : ZOOM_MS;

  const layoutSeed = useMemo(() => Date.now() % 1e9, []);
  const objects = useMemo(() => layoutRoomObjects(layoutSeed), [layoutSeed]);

  const zoomedIn = zoomPhase === "in" || zoomPhase === "held";
  const locked = zoomPhase !== "idle" || panelOpen;
  const focusing = Boolean(focusId);
  lockedRef.current = locked;

  useEffect(() => {
    setMobileHint(isCoarsePointer());
  }, []);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const hint = useMemo(() => {
    if (debug) return tUi("hintDebug");
    if (!mobileHint || reduceMotion) return tUi("hint");
    if (tiltState === "on") return tUi("hintMobileTilt");
    if (tiltState === "denied") return tUi("hintMobileDrag");
    return tUi("hintMobile");
  }, [debug, mobileHint, reduceMotion, tiltState, tUi]);

  useEffect(() => {
    const tick = () => {
      const cur = currentParallax.current;
      const target = reduceMotionRef.current
        ? { x: 0, y: 0 }
        : targetParallax.current;
      const lerp = reduceMotionRef.current ? 1 : PARALLAX_LERP;
      cur.x += (target.x - cur.x) * lerp;
      cur.y += (target.y - cur.y) * lerp;

      const mag = Math.min(1, Math.hypot(cur.x, cur.y));

      if (rootRef.current) {
        rootRef.current.style.setProperty("--parallax-x", cur.x.toFixed(4));
        rootRef.current.style.setProperty("--parallax-y", cur.y.toFixed(4));
        rootRef.current.style.setProperty("--parallax-mag", mag.toFixed(4));
      }

      const audio = audioRef.current;
      if (
        audio &&
        audioStartedRef.current &&
        !mediaPlayingRef.current &&
        !ambientMutedRef.current
      ) {
        const vol =
          AUDIO_BASE_VOL + mag * (AUDIO_MAX_VOL - AUDIO_BASE_VOL);
        audio.volume = locked ? AUDIO_BASE_VOL * 0.55 : vol;
        audio.playbackRate = 0.96 + mag * 0.1;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [locked]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioStartedRef.current) return;
    if (ambientMuted || mediaPlaying) {
      audio.pause();
      return;
    }
    audio.play().catch(() => {});
  }, [ambientMuted, mediaPlaying]);

  useEffect(() => {
    return () => {
      if (zoomTimerRef.current) window.clearTimeout(zoomTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const closing = wasPanelOpen.current && !panelOpen;
    wasPanelOpen.current = panelOpen;
    if (!closing) return;

    const phase = zoomPhaseRef.current;
    if (phase === "held" || phase === "in") {
      if (zoomTimerRef.current) window.clearTimeout(zoomTimerRef.current);
      const outMs = reduceMotionRef.current ? 0 : ZOOM_MS;
      if (outMs === 0) {
        setZoomPhase("idle");
        setFocusId(null);
        targetParallax.current = { x: 0, y: 0 };
        return;
      }
      setZoomPhase("out");
      zoomTimerRef.current = window.setTimeout(() => {
        setZoomPhase("idle");
        setFocusId(null);
        targetParallax.current = { x: 0, y: 0 };
      }, outMs);
      return;
    }

    setZoomPhase("idle");
    setFocusId(null);
  }, [panelOpen]);

  useEffect(() => {
    return () => {
      tiltUnsubRef.current?.();
      tiltUnsubRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!reduceMotion) return;
    tiltUnsubRef.current?.();
    tiltUnsubRef.current = null;
    targetParallax.current = { x: 0, y: 0 };
    setTiltState((s) => (s === "on" || s === "pending" ? "off" : s));
  }, [reduceMotion]);

  const enableTiltFromGesture = () => {
    if (
      reduceMotionRef.current ||
      !mobileHint ||
      tiltAskedRef.current ||
      !hasTiltApi()
    ) {
      return;
    }
    tiltAskedRef.current = true;
    setTiltState("pending");

    requestTiltPermission().then((status) => {
      if (status === "denied" || status === "unsupported") {
        setTiltState(status === "denied" ? "denied" : "off");
        return;
      }

      let gotReady = false;
      const failTimer = window.setTimeout(() => {
        if (gotReady) return;
        tiltUnsubRef.current?.();
        tiltUnsubRef.current = null;
        setTiltState("denied");
      }, 2500);

      tiltUnsubRef.current?.();
      tiltUnsubRef.current = subscribeTilt({
        isActive: () =>
          !reduceMotionRef.current &&
          !lockedRef.current &&
          !touchDragRef.current,
        onReady: () => {
          gotReady = true;
          window.clearTimeout(failTimer);
          setTiltState("on");
        },
        onTilt: (next) => {
          if (reduceMotionRef.current) return;
          targetParallax.current = next;
        },
      });
    });
  };

  const ensureAudio = () => {
    if (audioStartedRef.current) return;

    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(polvoTunnelUrl);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = AUDIO_BASE_VOL;
      audioRef.current = audio;
    }

    audioStartedRef.current = true;
    if (ambientMutedRef.current || mediaPlayingRef.current) return;
    audio.play().catch(() => {
      audioStartedRef.current = false;
    });
  };

  const updateParallaxFromClient = (clientX, clientY) => {
    if (reduceMotionRef.current || locked || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    targetParallax.current = {
      x: ((clientX - rect.left) / rect.width) * 2 - 1,
      y: ((clientY - rect.top) / rect.height) * 2 - 1,
    };
  };

  const setTooltipFromElement = (el, labelY = 50) => {
    const frame = frameRef.current?.getBoundingClientRect();
    if (!frame || !el) {
      setTooltipPos({ x: 50, y: labelY });
      return;
    }
    const box = el.getBoundingClientRect();
    setTooltipPos({
      x: ((box.left + box.width / 2 - frame.left) / frame.width) * 100,
      y: ((box.top - frame.top) / frame.height) * 100,
    });
  };

  const openDimension = (dimensionId) => {
    setZoomPhase("held");
    onSelectDimension(dimensionId);
  };

  const beginZoomToElement = (el, dimensionId, id) => {
    if (locked) return;
    ensureAudio();
    setHovered(null);
    setPressedId(null);
    setFocusId(id);

    const frame = frameRef.current?.getBoundingClientRect();
    const box = el?.getBoundingClientRect();
    let cx = 50;
    let cy = 42;
    if (frame && box) {
      cx = ((box.left + box.width / 2 - frame.left) / frame.width) * 100;
      cy = ((box.top + box.height / 2 - frame.top) / frame.height) * 100;
    }

    let panelRatio = PANEL_RATIO_FALLBACK;
    if (frame && rootRef.current) {
      const panelPx = resolveCssLengthPx(rootRef.current, "--panel-w");
      if (panelPx > 0 && frame.width > 0) {
        panelRatio = Math.min(0.45, panelPx / frame.width);
      }
    }
    const focusCx = ((1 - panelRatio) / 2) * 100;
    const focusCy = 46;

    if (rootRef.current) {
      rootRef.current.style.setProperty("--zoom-x", `${cx}%`);
      rootRef.current.style.setProperty("--zoom-y", `${cy}%`);
      rootRef.current.style.setProperty("--focus-cx", `${focusCx}%`);
      rootRef.current.style.setProperty("--focus-cy", `${focusCy}%`);
    }
    targetParallax.current = { x: 0, y: 0 };

    if (zoomMs === 0) {
      openDimension(dimensionId);
      return;
    }

    setZoomPhase("in");

    if (zoomTimerRef.current) window.clearTimeout(zoomTimerRef.current);
    zoomTimerRef.current = window.setTimeout(() => {
      openDimension(dimensionId);
    }, zoomMs);
  };

  const handleActivate = (obj, el) => {
    beginZoomToElement(el, obj.dimensionId, obj.id);
  };

  const handleWordmarkActivate = (el) => {
    beginZoomToElement(el, ABOUT_ID, ABOUT_ID);
  };

  const onCanvasPointerDown = (e) => {
    if (locked) return;
    ensureAudio();
    enableTiltFromGesture();

    if (
      e.target.closest(
        ".cabinet-canvas__object, .cabinet-canvas__wordmark, .cabinet-canvas__planet-hit",
      )
    ) {
      return;
    }
    touchDragRef.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      px: targetParallax.current.x,
      py: targetParallax.current.y,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onCanvasPointerMove = (e) => {
    if (locked || reduceMotionRef.current) return;
    const drag = touchDragRef.current;
    if (drag && drag.id === e.pointerId) {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = (e.clientX - drag.x) / rect.width;
      const dy = (e.clientY - drag.y) / rect.height;
      targetParallax.current = {
        x: Math.max(-1, Math.min(1, drag.px + dx * 2.4)),
        y: Math.max(-1, Math.min(1, drag.py + dy * 2.4)),
      };
      return;
    }
    if (e.pointerType === "mouse") {
      updateParallaxFromClient(e.clientX, e.clientY);
    }
  };

  const onCanvasPointerUp = (e) => {
    if (touchDragRef.current?.id === e.pointerId) {
      touchDragRef.current = null;
    }
  };

  const bindObjectPointer = (obj) => ({
    onPointerEnter: (e) => {
      if (locked) return;
      setHovered(obj);
      setTooltipFromElement(e.currentTarget);
    },
    onPointerLeave: () => {
      setHovered(null);
      setPressedId(null);
    },
    onPointerDown: (e) => {
      if (locked) return;
      e.stopPropagation();
      ensureAudio();
      enableTiltFromGesture();
      setPressedId(obj.id);
      setHovered(obj);
      setTooltipFromElement(e.currentTarget);
    },
    onPointerUp: () => setPressedId(null),
    onFocus: (e) => {
      if (locked) return;
      setHovered(obj);
      setTooltipFromElement(e.currentTarget);
    },
    onBlur: () => setHovered(null),
    onClick: (e) => handleActivate(obj, e.currentTarget),
  });

  return (
    <div
      ref={rootRef}
      className={`cabinet-canvas${zoomedIn ? " is-zooming" : ""}${
        zoomPhase === "out" ? " is-zooming-out" : ""
      }${panelOpen ? " is-panel-open" : ""}${focusing ? " is-focusing" : ""}${
        debug ? " is-debug" : ""
      }`}
      onPointerDown={onCanvasPointerDown}
      onPointerMove={onCanvasPointerMove}
      onPointerUp={onCanvasPointerUp}
      onPointerCancel={onCanvasPointerUp}
      onPointerLeave={(e) => {
        // Only snap mouse leave to center — touch leave was wiping tilt.
        if (
          e.pointerType === "mouse" &&
          !locked &&
          !touchDragRef.current
        ) {
          targetParallax.current = { x: 0, y: 0 };
        }
      }}
    >
      <div className="cabinet-canvas__bg" aria-hidden="true" />

      <div className="cabinet-canvas__world">
        <div className="cabinet-canvas__zoom">
          <section
            className="cabinet-canvas__frame"
            ref={frameRef}
            aria-label={tUi("roomAria")}
          >
            <button
              type="button"
              className={`cabinet-canvas__wordmark${
                hovered?.id === ABOUT_ID ? " is-active" : ""
              }${pressedId === ABOUT_ID ? " is-pressed" : ""}${
                focusId === ABOUT_ID ? " is-focused" : ""
              }`}
              aria-label={tUi("wordmarkAria")}
              aria-hidden={focusing && focusId !== ABOUT_ID ? true : undefined}
              tabIndex={focusing && focusId !== ABOUT_ID ? -1 : undefined}
              disabled={locked}
              onPointerEnter={(e) => {
                if (locked) return;
                setHovered({
                  id: ABOUT_ID,
                  tooltip: { es: "NUBILA", en: "NUBILA" },
                });
                setTooltipFromElement(e.currentTarget, 36);
              }}
              onPointerLeave={() => {
                setHovered(null);
                setPressedId(null);
              }}
              onPointerDown={(e) => {
                if (locked) return;
                e.stopPropagation();
                ensureAudio();
                enableTiltFromGesture();
                setPressedId(ABOUT_ID);
              }}
              onPointerUp={() => setPressedId(null)}
              onClick={(e) => handleWordmarkActivate(e.currentTarget)}
            >
              NUBILA
            </button>

            <div className="cabinet-canvas__objects">
              {objects.map((obj) => {
                const label = t(obj.label);
                const tooltip = t(obj.tooltip);
                const isFocused = focusId === obj.id;
                const isPlanet = Boolean(obj.orbitParentId);
                const pointer = bindObjectPointer(obj);

                if (isPlanet) {
                  return (
                    <div
                      key={obj.id}
                      className={`cabinet-canvas__planet${
                        hovered?.id === obj.id ? " is-active" : ""
                      }${pressedId === obj.id ? " is-pressed" : ""}${
                        isFocused ? " is-focused" : ""
                      }${focusing && !isFocused ? " is-dimmed" : ""}`}
                      style={{
                        "--cx": `${obj.cx}%`,
                        "--cy": `${obj.cy}%`,
                        "--cx-n": obj.cx,
                        "--cy-n": obj.cy,
                        "--w": obj.width,
                        "--depth": obj.depth,
                        "--float-dur": obj.floatDur,
                        "--float-amp": obj.floatAmp,
                        "--sway": obj.sway,
                        "--float-delay": obj.delay,
                        "--bob-scale": obj.bobScale,
                        "--orbit-r": obj.orbitR,
                        "--orbit-phase": `${obj.orbitPhase}deg`,
                        "--orbit-dur": obj.orbitDur,
                        "--orbit-delay": obj.orbitDelay,
                        zIndex: isFocused ? 80 : obj.z,
                      }}
                    >
                      <div className="cabinet-canvas__planet-orbit">
                        <button
                          type="button"
                          className="cabinet-canvas__planet-hit"
                          aria-label={`${label}: ${tooltip}`}
                          aria-hidden={
                            focusing && !isFocused ? true : undefined
                          }
                          tabIndex={focusing && !isFocused ? -1 : undefined}
                          disabled={locked}
                          {...pointer}
                        >
                          <span className="cabinet-canvas__object-bob">
                            <img
                              src={obj.src}
                              alt=""
                              width={obj.imgW}
                              height={obj.imgH}
                              decoding="async"
                              draggable={false}
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={obj.id}
                    type="button"
                    className={`cabinet-canvas__object${
                      hovered?.id === obj.id ? " is-active" : ""
                    }${pressedId === obj.id ? " is-pressed" : ""}${
                      isFocused ? " is-focused" : ""
                    }`}
                    style={{
                      "--cx": `${obj.cx}%`,
                      "--cy": `${obj.cy}%`,
                      "--w": `${obj.width}%`,
                      "--depth": obj.depth,
                      "--float-dur": obj.floatDur,
                      "--float-amp": obj.floatAmp,
                      "--sway": obj.sway,
                      "--float-delay": obj.delay,
                      "--bob-scale": obj.bobScale,
                      zIndex: isFocused ? 80 : obj.z,
                    }}
                    aria-label={`${label}: ${tooltip}`}
                    aria-hidden={focusing && !isFocused ? true : undefined}
                    tabIndex={focusing && !isFocused ? -1 : undefined}
                    disabled={locked}
                    {...pointer}
                  >
                    <span className="cabinet-canvas__object-bob">
                      <img
                        src={obj.src}
                        alt=""
                        width={obj.imgW}
                        height={obj.imgH}
                        decoding="async"
                        draggable={false}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {hovered && !locked && (
              <div
                className="cabinet-canvas__tooltip"
                style={{
                  left: `${tooltipPos.x}%`,
                  top: `${tooltipPos.y}%`,
                }}
                role="status"
              >
                {hovered.tooltip ? t(hovered.tooltip) : ""}
              </div>
            )}
          </section>
        </div>
      </div>

      <p className={`cabinet-canvas__hint${locked ? " is-hidden" : ""}`}>{hint}</p>

      <div
        className={`cabinet-canvas__veil${zoomedIn ? " is-visible" : ""}`}
        aria-hidden="true"
      />
    </div>
  );
}
