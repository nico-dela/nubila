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

/**
 * Fixed safe anchors around the frame (well inside the viewport).
 * `hostOk`: room for orbiting planets without clipping edges.
 * Small jitter (±jitter) keeps variety without leaving the safe band.
 */
const SLOTS = [
  { id: "tl", cx: 20, cy: 26, hostOk: false, jitter: 2.5 },
  { id: "tc", cx: 50, cy: 22, hostOk: false, jitter: 2 },
  { id: "tr", cx: 80, cy: 26, hostOk: false, jitter: 2.5 },
  { id: "ml", cx: 20, cy: 50, hostOk: true, jitter: 2.5 },
  { id: "mr", cx: 80, cy: 50, hostOk: true, jitter: 2.5 },
  { id: "bl", cx: 22, cy: 74, hostOk: false, jitter: 2.5 },
  { id: "bc", cx: 50, cy: 74, hostOk: true, jitter: 2 },
  { id: "br", cx: 78, cy: 74, hostOk: false, jitter: 2.5 },
];

/** Hard frame box for every free-object anchor (%). */
const FRAME = { minX: 16, maxX: 84, minY: 18, maxY: 78 };

/** Center reserved for the Nubila wordmark. */
const WORDMARK_ZONE = { cx: 50, cy: 42, r: 14 };

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

function dist(a, b) {
  const dx = a.cx - b.cx;
  const dy = (a.cy - b.cy) * 1.15;
  return Math.hypot(dx, dy);
}

/** Estimated outer orbit radius (% frame) for a host with N planets. */
function estimateOrbitRadius(hostWidth, kids) {
  if (kids <= 0) return 0;
  const planetW = SIZE_TIERS.musicVideo * SIZE_TIERS.planetScale;
  const outer = kids - 1;
  return (
    Math.max(hostWidth * 0.72, 5) +
    planetW * 0.4 +
    outer * 1.25 +
    planetW * 0.55
  );
}

/**
 * Visual collision radius: sprite half-size (tall art) or full orbit disk.
 * Generous so free objects don’t stack on each other.
 */
function visualRadius(width, kids) {
  const sprite = Math.max(width * 0.95, 5);
  const orbit = estimateOrbitRadius(width, kids);
  return Math.max(sprite, orbit) + 2.5;
}

function clampFrame(cx, cy) {
  return {
    cx: Math.min(FRAME.maxX, Math.max(FRAME.minX, cx)),
    cy: Math.min(FRAME.maxY, Math.max(FRAME.minY, cy)),
  };
}

function jitterAround(slot, rng) {
  const j = slot.jitter ?? 2;
  return clampFrame(
    slot.cx + (rng() - 0.5) * 2 * j,
    slot.cy + (rng() - 0.5) * 2 * j,
  );
}

function placementWeight(def, planetCountByHost) {
  const kids = planetCountByHost.get(def.id) || 0;
  const tier =
    def.sizeTier === "album"
      ? 4
      : def.sizeTier === "ep"
        ? 3
        : def.sizeTier === "blog"
          ? 2
          : 1;
  return kids * 10 + tier;
}

function overlapsWordmark(cx, cy, radius) {
  return dist({ cx, cy }, WORDMARK_ZONE) < WORDMARK_ZONE.r + radius * 0.35;
}

/**
 * Pick a free slot that clears obstacles; hosts prefer hostOk slots.
 */
function pickSlot(slots, rng, radius, obstacles, preferHost) {
  const ranked = [...slots].sort((a, b) => {
    if (preferHost) {
      if (a.hostOk !== b.hostOk) return a.hostOk ? -1 : 1;
    }
    return 0;
  });
  /* Shuffle within preference bands so layout varies. */
  const hosts = ranked.filter((s) => s.hostOk);
  const others = ranked.filter((s) => !s.hostOk);
  const order = preferHost
    ? [...shuffleInPlace(hosts, rng), ...shuffleInPlace(others, rng)]
    : shuffleInPlace([...ranked], rng);

  for (const slot of order) {
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const { cx, cy } = jitterAround(slot, rng);
      if (overlapsWordmark(cx, cy, radius)) continue;
      const candidate = { cx, cy, r: radius };
      const clear = obstacles.every(
        (o) => dist(candidate, o) >= o.r + candidate.r,
      );
      if (clear) return { slot, cx, cy };
    }
  }

  /* Last resort: first remaining slot, clamped. */
  const fallback = order[0] ?? SLOTS[0];
  const pos = clampFrame(fallback.cx, fallback.cy);
  return { slot: fallback, ...pos };
}

