import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import boleritoHorizontalImage from "../assets/images/bolerito-midi-horizontal.jpeg";
import boleritoVerticalImage from "../assets/images/bolerito-midi-vertical.jpeg";
import volverImage from "../assets/images/circle-xmark-regular.svg";
import "../styles/LyricsPage.css";
import { Puff } from "react-loader-spinner";

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

const BoleritoPage = () => {
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

  const boleritoImage = isMobile
    ? boleritoVerticalImage
    : boleritoHorizontalImage;

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = boleritoImage;
    imageLoader.onload = () => {
      setLoading(false);
    };
  }, [boleritoImage]);

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
          variants={imageVariants} // Utiliza imageVariants aquí
          initial="initial"
          animate="animate"
          style={{
            position: "relative",
            overflow: "hidden",
            maxWidth: "100%",
            maxHeight: "80vh", // Ajustar altura máxima
          }}
        >
          {!loading && (
            <motion.img
                src={boleritoImage}
                alt="Bolerito postal"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                animate={imageControls}
              />
          )}
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

export default BoleritoPage;
