import { motion } from "framer-motion";
import socialMediaIcon from "../assets/images/social-media.svg";
import "../styles/SocialMedia.css";

const socialVariants = {
  initial: { opacity: 0, y: 20, scale: 0.8 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.2,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.9,
  },
};

const SocialMedia = () => {
  return (
    <motion.div
      className="social-container"
      variants={socialVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.a
        href="https://linktr.ee/nubila"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <img
          src={socialMediaIcon}
          alt="Acceso a nuestras redes"
          style={{ opacity: 0.6 }}
        />
      </motion.a>
    </motion.div>
  );
};

export default SocialMedia;
