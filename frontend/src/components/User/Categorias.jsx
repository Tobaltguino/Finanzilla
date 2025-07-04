import React, { useState } from 'react';
import '../../styles/Categorias.css';
import {
  FaListUl,
  FaEdit,
  FaTrash,
  FaPlus,
  FaHome,
  FaCar,
  FaUtensils,
  FaSmile,
  FaBriefcase,
  FaGamepad,
  FaGift,
  FaHeart,
  FaBook,
  FaShoppingCart,
  FaMoneyBillWave,
  FaBolt,
  FaPaw,
  FaBus,
  FaPhone,
  FaLaptop,
  FaTimes,
  FaTree,
  FaStethoscope,
  FaStore,
  FaTint,
} from 'react-icons/fa';

const categoriasIniciales = [
  { nombre: 'Renta', icono: <FaHome /> },
  { nombre: 'Transporte', icono: <FaCar /> },
  { nombre: 'Comida', icono: <FaUtensils /> },
  { nombre: 'Entretenimiento', icono: <FaSmile /> },
  { nombre: 'Trabajo', icono: <FaBriefcase /> },
];

const iconosDisponibles = [
  { nombre: 'FaHome', icono: <FaHome /> },
  { nombre: 'FaCar', icono: <FaCar /> },
  { nombre: 'FaUtensils', icono: <FaUtensils /> },
  { nombre: 'FaSmile', icono: <FaSmile /> },
  { nombre: 'FaBriefcase', icono: <FaBriefcase /> },
  { nombre: 'FaGamepad', icono: <FaGamepad /> },
  { nombre: 'FaGift', icono: <FaGift /> },
  { nombre: 'FaHeart', icono: <FaHeart /> },
  { nombre: 'FaBook', icono: <FaBook /> },
  { nombre: 'FaShoppingCart', icono: <FaShoppingCart /> },
  { nombre: 'FaMoneyBillWave', icono: <FaMoneyBillWave /> },
  { nombre: 'FaBolt', icono: <FaBolt /> },
  { nombre: 'FaPaw', icono: <FaPaw /> },
  { nombre: 'FaBus', icono: <FaBus /> },
  { nombre: 'FaPhone', icono: <FaPhone /> },
  { nombre: 'FaLaptop', icono: <FaLaptop /> },
  { nombre: 'FaTint', icono: <FaTint /> },
  { nombre: 'FaStore', icono: <FaStore /> },
  { nombre: 'FaStethoscope', icono: <FaStethoscope /> },
  { nombre: 'FaTree', icono: <FaTree /> },
];

function Categorias() {
  const [categorias, setCategorias] = useState(categoriasIniciales);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [iconoSeleccionado, setIconoSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);

  const handleCrearCategoria = () => {
    setModalVisible(true);
    setModoEdicion(false);
    setNuevoNombre('');
    setIconoSeleccionado(null);
  };

  const handleEditar = (index) => {
    const cat = categorias[index];
    const iconoMatch = iconosDisponibles.find((i) => i.icono.type === cat.icono.type);
    setModoEdicion(true);
    setIndiceEditando(index);
    setNuevoNombre(cat.nombre);
    setIconoSeleccionado(iconoMatch);
    setModalVisible(true);
  };

  const handleEliminar = (index) => {
    const confirm = window.confirm("¿Seguro que deseas eliminar esta categoría?");
    if (!confirm) return;
    const nuevasCategorias = [...categorias];
    nuevasCategorias.splice(index, 1);
    setCategorias(nuevasCategorias);
  };

  const handleGuardar = () => {
    if (!nuevoNombre || !iconoSeleccionado) {
      alert("Completa el nombre y selecciona un ícono.");
      return;
    }

    const nuevaCategoria = {
      nombre: nuevoNombre,
      icono: iconoSeleccionado.icono,
    };

    if (modoEdicion) {
      const nuevas = [...categorias];
      nuevas[indiceEditando] = nuevaCategoria;
      setCategorias(nuevas);
    } else {
      setCategorias([...categorias, nuevaCategoria]);
    }

    handleCerrarModal();
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
    setNuevoNombre('');
    setIconoSeleccionado(null);
    setModoEdicion(false);
    setIndiceEditando(null);
  };

  return (
    <div className="categorias-section">
      <h2><FaListUl /> Categorías de Gastos</h2>

      {/* MODAL */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={handleCerrarModal}><FaTimes /></button>
            <h3>{modoEdicion ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
            <input
              type="text"
              placeholder="Nombre de la categoría"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
            <div className="icon-grid">
              {iconosDisponibles.map((item, idx) => (
                <div
                  key={idx}
                  className={`icon-option ${iconoSeleccionado?.nombre === item.nombre ? 'selected' : ''}`}
                  onClick={() => setIconoSeleccionado(item)}
                >
                  {item.icono}
                </div>
              ))}
            </div>
            <button className="guardar-btn" onClick={handleGuardar}>
              {modoEdicion ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </div>
      )}

      {/* TARJETAS */}
      <div className="categorias-row">
        <div className="categoria-card crear-categoria" onClick={handleCrearCategoria}>
          <div className="card-content">
            <div className="crear-icon">
              <FaPlus />
            </div>
            <div className="categoria-nombre">Crear categoría</div>
          </div>
        </div>

        {categorias.map((cat, idx) => (
          <div className="categoria-card" key={idx}>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEditar(idx)}><FaEdit /></button>
              <button className="delete-btn" onClick={() => handleEliminar(idx)}><FaTrash /></button>
            </div>
            <div className="card-content">
              <div className="categoria-icon">{cat.icono}</div>
              <div className="categoria-nombre">{cat.nombre}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
