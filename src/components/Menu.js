import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion" // Importamos AnimatePresence
import nubilaLogo from "../assets/images/nubila-logo.png"
import "../styles/Menu.css"

const menuItems = [
  {
    to: "/",
    label: <img src={nubilaLogo || "/placeholder.svg"} alt="Nubila Logo" className="menu-logo" color="#8191BA" />,
  },
  { to: "/acerca", label: "UN CD-WEB" },
  { to: "/creditos", label: "CREDITOS" },
  { to: "/colabora", label: "COLABORA" },
]

// Variantes de animación mejoradas para Firefox
const menuVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

// Variantes para los elementos del menú con aparición escalonada
const menuItemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
      ease: "easeOut",
    },
  }),
}

const Menu = ({ background }) => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  // Detectar si estamos en Firefox
  const isFirefox = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().indexOf("firefox") > -1

  return (
    <div
      className="menu-container"
      style={{
        background: background ? `linear-gradient(to bottom, ${background})` : undefined,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Menu Button */}
      <button className="menu-button" onClick={toggleMenu} aria-expanded={showMenu} aria-label="Menú principal">
        <span className={`menu-bar ${showMenu ? "open" : ""}`}></span>
        <span className={`menu-bar ${showMenu ? "open" : ""}`}></span>
        <span className={`menu-bar ${showMenu ? "open" : ""}`}></span>
      </button>

      {/* Menu Dropdown con AnimatePresence para mejor control de animaciones */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="menu-dropdown"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            style={{
              // Optimizaciones para Firefox
              ...(isFirefox && {
                willChange: "opacity, transform",
                backfaceVisibility: "hidden",
                perspective: "1000px",
                // Forzar aceleración por hardware
                transform: "translateZ(0)",
              }),
            }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                className="menu-item"
                key={index}
                custom={index}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link to={item.to} className="menu-link" onClick={toggleMenu}>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Menu
