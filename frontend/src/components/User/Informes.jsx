import React from 'react';
import { FaChartPie } from 'react-icons/fa';

function Informes() {
  return (
    <div className="informes-section">
      <h2><FaChartPie /> Informes Mensuales</h2>
      <p>Resumen de ingresos y gastos por categoría:</p>
      <ul className="informes-list">
        <li>Comida: $200</li>
        <li>Transporte: $80</li>
        <li>Entretenimiento: $60</li>
        <li>Otros: $40</li>
      </ul>
    </div>
  );
}

export default Informes;
