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

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function DimensionBody({
  dimension,
  titleId,
  onOpenDimension,
  onMediaPlaybackChange,
}) {
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
      <h2 id={titleId} className="dimension-page__title">
        {t(dimension.title)}
      </h2>
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

      {dimension.listen?.length > 0 && (
        <YoutubeEmbed
          tracks={dimension.listen}
          onPlaybackChange={onMediaPlaybackChange}
        />
      )}

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

function SectionBody({ section, titleId, onOpenDimension }) {
  const { t } = useLocale();
  const catalogGroups = section.listDimensions ? getCatalogGroupedByYear() : [];

  return (
    <div className="room-overlay__body">
      <p className="section-page__eyebrow">{t(section.eyebrow)}</p>
      <h2 id={titleId} className="section-page__title">
        {t(section.title)}
      </h2>
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
  onMediaPlaybackChange,
  onClose,
  onOpenDimension,
  onOpenSection,
}) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const titleId = useId();
  const { tUi } = useLocale();

  useEffect(() => {
    if (!previousFocusRef.current) {
      previousFocusRef.current = document.activeElement;
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const root = dialogRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll(FOCUSABLE_SELECTOR),
      ).filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          el.getAttribute("aria-hidden") !== "true",
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !root.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !root.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      const prev = previousFocusRef.current;
      previousFocusRef.current = null;
      if (prev && typeof prev.focus === "function") {
        prev.focus();
      }
    };
  }, [panel, onClose]);

  if (!panel) return null;

  const dimension =
    panel.type === "dimension" ? getDimensionById(panel.id) : null;
  const section =
    panel.type === "section" ? getSectionById(panel.id) : null;

  if (!dimension && !section) return null;

  const themeClass = dimension
    ? `dimension-page dimension-page--overlay dimension-page--${dimension.theme}`
    : "section-page section-page--overlay";

  return (
    <div
      ref={dialogRef}
      className="room-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="room-overlay__backdrop"
        aria-label={tUi("closeOverlay")}
        onClick={onClose}
      />
      <div className={`room-overlay__panel ${themeClass}`}>
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
              titleId={titleId}
              onMediaPlaybackChange={onMediaPlaybackChange}
              onOpenDimension={(id, sectionId) => {
                if (sectionId) onOpenSection(sectionId);
                else if (id) onOpenDimension(id);
              }}
            />
          )}
          {section && (
            <SectionBody
              section={section}
              titleId={titleId}
              onOpenDimension={(id) => onOpenDimension(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
