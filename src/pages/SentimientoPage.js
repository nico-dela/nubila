import React, { useState } from "react";
import YouTube from "react-youtube";
import volverImage from "../assets/images/circle-xmark-regular.svg";
import "../styles/SentimientoPage.css";
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
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const SentimientoPage = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const [backgroundColor, setBackgroundColor] = useState("");

  const opts = {
    height: screenHeight * 0.7,
    width: screenWidth,
    playerVars: {
      autoplay: 0,
    },
  };

  const pauseMusic = () => {
    const audioRef = document.querySelector("audio");
    if (audioRef && !audioRef.paused) {
      audioRef.pause();
    }
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setBackgroundColor("rgb(65, 65, 65)");
      pauseMusic();
    } else {
      setBackgroundColor("");
    }
  };

  return (
    <motion.div
      className="container"
      style={{ backgroundColor }}
      id="main-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <h1 className="heading">SENTIMIENTO OCEANICO</h1>
      <motion.div variants={sectionVariants}>
        <YouTube
          videoId="zO1L7Grx1VQ"
          opts={opts}
          onStateChange={onPlayerStateChange}
        />
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

export default SentimientoPage;
