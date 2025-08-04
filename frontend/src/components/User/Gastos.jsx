import React, { useState } from 'react';
import {
  FaUtensils, FaCar, FaHome, FaSmile, FaChevronDown, FaPlus, FaTimes, FaMinus, FaCalendarAlt 
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/Gastos.css';

const categoriasDisponibles = [
  { nombre: 'Comida', icono: <FaUtensils /> },
  { nombre: 'Transporte', icono: <FaCar /> },
  { nombre: 'Renta', icono: <FaHome /> },
  { nombre: 'Ocio', icono: <FaSmile /> },
];

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

  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [monto, setMonto] = useState('');

  const mes = (fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0');
  const anio = fechaSeleccionada.getFullYear().toString();
  const [limiteUsuario, setLimiteUsuario] = useState(0);


  const gastosFiltrados = gastos.filter((g) => {
    const [año, mesStr] = g.fecha.split('-');
    return mesStr === mes && año === anio;
  });

  const totalGastado = gastosFiltrados.reduce((acc, g) => acc + g.monto, 0);
  const gastosOrdenados = [...gastosFiltrados].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );
  const handleEliminarGasto = (index) => {
    const nuevosGastos = [...gastos];
    nuevosGastos.splice(index, 1); // elimina el gasto en la posición indicada
    setGastos(nuevosGastos);
    };
    const handleGuardarGasto = () => {
      if (!categoriaSeleccionada || !monto) {
        alert('Completa todos los campos');
        return;
      }
  
    const nuevoGasto = {
      categoria: categoriaSeleccionada.nombre,
      icono: categoriaSeleccionada.icono,
      monto: parseFloat(monto),
      fecha: new Date().toISOString().slice(0, 10),
    };

    setGastos([...gastos, nuevoGasto]);
    setCategoriaSeleccionada(null);
    setMonto('');
    setMostrarModal(false);
  };

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
              value={limiteUsuario}
              onChange={(e) => setLimiteUsuario(parseFloat(e.target.value))}
              className="input-limite"
            />
          </div>
        </label>
        <p><strong>Gastado:</strong> ${totalGastado.toLocaleString('es-CL', { minimumFractionDigits: 0 })}</p>
        <p><strong>Disponible:</strong> ${ (limiteUsuario - totalGastado).toLocaleString('es-CL', { minimumFractionDigits: 0 }) }</p>

        <button className="agregar-btn" onClick={() => setMostrarModal(true)}>
          <FaPlus /> Agregar Gasto
        </button>
        <button className="cartolas-btn" onClick={() => setFechaSeleccionada(new Date('2025-06-01'))}>
          <FaCalendarAlt /> Ver Cartolas
        </button>
      </div>


      {/* Lista de abajo de gastos */}
      <div className="lista-gastos">    
        <h3>Gastos recientes</h3>
        {gastosOrdenados.map((gasto, idx) => (
          <div className="gasto-item" key={idx}>
            <div className="icono">{gasto.icono}</div>
            <div className="info">
              <span className="categoria">{gasto.categoria}</span>
              <span className="fecha">{gasto.fecha}</span>
            </div>
            <div className="monto-con-boton">
              <div className="monto">
                - ${gasto.monto.toLocaleString('es-CL', { minimumFractionDigits: 0 })}
              </div>
              <button className="eliminar-btn" onClick={() => handleEliminarGasto(idx)}>🗑️</button>
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
