import { SIZE_TIERS, roomObjectDefs } from "./roomObjects";

/** Mulberry32 — tiny seeded PRNG. */
function createRng(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace(arr, rng) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Soft quadrant bands — wider than before to spread load. */
const QUADRANTS = [
  { id: 0, x0: 10, x1: 44, y0: 18, y1: 48 },
  { id: 1, x0: 56, x1: 90, y0: 18, y1: 48 },
  { id: 2, x0: 10, x1: 44, y0: 54, y1: 86 },
  { id: 3, x0: 56, x1: 90, y0: 54, y1: 86 },
];

/** Center band reserved for the Nubila wordmark (approx). */
const WORDMARK_ZONE = { cx: 50, cy: 40, r: 7 };

function motionFromSeed(seed) {
  return {
    floatDur: `${(5.2 + seed * 3.2).toFixed(2)}s`,
    floatAmp: `${(2.2 + seed * 2.8).toFixed(1)}px`,
    sway: `${(0.8 + seed * 1.4).toFixed(2)}deg`,
    delay: `${(-seed * 4.2).toFixed(2)}s`,
    bobScale: (0.008 + seed * 0.012).toFixed(3),
  };
}

function widthForDef(def, rng) {
  let width;
  if (def.sizeTier === "live") {
    width =
      SIZE_TIERS.liveMin +
      rng() * (SIZE_TIERS.liveMax - SIZE_TIERS.liveMin);
  } else {
    width = SIZE_TIERS[def.sizeTier] ?? SIZE_TIERS.ep;
  }
  return width * (def.sizeScale ?? 1);
}

/** Collision radius in % of frame (ellipse-ish via half-width + height estimate). */
function hitRadius(width, extra = 0) {
  return width * 0.72 + 2.8 + extra;
}

function dist(a, b) {
  const dx = a.cx - b.cx;
  const dy = (a.cy - b.cy) * 1.15;
  return Math.hypot(dx, dy);
}

function overlaps(a, b) {
  return dist(a, b) < a.r + b.r;
}

function placeWithAvoidance(quad, rng, radius, obstacles, attempts = 48) {
  const pad = Math.max(radius + 1, 5);
  const x0 = quad.x0 + pad;
  const x1 = Math.max(x0 + 1, quad.x1 - pad);
  const y0 = quad.y0 + pad;
  const y1 = Math.max(y0 + 1, quad.y1 - pad);

  let best = null;
  let bestScore = -Infinity;

  for (let i = 0; i < attempts; i += 1) {
    const candidate = {
      cx: x0 + rng() * (x1 - x0),
      cy: y0 + rng() * (y1 - y0),
      r: radius,
    };
    if (obstacles.some((o) => overlaps(candidate, o))) continue;
    const minD = obstacles.reduce(
      (m, o) => Math.min(m, dist(candidate, o) - o.r - candidate.r),
      40,
    );
    if (minD > bestScore) {
      bestScore = minD;
      best = candidate;
      if (minD > 6) break;
    }
  }

  if (best) return { cx: best.cx, cy: best.cy };

  /* Fallback: full-frame search */
  for (let i = 0; i < attempts; i += 1) {
    const candidate = {
      cx: 12 + rng() * 76,
      cy: 16 + rng() * 70,
      r: radius,
    };
    if (obstacles.some((o) => overlaps(candidate, o))) continue;
    return { cx: candidate.cx, cy: candidate.cy };
  }

  return {
    cx: (quad.x0 + quad.x1) / 2 + (rng() - 0.5) * 8,
    cy: (quad.y0 + quad.y1) / 2 + (rng() - 0.5) * 8,
  };
}

function depthFromCy(cy) {
  return 1 + (cy / 100) * 1.1;
}

function zFromCy(cy) {
  return Math.round(20 + cy * 0.7);
}

/**
 * Layout free objects with collision avoidance; attach planets to hosts.
 * Wordmark objects (kind: about) are excluded — rendered separately.
 * @param {number} [seed] session seed
 */
export function layoutRoomObjects(seed = Date.now() % 1e9) {
  const rng = createRng(seed);
  const free = roomObjectDefs.filter(
    (d) => !d.orbitParentId && d.kind !== "about",
  );
  const planets = roomObjectDefs.filter((d) => d.orbitParentId);

  const planetCountByHost = planets.reduce((map, p) => {
    map.set(p.orbitParentId, (map.get(p.orbitParentId) || 0) + 1);
    return map;
  }, new Map());

  const ordered = shuffleInPlace([...free], rng);
  const byId = new Map();
  const obstacles = [
    { cx: WORDMARK_ZONE.cx, cy: WORDMARK_ZONE.cy, r: WORDMARK_ZONE.r },
  ];

  ordered.forEach((def, index) => {
    const quad = QUADRANTS[index % QUADRANTS.length];
    const width = widthForDef(def, rng);
    const kids = planetCountByHost.get(def.id) || 0;
    const orbitReserve = kids > 0 ? 6 + kids * 2.2 : 0;
    const radius = hitRadius(width, orbitReserve * 0.3);
    const { cx, cy } = placeWithAvoidance(quad, rng, radius, obstacles);
    const depth = depthFromCy(cy);
    const placed = {
      ...def,
      width,
      cx,
      cy,
      depth,
      z: zFromCy(cy),
      quadrant: quad.id,
      ...motionFromSeed(def.seed),
    };
    byId.set(def.id, placed);
    obstacles.push({ cx, cy, r: hitRadius(width, orbitReserve) });
  });

  const planetsByHost = new Map();
  planets.forEach((def) => {
    const list = planetsByHost.get(def.orbitParentId) || [];
    list.push(def);
    planetsByHost.set(def.orbitParentId, list);
  });

  planetsByHost.forEach((defs, parentId) => {
    const parent = byId.get(parentId);
    const n = defs.length;
    defs.forEach((def, index) => {
      const width = widthForDef(def, rng) * SIZE_TIERS.planetScale;
      const slot = index;
      /* Tight orbit — just outside the host sprite */
      const baseR = parent
        ? Math.max(parent.width * 0.72, 5.5) + width * 0.35 + slot * 1.6
        : 7;
      const phase = (360 / n) * slot + (parentId === "terrario" ? 12 : 0);
      const orbitDurSec = 28 + def.seed * 18 + slot * 4;
      const orbitDur = `${orbitDurSec.toFixed(2)}s`;
      const cx = parent?.cx ?? 50;
      const cy = parent?.cy ?? 50;
      const depth = depthFromCy(cy) + 0.15;
      byId.set(def.id, {
        ...def,
        width,
        cx,
        cy,
        depth,
        z: (parent?.z ?? 40) + 2 + index,
        orbitR: baseR,
        orbitPhase: phase,
        orbitDur,
        orbitDelay: `${(-(phase / 360) * orbitDurSec).toFixed(2)}s`,
        ...motionFromSeed(def.seed),
      });
    });
  });

  return [...byId.values()].sort((a, b) => a.z - b.z);
}
