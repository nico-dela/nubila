import "../styles/OfflinePage.css";

const OfflinePage = () => {
  return (
    <div className="overlay">
      <div className="coming-soon-container">
        <div className="coming-soon-text">
          <h1>🚧 ¡Estamos rearmando nuestra web!</h1>
          <p>
            Muy pronto vas a poder recorrer nuestro nuevo espacio virtual.
          </p>
          <p>
            Mientras tanto, podes seguirnos en nuestras redes sociales para
            estar al tanto de las novedades.
          </p>
          <p>
            ¡Gracias por acompañarnos!
          </p>
          <p>
            Nubila es un proyecto de La Casa Mutante.
          </p>
          <p>
            <a href="https://linktr.ee/nubila" target="_blank" rel="noopener noreferrer">
              Seguinos en nuestras redes sociales
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
