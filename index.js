const express = require('express');
const cors = require('cors');
const reservaRoutes = require('./routes/reservaRoutes');

const app = express();
const PORT = 3001;

app.use(cors()); // No recomendado en producción

app.use(express.json());

app.use('/api/reservas', reservaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
