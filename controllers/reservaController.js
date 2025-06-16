const restaurantes = require('../data/restaurantes.json');

let reservas = []; // Reservas en memoria

// POST /api/reservas
function realizarReserva(req, res) {
  const { nombre, cantidad, restaurante, hora } = req.body;

  if (!nombre || !cantidad || !restaurante || !hora) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  const r = restaurantes.find(r => r.nombre.toLowerCase() === restaurante.toLowerCase());
  if (!r) return res.status(404).json({ mensaje: 'Restaurante no encontrado' });

  const reservasEnHora = reservas.filter(res =>
    res.restaurante === r.nombre && res.hora === hora
  );

  if (reservasEnHora.length >= r.capacidadPorGrupoHora) {
    return res.status(409).json({ mensaje: 'No hay disponibilidad en ese horario' });
  }

  const nuevaReserva = {
    id: reservas.length + 1,
    nombre,
    cantidad,
    restaurante: r.nombre,
    hora
  };

  reservas.push(nuevaReserva);
  res.status(201).json({ mensaje: 'Reserva realizada', reserva: nuevaReserva });
}

// GET /api/reservas?hora=20:00-22:00
function verReservas(req, res) {
  const { hora } = req.query;
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
  const lista = reservas.filter(r =>
    r.restaurante.toLowerCase() === restaurante.toLowerCase() && r.hora === hora
  );
  res.json(lista);
}
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
  reservasPorRestaurante
};
