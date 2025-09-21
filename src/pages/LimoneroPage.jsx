import React, { useEffect, useState, Suspense } from "react";
import { motion, useAnimation } from "framer-motion";
import limoneroHorizontalImage from "../assets/images/limonero-midi-horizontal.jpeg";
import limoneroVerticalImage from "../assets/images/limonero-midi-vertical.jpeg";
import limoneroLetraImage from "../assets/images/limonero-letra.png";
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

const MariposaPage = () => {
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

  const limoneroImage = isMobile
    ? limoneroVerticalImage
    : limoneroHorizontalImage;

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = limoneroImage;
    imageLoader.onload = () => {
      setLoading(false);
    };
  }, [limoneroImage]);

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
            position: "relative",
            overflow: "hidden",
            maxWidth: "100%",
            maxHeight: "80vh", // Ajustar altura máxima
            cursor: "pointer",
          }}
        >
          {!loading && (
            <>
              <motion.img
                src={limoneroImage}
                alt="Limonero postal"
                style={{
                  opacity: showLetraImage ? 0 : 1,
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                animate={imageControls}
              />
              <motion.img
                src={limoneroLetraImage}
                alt="Limonero letra"
                style={{
                  opacity: showLetraImage ? 1 : 0,
                  objectFit: "cover",
                  maxWidth: "100%", // Reducir el tamaño de la imagen para pantallas más grandes
                  maxHeight: "100%", // Reducir el tamaño de la imagen para pantallas más grandes
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)", // Centrar la imagen en el contenedor
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

export default MariposaPage;
