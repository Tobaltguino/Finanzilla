import React from 'react';
import '../../styles/Ajustes.css';
import {
  FaUserCircle,
  FaBell,
  FaDollarSign,
  FaPaintBrush,
  FaInfoCircle,
  FaQuestionCircle,
  FaShieldAlt
} from 'react-icons/fa';

function Ajustes() {
  return (
    <div className="ajustes-container">
      <h2>Ajustes</h2>

      <section className="ajuste-section">
        <h3>Cuenta</h3>
        <ul>
          <li><FaUserCircle className="ajuste-icon" /> Cuenta</li>
          <li><FaBell className="ajuste-icon" /> Recordatorio</li>
          <li><FaDollarSign className="ajuste-icon" /> Divisa</li>
          <li><FaPaintBrush className="ajuste-icon" /> Tema</li>
        </ul>
      </section>

      <section className="ajuste-section">
        <h3>Más información</h3>
        <ul>
          <li><FaInfoCircle className="ajuste-icon" /> Información</li>
          <li><FaQuestionCircle className="ajuste-icon" /> Enviar dudas o sugerencias</li>
          <li><FaShieldAlt className="ajuste-icon" /> Políticas de privacidad</li>
        </ul>
      </section>
    </div>
  );
}

export default Ajustes;
