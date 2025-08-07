import React, { useState, useEffect } from 'react';
import {
  FaUtensils, FaCar, FaHome, FaSmile,
  FaChevronDown, FaPlus, FaTimes, FaRegTrashAlt,
  FaCheckSquare, FaPen
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/Gastos.css';

import { get_gastos, get_limite, agregar_gasto, set_limite, eliminar_gasto, get_categorias } from '../../endpoints/api';

const iconos = {
  FaCar: <FaCar />,
  FaUtensils: <FaUtensils />,
  FaHome: <FaHome />,
  FaSmile: <FaSmile />,
};

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button className="custom-datepicker" onClick={onClick} ref={ref}>
    {value} <FaChevronDown />
  </button>
));

function Gastos() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  /** Gastos traídos de base de datos */
  const [notes, setNotes] = useState([]);

  /** Límite y estado usuario */
  const [limite, setLimite] = useState([]);
  const [limiteUsuario, setLimiteUsuario] = useState(0);
  const [editandoLimite, setEditandoLimite] = useState(false);
  const [limiteOriginal, setLimiteOriginal] = useState(0); // Guardamos el valor original para restaurar

  /** Categorías */
  const [categorias, setCategorias] = useState([]);

  /** Modal y nuevos gastos */
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');

  /** Totales */
  const [totalGastado, setTotalGastado] = useState(0);
  const [totalRestante, setTotalRestante] = useState(0);

  /** Fetch gastos desde la base */
  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await get_gastos();
      setNotes(notes);
    };
    fetchNotes();
  }, []);

  /** Fetch límite */
  useEffect(() => {
    const fetchLimite = async () => {
      const data = await get_limite();
      setLimite(data);
    };
    fetchLimite();
  }, []);

  /** Fetch categorías */
  useEffect(() => {
    const fetchCategorias = async () => {
      const cat = await get_categorias();
      setCategorias(cat);
    };
    fetchCategorias();
  }, []);

  /** Actualizar limiteUsuario cuando cambie limite */
  useEffect(() => {
    const limiteActual = limite.length > 0 ? limite[0] : null;
    if (limiteActual?.limite) {
      setLimiteUsuario(limiteActual.limite);
    }
  }, [limite]);

  /** Calcular total gastado cuando notes cambian */
  useEffect(() => {
    const total = notes.reduce((acc, note) => acc + Number(note.monto), 0);
    setTotalGastado(total);
  }, [notes]);

  /** Calcular dinero restante */
  useEffect(() => {
    const limiteActual = limite.length > 0 ? limite[0] : null;
    const restante = Number(limiteActual?.limite || 0) - totalGastado;
    setTotalRestante(restante);
  }, [totalGastado, limite]);

  /** Guardar límite */
  const guardarLimite = async () => {
    try {
      await set_limite(limiteUsuario);
      alert("Límite guardado correctamente");
      const nuevoLimite = await get_limite();
      setLimite(nuevoLimite);
    } catch (error) {
      alert("Error al guardar el límite");
      console.error(error);
    }
  };

  /** Eliminar gasto */
  const handleEliminarGasto = async (id) => {
    try {
      await eliminar_gasto(id);
      const gastosActualizados = await get_gastos();
      setNotes(gastosActualizados);
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
    }
  };

  /** Guardar nuevo gasto */
  const handleGuardarGasto = async (e) => {
    e.preventDefault();
    if (!categoriaSeleccionada || !monto) {
      alert('Completa todos los campos');
      return;
    }

    const fechaActual = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    try {
      await agregar_gasto(nombre, fechaActual, monto, Number(categoriaSeleccionada.id));
      const gastosActualizados = await get_gastos();
      setNotes(gastosActualizados);
    } catch (error) {
      console.error("Error al agregar gasto:", error);
    }

    setCategoriaSeleccionada(null);
    setNombre('');
    setMonto('');
    setMostrarModal(false);
  };

  /** Filtrar gastos por día, mes y año según fechaSeleccionada */
  const diaSeleccionado = fechaSeleccionada.getDate().toString().padStart(2, '0');
  const mesSeleccionado = (fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0');
  const anioSeleccionado = fechaSeleccionada.getFullYear().toString();

  const gastosFiltradosPorFecha = notes.filter(note => {
    if (!note.fecha) return false;
    const [anio, mes, dia] = note.fecha.split('-');
    return anio === anioSeleccionado && mes === mesSeleccionado && dia === diaSeleccionado;
  });

  return (
    <div className="gastos-layout">
      <div className="limite-info sticky-box">
        <div className="selector-fecha">
          <DatePicker
            selected={fechaSeleccionada}
            onChange={(date) => setFechaSeleccionada(date)}
            dateFormat="dd 'de' MMMM, yyyy"
            locale={es}
            customInput={<CustomInput />}
          />
        </div>

        <h2>Presupuesto Mensual</h2>

        <label className="limite-label">
          <strong>Límite:</strong>
          <div className="input-limite-wrapper">
            {!editandoLimite ? (
              <>
                <span className="limite-valor">${limiteUsuario.toLocaleString("es-CL")}</span>
                <button
                  className="boton-editar-limite"
                  title="Editar límite"
                  onClick={() => {
                    setLimiteOriginal(limiteUsuario); // Guardar valor actual antes de editar
                    setEditandoLimite(true);
                  }}
                >
                  <FaPen />
                </button>
              </>
            ) : (
              <>
                <span className="simbolo">$</span>
                <input
                  type="number"
                  value={limiteUsuario}
                  onChange={(e) => setLimiteUsuario(e.target.value)}
                  className="input-limite"
                />
                <button
                  onClick={() => {
                    guardarLimite();
                    setEditandoLimite(false);
                  }}
                  className="boton-limite-check"
                  title="Guardar límite"
                >
                  <FaCheckSquare />
                </button>
                <button
                  onClick={() => {
                    setLimiteUsuario(limiteOriginal); // Restaurar valor original al cancelar
                    setEditandoLimite(false);
                  }}
                  className="boton-limite-cancelar"
                  title="Cancelar edición"
                >
                  <FaTimes />
                </button>
              </>
            )}
          </div>
        </label>

        <p><strong>Gastado:</strong> ${totalGastado.toLocaleString("es-CL")}</p>
        <p><strong>Disponible:</strong> ${totalRestante.toLocaleString("es-CL")}</p>

        <button className="agregar-btn" onClick={() => setMostrarModal(true)}>
          <FaPlus /> Agregar Gasto
        </button>
      </div>

      <div className="lista-gastos">
        <h3>Gastos del día seleccionado</h3>
        {gastosFiltradosPorFecha.length === 0 && <p>No hay gastos para esta fecha.</p>}
        {gastosFiltradosPorFecha.map((note) => (
          <div className="gasto-item" key={note.id}>
            <div className="icono">
              {iconos[note.categoria.name_icon] || "???"}
            </div>
            <div className="info">
              <span className="categoria">{note.categoria.nombre}</span>
              <span className="nombre">{note.nombre}</span>
              <span className="fecha">{note.fecha}</span>
            </div>
            <div className="monto">
              - $
              {Number(note.monto).toLocaleString("es-CL", {
                minimumFractionDigits: 0,
              })}
            </div>
            <div className="monto-con-boton">
              <button className="eliminar-btn" onClick={() => handleEliminarGasto(note.id)}>
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL para agregar gasto */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setMostrarModal(false)}>
              <FaTimes />
            </button>
            <h3>Nuevo Gasto</h3>

            <label>Categoría:</label>
            <div className="icon-grid">
              {categorias.map((cat) => (
                <div
                  key={cat.id}
                  className={`icon-option ${categoriaSeleccionada?.nombre === cat.nombre ? 'selected' : ''}`}
                  onClick={() => setCategoriaSeleccionada(cat)}
                >
                  {iconos[cat.name_icon] || "???"}
                  <div className="cat-label">{cat.nombre}</div>
                </div>
              ))}
            </div>

            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Ej: Ropa de invierno de H&M"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label>Monto:</label>
            <input
              type="number"
              placeholder="Ej: 10.000"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />

            <button className="guardar-btn" onClick={handleGuardarGasto}>Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gastos;