/** Push overlapping free objects apart, then re-clamp. */
function separate(placements, rounds = 12) {
  for (let round = 0; round < rounds; round += 1) {
    let moved = false;
    for (let i = 0; i < placements.length; i += 1) {
      for (let j = i + 1; j < placements.length; j += 1) {
        const a = placements[i];
        const b = placements[j];
        const minD = a.r + b.r;
        const d = dist(a, b);
        if (d >= minD || d < 0.001) continue;
        const push = ((minD - d) / 2) * 1.05;
        const ux = (a.cx - b.cx) / d;
        const uy = ((a.cy - b.cy) * 1.15) / d;
        a.cx += ux * push;
        a.cy += (uy * push) / 1.15;
        b.cx -= ux * push;
        b.cy -= (uy * push) / 1.15;
        moved = true;
      }
      /* Soft push away from wordmark. */
      const w = WORDMARK_ZONE;
      const dw = dist(placements[i], w);
      const need = w.r + placements[i].r * 0.4;
      if (dw < need && dw > 0.001) {
        const push = need - dw;
        const ux = (placements[i].cx - w.cx) / dw;
        const uy = ((placements[i].cy - w.cy) * 1.15) / dw;
        placements[i].cx += ux * push;
        placements[i].cy += (uy * push) / 1.15;
        moved = true;
      }
    }
    for (const p of placements) {
      const c = clampFrame(p.cx, p.cy);
      if (c.cx !== p.cx || c.cy !== p.cy) {
        p.cx = c.cx;
        p.cy = c.cy;
        moved = true;
      }
    }
    if (!moved) break;
  }
}

function depthFromCy(cy) {
  return 1 + (cy / 100) * 1.1;
}

function zFromCy(cy) {
  return Math.round(20 + cy * 0.7);
}

/**
 * Cap orbit so moons stay inside the viewport around the host.
 */
function cappedOrbitRadius(desired, parent) {
  if (!parent) return desired;
  const pad = 6;
  const maxR = Math.min(
    parent.cx - pad,
    100 - pad - parent.cx,
    parent.cy - pad - 2,
    100 - pad - 4 - parent.cy,
  );
  return Math.max(4.2, Math.min(desired, maxR));
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

  const ordered = [...free].sort(
    (a, b) =>
      placementWeight(b, planetCountByHost) -
      placementWeight(a, planetCountByHost),
  );

  const availableSlots = [...SLOTS];
  const drafts = [];

  ordered.forEach((def) => {
    const width = widthForDef(def, rng);
    const kids = planetCountByHost.get(def.id) || 0;
    const radius = visualRadius(width, kids);
    const obstacles = drafts.map((d) => ({ cx: d.cx, cy: d.cy, r: d.r }));
    const { slot, cx, cy } = pickSlot(
      availableSlots,
      rng,
      radius,
      obstacles,
      kids > 0,
    );
    const idx = availableSlots.findIndex((s) => s.id === slot.id);
    if (idx >= 0) availableSlots.splice(idx, 1);

    drafts.push({
      def,
      width,
      kids,
      cx,
      cy,
      r: radius,
      slotId: slot.id,
    });
  });

  separate(drafts);

  const byId = new Map();
  drafts.forEach((d) => {
    const { cx, cy } = clampFrame(d.cx, d.cy);
    byId.set(d.def.id, {
      ...d.def,
      width: d.width,
      cx,
      cy,
      depth: depthFromCy(cy),
      z: zFromCy(cy),
      quadrant: d.slotId,
      ...motionFromSeed(d.def.seed),
    });
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
      const desired = parent
        ? Math.max(parent.width * 0.72, 5) + width * 0.35 + slot * 1.25
        : 7;
      const baseR = cappedOrbitRadius(desired, parent);
      const phase = (360 / n) * slot + (parentId === "terrario" ? 12 : 0);
      const orbitDurSec = 28 + def.seed * 18 + slot * 4;
      const orbitDur = `${orbitDurSec.toFixed(2)}s`;
      const cx = parent?.cx ?? 50;
      const cy = parent?.cy ?? 50;
      byId.set(def.id, {
        ...def,
        width,
        cx,
        cy,
        depth: depthFromCy(cy) + 0.15,
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
