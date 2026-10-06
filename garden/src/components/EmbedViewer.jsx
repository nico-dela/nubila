import { useEffect, useId, useRef } from "react";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/EmbedViewer.css";

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * In-room mini browser for press notes — always an iframe so the visitor
 * never leaves Habitación. Same-origin archives when publishers block framing.
 *
 * Cross-origin media (e.g. Facebook) cannot report play state, so embeds with
 * `pausesAmbient` mute Oceanica Nylon for the whole time the viewer is open.
 */
export default function EmbedViewer({ embed, onClose, onPlaybackChange }) {
  const { t, tUi } = useLocale();
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  const onPlaybackChangeRef = useRef(onPlaybackChange);
  onPlaybackChangeRef.current = onPlaybackChange;

  useEffect(() => {
    if (!embed?.pausesAmbient) return undefined;
    onPlaybackChangeRef.current?.(true);
    return () => onPlaybackChangeRef.current?.(false);
  }, [embed?.pausesAmbient, embed?.src]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = rootRef.current;
      if (!root) return;
      const nodes = [...root.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [onClose]);

  if (!embed?.src) return null;

  const title = t(embed.title);
  const address = embed.address || embed.src;

  return (
    <div
      ref={rootRef}
      className="embed-viewer embed-viewer--fullscreen"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="embed-viewer__lightbox-backdrop"
        aria-label={tUi("backToRoom")}
        onClick={onClose}
      />

      <div className="embed-viewer__shell">
        <header className="embed-viewer__chrome">
          <div className="embed-viewer__traffic" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="embed-viewer__address" title={address}>
            <span className="embed-viewer__lock" aria-hidden="true">
              ⌂
            </span>
            <span className="embed-viewer__url">{address}</span>
          </p>
          <button
            ref={closeRef}
            type="button"
            className="embed-viewer__btn"
            onClick={onClose}
          >
            {tUi("backToRoom")}
          </button>
        </header>

        <p id={titleId} className="embed-viewer__sr-title">
          {title || tUi("notaLabel")}
        </p>

        <div className="embed-viewer__frame embed-viewer__frame--iframe">
          <iframe
            className="embed-viewer__iframe"
            src={embed.src}
            title={title || tUi("notaLabel")}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
}
