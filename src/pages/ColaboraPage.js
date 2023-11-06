import React from "react";
import lemonIcon from "../assets/images/lemon-logo.jpeg";
import volverImage from "../assets/images/circle-xmark-regular.svg";
import "../styles/ColaboraPage.css";
import { Link } from "react-router-dom";

const ColaboraPage = () => {
  return (
    <div className="container">
      <h1 className="heading">COLABORA</h1>
      <div className="collaborate">
        <strong>¡Gracias por asomarte!</strong>
        <p>
          Cada contribución, grande o pequeña, nos ayuda a financiar
          grabaciones, producciones en vivo y otras actividades que nos permiten
          seguir haciendo lo que amamos.
        </p>
        <p>
          Si te interesa colaborar con el proyecto, podés hacerlo de las
          siguientes formas:
        </p>
        <ul>
          <li>
            Mediante la suscripción a nuestras{" "}
            <a
              href={"https://linktr.ee/nubila"}
              target="_blank"
              rel="noopener noreferrer"
            >
              redes
            </a>
            , darle "Me gusta" al contenido y/o promocionar el proyecto nos
            ayudas un montón.
          </li>
          <li>
            Transferencia bancaria, te dejamos los detalles de nuestra cuenta
            bancaria:
            <div className="bank-details">
              <p>
                <strong>Banco: </strong> Lemon Cash{" "}
                <img
                  src={lemonIcon}
                  alt="Acceso a nuestras redes"
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "10px",
                  }}
                />
              </p>
              <p>
                <strong>Alias: </strong> nubila.ar
              </p>
              <p>
                <strong>Nombre del Titular: </strong> Nicolás de la Cruz
              </p>
            </div>
          </li>
        </ul>
        <p>Tu apoyo es esencial para continuar creando y compartiendo arte.</p>
      </div>
      <Link to="/" className="back-to-home-link">
        <img src={volverImage} alt="Volver" />
      </Link>
    </div>
  );
};

export default ColaboraPage;
