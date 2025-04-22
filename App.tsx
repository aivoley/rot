import React, { useState } from 'react';

const jugadorasBase = [
  { nombre: 'Jugadora 1', posiciones: ['Punta', 'Central'] },
  { nombre: 'Jugadora 2', posiciones: ['Armadora'] },
  { nombre: 'Jugadora 3', posiciones: ['Opuesta'] },
  { nombre: 'Jugadora 4', posiciones: ['Punta', 'Central'] },
  { nombre: 'Jugadora 5', posiciones: ['Armadora'] },
  { nombre: 'Jugadora 6', posiciones: ['Opuesta'] },
];

const simuladorVoleibol = () => {
  const [formacion, setFormacion] = useState(jugadorasBase);
  const [jugadoraACambiar, setJugadoraACambiar] = useState(null);

  const zonasOrdenadas = [
    { id: 4, label: 'Zona 4' }, // arriba izquierda
    { id: 3, label: 'Zona 3' }, // arriba centro
    { id: 2, label: 'Zona 2' }, // arriba derecha
    { id: 5, label: 'Zona 5' }, // abajo izquierda
    { id: 6, label: 'Zona 6' }, // abajo centro
    { id: 1, label: 'Zona 1' }, // abajo derecha
  ];

  const abrirCambio = (jugadora) => {
    setJugadoraACambiar(jugadora);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-rows-2 grid-cols-3 gap-2 w-[600px] h-[400px] bg-white border rounded-lg p-4 shadow relative">
        {zonasOrdenadas.map((zona, index) => {
          const jugadora = formacion[index];
          return (
            <div key={zona.id} className="relative w-full h-full border-2 rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-center text-sm font-semibold">
                  {jugadora?.nombre?.split(' ')[0]}
                </div>
              </div>
              <button
                onClick={() => abrirCambio(jugadora)}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs mt-1 text-blue-600 underline"
              >
                Cambiar
              </button>
              <div className="absolute top-0 left-0 text-xs font-bold text-white p-1 bg-blue-500 rounded-full">
                {zona.label}
              </div>
            </div>
          );
        })}
      </div>

      {jugadoraACambiar && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border p-4 rounded shadow">
          <h3 className="font-semibold mb-2">
            Cambiar a {jugadoraACambiar.nombre}
          </h3>
          <select
            onChange={(e) => {
              const nueva = jugadorasBase.find((j) => j.nombre === e.target.value);
              const nuevaFormacion = formacion.map((f) =>
                f.nombre === jugadoraACambiar.nombre ? nueva : f
              );
              setFormacion(nuevaFormacion);
              setJugadoraACambiar(null);
            }}
            className="border p-1 rounded"
          >
            <option value="">Seleccionar jugadora</option>
            {jugadorasBase
              .filter((j) => !formacion.some((f) => f.nombre === j.nombre))
              .map((j) => (
                <option key={j.nombre} value={j.nombre}>
                  {j.nombre} ({j.posiciones.join(', ')})
                </option>
              ))}
          </select>
          <button
            onClick={() => setJugadoraACambiar(null)}
            className="ml-4 text-red-500"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default simuladorVoleibol;

