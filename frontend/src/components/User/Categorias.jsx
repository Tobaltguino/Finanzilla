import React, { useState, useEffect } from 'react';
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

import { agregar_categoria, eliminar_categoria, get_categorias } from '../../endpoints/api';

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
    const confirm = window.confirm("¿Seguro que deseas eliminar esta categoría?");
    if (!confirm) return;

    try {
      await eliminar_categoria(id);
      const categoriasActualizados = await get_categorias();
      setCategorias(categoriasActualizados);
    } catch (error) {
      console.error("Error al eliminar la categoria:", error);
    }

  };



  const handleCerrarModal = () => {
    setModalVisible(false);
    setNuevoNombre('');
    setIconoSeleccionado(null);
    setModoEdicion(false);
    setIndiceEditando(null);
  };

  /** ------------------------------------------------------------------------------------------ */
  /** Traer las categorias de la base de datos y colocarlo en una variable */
  //const [categorias, setCategorias] = useState([]) // [{id:1, nombre:categoria, usuario_id:1, name_icon:"FaCar"}, {id:2, nombre:bastian,...}]
  useEffect(() => {
    const fetchCategorias = async () => {
      const cat = await get_categorias()
      setCategorias(cat)
    }
    fetchCategorias();
  }, [])
  console.log(categorias)

  /** Funcion para guardar el gasto en base de datos */
  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!nuevoNombre || !iconoSeleccionado) {
      alert("Completa el nombre y selecciona un ícono.");
      return;
    }

    const nuevaCategoria = {
      nombre: nuevoNombre,                      // Nombre de la categoria
      icono: iconoSeleccionado.icono.type.name, // Solo texto para BD = <FaHome /> -> FaHome
    };

    if (modoEdicion) {
      const nuevas = [...categorias];
      nuevas[indiceEditando] = nuevaCategoria;
      setCategorias(nuevas);
    } else {
      //setCategorias([...categorias, nuevaCategoria]);
      try {
        const response = await agregar_categoria(nuevaCategoria.nombre, nuevaCategoria.icono); // 

        // Ejecutar la funcion get_gastos() y asignarla en Notes (lista de gastos), por lo tanto se vuelve a ejecutar el return
        // Mostrando de nuevo, la nueva base de datos
        const categoriasActualizados = await get_categorias();
        setCategorias(categoriasActualizados);

      } catch (error) {
        console.error("Error al agregar categoria:", error);
      }
    }

    handleCerrarModal();
  };
  /** */

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
              <button className="edit-btn" onClick={() => handleEditar(cat.id)}><FaEdit /></button>
              <button className="delete-btn" onClick={() => handleEliminar(cat.id)}><FaTrash /></button>
            </div>
            <div className="card-content">
              <div className="categoria-icon">{iconosDisponibles2[cat.name_icon]}</div>
              <div className="categoria-nombre">{cat.nombre}</div>
              <div className="categoria-nombre">{cat.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
