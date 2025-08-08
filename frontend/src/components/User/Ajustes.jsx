import React, { useState,useEffect } from 'react';
import { get_usuario, set_divisa } from '../../endpoints/api';
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
  // Estado para el email (puedes remplazarlo con el real)
  const [email] = useState('usuario@example.com');

  // Estado para mostrar/ocultar formulario cambiar contraseña
  const [cambiarPassVisible, setCambiarPassVisible] = useState(false);

  // Estados para la nueva contraseña y confirmación
  const [nuevaPass, setNuevaPass] = useState('');
  const [confirmarPass, setConfirmarPass] = useState('');
  const [mensajePass, setMensajePass] = useState('');

  // Estado para la divisa seleccionada
  const [divisa, setDivisa] = useState('CLP');

  // Estado para el tema, 'claro' o 'oscuro'
  const [tema, setTema] = useState('claro');

  const toggleTema = () => {
    setTema(tema === 'claro' ? 'oscuro' : 'claro');
  };

  const handleCambiarPass = () => {
    if (!nuevaPass || !confirmarPass) {
      setMensajePass('Por favor, completa ambos campos.');
      return;
    }
    if (nuevaPass !== confirmarPass) {
      setMensajePass('Las contraseñas no coinciden.');
      return;
    }
    // Aquí iría la lógica para cambiar la contraseña (API etc)
    setMensajePass('Contraseña cambiada con éxito!');
    setNuevaPass('');
    setConfirmarPass('');
    setCambiarPassVisible(false);
  };
  
  useEffect(() => {
    const cargarDivisa = async () => {
      const datos = await get_usuario(); // función que harás en api.js
      setDivisa(datos.divisa);
    };

    cargarDivisa();
  }, []);
  const handleGuardarDivisa = async (e) => {
    e.preventDefault();
    const nuevaDivisa = e.target.value;
    try {
      const divisa = await set_divisa(nuevaDivisa);
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className={`ajustes-container tema-${tema}`}>
      <h2>Ajustes</h2>
      <section className="ajuste-section">
        <h3>Divisa</h3>
        <ul>
          <li>
            <FaDollarSign className="ajuste-icon" />
            <select value={divisa} onChange={handleGuardarDivisa}>
              <option value="USD">USD - Dólar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="CLP">CLP - Peso Chileno</option>
            </select>
          </li>
        </ul>
      </section>

      <section className="ajuste-section">
        <h3>Tema</h3>
        <ul>
          <li>
            <FaPaintBrush className="ajuste-icon" />
            <label className="switch">
              <input type="checkbox" checked={tema === 'oscuro'} onChange={toggleTema} />
              <span className="slider round"></span>
            </label>
            {tema === 'oscuro' ? ' Oscuro' : ' Claro'}
          </li>
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
