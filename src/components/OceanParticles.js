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
    let time = 0

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    resize()

    // Crear partículas
    const particleCount = Math.min(70, Math.floor(window.innerWidth / 15))
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseRadius: Math.random() * 3 + 1.5, // Radio base para variaciones
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        direction: Math.random() * Math.PI * 2,
        // Parámetros para deformación
        deformFactor: Math.random() * 0.8 + 0.2, // Qué tan deforme es la partícula
        points: Math.floor(Math.random() * 3) + 3, // Número de puntos para la forma
        rotationSpeed: (Math.random() - 0.5) * 0.01, // Velocidad de rotación
        rotation: Math.random() * Math.PI * 2, // Rotación inicial
        pulseSpeed: Math.random() * 0.05 + 0.01, // Velocidad de pulsación
        // Parámetros para forma orgánica
        wobble: Math.random() * 0.5 + 0.5, // Factor de ondulación
        wobbleSpeed: Math.random() * 0.05 + 0.02, // Velocidad de ondulación
      })
    }

    // Función para dibujar una partícula deforme
    const drawDeformedParticle = (particle, time) => {
      const { x, y, baseRadius, deformFactor, points, rotation, wobble, wobbleSpeed } = particle

      ctx.beginPath()

      // Crear una forma orgánica con puntos y curvas
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2 + rotation + time * particle.rotationSpeed

        // Calcular radio con ondulación basada en tiempo
        const radiusVariation = Math.sin(time * wobbleSpeed + i) * wobble
        const currentRadius = baseRadius * (1 + deformFactor * radiusVariation)

        // Calcular posición del punto
        const pointX = x + Math.cos(angle) * currentRadius
        const pointY = y + Math.sin(angle) * currentRadius

        if (i === 0) {
          ctx.moveTo(pointX, pointY)
        } else {
          // Usar curvas cuadráticas para suavizar la forma
          const prevAngle = ((i - 1) / points) * Math.PI * 2 + rotation + time * particle.rotationSpeed
          const cpX = x + Math.cos((prevAngle + angle) / 2) * currentRadius * 1.5
          const cpY = y + Math.sin((prevAngle + angle) / 2) * currentRadius * 1.5

          ctx.quadraticCurveTo(cpX, cpY, pointX, pointY)
        }
      }

      ctx.closePath()

      // Aplicar un gradiente radial para dar profundidad
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, baseRadius * 2)
      gradient.addColorStop(0, `rgba(0, 0, 0, ${particle.opacity * 1.5})`)
      gradient.addColorStop(1, `rgba(255, 255, 255, 0.7)`)

      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Función para dibujar y animar las partículas
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      particles.forEach((particle) => {
        // Mover la partícula
        particle.x += Math.cos(particle.direction) * particle.speed
        particle.y += Math.sin(particle.direction) * particle.speed - 0.05 // Ligero movimiento hacia arriba

        // Cambiar ligeramente la dirección para un movimiento más natural
        particle.direction += (Math.random() - 0.5) * 0.08

        // Si la partícula sale del canvas, reposicionarla
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.y < -50) particle.y = canvas.height + 50
        if (particle.y > canvas.height + 50) particle.y = -50

        // Hacer pulsar la partícula
        const pulseFactor = 1 + 0.2 * Math.sin(time * particle.pulseSpeed * 5)
        const currentRadius = particle.baseRadius * pulseFactor

        // Dibujar la partícula deforme
        drawDeformedParticle(particle, time)
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
