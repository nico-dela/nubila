# DECISIONS.md

Work-session log. A short entry when closing each non-trivial session. It does not replace git history.

New entries are in English.

## Entry format

```markdown
## YYYY-MM-DD HH:MM:ss — <short title>
- What:
- Why:
- Rejected:
- Pending:
```

## 2026-09-28 23:55:00 — Orbits, NUBILA wordmark, ambient Nylon
- What: NUBILA uppercase/smaller; Terrario Virtual + Trilogía I orbit Terrario; planet hitboxes follow orbit (fixes Nebulosa/Creaciones hover steal); smoother longer orbits; Oceanica Nylon loops with volume/rate + background saturate tied to parallax.
- Why: Hover mislabels and sticky orbit hit areas; ambient presence when wandering the room.
- Rejected: Keeping planet button centered on the host while only the sprite orbiting.
- Pending: Mute control if ambient audio feels too present.

- What: Collision-aware layout; Nubifont “Nubila” wordmark opens About; stronger hover/press; zoom centers object; desktop panel drag-resize; touch-drag + device-orientation parallax with mobile hint.
- Why: Objects were unclickable when stacked; brand needed a typographic About entry; mobile had no useful parallax input.
- Rejected: Keeping the M2.webp About sprite in the random layout.
- Pending: Final art; optional iOS orientation UX polish if permission is denied.

- What: Remapped garden objects to band catalog (albums, EPs, MVs, live, blog, about). Fixed size tiers; free objects land in random quadrants per load; Sueños/Ecosistema orbit Terrario and Creaciones Fugaces orbits Nebulosa. Split Trilogía into two EPs; Disco de Fuego waitlist; listen URLs updated.
- Why: Cabinet should point at real releases with clear hierarchy (album/planet) instead of poetic placeholders.
- Rejected: Live videos orbiting albums; full EN of the CRA blog essay.
- Pending: Final art for placeholder sprites; full bilingual blog body.

- What: Removed `tone: dark` invert on jarra/cactus. Added YouTube playlist embeds on Nebulosa, Terrario, Trilogía (I & II), Poética/Creaciones fugaces, and Oceánica. Added ES/EN locale context, bilingual content, and a top-right language switcher.
- Why: Props were wrongly inverted white; albums need in-panel listening; site should be bilingual without a heavy i18n library.
- Rejected: Third-party audio widgets; attaching Creaciones fugaces to Terrario instead of Poética.
- Pending: Confirm Creaciones fugaces placement if it should live on another object; real waitlist backend.

## 2026-09-28 20:20:00 — Cabinet Map PoC in garden/
- What: Unlinked MAPA from the Oceánica CRA app. Scaffolded a separate Vite React site in `garden/` with a 2D Cabinet-of-Curiosities entrance canvas, SVG hotspot portals to five dimension pages, poetic hamburger nav, and section stubs.
- Why: New poetic site should not disturb the live Oceánica experience; Cabinet art is a temporary PoC until Nubila’s original room asset arrives.
- Rejected: Replacing the root Map R3F page in place; shipping Cabinet art as production branding.
- Pending: Swap `cabinet-poc.jpg` for original art and retune `cabinetSectors.js`; flesh out El Origen / Habitantes / Correspondencias; optional cleanup of unused root map/R3F code.
