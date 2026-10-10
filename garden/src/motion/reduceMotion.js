export const REDUCE_MOTION_KEY = "nubila-garden-reduce-motion";

export function readOsReduceMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Visitor asked for less motion. Absent key follows the system. */
export function readStoredReduceMotion() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(REDUCE_MOTION_KEY) === "on";
  } catch {
    return false;
  }
}

export function writeStoredReduceMotion(on) {
  if (typeof window === "undefined") return;
  try {
    if (on) window.localStorage.setItem(REDUCE_MOTION_KEY, "on");
    else window.localStorage.removeItem(REDUCE_MOTION_KEY);
  } catch {
    /* ignore */
  }
}

export function effectiveReduceMotion(
  os = readOsReduceMotion(),
  stored = readStoredReduceMotion(),
) {
  return os || stored;
}

export function applyReduceMotionToDocument(on = effectiveReduceMotion()) {
  if (typeof document === "undefined") return;
  if (on) document.documentElement.dataset.reduceMotion = "on";
  else delete document.documentElement.dataset.reduceMotion;
}
