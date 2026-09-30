import nebulosaImg from "../assets/images/objects/nebulosa.webp";
import oceanicaImg from "../assets/images/objects/oceanica.webp";
import cenizaImg from "../assets/images/objects/ceniza.webp";
import ecosistemaImg from "../assets/images/objects/ecosistema.webp";
import trilogiaImg from "../assets/images/objects/trilogia.webp";
import terrarioImg from "../assets/images/objects/terrario.webp";
import poeticaImg from "../assets/images/objects/poetica.webp";
import junglaImg from "../assets/images/objects/jungla.webp";
import cactusImg from "../assets/images/objects/cactus.webp";
import jarraImg from "../assets/images/objects/jarra.webp";
import suenosImg from "../assets/images/objects/suenos.webp";

/** Fixed widths by catalog size tier (% of frame). */
export const SIZE_TIERS = {
  album: 6.4,
  ep: 4.8,
  musicVideo: 2.75,
  liveMin: 2.5,
  liveMax: 3.1,
  blog: 4.4,
  about: 5.0,
  /** Extra shrink when an object orbits a host */
  planetScale: 0.82,
};

/**
 * Catalog objects — positions filled at runtime by layoutObjects.
 * Planets declare orbitParentId; free objects get random quadrants.
 */
export const roomObjectDefs = [
  {
    id: "nebulosa",
    dimensionId: "nebulosa",
    kind: "album",
    sizeTier: "album",
    label: { es: "Nebulosa", en: "Nebula" },
    tooltip: { es: "Nebulosa · Álbum", en: "Nebula · Album" },
    src: nebulosaImg,
    imgW: 313,
    imgH: 200,
    seed: 0.18,
  },
  {
    id: "terrario",
    dimensionId: "terrario",
    kind: "album",
    sizeTier: "album",
    label: { es: "Terrario", en: "Terrarium" },
    tooltip: { es: "Terrario · Álbum", en: "Terrarium · Album" },
    src: terrarioImg,
    imgW: 187,
    imgH: 187,
    seed: 0.55,
  },
  {
    id: "oceanica",
    dimensionId: "oceanica",
    kind: "album",
    sizeTier: "album",
    label: { es: "Oceánica", en: "Oceánica" },
    tooltip: { es: "Oceánica · Álbum", en: "Oceánica · Album" },
    src: oceanicaImg,
    imgW: 176,
    imgH: 179,
    seed: 0.88,
  },
  {
    id: "disco-de-fuego",
    dimensionId: "disco-de-fuego",
    kind: "album",
    sizeTier: "album",
    label: { es: "Disco de Fuego", en: "Fire Album" },
    tooltip: {
      es: "Disco de Fuego · Próximamente",
      en: "Fire Album · Coming soon",
    },
    src: cenizaImg,
    imgW: 160,
    imgH: 104,
    seed: 0.41,
  },
  {
    id: "trilogia-i",
    dimensionId: "trilogia-i",
    kind: "ep",
    sizeTier: "ep",
    sizeScale: 0.78,
    orbitParentId: "terrario",
    label: {
      es: "Trilogía I — Ch’ien",
      en: "Trilogy I — Ch’ien",
    },
    tooltip: {
      es: "Trilogía I — Ch’ien · La modestia, la montaña",
      en: "Trilogy I — Ch’ien · Modesty, the mountain",
    },
    src: trilogiaImg,
    imgW: 105,
    imgH: 150,
    seed: 0.29,
  },
  {
    id: "trilogia-ii",
    dimensionId: "trilogia-ii",
    kind: "ep",
    sizeTier: "ep",
    label: {
      es: "Trilogía II — Kiën",
      en: "Trilogy II — Kiën",
    },
    tooltip: {
      es: "Trilogía II · EP",
      en: "Trilogy II · EP",
    },
    src: trilogiaImg,
    imgW: 105,
    imgH: 150,
    seed: 0.67,
  },
  {
    id: "suenos",
    dimensionId: "suenos",
    kind: "musicVideo",
    sizeTier: "musicVideo",
    orbitParentId: "terrario",
    label: { es: "Sueños", en: "Dreams" },
    tooltip: { es: "Sueños · Videoclip", en: "Dreams · Music video" },
    src: suenosImg,
    imgW: 121,
    imgH: 237,
    seed: 0.47,
  },
  {
    id: "ecosistema",
    dimensionId: "ecosistema",
    kind: "musicVideo",
    sizeTier: "musicVideo",
    orbitParentId: "terrario",
    label: { es: "Ecosistema", en: "Ecosystem" },
    tooltip: {
      es: "Ecosistema · Videoclip",
      en: "Ecosystem · Music video",
    },
    src: ecosistemaImg,
    imgW: 191,
    imgH: 208,
    seed: 0.72,
  },
  {
    id: "creaciones-fugaces",
    dimensionId: "creaciones-fugaces",
    kind: "musicVideo",
    sizeTier: "musicVideo",
    orbitParentId: "nebulosa",
    label: {
      es: "Creaciones Fugaces",
      en: "Fleeting Creations",
    },
    tooltip: {
      es: "Creaciones Fugaces · Videoclip",
      en: "Fleeting Creations · Music video",
    },
    src: poeticaImg,
    imgW: 160,
    imgH: 193,
    seed: 0.22,
  },
  {
    id: "terrario-virtual",
    dimensionId: "terrario-virtual",
    kind: "live",
    sizeTier: "live",
    orbitParentId: "terrario",
    label: { es: "Terrario Virtual", en: "Virtual Terrarium" },
    tooltip: {
      es: "Terrario Virtual · En vivo",
      en: "Virtual Terrarium · Live",
    },
    src: junglaImg,
    imgW: 137,
    imgH: 192,
    seed: 0.63,
  },
  {
    id: "pez-volcan",
    dimensionId: "pez-volcan",
    kind: "live",
    sizeTier: "live",
    label: {
      es: "Vivo 10 Años en Pez Volcán",
      en: "Live: 10 Years at Pez Volcán",
    },
    tooltip: {
      es: "Pez Volcán · En vivo",
      en: "Pez Volcán · Live",
    },
    src: cactusImg,
    imgW: 82,
    imgH: 196,
    seed: 0.37,
  },
  {
    id: "blog-arte",
    dimensionId: "blog-arte",
    kind: "blog",
    sizeTier: "blog",
    label: {
      es: "¿Para qué sirve el arte?",
      en: "What is art for?",
    },
    tooltip: { es: "Blog", en: "Blog" },
    src: jarraImg,
    imgW: 96,
    imgH: 99,
    seed: 0.81,
  },
  {
    id: "nubila-about",
    dimensionId: "nubila-about",
    kind: "about",
    sizeTier: "about",
    label: { es: "Nubila", en: "Nubila" },
    tooltip: {
      es: "Nubila · Quiénes somos",
      en: "Nubila · About us",
    },
    /** Wordmark — rendered as text with Nubifont, not a sprite */
    render: "wordmark",
    seed: 0.14,
  },
];
