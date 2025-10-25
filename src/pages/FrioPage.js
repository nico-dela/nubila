import React, { useEffect, useState, Suspense } from "react";
import { motion, useAnimation } from "framer-motion";
import frioHorizontalImage from "../assets/images/frio-midi-horizontal.jpeg";
import frioVerticalImage from "../assets/images/frio-midi-vertical.jpeg";
import frioLetraImage from "../assets/images/frio-letra.png";
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
      duration: 0.5,
    },
  },
};

const FrioPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [loading, setLoading] = useState(true);
  const [showLetraImage, setShowLetraImage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fríoImage = isMobile ? frioVerticalImage : frioHorizontalImage;

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = fríoImage;
    imageLoader.onload = () => {
      setLoading(false);
    };
  }, [fríoImage]);

  const letraControls = useAnimation();
  const imageControls = useAnimation();

  const toggleImages = () => {
    setShowLetraImage(!showLetraImage);
  };

  useEffect(() => {
    if (showLetraImage) {
      letraControls.start({
        opacity: 1,
        transition: { duration: 0.5 },
      });
      imageControls.start({
        opacity: 0,
        transition: { duration: 0.5 },
      });
    } else {
      letraControls.start({
        opacity: 0,
        transition: { duration: 0.5 },
      });
      imageControls.start({
        opacity: 1,
        transition: { duration: 0.5 },
      });
    }
  }, [showLetraImage, letraControls, imageControls]);

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
          onClick={toggleImages}
          style={{
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '100%',
            maxHeight: '80vh', // Ajustar altura máxima
            cursor: "pointer",
          }}
        >
          {!loading && (
            <>
              <motion.img
                src={fríoImage}
                alt="Frío postal"
                style={{
                  opacity: showLetraImage ? 0 : 1,
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
                animate={imageControls}
              />
              <motion.img
                src={frioLetraImage}
                alt="Frío letra"
                style={{
                  opacity: showLetraImage ? 1 : 0,
                  objectFit: 'cover',
                  maxWidth: '100%', // Reducir el tamaño de la imagen para pantallas más grandes
                  maxHeight: '100%', // Reducir el tamaño de la imagen para pantallas más grandes
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)', // Centrar la imagen en el contenedor
                }}
                animate={letraControls}
              />
            </>
          )}
        </motion.div>
      </Suspense>
      <motion.div
        className="back-to-home-link"
        variants={imageVariants}
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

export default FrioPage;
