/** Panel content for each catalog object. Bilingual fields use `{ es, en }`. */

import frioFanzinePdf from "../assets/docs/frio-fanzine.pdf?url";
import mariposaOrigamiPdf from "../assets/docs/mariposa-origami.pdf?url";
import terrarioFanzinePdf from "../assets/docs/terrario-fanzine.pdf?url";
import invertirArtePdf from "../assets/docs/invertir-en-el-arte.pdf?url";

export const dimensions = [
  {
    id: "nebulosa",
    title: { es: "Nebulosa", en: "Nebula" },
    element: { es: "Álbum", en: "Album" },
    year: 2016,
    intro: {
      es: "Antes de la habitación hubo un estallido suave: polvo, geometría, una primera forma de respirar juntos. Este es el Big Bang de Nubila.",
      en: "Before the room there was a soft burst: dust, geometry, a first way of breathing together. This is Nubila’s Big Bang.",
    },
    theme: "nebulosa",
    listen: [
      {
        videoId: "1hkJa7C28ew",
        title: { es: "Nebulosa", en: "Nebula" },
      },
    ],
  },
  {
    id: "terrario",
    title: { es: "Terrario", en: "Terrarium" },
    element: { es: "Álbum", en: "Album" },
    year: 2018,
    intro: {
      es: "«Hubo un tiempo en que yo pensaba mucho en los axolotl.» (Cortázar). Entre el terrario y la mirada, habitamos lo mínimo para no ahogarnos en lo grande.",
      en: "“There was a time when I thought a lot about the axolotl.” (Cortázar). Between the terrarium and the gaze, we inhabit the small so we do not drown in the large.",
    },
    theme: "terrario",
    listen: [
      {
        listId: "OLAK5uy_npS8epaqcmKQ6V-6qwpVZv6HukdsV-kbM",
        title: { es: "Terrario", en: "Terrarium" },
      },
    ],
  },
  {
    id: "oceanica",
    title: { es: "Oceánica", en: "Oceánica" },
    element: { es: "Álbum", en: "Album" },
    year: 2024,
    intro: {
      es: "Freud habló de un sentimiento oceánico: la impresión de no tener límites, de fundirse con lo inmenso. Aquí el agua no es paisaje; es escala.",
      en: "Freud spoke of an oceanic feeling: the sense of having no edges, of melting into the immense. Here water is not scenery; it is scale.",
    },
    theme: "oceanica",
    listen: [
      {
        listId: "OLAK5uy_nqLO_XD9dzNd-aBYK1mYDHCqBE6o_XD2M",
        title: { es: "Oceánica", en: "Oceánica" },
      },
    ],
  },
  {
    id: "disco-de-fuego",
    title: { es: "Disco de Fuego", en: "Fire Album" },
    element: { es: "Álbum · Próximamente", en: "Album · Coming soon" },
    year: null,
    intro: {
      es: "El fuego consume la habitación para que pueda empezar de nuevo. Todavía arde abajo: dejá tu señal y te avisamos cuando salga a la superficie.",
      en: "Fire consumes the room so it can begin again. It still burns below: leave your signal and we’ll tell you when it rises to the surface.",
    },
    theme: "fuego",
    waitlist: true,
  },
  {
    id: "trilogia-i",
    title: {
      es: "Trilogía I — Ch’ien",
      en: "Trilogy I — Ch’ien",
    },
    element: { es: "EP", en: "EP" },
    subtitle: {
      es: "La modestia, la montaña",
      en: "Modesty, the mountain",
    },
    year: 2019,
    intro: {
      es: "Un gong en la habitación: lo que se toca una vez sigue vibrando. Primer EP de la trilogía — la montaña como modestia.",
      en: "A gong in the room: what is struck once keeps ringing. First EP of the trilogy — the mountain as modesty.",
    },
    theme: "trilogia",
    listen: [
      {
        videoId: "0yamVsm72xw",
        title: { es: "Día", en: "Día" },
      },
      {
        videoId: "cni8t_EE8rc",
        title: { es: "Portales", en: "Portals" },
      },
      {
        videoId: "OFr1u_XzIBQ",
        title: { es: "Ecosistema", en: "Ecosystem" },
      },
    ],
  },
  {
    id: "trilogia-ii",
    title: {
      es: "Trilogía II — Kiën",
      en: "Trilogy II — Kiën",
    },
    element: { es: "EP", en: "EP" },
    subtitle: {
      es: "El poder de lo creativo",
      en: "The power of the creative",
    },
    year: 2020,
    intro: {
      es: "Segunda resonancia de la trilogía: el poder de lo creativo entre lo mínimo y lo que vuelve.",
      en: "Second resonance of the trilogy: the power of the creative between the minimal and what returns.",
    },
    theme: "trilogia",
    listen: [
      {
        videoId: "zlMNPiDbHQE",
        title: { es: "Así", en: "Así" },
      },
      {
        videoId: "m8MX_O3V988",
        title: { es: "Espacialidad", en: "Espacialidad" },
      },
      {
        videoId: "rIfBNGwbBxo",
        title: { es: "Fotograma", en: "Fotograma" },
      },
    ],
  },
  {
    id: "suenos",
    title: { es: "Sueños", en: "Dreams" },
    element: { es: "Videoclip · Terrario", en: "Music video · Terrarium" },
    year: 2018,
    intro: {
      es: "Varias caras miran a la vez. El sueño no elige un solo rostro: habita todos juntos. Gira alrededor de Terrario.",
      en: "Several faces look at once. Dream does not choose one face: it inhabits them all together. It orbits Terrarium.",
    },
    theme: "suenos",
    listen: [
      {
        videoId: "zO1L7Grx1VQ",
        title: { es: "Sueños", en: "Dreams" },
      },
    ],
  },
  {
    id: "ecosistema",
    title: { es: "Ecosistema", en: "Ecosystem" },
    element: { es: "Videoclip · Terrario", en: "Music video · Terrarium" },
    year: 2018,
    intro: {
      es: "Un circuito vivo alrededor de Terrario: aire, raíces y ecos que se alimentan entre sí.",
      en: "A living circuit around Terrarium: air, roots, and echoes that feed each other.",
    },
    theme: "aire",
    listen: [
      {
        videoId: "BY4Yhl8uxgA",
        title: { es: "Ecosistema", en: "Ecosystem" },
      },
    ],
  },
  {
    id: "creaciones-fugaces",
    title: {
      es: "Creaciones Fugaces",
      en: "Fleeting Creations",
    },
    element: { es: "Videoclip · Nebulosa", en: "Music video · Nebula" },
    year: 2017,
    intro: {
      es: "Destellos que orbitan el Big Bang de Nubila: formas que aparecen y se disuelven alrededor de Nebulosa.",
      en: "Flashes that orbit Nubila’s Big Bang: forms that appear and dissolve around Nebula.",
    },
    theme: "poetica",
    listen: [
      {
        videoId: "7jgePiPIXZY",
        listId: "PLn4tIG1iX8-z-eosu_UQRUajuMASzvxbv",
        title: {
          es: "Creaciones Fugaces",
          en: "Fleeting Creations",
        },
      },
    ],
  },
  {
    id: "terrario-virtual",
    title: { es: "Terrario Virtual", en: "Virtual Terrarium" },
    element: { es: "Concierto en vivo", en: "Live concert" },
    year: 2021,
    intro: {
      es: "La versión viva del álbum: el terrario se abre en escena y el cuarto se llena de gente.",
      en: "The live version of the album: the terrarium opens on stage and the room fills with people.",
    },
    theme: "jungla",
    listen: [
      {
        videoId: "EXmD7x5fo1I",
        title: { es: "Terrario Virtual", en: "Virtual Terrarium" },
      },
    ],
  },
  {
    id: "nebulosa-live",
    title: {
      es: "Nebulosa (Live Studio Theater)",
      en: "Nebula (Live Studio Theater)",
    },
    element: { es: "Concierto en vivo", en: "Live concert" },
    intro: {
      es: "El Big Bang en escena: Nebulosa vuelve a encenderse bajo las luces del Studio Theater.",
      en: "The Big Bang on stage: Nebula lights up again under the Studio Theater lamps.",
    },
    theme: "jungla",
    listen: [
      {
        videoId: "Kg5NjZi3P_M",
        title: {
          es: "Nebulosa (Live Studio Theater)",
          en: "Nebula (Live Studio Theater)",
        },
      },
    ],
  },
  {
    id: "sesion-clix",
    title: {
      es: "Luis (Sesión Clix Modernos)",
      en: "Luis (Clix Modernos Session)",
    },
    element: { es: "Sesión", en: "Session" },
    intro: {
      es: "Una sesión íntima: Luis en Clix Modernos, el cuarto reducido a voz, cables y cercanía.",
      en: "An intimate session: Luis at Clix Modernos, the room reduced to voice, cables, and closeness.",
    },
    theme: "cactus",
    listen: [
      {
        videoId: "LFSvZiAF0k4",
        title: {
          es: "Luis (Sesión Clix Modernos)",
          en: "Luis (Clix Modernos Session)",
        },
      },
    ],
  },
  {
    id: "frio-fanzine",
    title: { es: "Frio", en: "Frio" },
    element: { es: "Fanzine · Oceánica", en: "Fanzine · Oceánica" },
    year: 2024,
    intro: {
      es: "Tinta alrededor de Oceánica: un fanzine de TOBECO.D donde la escala se invierte y la casa muta.",
      en: "Ink orbiting Oceánica: a fanzine by TOBECO.D where scale flips and the house mutates.",
    },
    theme: "frio",
    pdf: {
      src: frioFanzinePdf,
      title: { es: "Frio · La Casa Mutante", en: "Frio · The Mutant House" },
    },
  },
  {
    id: "mariposa-origami",
    title: { es: "Mariposa Origami", en: "Origami Butterfly" },
    element: { es: "Fanzine · Oceánica", en: "Fanzine · Oceánica" },
    year: 2024,
    intro: {
      es: "Pliegues que orbitan Oceánica: una mariposa de papel que abre sus alas página a página.",
      en: "Folds that orbit Oceánica: a paper butterfly that opens its wings page by page.",
    },
    theme: "frio",
    pdf: {
      src: mariposaOrigamiPdf,
      title: { es: "Mariposa Origami", en: "Origami Butterfly" },
    },
  },
  {
    id: "terrario-fanzine",
    title: { es: "Terrario Fanzine", en: "Terrarium Fanzine" },
    element: { es: "Fanzine · Terrario", en: "Fanzine · Terrarium" },
    year: 2024,
    intro: {
      es: "El álbum en tinta: un fanzine que gira con Terrario y recoge su ecosistema en papel.",
      en: "The album in ink: a fanzine that turns with Terrarium and gathers its ecosystem on paper.",
    },
    theme: "frio",
    pdf: {
      src: terrarioFanzinePdf,
      title: { es: "Terrario Fanzine", en: "Terrarium Fanzine" },
    },
  },
  {
    id: "pez-volcan",
    title: {
      es: "Vivo 10 Años en Pez Volcán",
      en: "Live: 10 Years at Pez Volcán",
    },
    element: { es: "Concierto en vivo", en: "Live concert" },
    year: 2025,
    intro: {
      es: "Diez años de Nubila en Pez Volcán: el recorrido vivo de una década en la habitación.",
      en: "Ten years of Nubila at Pez Volcán: the live arc of a decade in the room.",
    },
    theme: "cactus",
    listen: [
      {
        listId: "OLAK5uy_mzht0i60HN8R_GBoJtTwqj7OoJtNPHFjY",
        title: {
          es: "Vivo 10 Años en Pez Volcán",
          en: "Live: 10 Years at Pez Volcán",
        },
      },
    ],
  },
  {
    id: "blog-invertir-arte",
    title: {
      es: "¿Hasta cuándo invertir en el arte?",
      en: "How long to invest in art?",
    },
    element: { es: "Blog", en: "Blog" },
    year: 2023,
    intro: {
      es: "Una lectura en páginas: hasta cuándo tiene sentido invertir tiempo, cuerpo y deseo en el arte.",
      en: "A reading in pages: how long it makes sense to invest time, body, and desire in art.",
    },
    theme: "jarra",
    pdf: {
      src: invertirArtePdf,
      title: {
        es: "¿Hasta cuándo invertir en el arte? · Blog",
        en: "How long to invest in art? · Blog",
      },
    },
  },
  {
    id: "nota-vamos-bandas",
    title: {
      es: "Vamos las bandas",
      en: "Vamos las bandas",
    },
    element: { es: "Nota", en: "Press" },
    year: 2017,
    theme: "jarra",
    /**
     * Live cultura.gob.ar blocks iframes — same-origin archive in a mini browser.
     */
    embed: {
      title: {
        es: "Vamos las bandas",
        en: "Vamos las bandas",
      },
      address:
        "cultura.gob.ar/conoce-a-los-ganadores-de-vamos-las-bandas_4723",
      src: "/notas/vamos-bandas.html",
    },
  },
  {
    id: "nota-lavoz",
    title: {
      es: "Más música cordobesa en cuarentena",
      en: "More Córdoba music in quarantine",
    },
    element: { es: "Nota", en: "Press" },
    year: 2020,
    theme: "jarra",
    /** Live lavoz.com.ar blocks iframes — same-origin archive. */
    embed: {
      title: {
        es: "Más música cordobesa en cuarentena",
        en: "More Córdoba music in quarantine",
      },
      address:
        "lavoz.com.ar/vos/musica/mas-musica-cordobesa-en-cuarentena…",
      src: "/notas/lavoz-cuarentena.html",
    },
  },
  {
    id: "nota-invitacion",
    title: {
      es: "Video invitación de fecha",
      en: "Show invitation video",
    },
    element: { es: "Nota", en: "Press" },
    theme: "jarra",
    embed: {
      title: {
        es: "Video invitación de fecha",
        en: "Show invitation video",
      },
      address: "facebook.com/nubila.musica/videos/…",
      src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fnubila.musica%2Fvideos%2F1875614386010272%2F&show_text=false&width=560",
      /** Facebook iframe has no play API — pause ambient while this viewer is open. */
      pausesAmbient: true,
    },
  },
  {
    id: "nubila-about",
    title: { es: "Quiénes somos", en: "About us" },
    hideEyebrow: true,
    intro: {
      es: "Nubila es una banda de Córdoba. Habitamos un cuarto digital — álbumes, EPs, videoclips y conciertos — donde cada objeto es una puerta a otra temperatura del mismo jardín.",
      en: "Nubila is a band from Córdoba. We inhabit a digital room — albums, EPs, music videos, and concerts — where each object is a door to another temperature of the same garden.",
    },
    body: [
      {
        es: "Desde Nebulosa hasta Oceánica, pasando por Terrario y la Trilogía, el proyecto crece como un gabinete de curiosidades: escucha, lectura y escena en un mismo espacio.",
        en: "From Nebula to Oceánica, through Terrarium and the Trilogy, the project grows like a cabinet of curiosities: listening, reading, and stage in one space.",
      },
    ],
    theme: "about",
  },
];

export function getDimensionById(id) {
  return dimensions.find((d) => d.id === id);
}

/** Year used for timeline sort; waitlist / undated → upcoming bucket. */
export function dimensionSortYear(d) {
  if (d.waitlist || d.year == null) return null;
  if (typeof d.year === "number") return d.year;
  const parsed = parseInt(String(d.year), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Catalog entries for “Las Dimensiones”, oldest → newest, then coming soon. */
export function getCatalogGroupedByYear() {
  const items = dimensions.filter((d) => d.id !== "nubila-about");
  const groups = new Map();

  items.forEach((d) => {
    const y = dimensionSortYear(d);
    const key = y == null ? "upcoming" : String(y);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(d);
  });

  const years = [...groups.keys()]
    .filter((k) => k !== "upcoming")
    .map(Number)
    .sort((a, b) => a - b);

  const result = years.map((y) => ({
    key: String(y),
    year: y,
    label: { es: String(y), en: String(y) },
    items: groups.get(String(y)),
  }));

  if (groups.has("upcoming")) {
    result.push({
      key: "upcoming",
      year: null,
      label: { es: "Próximamente", en: "Coming soon" },
      items: groups.get("upcoming"),
    });
  }

  return result;
}
