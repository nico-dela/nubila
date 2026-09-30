import { motion, AnimatePresence } from "framer-motion";

const MapPlaceholderModal = ({ zone, onClose }) => (
  <AnimatePresence>
    {zone && (
      <motion.div
        className="map-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          className="map-modal"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="map-modal-title"
        >
          <p className="map-modal__eyebrow">Próximamente</p>
          <h2 id="map-modal-title" className="map-modal__title">
            {zone.title}
          </h2>
          {zone.subtitle && (
            <p className="map-modal__subtitle">{zone.subtitle}</p>
          )}
          <p className="map-modal__year">{zone.year}</p>
          <p className="map-modal__copy">
            Este cd-web todavía no está disponible en el mapa. Oceánica ya
            podés explorarla desde acá.
          </p>
          <button type="button" className="map-modal__button" onClick={onClose}>
            Cerrar
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MapPlaceholderModal;
