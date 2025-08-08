import React, { useState, useEffect } from 'react';
import '../../styles/Categorias.css';
import { ToastContainer, toast } from "react-toastify";
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

import { agregar_categoria, eliminar_categoria, get_categorias } from '../../endpoints/api';

const mostrarAviso = (mensaje, tipo = "success") => {
  if (tipo === "success") {
    toast.success(mensaje);
  } else if (tipo === "error") {
    toast.error(mensaje);
  } else if (tipo === "info") {
    toast.info(mensaje);
  } else if (tipo === "warn") {
    toast.warn(mensaje);
  }
};

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

const iconosDisponibles2 = {
  FaHome: <FaHome />,
  FaCar: <FaCar />,
  FaUtensils: <FaUtensils />,
  FaSmile: <FaSmile />,
  FaBriefcase: <FaBriefcase />,
  FaGamepad: <FaGamepad />,
  FaGift: <FaGift />,
  FaHeart: <FaHeart />,
  FaBook: <FaBook />,
  FaShoppingCart: <FaShoppingCart />,
  FaMoneyBillWave: <FaMoneyBillWave />,
  FaBolt: <FaBolt />,
  FaPaw: <FaPaw />,
  FaBus: <FaBus />,
  FaPhone: <FaPhone />,
  FaLaptop: <FaLaptop />,
  FaTint: <FaTint />,
  FaStore: <FaStore />,
  FaStethoscope: <FaStethoscope />,
  FaTree: <FaTree />,
};

function Categorias() {
  const [categorias, setCategorias] = useState([]);
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

  const handleEliminar = async (id) => {
    try {
      await eliminar_categoria(id);
      const categoriasActualizados = await get_categorias();
      setCategorias(categoriasActualizados);
      mostrarAviso("Categoría eliminada con éxito!", "success"); // <-- Alerta al eliminar
    } catch (error) {
      console.error("Error al eliminar la categoria:", error);
      mostrarAviso("Error al eliminar la categoría", "error"); // <-- Alerta de error
    }
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
    setNuevoNombre('');
    setIconoSeleccionado(null);
    setModoEdicion(false);
    setIndiceEditando(null);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      const cat = await get_categorias();
      setCategorias(cat);
    };
    fetchCategorias();
  }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!nuevoNombre || !iconoSeleccionado) {
      mostrarAviso("Complete todos los campos y seleccione un icono", "warn");
      return;
    }

    const nuevaCategoria = {
      nombre: nuevoNombre,                      
      icono: iconoSeleccionado.icono.type.name, 
    };

    if (modoEdicion) {
      const nuevas = [...categorias];
      nuevas[indiceEditando] = nuevaCategoria;
      setCategorias(nuevas);
      mostrarAviso("Categoría actualizada con éxito!", "success"); // <-- Alerta actualización
    } else {
      try {
        await agregar_categoria(nuevaCategoria.nombre, nuevaCategoria.icono);
        const categoriasActualizados = await get_categorias();
        setCategorias(categoriasActualizados);
        mostrarAviso("Categoría agregada con éxito!", "success"); // <-- Alerta al agregar
      } catch (error) {
        mostrarAviso("Error al agregar categoría", "error");
      }
    }

    handleCerrarModal();
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
              <button className="delete-btn" onClick={() => handleEliminar(cat.id)}><FaTrash /></button>
            </div>
            <div className="card-content">
              <div className="categoria-icon">{iconosDisponibles2[cat.name_icon]}</div>
              <div className="categoria-nombre">{cat.nombre}</div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Categorias;
