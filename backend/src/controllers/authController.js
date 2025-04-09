const bcrypt = require('bcrypt'); // Para hashing de contraseñas
const jwt = require('jsonwebtoken'); // Para generar tokens JWT
const User = require('../models/User'); // Modelo de usuario de Sequelize

const register = async (req, res) => {
  const { name, email, password, role } = req.body; // Extrae datos del cuerpo de la petición
  try {
    const hashed = await bcrypt.hash(password, 10); // Hashea la contraseña con un salt de 10 rondas
    const user = await User.create({ name, email, password: hashed, role }); // Crea el usuario en la base de datos con la contraseña hasheada
    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario', details: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;  // Extrae email y password del cuerpo de la petición
  try {
    const user = await User.findOne({ where: { email } }); // Busca el usuario por email
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password); // Compara la contraseña proporcionada con el hash almacenado
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Genera un token JWT válido por 1 día
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ error: 'Error al hacer login', details: err.message });
  }
};

module.exports = { register, login };
