import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom to create a navigation link
import "../styles/NotFoundPage.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Ups!</h1>
      <p className="not-found-message">
        Parece que te has perdido. La página que buscas no existe. ¿Por
        qué no volves al{" "}
        <Link to="/" className="volver-button" style={{fontFamily: 'Nubifont', fontWeight: 'bold', fontSize: '30px'}}>
          inicio
        </Link>
        ?
      </p>
    </div>
  );
};

export default NotFound;
