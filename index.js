const express = require('express');
const cors = require('cors');
const reservaRoutes = require('./routes/reservaRoutes');

const app = express();
const PORT = 3001;

// Lista de orígenes permitidos
const whitelist = ['https://senator-ten.vercel.app', '181.224.204.162:3000'];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Permitir solicitudes sin origin (como curl o Postman)
//     if (!origin) return callback(null, true);
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('No permitido por CORS'));
//     }
//   }
// }));
app.use(cors());


app.use(express.json());

app.use('/api/reservas', reservaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
