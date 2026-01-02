import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import volverImage from "../assets/images/circle-xmark-regular.svg";
import fotoGrupal from "../assets/images/foto_grupal.webp";

import "../styles/BlogPage.css";

const pageVariants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const sectionVariants = {
  initial: {
    opacity: 0,
    y: -30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const BlogPage = () => {
  return (
    <motion.div
      className="container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <h1 className="heading">BLOG</h1>
      <motion.div className="credits-container" variants={sectionVariants}>
        <motion.article
          className="blog-post-card"
          initial="initial"
          animate="animate"
        >
          <div className="blog-post-header">
            <h2 className="blog-post-title">
              ¿HASTA CUANDO INVERTIR EN EL ARTE?
            </h2>
            <h3>
              Preguntas diez años después, un disco en vivo y un 2025 que se va.
            </h3>
            <time className="blog-post-date" dateTime="2024-01-15">
              02 de Enero 2026
            </time>
          </div>

          <div className="blog-post-content">
            <p>
              Este año Nubila cumplió diez años. De encuentros, ensayos, viajes,
              escenarios diferentes, de grabaciones improvisadas y otras muy
              pensadas. Al conversar juntxs sobre estos recuerdos aparecen
              imágenes sueltas, recorridos y decisiones que fuimos tomando, que
              en su momento parecían simples y un poco insignificantes, puro
              impulso e intuición, pero ahora vemos lo importante y decisivas
              que fueron algunas de ellas.
            </p>
            <p>
              Nuestra historia viene llena de muchas preguntas, que insisten,
              son temas recurrentes, están ahí, no son solo una queja, sino
              pensamientos compartidos que reclaman ser “dichos en voz alta” y
              que queremos dejarlos escritos para ampliar la conversación.
            </p>
            <p>
              El 2025 redobló las preguntas que nos acompañaron a lo largo de
              estos diez años. Empezamos decididos a realizar nuestra
              inscripción en SADAIC, nos tuvieron de hijxs, terminamos las
              partituras de todos los temas y dejaron de ser necesarias. Hasta
              2019 algunos de nosotrxs nos resistimos a hacer este trámite por
              varias razones. Sobre todo, porque no estábamos de acuerdo con la
              forma de la distribución de la ganancia entre los contribuyentes,
              no era justa. También, porque creíamos en otra política de
              producción, siendo “hijxs del internet” entendíamos que eran otras
              lógicas las que movían la producción y circulación digital de la
              música.{" "}
              <strong>
                El conocimiento abierto y una economía abierta para la cultura
                eran una posibilidad
              </strong>
              , por eso, licenciamos nuestras obras con Creative Commons y
              seguimos esta convicción colectiva.
            </p>
            <strong>
              {" "}
              Pero en estos últimos 5 años algo cambió muy rápido y ahora
              intentamos entenderlo…
            </strong>
            <p>
              La vida se ajustó a tener que pagarla. El tiempo para pensar en
              las cosas y el hacer arte, se redujo aún más y sólo se limita a
              generar el dinero para que esto subsista ….{" "}
              <strong>La sensación de que el dinero escasea se agigantó</strong>
              . Se siente en las calles, en las casas y en los escenarios. ¿Será
              que escasea porque lo guardaron en algunos pocos bolsillos y
              billeteras virtuales que crecen minuto a minuto con la bicicleta
              financiera? ¿Qué hacemos entonces con estos ideales y valores que
              movían la convicción y sentido de hacer arte, de muchos y muchas,
              si ahora parecemos obligados a pensar todo el tiempo en el dinero?
              ¿Es una especie de <strong>trampa frustrante</strong> para
              hacernos creer que la única forma de pensar es en términos de
              negocio? ¿Y a quienes les sirve el arte como un negocio? Hay
              muchas consecuencias de esto, pero una importante es que no
              podamos dejar de hablar en términos de <strong>consumo</strong>.
            </p>
            <p>
              Entonces repasamos algunas de nuestras decisiones intentado salir
              de ahí, buscando una fuga posible y colectiva:
            </p>
            <ul>
              <li>
                <strong>Si la vida se ajustó a tener que pagarla</strong>, ¿qué
                lugar queda para el tiempo que no rinde, que no factura, que no
                produce ganancia inmediata? ¿Quién instala esa idea y a quién
                beneficia? ¿Porque nos obliga a medir todo en términos de
                retorno, alcance, visualizaciones, ventas? Ante esto, nosotrxs
                nos encontramos y también ensayamos todos los lunes ;). No es
                una obligación, tampoco sólo inercia. Ese rato (rito) ordena
                algo de lo que nos pasará en la semana, entre pensamientos y
                deseos. Hacer música juntxs es una manera de estar en el mundo,
                de vivir digamos, de hacer otro tiempo. Ocio Creativo.
              </li>
              <li>
                Si el tiempo para pensar y hacer arte se reduce a la posibilidad
                de tener dinero,{" "}
                <strong>
                  ¿quiénes pueden seguir creando y quiénes quedan afuera?
                </strong>{" "}
                ¿Estar en una provincia sigue siendo sinónimo de llegar más
                tarde, con menos recursos y más esfuerzo? ¿Qué implica hacer
                arte lejos del centro? ¿Por eso cuesta tanto sostener proyectos
                artísticos en Córdoba?¿Hasta qué punto naturalizamos que “en
                Buenos Aires haya más condiciones”? ¿Quién decide dónde están
                las condiciones y por qué? ¿Cuáles son las condiciones que
                necesitamos? ¿Podemos construir otras centralidades desde acá o
                estamos condenados a medirnos siempre en relación a otro lugar?
                por eso nos gusta tocar con artistas en condiciones de
                comodidad, buscando formas de igualdad, aún cuando no las
                tengamos, y organizar fechas en conjunto, evitando sentir que le
                debemos algo a alguien cool que te dio “la gracia” para estar en
                el lugar a donde estas…. estas lógicas de adoración pequeñas y
                superficiales parecen tontas, pero lamentablemente crecen como
                plantas invasoras en el monte de una farándula indie, asfixiando
                el crecimiento del bosque cultural nativo.
              </li>
              <li>
                Entonces, ¿hay que invertir en el arte? ¿Pero quién invierte y
                desde dónde? <strong>¿Invertir es lo mismo que cuidar?</strong>{" "}
                En estos últimos 5 años{" "}
                <strong>
                  decidimos tocar solo cuando estuviéramos de acuerdo con las
                  condiciones
                </strong>
                , digamos que haya un balance o un cuidado entre lo que
                invertimos y lo que ganamos. Un equilibrio sostenido en muchas
                variables que no son necesariamente en ganar dinero. Esto cambió
                la lógica de todo.{" "}
                <strong>¿Qué se volvió una ganancia para nosotrxs?</strong>
                Por ejemplo, tener un registro de imágenes que nos permitan
                atesorar y volver a lo que hicimos, un registro que haga
                memoria, porque desafía{" "}
                <strong>
                  lo ingrato de la vida de una banda en la provincia, esa
                  volátil capacidad de documentar y hacer su historia pública
                </strong>
                . O pasarnos medio año haciendo un documental que aún no
                terminamos.
              </li>
              <li>
                <strong>
                  Si los nombres se borran y las experiencias de muchxs se
                  olvidan demasiado fácilmente
                </strong>
                . ¿Qué lugar ocupan las redes digitales en esto? ¿acercan la
                música a las personas <strong>o la vuelven descartable?</strong>{" "}
                ¿Qué pasa con el trabajo simbólico, afectivo y comunitario que
                no se puede “bicicletear financieramente”? ¿Cómo acumula
                capital?¿Se puede crear sin tener que convertir cada gesto en
                contenido para una red digital? ¿Se puede compartir sin tener
                que optimizar y garantizar masividad para mejorar el
                rendimiento? ¿Esto es lo que nxs homogeneiza?{" "}
                <strong>¿Estamos comunicando más pero diciendo menos?</strong>{" "}
                ¿Los métodos de comunicación actuales nos empujan a esta
                superficialidad? sigamos pensándolo en relación a la ganancia de
                un registro fotográfico, sin reducirlo al mundo instagram o tik
                tok, pues además de servir para “ser mostrado” en redes
                digitales, permite trascender a la imposición de este tiempo
                efímero…. las bandas que arrancan ¿se han preguntado cómo
                accederán a los archivos y materiales que les permitan entender
                su historia en 10 años? ¿Cómo se veían? ¿Cómo eran los
                escenarios? ¿qué pasaba con sus cuerpos en ellxs? ¿qué cosas
                estaban fuera de lugar? Nosotrxs somos de la generación de la
                memoria local, de las tarjetas de memoria, los pendrive y los
                discos duros, por eso creemos que son preguntas cruciales para
                hacerse en este momento: ¿A dónde se deposita el valor de
                nuestra labor? ¿en las obras? ¿en lo que se cuenta sobre ellas?
                ¿en lo que permanece en el tiempo de ellas? ¿que las hace durar?
                ¿las redes de colaboración? ¿será que podemos armar redes de
                colaboración menos familiares, menos “gremiales” y más
                interdisciplinarias y comunitarias entre fotografxs, artistas
                visuales, musicxs, escenógrafos, directorxs de arte, etc.? Este
                posteo está acompañado de un registro de fotos realizado por
                Amanda Hitt durante el último toque del año, que compartimos con
                Mora (que vino a visitarnos desde Bs As) y de Sofi Barudi. Las
                composiciones de estas fotos muestran también el trabajo de
                Ulises (visual.lise) que tejen una forma de composición especial
                para imagen que captura la fotos, es decir, una pantalla que
                abre y rompe el espacio físico de la escena.
              </li>
              <img alt="Foto grupal" src={fotoGrupal} loading="lazy" />
              <li>
                <strong>
                  Por suerte aún sabemos que lo que ocurre en el vivo es
                  irremplazable
                </strong>
                . Aunque cada vez parezca más difícil convocar a las personas a
                estar presentes en un espectáculo. Lo que pasa arriba del
                escenario no se agota en su registro. La narración nunca es la
                cosa. Por eso en estos años “viajamos mucho” a la Plata, Buenos
                Aires, Rosario, Mar del Plata, Uruguay. A Marcos Juárez, al
                Abasto, a 990, a Club de la Milanesa del Cerro, Johnny B. Good,
                Cocina de Culturas, La Piojera, Studio Teatro, el Parque
                Sarmiento, la UNC, los quinchos de Alta Gracia, Club Paraguay,
                Casa de Pepino, el Carena, el Festival Mañana es Mejor, el
                Favela, Pez Volcán, Golden Monkey, Los 7 Locos, Casa Babylon.
                Cada desplazamiento, cercano o lejano, nos dio conocimientos
                para seguir tomando decisiones. También confiamos que en cada
                lugar existieron personas que vieron, escucharon, movieron el
                pié o las manos al ritmo, y quizás hasta se fueron tarareando
                una melodía o cantando las letras con su voz. Personas que
                sintieron.{" "}
              </li>
            </ul>
            <p>
              Y entonces, usted se preguntará{" "}
              <strong>
                ¿qué alianzas, qué redes, qué formas colectivas necesitamos para
                que esto deje de ser solo preguntas?
              </strong>{" "}
              Si tenés una respuesta, <strong>llamanos Ya!</strong> Después de
              estos años quizás sea momento de replantearnos la cultura del
              aguante, para convertirla en otra cosa. Y necesitamos crear una
              cultura más poderosa de todxs los que estén en ésta para{" "}
              <strong>dejar de aguantar y gozar más los trapos.</strong>
            </p>
          </div>
        </motion.article>
      </motion.div>
      <motion.div
        className="back-to-home-link"
        initial="initial"
        animate="animate"
      >
        <Link to="/">
          <img src={volverImage} alt="Volver" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default BlogPage;
