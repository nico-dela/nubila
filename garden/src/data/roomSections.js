export const roomSections = {
  origen: {
    id: "origen",
    eyebrow: { es: "El Origen", en: "The Origin" },
    title: {
      es: "La biografía todavía germinando",
      en: "A biography still germinating",
    },
    body: [
      {
        es: "Este espacio guarda el relato de Nubila. Tocá el objeto Nubila en la habitación para leer quiénes somos — o abrí Las Dimensiones para recorrer el catálogo.",
        en: "This space holds Nubila’s story. Touch the Nubila object in the room to read who we are — or open The Dimensions to browse the catalog.",
      },
    ],
  },
  dimensiones: {
    id: "dimensiones",
    eyebrow: { es: "Las Dimensiones", en: "The Dimensions" },
    title: {
      es: "Puertas en la misma habitación",
      en: "Doors in the same room",
    },
    body: [
      {
        es: "Cada objeto es un álbum, un EP, un videoclip o un concierto — una temperatura distinta del mismo cuarto. Elegí una dimensión o tocá un objeto en la habitación.",
        en: "Each object is an album, an EP, a music video, or a concert — a different temperature of the same room. Choose a dimension or touch an object in the room.",
      },
    ],
    listDimensions: true,
  },
  habitantes: {
    id: "habitantes",
    eyebrow: { es: "Los Habitantes", en: "The Inhabitants" },
    title: {
      es: "Próximas habitaciones a habitar",
      en: "Rooms still waiting to be inhabited",
    },
    body: [
      {
        es: "Aquí vivirá la agenda: fechas, salas, la comunidad que entra al cuarto con la banda. Los humanoides diminutos todavía están acomodando las sillas.",
        en: "Here the calendar will live: dates, rooms, the community that enters the chamber with the band. The tiny humanoids are still arranging the chairs.",
      },
      {
        es: "Próximamente: listado de shows y objetos encontrados en la habitación (merch).",
        en: "Coming soon: a list of shows and objects found in the room (merch).",
      },
    ],
  },
  correspondencias: {
    id: "correspondencias",
    eyebrow: { es: "Correspondencias", en: "Correspondences" },
    title: {
      es: "Escribirle a la habitación",
      en: "Writing to the room",
    },
    body: [
      {
        es: "Contacto y redes sociales de Nubila. Este rincón se llenará de enlaces cuando el gabinete deje de ser un ensayo.",
        en: "Nubila’s contact and social networks. This corner will fill with links once the cabinet stops being a draft.",
      },
    ],
    links: [{ href: "https://nubila.ar", label: "nubila.ar" }],
  },
};

export function getSectionById(id) {
  return roomSections[id] ?? null;
}
