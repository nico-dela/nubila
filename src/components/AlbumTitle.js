"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import "../styles/AlbumTitle.css"

const AlbumTitle = () => {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    // Iniciar con una opacidad baja y aumentarla gradualmente
    const timer = setTimeout(() => {
      setOpacity(1)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="album-title-container"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 3 }}
    >
      <h2 className="album-title">Sentimiento Oceanico</h2>
    </motion.div>
  )
}

export default AlbumTitle
