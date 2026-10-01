/** Clamp to [-1, 1]. */
function clamp1(n) {
  return Math.max(-1, Math.min(1, n));
}

/**
 * Ask for orientation/motion access when the UA requires it (iOS Safari;
 * Chromium is moving the same way). Must run inside a user gesture.
 * @returns {Promise<"granted"|"denied"|"unsupported">}
 */
export async function requestTiltPermission() {
  if (typeof window === "undefined") return "unsupported";

  const tasks = [];
  const DOE = window.DeviceOrientationEvent;
  const DME = window.DeviceMotionEvent;

  if (DOE && typeof DOE.requestPermission === "function") {
    tasks.push(DOE.requestPermission());
  }
  if (DME && typeof DME.requestPermission === "function") {
    tasks.push(DME.requestPermission());
  }

  if (!tasks.length) {
    const supported = Boolean(DOE || DME);
    return supported ? "granted" : "unsupported";
  }

  try {
    const results = await Promise.all(tasks);
    return results.every((r) => r === "granted") ? "granted" : "denied";
  } catch {
    return "denied";
  }
}

export function hasTiltApi() {
  return (
    typeof window !== "undefined" &&
    Boolean(window.DeviceOrientationEvent || window.DeviceMotionEvent)
  );
}

/**
 * Relative tilt from deviceorientation beta/gamma vs a resting baseline.
 * Portrait phone reading the screen ≈ beta 90°, gamma 0° — never assume 45°.
 */
export function parallaxFromOrientation(beta, gamma, baseline) {
  if (beta == null || gamma == null) return null;
  return {
    x: clamp1((gamma - baseline.gamma) / 12),
    y: clamp1((beta - baseline.beta) / 12),
  };
}

/**
 * Tilt from gravity vector (devicemotion). Works on many Androids where
 * deviceorientation is missing or null.
 * Device frame: +x right, +y up screen, +z out of screen.
 * Upright portrait ≈ (0, 9.8, 0).
 */
export function parallaxFromGravity(ax, ay, az, baseline) {
  if (ax == null || ay == null || az == null) return null;
  return {
    x: clamp1((ax - baseline.ax) / 2.5),
    y: clamp1((baseline.az - az) / 2.5),
  };
}

/**
 * Attach orientation + motion listeners. Calibrates resting pose from the
 * first samples so upright holding reads as neutral parallax.
 * @param {{ onTilt: (p: {x:number,y:number}) => void, isActive: () => boolean, onReady?: () => void }} opts
 * @returns {() => void} cleanup
 */
export function subscribeTilt({ onTilt, isActive, onReady }) {
  const baselineOrient = { beta: 90, gamma: 0, ready: false };
  const baselineGravity = { ax: 0, ay: 9.8, az: 0, ready: false };
  const orientBuf = [];
  const gravBuf = [];
  const CALIBRATE_N = 10;
  let preferOrient = false;
  let signaledReady = false;

  const signalReady = () => {
    if (signaledReady) return;
    signaledReady = true;
    onReady?.();
  };

  const finishOrientBaseline = () => {
    if (baselineOrient.ready || orientBuf.length < CALIBRATE_N) return;
    baselineOrient.beta =
      orientBuf.reduce((s, s2) => s + s2.beta, 0) / orientBuf.length;
    baselineOrient.gamma =
      orientBuf.reduce((s, s2) => s + s2.gamma, 0) / orientBuf.length;
    baselineOrient.ready = true;
    preferOrient = true;
    signalReady();
  };

  const finishGravityBaseline = () => {
    if (baselineGravity.ready || gravBuf.length < CALIBRATE_N) return;
    baselineGravity.ax = gravBuf.reduce((s, s2) => s + s2.ax, 0) / gravBuf.length;
    baselineGravity.ay = gravBuf.reduce((s, s2) => s + s2.ay, 0) / gravBuf.length;
    baselineGravity.az = gravBuf.reduce((s, s2) => s + s2.az, 0) / gravBuf.length;
    baselineGravity.ready = true;
    if (!preferOrient) signalReady();
  };

  const onOrient = (e) => {
    if (!isActive()) return;
    if (e.beta == null || e.gamma == null) return;
    if (!baselineOrient.ready) {
      orientBuf.push({ beta: e.beta, gamma: e.gamma });
      finishOrientBaseline();
      return;
    }
    preferOrient = true;
    const next = parallaxFromOrientation(e.beta, e.gamma, baselineOrient);
    if (next) onTilt(next);
  };

  const onMotion = (e) => {
    if (!isActive()) return;
    if (preferOrient && baselineOrient.ready) return;
    const g = e.accelerationIncludingGravity;
    if (!g || g.x == null || g.y == null || g.z == null) return;
    if (!baselineGravity.ready) {
      gravBuf.push({ ax: g.x, ay: g.y, az: g.z });
      finishGravityBaseline();
      return;
    }
    const next = parallaxFromGravity(g.x, g.y, g.z, baselineGravity);
    if (next) onTilt(next);
  };

  window.addEventListener("deviceorientation", onOrient, { passive: true });
  window.addEventListener("devicemotion", onMotion, { passive: true });

  return () => {
    window.removeEventListener("deviceorientation", onOrient);
    window.removeEventListener("devicemotion", onMotion);
  };
}
