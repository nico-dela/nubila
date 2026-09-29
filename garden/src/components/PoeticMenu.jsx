import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/PoeticMenu.css";

const MENU_IDS = ["room", "origen", "dimensiones", "habitantes", "correspondencias"];

export default function PoeticMenu({ onSelect }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const { t, tUi, ui } = useLocale();

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [open]);

  return (
    <nav className="poetic-menu" ref={rootRef} aria-label={tUi("navLabel")}>
      <button
        type="button"
        className={`poetic-menu__toggle${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="poetic-menu-panel"
        aria-label={open ? tUi("closeMenu") : tUi("openMenu")}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div id="poetic-menu-panel" className="poetic-menu__panel" role="menu">
          {MENU_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className="poetic-menu__link"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onSelect(id);
              }}
            >
              {t(ui.menu[id])}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
