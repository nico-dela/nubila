import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import iconoBlog from "../assets/images/sticker nota anim.gif";

import "../styles/FloatingBlogButton.css";

const FloatingBlogButton = () => {
  const navigate = useNavigate();

  const buttonVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const handleClick = () => {
    navigate("/blog");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.button
      className="floating-blog-button"
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Ir al blog"
      title="Blog"
    >
      <img className="floating-blog-gif" alt="Icono blog" src={iconoBlog} />
    </motion.button>
  );
};

export default FloatingBlogButton;
