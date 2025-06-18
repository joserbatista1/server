const express = require('express');
const router = express.Router();
const {
  realizarReserva,
  verReservas,
  reservasPorRestaurante,
  eliminarReserva,
  modificarReserva
} = require('../controllers/reservaController');

router.delete('/eliminar/:id',eliminarReserva);
router.post('/', realizarReserva);                    // Crear nueva reserva
router.get('/', verReservas);                         // Ver reservas por hora
router.get('/:restaurante/:hora', reservasPorRestaurante); // Listar reservas por restaurante y hora
router.put('/modificar/:id', modificarReserva);


module.exports = router;
