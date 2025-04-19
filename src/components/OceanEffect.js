"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import "../styles/OceanEffect.css"

const OceanEffect = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let time = 0

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    resize()

    // Función para dibujar las olas
    const drawWaves = () => {
      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Configuración de las olas
      const waves = 3
      const waveAmplitudes = [15, 10, 5]
      const waveSpeeds = [0.03, 0.02, 0.01]
      const waveFrequencies = [0.02, 0.04, 0.06]

      // Usar colores que complementen el gradiente original pero con transparencia
      const waveColors = [
        "rgba(46, 123, 127, 0.2)", // #2e7b7f con transparencia
        "rgba(85, 123, 134, 0.15)", // #557B86 con transparencia
        "rgba(134, 176, 166, 0.1)", // #86B0A6 con transparencia
      ]

      // Dibujar múltiples capas de olas
      for (let i = 0; i < waves; i++) {
        ctx.beginPath()

        // Establecer el color y estilo de la ola
        ctx.strokeStyle = "transparent"
        ctx.fillStyle = waveColors[i]

        // Mover al inicio del canvas
        ctx.moveTo(0, canvas.height / 2)

        // Dibujar la curva de la ola
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = Math.sin(x * waveFrequencies[i] + time * waveSpeeds[i]) * waveAmplitudes[i] + canvas.height / 2
          ctx.lineTo(x, y)
        }

        // Completar el path para llenar el área bajo la ola
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fill()
      }

      // Incrementar el tiempo para la animación
      time += 0.05

      // Continuar la animación
      animationFrameId = requestAnimationFrame(drawWaves)
    }

    // Iniciar la animación
    drawWaves()

    // Limpiar al desmontar
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="ocean-effect"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        mixBlendMode: "soft-light",
      }}
    />
  )
}

export default OceanEffect
