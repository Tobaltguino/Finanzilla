import React, { useState } from 'react';
import '../../styles/Transacciones.css';
import {
  FaBars,
  FaChartPie,
  FaListUl,
  FaCog,
  FaSignOutAlt,
  FaWallet,
  FaUserCircle
} from 'react-icons/fa';

import Gastos from './Gastos';
import Informes from './Informes';
import Categorias from './Categorias';
import Ajustes from './Ajustes';

function Transacciones() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('gastos');

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    closeMenu();
  };

  // Simulación de nombre de usuario
  const usuario = "Cristóbal";

  return (
    <div className="transacciones-layout">

      {/* -------- NAV SUPERIOR -------- */}
      <nav className="top-navbar">
        <button className="hamburger-btn" onClick={toggleMenu}>
          <FaBars />
        </button>
        <div className="navbar-title">Finanzilla</div>
        <div className="navbar-user">
          <FaUserCircle className="user-icon" />
          <span>{usuario}</span>
        </div>
      </nav>

      {/* -------- SIDEBAR -------- */}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <ul className="sidebar-menu">
          <li className={`menu-item ${activeSection === 'gastos' ? 'active' : ''}`} onClick={() => handleSectionClick('gastos')}>
            <FaWallet /> <span>Gastos</span>
          </li>
          <li className={`menu-item ${activeSection === 'informes' ? 'active' : ''}`} onClick={() => handleSectionClick('informes')}>
            <FaChartPie /> <span>Informes</span>
          </li>
          <li className={`menu-item ${activeSection === 'categorias' ? 'active' : ''}`} onClick={() => handleSectionClick('categorias')}>
            <FaListUl /> <span>Categorías</span>
          </li>
          <li className={`menu-item ${activeSection === 'ajustes' ? 'active' : ''}`} onClick={() => handleSectionClick('ajustes')}>
            <FaCog /> <span>Ajustes</span>
          </li>
          <li className="menu-item" onClick={() => alert("Cerrar sesión...")}>
            <FaSignOutAlt /> <span>Cerrar Sesión</span>
          </li>
        </ul>
      </aside>

      {/* -------- CONTENIDO PRINCIPAL -------- */}
      <main className="main-content">
        {activeSection === 'gastos' && <Gastos />}
        {activeSection === 'informes' && <Informes />}
        {activeSection === 'categorias' && <Categorias />}
        {activeSection === 'ajustes' && <Ajustes />}
      </main>
    </div>
  );
}

export default Transacciones;
