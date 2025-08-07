import React, { useEffect, useState } from 'react';
import { FaChartPie } from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { get_gastos } from '../../endpoints/api';
import '../../styles/Informes.css';

function Informes() {
  const [gastos, setGastos] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
  const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchGastos = async () => {
      const data = await get_gastos();
      setGastos(data);
    };
    fetchGastos();
  }, []);

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const anios = Array.from({ length: 2070 - 2025 + 1 }, (_, i) => 2025 + i);

  const gastosFiltrados = gastos.filter(gasto => {
    const fecha = new Date(gasto.fecha);
    return (
      fecha.getMonth() + 1 === parseInt(mesSeleccionado) &&
      fecha.getFullYear() === parseInt(anioSeleccionado)
    );
  });


  const diasDelMes = new Date(anioSeleccionado, mesSeleccionado, 0).getDate();

  const gastosPorDia = Array.from({ length: diasDelMes }, (_, i) => {
    const dia = i + 1;
    const gastoDia = gastosFiltrados
      .filter(g => new Date(g.fecha).getDate() === dia)
      .reduce((acc, g) => acc + (parseFloat(g.monto) || 0), 0);
    return { dia, monto: gastoDia };
  });

  const gastosPorCategoria = gastosFiltrados.reduce((acc, gasto) => {
    const monto = parseFloat(gasto.monto) || 0;
    const nombreCat = gasto.categoria && gasto.categoria.nombre ? gasto.categoria.nombre : 'Sin Categoría';
    acc[nombreCat] = (acc[nombreCat] || 0) + monto;
    return acc;
  }, {});

  const datosPorCategoria = Object.entries(gastosPorCategoria).map(([categoria, monto]) => ({
    categoria,
    monto
  }));

  return (
    <div className="informes-section">
      <h2><FaChartPie /> Informes Mensuales</h2>
      <p>Resumen de ingresos y gastos por mes y año:</p>

      <div className="filtros">
        <div className="filtro">
          <label>Mes:</label>
          <select value={mesSeleccionado} onChange={(e) => setMesSeleccionado(e.target.value)}>
            {meses.map((mes, i) => (
              <option key={i} value={i + 1}>{mes}</option>
            ))}
          </select>
        </div>

        <div className="filtro">
          <label>Año:</label>
          <select value={anioSeleccionado} onChange={(e) => setAnioSeleccionado(e.target.value)}>
            {anios.map((anio) => (
              <option key={anio} value={anio}>{anio}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="graficos-container">
        <div className="grafico-individual">
          <h3>Gastos por Día</h3>
          <div style={{ overflowX: 'auto' }}>
            <BarChart
              width={diasDelMes * 40}
              height={350}
              data={gastosPorDia}
              barSize={30}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dia"
                type="number"
                domain={[1, diasDelMes]}
                allowDecimals={false}
                ticks={Array.from({ length: diasDelMes }, (_, i) => i + 1)}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="monto" fill="#007bff" name="Gasto ($)" />
            </BarChart>
          </div>
        </div>

        <div className="grafico-individual">
          <h3>Gastos por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={datosPorCategoria}
              barSize={20}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="monto" fill="#82ca9d" name="Gasto ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Informes;
