import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import lacasaLogo from "../assets/images/lacasa-logo.png";
import volverImage from "../assets/images/circle-xmark-regular.svg";
import "../styles/CreditosPage.css";

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

const CreditosPage = () => {
  return (
    <motion.div
      className="container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <h1 className="heading">CREDITOS</h1>
      <motion.div className="credits-container" variants={sectionVariants}>
        <h3 style={{ fontSize: "1.5rem" }}>Hacemos NUBILA</h3>
        <div className="credit">
          Mateo Gencarelli, Nicolás de la Cruz, Tobias Gencarelli, Araceli
          Bonfigli, Julian Medrano, Candela Gencarelli y Ulises Gencarelli
        </div>

        <br></br>
        <br></br>

        <h3 style={{ fontSize: "1.5rem" }}>
          ¿Qué roles cumplimos en Oceánica?
        </h3>
        <div className="credit">
          <strong>Música y grabación de la canciones</strong>, Musicxs,
          Producción musical y postproducción digital [Técnica de grabación,
          Mezcla y Mastering].
        </div>
        <div className="credit">
          <strong>Visión y propuesta estética del disco</strong> Dirección de
          arte y equipos de trabajo, Diseño de contenidos gráficos y
          audiovisuales digitales, Desarrollo Web, Taller creativo.
        </div>

        <br></br>
        <br></br>

        <h3 style={{ fontSize: "1.5rem" }}>¿Quiénes?</h3>
        <div className="credit">
          <a
            href="https://www.instagram.com/aracelibonfigli/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Araceli Bonfigli
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/lil.lise.mp4/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ulises Gencarelli
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/delacruz-nicolas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nicolás de la Cruz
          </a>
          ,{" "}
          <a
            href="https://linktr.ee/tobigenca"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tobias Gencarelli
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/_julianmedrano/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Julián Medrano
          </a>
          ,{" "}
          <a
            href="https://linktr.ee/candelagencarelli"
            target="_blank"
            rel="noopener noreferrer"
          >
            Candela Gencarelli
          </a>
          ,{" "}
        </div>
        <div className="credit">
          <a
            href="https://www.instagram.com/mucho.gregre/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gregorio López
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/mateogenca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mateo Gencarelli
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/marianogarione/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mariano Garione
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/tomysalguero/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tomás Salguero
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/ficoborgognone/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fico Borgognone
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/andygenca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Andy Gencarelli
          </a>
        </div>

        <h4 style={{ fontSize: "1.2rem" }}>
          Taller gráfico que elaboró las postales, imagenes y poemas de este
          disco:{" "}
        </h4>
        <div className="credit">
          <a
            href="https://www.instagram.com/pazellena/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Paz Ellena
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/emiliadipa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Emilia Di Pasquale
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/eugenia_esd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eugenia Sánchez
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/luz.penia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Luz Peña
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/xsuburbia_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            So
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/candegenca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cande
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/_julianmedrano/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Juli
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/mateogenca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mateo Genca
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/tobeco.o/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tobeco.o
          </a>
        </div>

        <h4 style={{ fontSize: "1.2rem" }}>
          Taller sonoro que elaboró las postales, imágenes y poemas de este
          disco:{" "}
        </h4>
        <div className="credit">
          <a
            href="https://www.instagram.com/camilogenca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Camilo Gencarelli
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/lara.fernandez.lar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lara Fernandez
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/aracelibonfigli/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Araceli Bonfigli
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/candegenca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cande
          </a>
        </div>

        <br></br>
        <br></br>

        <h3 style={{ fontSize: "1.5rem" }}>
          ¿Qué otros estudios articularon con nosotrxs?
        </h3>
        <div className="credit">
          <a
            href={"https://www.instagram.com/homekong.studio/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            HOME KONG Studio
          </a>
        </div>

        <div className="credit">
          <a
            href={"https://www.instagram.com/surlumina/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Surlumina Estudio
          </a>
        </div>

        <br></br>
        <br></br>

        <h3 style={{ fontSize: "1.5rem" }}>
          Agradecimientos especiales a toda la red de La Casa Mutante que aporta
          al trabajo artístico en comunidad.
        </h3>
        <div className="tc-credit-container">
          <div className="tc-credit">
            <strong>A.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/agui_guillen/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agui
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/augusto.mazzoni/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Augusto Mazzoni
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mandy_hitt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Amanda
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/andygenca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Andy Genca
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/aracelibonfigli/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Araceli Bonfigli
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/arianarios._/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ariana Ríos
                </a>
              </li>
            </ul>{" "}
            <strong>C.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/camilogenca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Camilo
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/candegenca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cande
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/artevago/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cata (Artevago)
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cesarllanosart/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cesar Llanos
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/conslemmeh_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cons Lemmeh
                </a>
              </li>
            </ul>{" "}
            <strong>D.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/delfroggidel/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Delfi Ferrari
                </a>
              </li>
            </ul>{" "}
            <strong>E.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/elblogorio/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  El Gregorio, el viejo
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/emiliadipa/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Emi Di Pasquale
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/estefinsta/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Estefi
                </a>
              </li>
            </ul>{" "}
            <strong>F.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/caminantered/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facu Cáceres
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/facurodriguezalochis/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facu Rodriguez
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/flormazzoni/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Flor Mazzoni
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/frappzter/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fransis
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/franaltamirano_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fran Altamirano
                </a>
              </li>
            </ul>{" "}
          </div>
          <div className="tc-credit">
            <strong>G.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/mucho.gregre/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Grego López
                </a>
              </li>
            </ul>{" "}
            <strong>I.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/ignacio_roque_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Igna Roque
                </a>
              </li>
            </ul>{" "}
            <strong>J.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/tuuuviejaesarte/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jose Tu Vieja Es Arte
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_julianmedrano/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Juli Medrano
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/juanfreguglia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Juan Freguglia
                </a>
              </li>
            </ul>{" "}
            <strong>L.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/lara.fernandez.lar/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lara
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/lil.lise.mp4/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lil Lise
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/loli_rodriguez/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Loli Rodriguez
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/luz.penia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Luz Peña
                </a>
              </li>
            </ul>{" "}
            <strong>M.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/mateogenca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mateo
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/matilde.gencarelli/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Matilde
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/marianogarione/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mariano Garione
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/manumostaza1/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Manu Mostaza
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/maxi.genca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Maxi Genca
                </a>
              </li>
            </ul>{" "}
            <strong>N.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/caceresnehuen/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nehuen
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/dela.nou/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nico
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/nanulimon/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nahir
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/elyayoh/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nacho Huerta
                </a>
              </li>
            </ul>{" "}
          </div>
          <div className="tc-credit">
            <strong>O.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/octagenca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Octavio
                </a>
              </li>
            </ul>{" "}
            <strong>P.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/pazaravenac/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Paz Aravena
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/pazellena/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Paz Ellena
                </a>
              </li>
            </ul>{" "}
            <strong>S.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/salvigencarelli/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Salviii
                </a>
              </li>
            </ul>{" "}
            <strong>T.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/tobeco.o/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tobeco
                </a>
              </li>
            </ul>{" "}
            <strong>V.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/____valentain/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Valentain
                </a>
              </li>
            </ul>{" "}
            <strong>Y.</strong>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/yaniarraya"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Yani Arraya
                </a>
              </li>
            </ul>{" "}
            <a
              href={
                "https://www.instagram.com/la.casa.mutante/?utm_source=ig_web_button_share_sheet&igshid=ZDNlZDc0MzIxNw=="
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={lacasaLogo}
                alt="La Casa Mutante Logo"
                className="logo"
              />
            </a>
          </div>
        </div>
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

export default CreditosPage;
