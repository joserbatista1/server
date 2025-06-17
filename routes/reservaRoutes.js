const express = require('express');
const router = express.Router();
const {
  realizarReserva,
  verReservas,
  reservasPorRestaurante,
  eliminarReserva
} = require('../controllers/reservaController');

router.delete('/eliminar:id',eliminarReserva);
router.post('/', realizarReserva);                    // Crear nueva reserva
router.get('/', verReservas);                         // Ver reservas por hora
router.get('/:restaurante/:hora', reservasPorRestaurante); // Listar reservas por restaurante y hora

module.exports = router;
