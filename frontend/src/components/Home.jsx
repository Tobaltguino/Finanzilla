import React from 'react';
import '../styles/Home.css';
import logoImg from '../assets/logo.jpg';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">
            <img src={logoImg} alt="Logo Finanzilla" className="navbar-logo" />
            <span>Finanzilla</span>
          </div>
          <ul className="nav-links">
            <li><a href="/" className="nav-item">Inicio</a></li>
            <li><a href="/" className="nav-item">Soporte</a></li>
            <li><a href="/" className="nav-item">Contacto</a></li>
          </ul>
        </div>

        <div className="nav-right">
          <a href="/login" className="nav-btn outline">Iniciar Sesión</a>
          <a href="/signup" className="nav-btn">Registrarse</a>
        </div>
      </nav>

      <div className="main-content">
        <div className="text-section">
          <h1>Bienvenido a Finanzilla</h1>
          <h2>Controla tus finanzas fácilmente</h2>
          <p>Regístrate, lleva tus gastos y alcanza tus metas.</p>
          <div className="home-buttons">
            <button className="home-btn">Comenzar</button>
            <button className="home-btn outline">Más Información</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
