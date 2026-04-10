import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "../styles/LandingPage.css";
import FloatingBlogButton from "../components/FloatingBlogButton";

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
};

const LandingPage = () => {
  const [buttons, setButtons] = useState([]);
  const [buttonFontSize, setButtonFontSize] = useState(35);
  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 320,
    height:
      typeof window !== "undefined"
        ? Math.max(240, window.innerHeight - 120)
        : 400,
  }));

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const landscape = w > h;
      if (w <= 375) {
        setButtonFontSize(landscape ? 14 : 20);
      } else if (w <= 768) {
        setButtonFontSize(landscape ? 16 : 25);
      } else {
        /* Escritorio / tablet ancha: etiquetas más legibles en pantalla grande */
        setButtonFontSize(landscape ? 30 : 46);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setStageSize({
        width: cr.width,
        height: cr.height,
      });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (stageSize.width < 80 || stageSize.height < 80) return;

    const sw = stageSize.width;
    const sh = stageSize.height;
    const aspect = sw / sh;
    /** Horizontal o poco alto: el azar suele superponer; usamos rejilla */
    const useGridLayout =
      sh < 440 || (sw > sh && sh < 580) || (aspect >= 1.2 && sh < 520);

    const gridEffectiveFs = Math.min(
      buttonFontSize,
      Math.max(14, Math.floor(sh / 10))
    );

    const fitTextInCell = (text, cellW, cellH, startFs) => {
      let fs = Math.min(startFs, Math.floor(cellH / 2.2));
      for (let step = 0; step < 36 && fs >= 12; step++) {
        const bw = Math.max(
          56,
          Math.min(cellW - 8, text.length * (fs * 0.58) + 18)
        );
        const bh = fs * 1.5 + 12;
        if (bw <= cellW - 4 && bh <= cellH - 4) {
          return { fs, bw, bh };
        }
        fs -= 1;
      }
      return {
        fs: 12,
        bw: Math.min(cellW - 8, text.length * 6 + 18),
        bh: 30,
      };
    };

    const renderLink = (
      link,
      isStrikeThrough,
      {
        left,
        top,
        width,
        height,
        fontSize,
        rotation = 0,
      }
    ) => (
      <motion.div
        key={link.url}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={buttonVariants}
      >
        <Link
          to={`/${link.url}`}
          style={{
            position: "absolute",
            top,
            left,
            width,
            height,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: isStrikeThrough ? "line-through" : "none",
            color: "#1C1C1C",
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center center",
            transition: "transform 0.5s ease",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontFamily: "Nubifont",
            fontSize,
            padding: "4px 8px",
            zIndex: 10,
            textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = "0.5";
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = "1";
          }}
        >
          {link.text}
        </Link>
      </motion.div>
    );

    // Rectángulo alineado a ejes que realmente ocupa el enlace tras rotar (origin center)
    const getRotatedAabb = (left, top, w, h, rotationDeg) => {
      if (rotationDeg === 0) {
        return { left, top, right: left + w, bottom: top + h };
      }
      const cx = left + w / 2;
      const cy = top + h / 2;
      const halfW = w / 2;
      const halfH = h / 2;
      return {
        left: cx - halfH,
        top: cy - halfW,
        right: cx + halfH,
        bottom: cy + halfW,
      };
    };

    const aabbOverlaps = (a, b, buffer) =>
      !(
        a.right + buffer <= b.left ||
        a.left - buffer >= b.right ||
        a.bottom + buffer <= b.top ||
        a.top - buffer >= b.bottom
      );

    const isOverlapping = (newAabb, existingAabbs, buffer) => {
      for (const other of existingAabbs) {
        if (aabbOverlaps(newAabb, other, buffer)) return true;
      }
      return false;
    };

    const links = [
      { text: "OCEANICA", url: "oceanica" },
      { text: "GIRASOLES", url: "girasoles" },
      { text: "BOLERITO DE STAPELIA", url: "bolerito" },
      { text: "FRIO", url: "frio" },
      { text: "MARIPOSA ORIGAMI", url: "mariposa" },
      { text: "LIMONERO", url: "limonero" },
    ];

    const sortedLinks = [...links].sort(
      (a, b) => b.text.length - a.text.length
    );

    const randomIndex = Math.floor(Math.random() * (sortedLinks.length + 1));
    const selectedLink =
      randomIndex < sortedLinks.length ? sortedLinks[randomIndex] : null;

    if (useGridLayout) {
      const gridCols = aspect >= 1.12 ? 3 : 2;
      const padX = Math.max(6, sw * 0.02);
      const padY = Math.max(8, sh * 0.06);
      const innerW = sw - padX * 2;
      const innerH = sh - padY * 2;
      const gridRows = Math.ceil(sortedLinks.length / gridCols);
      const cellW = innerW / gridCols;
      const cellH = innerH / gridRows;

      const gridButtons = sortedLinks.map((link, i) => {
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);
        const { fs, bw, bh } = fitTextInCell(
          link.text,
          cellW,
          cellH,
          gridEffectiveFs
        );
        const left = padX + col * cellW + (cellW - bw) / 2;
        const top = padY + row * cellH + (cellH - bh) / 2;
        return renderLink(link, link === selectedLink, {
          left,
          top,
          width: bw,
          height: bh,
          fontSize: fs,
          rotation: 0,
        });
      });

      setButtons(gridButtons);
      return;
    }

    const generateRandomButton = (link, isStrikeThrough, existingAabbs) => {
      const screenWidth = stageSize.width;
      const screenHeight = stageSize.height;

      // Dimensiones del botón: factor conservador + holgura por padding y tipografía variable
      const buttonWidth = Math.max(
        120,
        link.text.length * (buttonFontSize * 0.65) + 24
      );
      const buttonHeight = buttonFontSize * 1.5 + 16;

      const canRotateLabel =
        screenHeight >= 520 && screenWidth <= screenHeight;
      const shouldRotate =
        canRotateLabel &&
        (screenWidth > 768 ? Math.random() < 0.3 : Math.random() < 0.1);
      const randomRotation = shouldRotate ? 90 : 0;

      const safeMargin = Math.max(
        24,
        Math.min(
          56,
          Math.max(buttonFontSize * 1.35, screenHeight * 0.06)
        )
      );
      // El escenario ya termina encima del reproductor; no restar playerReserve otra vez
      const maxBottom = screenHeight - safeMargin;

      // Esquina superior izquierda del box sin rotar, tal que el AABB tras rotate(90deg) quede en pantalla
      const getTopLeftRanges = (w, h, rot) => {
        const m = safeMargin;
        if (rot === 0) {
          return {
            minX: m,
            maxX: screenWidth - m - w,
            minY: m,
            maxY: maxBottom - h,
          };
        }
        return {
          minX: m - w / 2 + h / 2,
          maxX: screenWidth - m - w / 2 - h / 2,
          minY: m - h / 2 + w / 2,
          maxY: maxBottom - h / 2 - w / 2,
        };
      };

      let rotation = randomRotation;
      let ranges = getTopLeftRanges(buttonWidth, buttonHeight, rotation);
      if (
        ranges.maxX < ranges.minX ||
        ranges.maxY < ranges.minY ||
        maxBottom <= safeMargin
      ) {
        rotation = 0;
        ranges = getTopLeftRanges(buttonWidth, buttonHeight, 0);
      }

      const buffer =
        screenHeight < 480
          ? Math.max(14, screenHeight * 0.035)
          : screenWidth > screenHeight
            ? 20
            : 16;
      let attempts = 0;
      let randomX = ranges.minX;
      let randomY = ranges.minY;
      let aabb = getRotatedAabb(
        randomX,
        randomY,
        buttonWidth,
        buttonHeight,
        rotation
      );

      const spanX = Math.max(0, ranges.maxX - ranges.minX);
      const spanY = Math.max(0, ranges.maxY - ranges.minY);

      const nudgeIntoView = (rx, ry) => {
        let x = rx;
        let y = ry;
        for (let i = 0; i < 2; i++) {
          const b = getRotatedAabb(
            x,
            y,
            buttonWidth,
            buttonHeight,
            rotation
          );
          x += Math.max(0, safeMargin - b.left);
          x += Math.min(0, screenWidth - safeMargin - b.right);
          y += Math.max(0, safeMargin - b.top);
          y += Math.min(0, maxBottom - b.bottom);
        }
        return { x, y };
      };

      do {
        if (spanX > 0 && spanY > 0) {
          randomX = ranges.minX + Math.random() * spanX;
          randomY = ranges.minY + Math.random() * spanY;
        } else {
          randomX = (ranges.minX + ranges.maxX) / 2;
          randomY = (ranges.minY + ranges.maxY) / 2;
        }

        const nudged = nudgeIntoView(randomX, randomY);
        randomX = nudged.x;
        randomY = nudged.y;
        aabb = getRotatedAabb(
          randomX,
          randomY,
          buttonWidth,
          buttonHeight,
          rotation
        );

        attempts++;
      } while (isOverlapping(aabb, existingAabbs, buffer) && attempts < 600);

      existingAabbs.push(aabb);

      return {
        component: renderLink(link, isStrikeThrough, {
          left: randomX,
          top: randomY,
          width: buttonWidth,
          height: buttonHeight,
          fontSize: buttonFontSize,
          rotation,
        }),
      };
    };

    const existingAabbs = [];

    const generatedButtons = [];
    for (const link of sortedLinks) {
      const buttonData = generateRandomButton(
        link,
        link === selectedLink,
        existingAabbs
      );
      generatedButtons.push(buttonData.component);
    }

    setButtons(generatedButtons);
  }, [stageSize, buttonFontSize]);

  // Mantenemos los colores originales del gradiente
  const hexColors = [
    "#86B0A6",
    "#A6C4CF",
    "#E1CFCB",
    "#2e7b7f",
    "#557B86",
    "#EB7E83",
  ];

  const randomGradient = hexColors
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .join(",");

  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };

  return (
    <div className="landing-page">
      <motion.div
        className="background-gradient"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        style={{
          background: `linear-gradient(to bottom, ${randomGradient})`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <div ref={stageRef} className="landing-page__stage">
        {buttons}
      </div>

      <FloatingBlogButton />
    </div>
  );
};

export default LandingPage;
