import React from "react";
import { motion } from "framer-motion"; // Importa motion de Framer Motion
import socialMediaIcon from "../assets/images/social-media.svg";
import "../styles/SocialMedia.css";

const SocialMedia = () => {
  return (
    <motion.div
      className="social-container"
      initial={{ opacity: 0, y: 20 }} // Define una animación inicial
      animate={{ opacity: 1, y: 0 }} // Define la animación de entrada
      whileHover={{ scale: 1.1 }} // Hace que el ícono se agrande al pasar el mouse por encima
    >
      <a
        href="https://linktr.ee/nubila"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <img src={socialMediaIcon} alt="Acceso a nuestras redes" style={{opacity: 0.6}}/>
      </a>
    </motion.div>
  );
};

export default SocialMedia;
