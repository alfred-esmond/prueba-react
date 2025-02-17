import React from "react";
import "./styles/Popup.css";

function Popup({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p>Año: {item.releaseYear}</p>
        <img src={item.images["Poster Art"].url} alt={item.title} />
        <button className="popup-close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Popup;
