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

## 2026-09-29 22:31:06 — Garden chrome organize + ship
- What: Renamed shared chrome styles to `ChromeControls.css`; dropped stub `LanguageSwitcher.css` / unused Vite `icons.svg`; Terrario favicon; Linktree + icon chrome; UX a11y/mute/reduced-motion/menu; slot layout. Commit, push, Cloudflare Pages deploy.
- Why: Session close — tidy chrome assets and publish the Habitación polish.
- Rejected: Bundling unfinished root R3F map PoC into this ship.
- Pending: None for this pass.

## 2026-09-29 22:30:00 — Slot layout: no clip, no overlap
- What: Replaced random edge cells with 8 fixed safe slots (unique per free object); large visual radii including orbit disks; separation pass; orbit radii capped to host’s distance from the frame. Hosts with moons prefer mid-side / bottom-center slots.
- Why: Refreshes still clipped sprites and stacked Terrario with neighbors.
- Rejected: Soft random sampling near margins (too easy to clip / collide).
- Pending: Hard-refresh visual check across a few seeds.

## 2026-09-29 22:28:00 — Keep objects inside viewport
- What: Inset edge cells; footprint clamp from sprite width + orbit + parallax (matches `-50%/-58%` anchor); softer edge bias toward an ideal inset band, not the clip line.
- Why: Margin-hug pass clipped Oceánica / Disco de Fuego / corner hosts at the frame edges.
- Rejected: Parking anchors at 5–9% without size-aware padding.
- Pending: Superseded by slot layout.

## 2026-09-29 22:22:00 — Objects hug viewport margins
- What: Narrowed layout cells into margin strips; edge-biased sampling + margin affinity score; chrome keepouts for menu / top-right controls / hint. Fixed inverted bias that pulled sprites inward.
- Why: After the 8-cell pass, objects still sat in a mid-ring with empty space at the frame edges.
- Rejected: Leaving thick mid-frame cells; placing under chrome.
- Pending: Superseded by viewport-clamp pass.

## 2026-09-29 22:20:00 — Wider object layout across viewports
- What: Replaced 4 tight quadrants with 8 edge-biased cells; larger wordmark keepout; softer orbit collision reserve; place largest/host objects first with a clearance + outward score.
- Why: Free objects clustered left/right of NUBILA with empty margins on desktop (and similarly cramped on other viewports).
- Rejected: Growing sprite % size as the primary fix; keeping huge orbit keepouts that collapsed free space.
- Pending: Superseded by margin-hug pass.

## 2026-09-29 22:14:54 — Garden high-priority UX polish
- What: Wired PoeticMenu (room closes panel; sections open overlay). Added ambient mute with localStorage. Dialog focus trap + `inert` backdrop + `aria-labelledby`. `prefers-reduced-motion` pauses CSS motion and skips parallax/tilt/zoom. Replaced interactive frame `role="img"` with labeled `<section>`.
- Why: Sections were unreachable; continuous motion and ambient had no opt-out; modal a11y incomplete; AT treated hotspots as a single image.
- Rejected: Medium/Low polish (YouTube states, hit targets, catalog width, stub copy); root CRA map work.
- Pending: Cloudflare redeploy to verify menu/mute/reduced-motion on phone.

## 2026-09-29 22:00:00 — Wider catalog panel; Brave tilt note
- What: Widened desktop side panel (`42vw` / catalog `48vw`); slightly roomier dimensiones typography. Documented that Brave often blocks motion sensors by default — tilt falls back to drag with a clear hint.
- Why: “Todas las dimensiones” read as a thin strip on desktop; user tests tilt in Brave (and peers may use Chrome/Safari/Opera/Firefox).
- Rejected: Same narrow max-width for catalog and album panels.
- Pending: Cloudflare redeploy for phone/desktop check.


- What: Reworked phone tilt: request orientation+motion permission on first tap; calibrate resting pose; fall back to `devicemotion` gravity; stop wiping tilt on touch `pointerleave`; drag remains the universal path. Honest mobile hints.
- Why: Inclination had no effect on Android (wrong beta≈45° baseline for upright phones, premature permission handling, touch leave reset). Not feasible on every device — sensors/permissions/WebViews vary; drag always works.
- Rejected: Claiming tilt works on all phones; keeping absolute beta-45 mapping.
- Pending: Redeploy to Cloudflare for Moto G56 retest.


- What: Pause Oceanica Nylon while a YouTube listen embed is playing (IFrame API); remove desktop panel drag-resize and keep a fixed full-height sidebar (`clamp(22rem, 30vw, 28rem)`); replace Libre Baskerville / Special Elite with Fraunces + DM Mono.
- Why: Ambient competing with panel media; resize handle vs desired stretched desktop panel; fresher type pairing.
- Rejected: Muting ambient for any open panel; keeping Courier/Palatino fallbacks.
- Pending: Deploy to Cloudflare when ready to retest on phone.


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
