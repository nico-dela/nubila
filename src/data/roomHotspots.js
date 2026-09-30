export const CAMERA_HEIGHT = 1.55;
export const CAMERA_POSITION = [0.15, CAMERA_HEIGHT, 1.85];
export const INITIAL_LOOK_AT = [0.9, 1.25, -0.35];

export const roomHotspots = [
  {
    id: "mar",
    label: "Mar",
    meshId: "mar",
    position: [-1.55, 0.02, -1.85],
    size: [1.35, 0.08, 1.05],
    color: "#b8c9d4",
    album: {
      id: "oceanica",
      title: "Oceánica",
      year: 2024,
      status: "available",
      route: "/",
    },
  },
  {
    id: "sillon",
    label: "Sillón",
    meshId: "sillon",
    position: [-0.95, 0.38, -0.35],
    size: [0.85, 0.72, 0.78],
    color: "#e8d78a",
    album: {
      id: "terrario",
      title: "Terrario",
      subtitle: "Una poética del espacio",
      year: 2018,
      status: "coming-soon",
      route: null,
    },
  },
  {
    id: "ventana",
    label: "Ventana",
    meshId: "ventana",
    position: [2.42, 1.35, -0.25],
    size: [0.12, 1.55, 1.15],
    color: "#8ec6ef",
    album: {
      id: "disco-de-fuego",
      title: "Disco de fuego",
      year: 2027,
      status: "coming-soon",
      route: null,
    },
  },
  {
    id: "mesa-de-luz",
    label: "Mesa de luz",
    meshId: "mesa-de-luz",
    position: [1.05, 0.34, -1.55],
    size: [0.52, 0.62, 0.42],
    color: "#5c3d2e",
    album: {
      id: "jardines-del-te",
      title: "Jardines del té",
      subtitle: "EP",
      year: 2021,
      status: "coming-soon",
      route: null,
    },
  },
  {
    id: "lampara",
    label: "Lámpara",
    meshId: "lampara",
    position: [1.05, 0.78, -1.55],
    size: [0.22, 0.38, 0.22],
    color: "#d4dde3",
    album: {
      id: "creaciones-fugaces",
      title: "Creaciones fugaces",
      subtitle: "EP",
      year: 2017,
      status: "coming-soon",
      route: null,
    },
  },
  {
    id: "arena",
    label: "Arena",
    meshId: "arena",
    position: [1.45, 0.02, -1.85],
    size: [0.95, 0.08, 0.85],
    color: "#c9a56c",
    album: {
      id: "nebulosa",
      title: "Nebulosa",
      year: 2016,
      status: "coming-soon",
      route: null,
    },
  },
  {
    id: "piedras",
    label: "Camino de piedras",
    meshId: "piedras",
    position: [0.15, 0.04, -0.95],
    size: [1.05, 0.06, 0.55],
    color: "#9aa3ad",
    album: {
      id: "trilogia",
      title: "Trilogía I & II",
      subtitle: "EP",
      year: "2019–2020",
      status: "coming-soon",
      route: null,
    },
  },
];

export function getHotspotById(id) {
  return roomHotspots.find((hotspot) => hotspot.id === id);
}

export function hotspotToModalZone(hotspot) {
  return {
    title: hotspot.album.title,
    subtitle: hotspot.album.subtitle,
    year: hotspot.album.year,
  };
}
