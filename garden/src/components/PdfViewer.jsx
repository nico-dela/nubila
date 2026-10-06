import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { IconChevronLeft, IconChevronRight } from "./ChromeIcons";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/PdfViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const SWIPE_THRESHOLD = 48;
const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function PageControls({
  canPrev,
  canNext,
  pageNumber,
  numPages,
  onPrev,
  onNext,
  tUi,
}) {
  return (
    <div className="pdf-viewer__controls">
      <button
        type="button"
        className="pdf-viewer__btn pdf-viewer__btn--icon"
        disabled={!canPrev}
        onClick={onPrev}
        aria-label={tUi("pdfPrev")}
      >
        <IconChevronLeft />
      </button>
      <p className="pdf-viewer__page" aria-live="polite">
        {tUi("pdfPage")
          .replace("{n}", String(pageNumber))
          .replace("{total}", String(numPages || "—"))}
      </p>
      <button
        type="button"
        className="pdf-viewer__btn pdf-viewer__btn--icon"
        disabled={!canNext}
        onClick={onNext}
        aria-label={tUi("pdfNext")}
      >
        <IconChevronRight />
      </button>
    </div>
  );
}

function useElementSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const measure = () => {
      const width = Math.floor(el.clientWidth);
      const height = Math.floor(el.clientHeight);
      setSize((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height },
      );
    };

    measure();
    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

function fitPageWidth(frameWidth, frameHeight, pageRatio) {
  if (frameWidth <= 0) return 0;
  if (!pageRatio || pageRatio <= 0 || frameHeight <= 0) return frameWidth;
  return Math.max(1, Math.floor(Math.min(frameWidth, frameHeight * pageRatio)));
}

function useSwipeNav({ onPrev, onNext, enabled = true }) {
  const startRef = useRef(null);

  const onPointerDown = (e) => {
    if (!enabled || e.button !== 0) return;
    startRef.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };

  const onPointerUp = (e) => {
    const start = startRef.current;
    startRef.current = null;
    if (!enabled || !start || start.id !== e.pointerId) return;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) onNext();
    else onPrev();
  };

  const onPointerCancel = () => {
    startRef.current = null;
  };

  return { onPointerDown, onPointerUp, onPointerCancel };
}

/** Fullscreen PDF lightbox — opens directly from a fanzine planet. */
export default function PdfViewer({ pdf, onClose }) {
  const { t, tUi } = useLocale();
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [slideDir, setSlideDir] = useState("next");
  const [loadError, setLoadError] = useState(false);
  /** width/height per page — keeps fit stable across turns */
  const [ratioByPage, setRatioByPage] = useState(() => ({}));
  /** Last fully painted page — stays visible until the next paint completes */
  const [paintedPage, setPaintedPage] = useState(null);

  onCloseRef.current = onClose;

  const frameSize = useElementSize(frameRef);
  const incomingRatio =
    ratioByPage[pageNumber] ?? ratioByPage[paintedPage] ?? null;
  const outgoingRatio = ratioByPage[paintedPage] ?? incomingRatio;
  const incomingWidth = useMemo(
    () => fitPageWidth(frameSize.width, frameSize.height, incomingRatio),
    [frameSize.width, frameSize.height, incomingRatio],
  );
  const outgoingWidth = useMemo(
    () => fitPageWidth(frameSize.width, frameSize.height, outgoingRatio),
    [frameSize.width, frameSize.height, outgoingRatio],
  );

  const canPrev = pageNumber > 1;
  const canNext = numPages > 0 && pageNumber < numPages;
  /** True only while swapping — first paint must stay visible. */
  const pagePending = paintedPage != null && paintedPage !== pageNumber;

  const goPrev = useCallback(() => {
    setPageNumber((n) => {
      if (n <= 1) return n;
      setSlideDir("prev");
      return n - 1;
    });
  }, []);

  const goNext = useCallback(() => {
    setPageNumber((n) => {
      if (numPages > 0 && n >= numPages) return n;
      setSlideDir("next");
      return n + 1;
    });
  }, [numPages]);

  const swipe = useSwipeNav({
    onPrev: goPrev,
    onNext: goNext,
    enabled: !loadError,
  });

  const rememberRatio = useCallback((page, pageIndex) => {
    const viewport = page.getViewport({ scale: 1 });
    if (viewport.height <= 0) return;
    const ratio = viewport.width / viewport.height;
    setRatioByPage((prev) =>
      prev[pageIndex] === ratio ? prev : { ...prev, [pageIndex]: ratio },
    );
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        onCloseRef.current?.();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
      }
      if (e.key !== "Tab") return;

      const root = rootRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute("disabled"));
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

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown, true);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [goPrev, goNext]);

  if (!pdf?.src) return null;

  const title = t(pdf.title);
  const showOutgoing = paintedPage != null && paintedPage !== pageNumber;

  return (
    <div
      ref={rootRef}
      className="pdf-viewer pdf-viewer--fullscreen"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="pdf-viewer__lightbox-backdrop"
        aria-label={tUi("backToRoom")}
        onClick={onClose}
      />

      <div className="pdf-viewer__shell">
        <header className="pdf-viewer__lightbox-toolbar">
          <p id={titleId} className="pdf-viewer__lightbox-title">
            {title || tUi("pdfLabel")}
          </p>
          <button
            ref={closeRef}
            type="button"
            className="pdf-viewer__btn"
            onClick={onClose}
          >
            {tUi("backToRoom")}
          </button>
        </header>

        <div
          className="pdf-viewer__frame"
          ref={frameRef}
          onPointerDown={swipe.onPointerDown}
          onPointerUp={swipe.onPointerUp}
          onPointerCancel={swipe.onPointerCancel}
        >
          {loadError ? (
            <p className="pdf-viewer__status" role="alert">
              {tUi("pdfError")}
            </p>
          ) : (
            <Document
              file={pdf.src}
              loading={
                <p className="pdf-viewer__status" role="status">
                  {tUi("pdfLoading")}
                </p>
              }
              onLoadSuccess={({ numPages: next }) => {
                setNumPages(next);
                setLoadError(false);
              }}
              onLoadError={() => setLoadError(true)}
            >
              {incomingWidth > 0 && (
                <div className="pdf-viewer__stage">
                  {showOutgoing && outgoingWidth > 0 && (
                    <div
                      className="pdf-viewer__slide pdf-viewer__slide--hold"
                      aria-hidden="true"
                    >
                      <Page
                        pageNumber={paintedPage}
                        width={outgoingWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading={null}
                      />
                    </div>
                  )}
                  <div
                    className={[
                      "pdf-viewer__slide",
                      pagePending ? "pdf-viewer__slide--pending" : "",
                      !pagePending ? `pdf-viewer__slide--${slideDir}` : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={incomingWidth}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      loading={null}
                      onLoadSuccess={(page) => rememberRatio(page, pageNumber)}
                      onRenderSuccess={() => setPaintedPage(pageNumber)}
                    />
                  </div>
                </div>
              )}
            </Document>
          )}
        </div>

        <PageControls
          canPrev={canPrev}
          canNext={canNext}
          pageNumber={pageNumber}
          numPages={numPages}
          onPrev={goPrev}
          onNext={goNext}
          tUi={tUi}
        />
      </div>
    </div>
  );
}
