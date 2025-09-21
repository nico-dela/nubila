import React, { useEffect, useState, Suspense } from "react";
import { motion, useAnimation } from "framer-motion";
import oceanicaHorizontalImage from "../assets/images/oceanica-midi-horizontal.jpeg";
import oceanicaVerticalImage from "../assets/images/oceanica-midi-vertical.jpeg";
import volverImage from "../assets/images/circle-xmark-regular.svg";
import { Puff } from "react-loader-spinner";
import "../styles/LyricsPage.css";
import { Link } from "react-router-dom";

const imageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const linkVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const OceanicaPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const oceanicaImage = isMobile
    ? oceanicaVerticalImage
    : oceanicaHorizontalImage;

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = oceanicaImage;
    imageLoader.onload = () => {
      setLoading(false);
    };
  }, [oceanicaImage]);

  const imageControls = useAnimation();

  return (
    <div className="lyrics">
      <Suspense
        fallback={
          <div className="loading-container">
            {loading && (
              <Puff
                height={80}
                width={80}
                radius={1}
                color="#0A4066"
                ariaLabel="puff-loading"
              />
            )}
          </div>
        }
      >
        <motion.div
          className="image-container"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          style={{
            position: "relative",
            overflow: "hidden",
            maxWidth: "100%",
            maxHeight: "80vh", // Ajustar altura máxima
          }}
        >
          {/* {!loading && <img src={oceanicaImage} alt="Oceánica partitura" />} */}
          {!loading && <motion.img
                src={oceanicaImage}
                alt="Oceánica postal"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                animate={imageControls}
              />}
        </motion.div>
      </Suspense>
      <motion.div
        className="back-to-home-link"
        variants={linkVariants}
        initial="initial"
        animate="animate"
      >
        <Link to="/">
          <img src={volverImage} alt="Volver" />
        </Link>
      </motion.div>
    </div>
  );
};

export default OceanicaPage;
