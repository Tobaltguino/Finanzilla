import React, { useState, useEffect } from 'react';
import {
  FaUtensils, FaCar, FaHome, FaSmile, FaChevronDown, FaPlus, FaTimes, FaMinus, FaShoppingCart, FaCalendarAlt, FaRegTrashAlt
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/Gastos.css';


import { get_gastos, get_limite, get_notes, agregar_gasto } from '../../endpoints/api';

const categoriasDisponibles = [
  { id: 1, nombre: 'Comida', icono: <FaCar /> },
  { id: 2, nombre: 'Transporte', icono: <FaUtensils /> },
  { id: 3, nombre: 'Renta', icono: <FaHome /> },
  { id: 4, nombre: 'lol', icono: <FaSmile /> },
];

/** ------------------------------------------------------------------------------------------ */
const iconos = {
  "FaCar": <FaCar />,
};
/** ------------------------------------------------------------------------------------------ */

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button className="custom-datepicker" onClick={onClick} ref={ref}>
    {value} <FaChevronDown />
  </button>
));

function Gastos() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [gastos, setGastos] = useState([
    { categoria: 'Comida', monto: 5000, fecha: '2025-07-01', icono: <FaUtensils /> },
    { categoria: 'Transporte', monto: 2500, fecha: '2025-07-02', icono: <FaCar /> },
    { categoria: 'Ocio', monto: 7000, fecha: '2025-07-02', icono: <FaSmile /> },
    { categoria: 'Comida', monto: 5000, fecha: '2025-07-01', icono: <FaUtensils /> },
   
    ]);

  /** ------------------------------------------------------------------------------------------ */
  /** Variables agregar nuevo gasto */
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  /** ------------------------------------------------------------------------------------------ */

  const mes = (fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0');
  const anio = fechaSeleccionada.getFullYear().toString();
  const [limiteUsuario, setLimiteUsuario] = useState(0);


  const gastosFiltrados = gastos.filter((g) => {
    const [año, mesStr] = g.fecha.split('-');
    return mesStr === mes && año === anio;
  });

  /** ------------------------------------------------------------------------------------------ */
  
  /** Variables importantes */
  const [totalGastado, setTotalGastado] = useState(0);
  const [totalRestante, setTotalRestante] = useState(0);

  /** ------------------------------------------------------------------------------------------ */

  const gastosOrdenados = [...gastosFiltrados].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );
  const handleEliminarGasto = (index) => {
    const nuevosGastos = [...gastos];
    nuevosGastos.splice(index, 1); // elimina el gasto en la posición indicada
    setGastos(nuevosGastos);
    };

    /** ------------------------------------------------------------------------------------------ */

    /* Obtener en un Array, todos los gastos */
    const [notes, setNotes] = useState([]) // [{id:1, nombre:jeany,...}, {id:2, nombre:bastian,...}]
    useEffect(() => {
      const fetchNotes = async () => {
        const notes = await get_gastos()
        setNotes(notes)
      }
      fetchNotes();
    }, [])
  

    /** Obtener el limite mensual y colocarlo en una variable */
    const [limite, setLimite] = useState([]);
    useEffect(() => {
      const fetchLimite = async () => {
        const data = await get_limite()
        setLimite(data)
      }
      fetchLimite();
    }, [])

    /**Transformarlo a un array de JavaS */
    const limiteActual = limite.length > 0 ? limite[0] : null;

    /** Calcular el total gastado */
    useEffect(() => {
    const total = notes.reduce((acc, note) => acc + Number(note.monto), 0);
    setTotalGastado(total);
    }, [notes]);

    /** Calcular el dinero restante, si totalGastado y limiteActual, cambian, se vuelve a ejecutar esta funcion */
    useEffect(() => {
    const restante = Number(limiteActual?.limite || 0) - totalGastado;
    console.log(restante)
    setTotalRestante(restante);
    }, [totalGastado, limiteActual]);

    /** ------------------------------------------------------------------------------------------ */

    /** Funcion para guardar el gasto en base de datos */
    const handleGuardarGasto = async (e) => {
      
      e.preventDefault();
      if (!categoriaSeleccionada || !monto) {
        alert('Completa todos los campos');
        return;
      }

      const fechaActual = new Date().toISOString().split("T")[0]; //YYYY-MM-DD

  

      try {
        const response = await agregar_gasto(nombre, fechaActual, monto, Number(categoriaSeleccionada.id)); // pan, 2025-08, 10.000, 1 (FaCar)

        // hacer if si hay un error
        // Ejecutar la funcion get_gastos() y asignarla en Notes (lista de gastos), por lo tanto se vuelve a ejecutar el return
        // Mostrando de nuevo, la nueva base de datos
        const gastosActualizados = await get_gastos();
        setNotes(gastosActualizados); //Notes = Gastos

      } catch (error) {
        console.error("Error al agregar gasto:", error);
      }


      setCategoriaSeleccionada(null);
      setNombre('');
      setMonto('');
      setMostrarModal(false);
    };

    /** ------------------------------------------------------------------------------------------ */

  return (
    <div className="gastos-layout">
      <div className="limite-info sticky-box">
        <div className="selector-fecha">
          <DatePicker
            selected={fechaSeleccionada}
            onChange={(date) => setFechaSeleccionada(date)}
            dateFormat="dd 'de' MMMM, yyyy" // ← muestra día, mes y año
            locale={es}
            customInput={<CustomInput />}
          />
        </div>
        <h2>Presupuesto Mensual</h2>



        <label className="limite-label">
          <strong>Límite:</strong>
          <div className="input-con-simbolo">
            <span className="simbolo">$</span>
            <input
              type="number"
              value={Number(limiteActual?.limite) || 0} readOnly
              className="input-limite"
            />
          </div>
        </label>
        <p><strong>Gastado:</strong> ${totalGastado}</p>
        <p><strong>Disponible:</strong> ${totalRestante}</p>

        <button className="agregar-btn" onClick={() => setMostrarModal(true)}>
          <FaPlus /> Agregar Gasto
        </button>
        <button className="cartolas-btn" onClick={() => setFechaSeleccionada(new Date('2025-06-01'))}>
          <FaCalendarAlt /> Ver Cartolas
        </button>
      </div>

      <div className="lista-gastos">   
        
        {/* -------PRUEBA------- */}
        <label>
          {limite.map((lim, index) => (
            <div key={index}>{lim.mes}</div>
          ))}
        </label>
        {/* ---------------------- */}
          
        <h3>Gastos recientes</h3>
        {notes.map((note, idx) => (
          <div className="gasto-item" key={note.id}>
            <div className="icono">
              
  
              {iconos[note.categoria.name_icon] || "???"}
              
            </div>
            <div className="info">
              <span className="categoria">{}</span>
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
              <button className="eliminar-btn" onClick={() => handleEliminarGasto(idx)}><FaRegTrashAlt /></button>
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
              {categoriasDisponibles.map((cat, idx) => (
                <div
                  key={idx}
                  className={`icon-option ${categoriaSeleccionada?.nombre === cat.nombre ? 'selected' : ''}`}
                  onClick={() => setCategoriaSeleccionada(cat)}
                >
                  {cat.icono}
                  <div className="cat-label">{cat.nombre}</div>
                </div>
              ))}
            </div>

            <label>Nombre:</label>
            <input
              type="string"
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
