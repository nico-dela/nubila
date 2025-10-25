import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeUp,
  MdVolumeDown,
  MdVolumeMute,
} from "react-icons/md";
import "../styles/MusicPlayer.css";

import BoleritoStapelia from "../assets/music/Bolerito de Stapelia.mp3";
import Frio from "../assets/music/Frio.mp3";
import Girasoles from "../assets/music/Girasoles.mp3";
import Limonero from "../assets/music/Limonero.mp3";
import MariposaOrigami from "../assets/music/Mariposa Origami.mp3";
import Oceanica from "../assets/music/Oceanica.mp3";
import Manneporte from "../assets/music/The Manneporte.mp3";
import OceanicaNylon from "../assets/music/Oceanica Nylon.mp3";

import { motion } from "framer-motion";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState({});
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const songs = useMemo(
    () => [
      { title: "Oceanica", source: Oceanica },
      { title: "Girasoles", source: Girasoles },
      { title: "Limonero", source: Limonero },
      { title: "Bolerito de Stapelia", source: BoleritoStapelia },
      { title: "The Manneporte", source: Manneporte },
      { title: "Frio", source: Frio },
      { title: "Mariposa Origami", source: MariposaOrigami },
      { title: "Oceanica Nylon - Acústico", source: OceanicaNylon },
    ],
    []
  );

  useEffect(() => {
    audioRef.current.src = songs[currentSongIndex].source;
    setCurrentSong(songs[currentSongIndex]);

    // Precargar la canción actual
    audioRef.current.load();
  }, [currentSongIndex, songs]);

  // Efecto para actualizar el estilo de la barra de progreso
  useEffect(() => {
    if (progressBarRef.current) {
      // Crear la variable CSS personalizada para el progreso
      progressBarRef.current.style.setProperty('--progress-percent', `${progress}%`);
    }
  }, [progress]);

  // Formatear tiempo en formato mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error al reproducir audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };

  const handlePreviousSong = () => {
    const previousIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(previousIndex);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 0;
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    if (!isSeeking) {
      setProgress(progressPercentage);
      setCurrentTime(currentTime);
      setDuration(duration);
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newValue = parseFloat(e.target.value);
    const seekTime = (newValue / 100) * (audioRef.current.duration || 0);

    if (!isNaN(seekTime) && isFinite(seekTime)) {
      audioRef.current.currentTime = seekTime;
      setProgress(newValue);
      setCurrentTime(seekTime);
    }
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
  };

  const handleSongEnd = () => {
    handleNextSong();
  };

  const handleVolumeIconClick = (e) => {
    if (volumeSliderRef.current?.contains(e.target)) {
      return;
    }
    setIsVolumeSliderVisible(!isVolumeSliderVisible);
  };

  const handleVolume = (e) => {
    const newVolume = Number(e.target.value);
    audioRef.current.volume = newVolume / 100;
    setVolume(newVolume);
  };

  // Manejo de teclas para accesibilidad
  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  // Manejar teclas para control de volumen
  const handleVolumeKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newVolume = Math.min(volume + 5, 100);
      audioRef.current.volume = newVolume / 100;
      setVolume(newVolume);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newVolume = Math.max(volume - 5, 0);
      audioRef.current.volume = newVolume / 100;
      setVolume(newVolume);
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) {
      return <MdVolumeMute size={24} aria-hidden="true" />;
    } else if (volume <= 50) {
      return <MdVolumeDown size={24} aria-hidden="true" />;
    } else {
      return <MdVolumeUp size={24} aria-hidden="true" />;
    }
  };

  return (
    <motion.div
      className="music-player-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="region"
      aria-label="Reproductor de música de Nubila"
    >
      <motion.div
        className="music-player"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="volume-control"
          whileHover={{ scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="volume-icon"
            onClick={handleVolumeIconClick}
            onMouseLeave={() => setIsVolumeSliderVisible(false)}
            onMouseEnter={() => setIsVolumeSliderVisible(true)}
            onKeyDown={handleVolumeKeyDown}
            whileHover={{ scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            role="button"
            tabIndex="0"
            aria-label={`Control de volumen: ${volume}%`}
            aria-expanded={isVolumeSliderVisible}
            aria-haspopup="true"
          >
            {getVolumeIcon()}

            {isVolumeSliderVisible && (
              <motion.div
                className="volume-slider-container"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                role="dialog"
                aria-label="Ajustar volumen"
              >
                <label htmlFor="volume-slider" className="sr-only">
                  Volumen
                </label>
                <input
                  ref={volumeSliderRef}
                  id="volume-slider"
                  type="range"
                  className="volume-slider"
                  value={volume}
                  min="0"
                  max="100"
                  step="1"
                  onChange={handleVolume}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={volume}
                  aria-valuetext={`${volume}%`}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        <div className="song-info">
          <div className="song-title" aria-live="polite">
            <span aria-label="Título de la canción">{currentSong.title}</span>
          </div>
          <div className="progress-container">
            <span className="time-display" aria-hidden="true">
              {formatTime(currentTime)}
            </span>
            <label htmlFor="progress-bar" className="sr-only">
              Progreso de la canción: {formatTime(currentTime)} de {formatTime(duration)}
            </label>
            <div className="progress-bar-wrapper">
              <input
                ref={progressBarRef}
                id="progress-bar"
                type="range"
                className="progress-bar"
                value={progress}
                min="0"
                max="100"
                step="0.1"
                onChange={handleSeek}
                onMouseDown={handleSeekStart}
                onMouseUp={handleSeekEnd}
                onTouchStart={handleSeekStart}
                onTouchEnd={handleSeekEnd}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={Math.round(progress)}
                aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
                style={{ "--progress-percent": `${progress}%` }}
              />
            </div>
            <span className="time-display" aria-hidden="true">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="controls" role="toolbar" aria-label="Controles de reproducción">
          <button
            onClick={handlePreviousSong}
            onKeyDown={(e) => handleKeyDown(e, handlePreviousSong)}
            aria-label="Canción anterior"
            title="Canción anterior"
          >
            <MdSkipPrevious aria-hidden="true" />
          </button>
          <button
            onClick={handlePlayPause}
            onKeyDown={(e) => handleKeyDown(e, handlePlayPause)}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <MdPause aria-hidden="true" /> : <MdPlayArrow aria-hidden="true" />}
          </button>
          <button
            onClick={handleNextSong}
            onKeyDown={(e) => handleKeyDown(e, handleNextSong)}
            aria-label="Siguiente canción"
            title="Siguiente canción"
          >
            <MdSkipNext aria-hidden="true" />
          </button>
        </div>
      </motion.div>

      <audio
        ref={audioRef}
        autoPlay={isPlaying}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
        preload="metadata"
        aria-hidden="true"
      >
        <p>Tu navegador no soporta el elemento de audio.</p>
      </audio>

      {/* Announcer para lectores de pantalla */}
      <div className="sr-only" aria-live="polite">
        {isPlaying ? `Reproduciendo: ${currentSong.title}` : `Pausado: ${currentSong.title}`}
      </div>

    </motion.div>
  );
};

export default MusicPlayer;