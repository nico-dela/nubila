import nebulosaImg from "../assets/images/objects/nebulosa.png";
import oceanicaImg from "../assets/images/objects/oceanica.png";
import cenizaImg from "../assets/images/objects/ceniza.png";
import ecosistemaImg from "../assets/images/objects/ecosistema.png";
import trilogiaImg from "../assets/images/objects/trilogia.png";
import terrarioImg from "../assets/images/objects/terrario.png";
import poeticaImg from "../assets/images/objects/poetica.png";
import junglaImg from "../assets/images/objects/jungla.png";
import cactusImg from "../assets/images/objects/cactus.png";
import jarraImg from "../assets/images/objects/jarra.png";
import suenosImg from "../assets/images/objects/suenos.png";

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

export function getRoomObjectDefById(id) {
  return roomObjectDefs.find((o) => o.id === id);
}

/** @deprecated Prefer layoutRoomObjects + roomObjectDefs */
export const roomObjects = roomObjectDefs;

export function getRoomObjectById(id) {
  return getRoomObjectDefById(id);
}
