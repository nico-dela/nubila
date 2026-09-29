# Nubila Garden (PoC)

Single-page poetic entrance for Nubila. Preview (does not replace the main site):

**Share links**

- Cloudflare Pages (recommended): run `npm run deploy:cf` → `*.pages.dev`
- Beside the main site: **https://nubila.ar/garden/** (`npm run deploy`)

```bash
cd garden
npm install
npm run dev
```

Production build uses base `/garden/`.

## Deploy preview

```bash
cd garden
npm run deploy
```

Publishes `dist/` into the existing `gh-pages` branch under `/garden/`, next to the live CRA site.

## Interactions

- Move the pointer (or drag / tilt on mobile) for parallax
- Click an object → zoom → side panel
- **NUBILA** wordmark → About
- ES / EN switcher (top right)
- Ambient *Oceanica Nylon* starts after the first click

Tune positions with `/garden/?debugSectors=1` in production.
