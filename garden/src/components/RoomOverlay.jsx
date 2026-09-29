import { useEffect, useId, useRef, useState } from "react";
import {
  getCatalogGroupedByYear,
  getDimensionById,
} from "../data/dimensions";
import { getSectionById } from "../data/roomSections";
import { useLocale } from "../i18n/LocaleContext";
import YoutubeEmbed from "./YoutubeEmbed";
import "../styles/DimensionPage.css";
import "../styles/SectionPage.css";
import "../styles/RoomOverlay.css";

const PANEL_MIN = 280;
const PANEL_MAX = 560;
const PANEL_DEFAULT = 328;

function DimensionBody({ dimension, onOpenDimension }) {
  const { t, tUi } = useLocale();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const emailId = useId();

  const handleWaitlist = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const element = dimension.element ? t(dimension.element) : "";
  const year = dimension.year;
  const showEyebrow = !dimension.hideEyebrow && (element || year);

  return (
    <div className="room-overlay__body">
      <div className="dimension-page__ornament" aria-hidden="true" />
      {showEyebrow && (
        <p className="dimension-page__eyebrow">
          {element}
          {element && year ? ` · ${year}` : year || ""}
        </p>
      )}
      <h2 className="dimension-page__title">{t(dimension.title)}</h2>
      {dimension.subtitle && (
        <p className="dimension-page__subtitle">{t(dimension.subtitle)}</p>
      )}
      <p className="dimension-page__intro">{t(dimension.intro)}</p>

      {dimension.body?.map((paragraph) => {
        const text = t(paragraph);
        return (
          <p key={text.slice(0, 32)} className="dimension-page__intro">
            {text}
          </p>
        );
      })}

      {dimension.listen?.length > 0 && <YoutubeEmbed tracks={dimension.listen} />}

      {dimension.waitlist && (
        <form className="dimension-page__waitlist" onSubmit={handleWaitlist}>
          {submitted ? (
            <p className="dimension-page__waitlist-done" role="status">
              {tUi("waitlistDone")}
            </p>
          ) : (
            <>
              <label className="dimension-page__waitlist-label" htmlFor={emailId}>
                {tUi("waitlistLabel")}
              </label>
              <div className="dimension-page__waitlist-row">
                <input
                  id={emailId}
                  type="email"
                  required
                  placeholder={tUi("waitlistPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <button type="submit">{tUi("waitlistSubmit")}</button>
              </div>
              <p className="dimension-page__waitlist-note">{tUi("waitlistNote")}</p>
            </>
          )}
        </form>
      )}

      <div className="dimension-page__nav">
        <button
          type="button"
          className="room-overlay__text-link"
          onClick={() => onOpenDimension(null, "dimensiones")}
        >
          {tUi("allDimensions")}
        </button>
      </div>
    </div>
  );
}

function SectionBody({ section, onOpenDimension }) {
  const { t } = useLocale();
  const catalogGroups = section.listDimensions ? getCatalogGroupedByYear() : [];

  return (
    <div className="room-overlay__body">
      <p className="section-page__eyebrow">{t(section.eyebrow)}</p>
      <h2 className="section-page__title">{t(section.title)}</h2>
      {section.body.map((paragraph) => {
        const text = t(paragraph);
        return (
          <p
            key={text.slice(0, 24)}
            className={`section-page__body${
              /^(Próximamente|Coming soon)/.test(text)
                ? " section-page__muted"
                : ""
            }`}
          >
            {text}
          </p>
        );
      })}

      {section.listDimensions && (
        <div className="section-page__timeline" role="list">
          {catalogGroups.map((group) => (
            <section key={group.key} className="section-page__year-group">
              <h3 className="section-page__year">{t(group.label)}</h3>
              <ul className="section-page__list">
                {group.items.map((d) => (
                  <li key={d.id} role="listitem">
                    <button type="button" onClick={() => onOpenDimension(d.id)}>
                      <span className="section-page__list-title">{t(d.title)}</span>
                      <span className="section-page__list-meta">
                        {d.element ? t(d.element) : ""}
                        {d.year ? ` · ${d.year}` : ""}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {section.links && (
        <ul className="section-page__list section-page__list--plain">
          {section.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function RoomOverlay({
  panel,
  panelWidthPx,
  onPanelWidthChange,
  onClose,
  onOpenDimension,
  onOpenSection,
}) {
  const closeRef = useRef(null);
  const dragRef = useRef(null);
  const { t, tUi } = useLocale();

  useEffect(() => {
    if (!panel) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panel, onClose]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current) return;
      const next = window.innerWidth - e.clientX;
      const clamped = Math.min(PANEL_MAX, Math.max(PANEL_MIN, next));
      onPanelWidthChange?.(clamped);
    };
    const onUp = () => {
      dragRef.current = null;
      document.body.classList.remove("is-resizing-panel");
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onPanelWidthChange]);

  if (!panel) return null;

  const dimension =
    panel.type === "dimension" ? getDimensionById(panel.id) : null;
  const section =
    panel.type === "section" ? getSectionById(panel.id) : null;

  if (!dimension && !section) return null;

  const title = dimension
    ? t(dimension.title)
    : section
      ? t(section.title)
      : "Nubila";
  const themeClass = dimension
    ? `dimension-page dimension-page--overlay dimension-page--${dimension.theme}`
    : "section-page section-page--overlay";

  const startResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = { startX: e.clientX, startW: panelWidthPx || PANEL_DEFAULT };
    document.body.classList.add("is-resizing-panel");
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  return (
    <div className="room-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="room-overlay__backdrop"
        aria-label={tUi("closeOverlay")}
        onClick={onClose}
      />
      <div
        className={`room-overlay__panel ${themeClass}`}
        style={{ width: panelWidthPx ? `${panelWidthPx}px` : undefined }}
      >
        <button
          type="button"
          className="room-overlay__resize"
          aria-label={tUi("resizePanel")}
          title={tUi("resizePanel")}
          onPointerDown={startResize}
        />
        <div className="room-overlay__scroll">
          <header className="room-overlay__toolbar">
            <button
              ref={closeRef}
              type="button"
              className="room-overlay__close"
              onClick={onClose}
            >
              <span className="room-overlay__close-mark" aria-hidden="true">
                ←
              </span>
              <span>{tUi("backToRoom")}</span>
            </button>
          </header>
          {dimension && (
            <DimensionBody
              dimension={dimension}
              onOpenDimension={(id, sectionId) => {
                if (sectionId) onOpenSection(sectionId);
                else if (id) onOpenDimension(id);
              }}
            />
          )}
          {section && (
            <SectionBody
              section={section}
              onOpenDimension={(id) => onOpenDimension(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
