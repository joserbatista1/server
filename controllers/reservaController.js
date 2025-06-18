const fs = require('fs');
const path = require('path');
const restaurantes = require('../data/restaurantes.json');

// Ruta al archivo JSON
const reservasPath = path.join(__dirname, '../data/reservas.json');

// Funciones auxiliares
function leerReservas() {
  if (!fs.existsSync(reservasPath)) return [];
  const data = fs.readFileSync(reservasPath, 'utf-8');
  return JSON.parse(data);
}

function guardarReservas(reservas) {
  fs.writeFileSync(reservasPath, JSON.stringify(reservas, null, 2));
}

// POST /api/reservas
function realizarReserva(req, res) {
  const { nombre, cantidad, restaurante, hora } = req.body;
  if (!nombre || !cantidad || !restaurante || !hora) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  const r = restaurantes.find(r => r.nombre.toLowerCase() === restaurante.toLowerCase());
  if (!r) return res.status(404).json({ mensaje: 'Restaurante no encontrado' });

  const reservas = leerReservas();
  const reservasEnHora = reservas.filter(res =>
    res.restaurante === r.nombre && res.hora === hora
  );

  if (reservasEnHora.length >= r.capacidadPorGrupoHora) {
    return res.status(409).json({ mensaje: 'No hay disponibilidad en ese horario' });
  }

  const nuevaReserva = {
    id: reservas.length > 0 ? reservas[reservas.length - 1].id + 1 : 1,
    nombre,
    cantidad,
    restaurante: r.nombre,
    hora
  };

  reservas.push(nuevaReserva);
  guardarReservas(reservas);

  res.status(201).json({ mensaje: 'Reserva realizada', reserva: nuevaReserva });
}

// GET /api/reservas?hora=20:00-22:00
function verReservas(req, res) {
  const { hora } = req.query;
  const reservas = leerReservas();

  const disponibles = restaurantes.map(r => {
    const ocupados = reservas.filter(res => res.restaurante === r.nombre && res.hora === hora);
    return {
      restaurante: r.nombre,
      disponibles: r.capacidadPorGrupoHora - ocupados.length
    };
  });

  res.json(disponibles);
}

// GET /api/reservas/:restaurante/:hora
function reservasPorRestaurante(req, res) {
  const { restaurante, hora } = req.params;
  const reservas = leerReservas();

  const lista = reservas.filter(r =>
    r.restaurante.toLowerCase() === restaurante.toLowerCase() && r.hora === hora
  );
  res.json(lista);
}

// DELETE /api/reservas/eliminar/:id
function eliminarReserva(req, res) {
  const { id } = req.params;
  const idNum = parseInt(id);
  let reservas = leerReservas();

  const index = reservas.findIndex(r => r.id === idNum);
  if (index === -1) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  reservas.splice(index, 1);
  guardarReservas(reservas);

  res.json({ mensaje: 'Reserva eliminada' });
}

// PUT /api/reservas/modificar/:id
function modificarReserva(req, res) {
  const { id } = req.params;
  const idNum = parseInt(id);
  const { nombre, cantidad, restaurante, hora } = req.body;

  if (!nombre || !cantidad || !restaurante || !hora) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  const reservas = leerReservas();
  const index = reservas.findIndex(r => r.id === idNum);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  reservas[index] = { id: idNum, nombre, cantidad, restaurante, hora };
  guardarReservas(reservas);

  res.json({ mensaje: 'Reserva modificada correctamente', reserva: reservas[index] });
}

// Este es solo del frontend, puedes eliminarlo si no se usa
function irReservaciones() {
  const element = document.getElementById('reservas');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

module.exports = {
  irReservaciones,
  realizarReserva,
  verReservas,
  reservasPorRestaurante,
  eliminarReserva,
  modificarReserva
};
