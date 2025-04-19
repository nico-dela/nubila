"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import "../styles/OceanEffect.css"

const OceanParticles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    resize()

    // Crear partículas
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20))
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.2,
        direction: Math.random() * Math.PI * 2,
      })
    }

    // Función para dibujar y animar las partículas
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Mover la partícula
        particle.x += Math.cos(particle.direction) * particle.speed
        particle.y += Math.sin(particle.direction) * particle.speed - 0.1 // Ligero movimiento hacia arriba

        // Cambiar ligeramente la dirección para un movimiento más natural
        particle.direction += (Math.random() - 0.5) * 0.1

        // Si la partícula sale del canvas, reposicionarla
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Dibujar la partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    // Iniciar la animación
    drawParticles()

    // Limpiar al desmontar
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="ocean-particles"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        mixBlendMode: "screen",
      }}
    />
  )
}

export default OceanParticles
