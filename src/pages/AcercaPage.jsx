import React from "react";
import volverImage from "../assets/images/circle-xmark-regular.svg";
import "../styles/AcercaPage.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    y: -30,
    transition: {
      duration: 0.5,
    },
  },
};

const AcercaPage = () => {
  return (
    <motion.div
      className="container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <h1 className="header">UN CD-WEB</h1>
      <motion.div className="info" variants={sectionVariants}>
        <p>
          Un rincón digital el cual se centra menos en la obra resultante y más
          en el proceso, el cuidado y la artesanía necesarios para llegar allí.
        </p>
        <strong>¿Que ideas seguimos?</strong>
        <ol>
          <li>
            Hacer un{" "}
            <a
              href="https://joelhooks.com/digital-garden"
              target="_blank"
              rel="noopener noreferrer"
            >
              jardín digital
            </a>
          </li>
          <li>Elaborar una obra en varios lenguajes artisticos</li>
          <li>
            La cultura es de{" "}
            <a
              href="https://archive.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              dominio público
            </a>
          </li>
        </ol>
        <strong>¿Que decisiones tomamos?</strong>
        <ul>
          <li>
            Difundir nuestra música a través de este medio y, luego de lanzar el
            disco, distribuirla en {""}
            <a
              href={
                "https://linktr.ee/nubila?lt_utm_source=lt_share_link#341887887"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              plataformas digitales
            </a>{" "}
            de música.
          </li>
          <li>Traducir el universo de la canción en lenguaje gráfico</li>
          <li>
            Crear nuestra tipografía (
            <a
              href={
                "https://drive.google.com/file/d/1TVzVx5IURQCXLEIOxYM6mBDrkLuyXAgg/view?usp=sharing"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Acá
            </a>{" "}
            la podés descargar)
          </li>
        </ul>
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

export default AcercaPage;
