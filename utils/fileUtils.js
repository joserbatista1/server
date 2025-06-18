const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/reservas.json');

function leerReservas() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function guardarReservas(reservas) {
  fs.writeFileSync(filePath, JSON.stringify(reservas, null, 2));
}
