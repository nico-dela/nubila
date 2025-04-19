"use client"

import { useEffect, useState } from "react"
import SocialMedia from "../components/SocialMedia"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import OceanEffect from "../components/OceanEffect"
import OceanParticles from "../components/OceanParticles"
import AlbumTitle from "../components/AlbumTitle"

import "../styles/LandingPage.css"

const buttonVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const LandingPage = () => {
  const [buttons, setButtons] = useState([])
  const [buttonFontSize, setButtonFontSize] = useState(35)
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  // Actualizar las dimensiones de la ventana cuando cambia el tamaño
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      // Ajustar el tamaño de fuente según el ancho de la pantalla
      if (window.innerWidth <= 375) {
        setButtonFontSize(20)
      } else if (window.innerWidth <= 768) {
        setButtonFontSize(25)
      } else {
        setButtonFontSize(35)
      }
    }

    window.addEventListener("resize", handleResize)

    // Llamar handleResize inmediatamente para establecer los valores iniciales
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Generar botones cuando cambian las dimensiones de la ventana o el tamaño de fuente
  useEffect(() => {
    // Función para verificar si hay superposición entre dos botones
    const isOverlapping = (newPos, existingPositions) => {
      const buffer = 20 // Espacio mínimo entre botones
      for (const pos of existingPositions) {
        // Comprobar si hay superposición en el eje x e y
        if (
          newPos.x < pos.x + pos.width + buffer &&
          newPos.x + newPos.width + buffer > pos.x &&
          newPos.y < pos.y + pos.height + buffer &&
          newPos.y + newPos.height + buffer > pos.y
        ) {
          return true // Hay superposición
        }
      }
      return false // No hay superposición
    }

    const generateRandomButton = (link, isStrikeThrough, existingPositions) => {
      const { width: screenWidth, height: screenHeight } = windowDimensions

      // Dimensiones del botón basadas en el texto
      // Usar un factor más conservador para calcular el ancho
      const buttonWidth = Math.max(120, link.text.length * (buttonFontSize * 0.6))
      const buttonHeight = buttonFontSize * 1.5

      // Determinar si el botón debe rotarse (menos probabilidad en móviles)
      const shouldRotate = windowDimensions.width > 768 ? Math.random() < 0.3 : Math.random() < 0.1
      const randomRotation = shouldRotate ? 90 : 0

      // Calcular el espacio que ocupará el botón considerando la rotación
      const effectiveWidth = randomRotation === 90 ? buttonHeight : buttonWidth
      const effectiveHeight = randomRotation === 90 ? buttonWidth : buttonHeight

      // Márgenes de seguridad mucho más generosos
      // Aumentamos los márgenes para evitar que los textos se salgan de la pantalla
      const safeMargin = Math.max(60, buttonFontSize * 1.5)

      // Ajustar la zona segura para posicionar botones
      // Restamos el tamaño efectivo del botón y los márgenes de seguridad
      const safeWidth = screenWidth - effectiveWidth - 2 * safeMargin
      const safeHeight = screenHeight - effectiveHeight - 2 * safeMargin - 80 // 80px adicionales para el reproductor de música

      // Asegurar valores positivos para las áreas disponibles
      const availableWidth = Math.max(10, safeWidth)
      const availableHeight = Math.max(10, safeHeight)

      // Intentar encontrar una posición que no se superponga con otros botones
      let attempts = 0
      let randomX, randomY
      let position

      do {
        // Calcular posición aleatoria dentro del área segura
        randomX = safeMargin + Math.floor(Math.random() * availableWidth)
        randomY = safeMargin + Math.floor(Math.random() * availableHeight)

        position = {
          x: randomX,
          y: randomY,
          width: effectiveWidth,
          height: effectiveHeight,
        }

        attempts++
      } while (isOverlapping(position, existingPositions) && attempts < 50)

      // Agregar la nueva posición a la lista de posiciones existentes
      existingPositions.push(position)

      // Calcular el origen de la transformación para la rotación
      // Esto asegura que la rotación ocurra alrededor del centro del texto
      const transformOrigin = "center center"

      return {
        component: (
          <motion.div key={link.url} initial="initial" animate="animate" whileHover="hover" variants={buttonVariants}>
            <Link
              to={`/${link.url}`}
              style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                width: buttonWidth,
                height: buttonHeight,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: isStrikeThrough ? "line-through" : "none",
                color: "#1C1C1C",
                transform: `rotate(${randomRotation}deg)`,
                transformOrigin: transformOrigin,
                transition: "transform 0.5s ease",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontFamily: "Nubifont",
                fontSize: buttonFontSize,
                padding: "5px 10px",
                zIndex: 10,
                textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                // Para debugging visual
                // border: "1px solid red",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = "0.5"
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1"
              }}
            >
              {link.text}
            </Link>
          </motion.div>
        ),
        position,
      }
    }

    const links = [
      { text: "OCEANICA", url: "oceanica" },
      { text: "GIRASOLES", url: "girasoles" },
      { text: "BOLERITO DE STAPELIA", url: "bolerito" },
      { text: "FRIO", url: "frio" },
      { text: "MARIPOSA ORIGAMI", url: "mariposa" },
      { text: "LIMONERO", url: "limonero" },
    ]

    // Ordenar los enlaces por longitud (más largos primero)
    // para dar prioridad a los textos más largos al posicionarlos
    const sortedLinks = [...links].sort((a, b) => b.text.length - a.text.length)

    const randomIndex = Math.floor(Math.random() * (sortedLinks.length + 1))
    const selectedLink = randomIndex < sortedLinks.length ? sortedLinks[randomIndex] : null

    // Array para mantener registro de posiciones ya utilizadas
    const existingPositions = []

    // Generar botones con verificación de superposición
    const generatedButtons = []
    for (const link of sortedLinks) {
      const buttonData = generateRandomButton(link, link === selectedLink, existingPositions)
      generatedButtons.push(buttonData.component)
    }

    setButtons(generatedButtons)
  }, [windowDimensions, buttonFontSize])

  // Mantenemos los colores originales del gradiente
  const hexColors = ["#86B0A6", "#A6C4CF", "#E1CFCB", "#2e7b7f", "#557B86", "#EB7E83"]

  const randomGradient = hexColors
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .join(",")

  return (
    <div
      className="landing-page"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden", // Prevenir scroll si algún elemento se coloca muy cerca del borde
      }}
    >
      <div
        className="background-gradient"
        style={{
          background: `linear-gradient(to bottom, ${randomGradient})`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      ></div>

      {/* Efectos oceánicos */}
      <OceanEffect />
      <OceanParticles />

      {/* Título del álbum */}
      <AlbumTitle />

      <div style={{ position: "relative", zIndex: 5 }}>{buttons}</div>
      <SocialMedia />
    </div>
  )
}

export default LandingPage
