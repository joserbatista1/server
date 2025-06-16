// Simulación de datos (puedes luego conectar con base de datos)
let users = [
  { id: 1, name: 'Carlos' },
  { id: 2, name: 'María' },
];

function getUsers(req, res) {
  res.json(users);
}

function createUser(req, res) {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
}

module.exports = {
  getUsers,
  createUser,
};
