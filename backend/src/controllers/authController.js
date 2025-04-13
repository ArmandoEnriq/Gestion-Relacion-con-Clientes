const bcrypt = require('bcrypt'); // Para hashing de contraseñas
const createError = require('http-errors'); // Para crear errores que podemos dirigir
const jwt = require('jsonwebtoken'); // Para generar tokens JWT
const User = require('../models/User'); // Modelo de usuario de Sequelize

const register = async (req, res) => {
  const { name, email, password, role } = req.body; // Extrae datos del cuerpo de la petición
  try {
    const hashed = await bcrypt.hash(password, 10); // Hashea la contraseña con un salt de 10 rondas
    const user = await User.create({ name, email, password: hashed, role }); // Crea el usuario en la base de datos con la contraseña hasheada
    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;  // Extrae email y password del cuerpo de la petición
  try {
    const user = await User.findOne({ where: { email } }); // Busca el usuario por email
    if (!user) throw createError(404,'Usuario no encontrado') // Anteriormente return res.status(404).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password); // Compara la contraseña proporcionada con el hash almacenado
    if (!valid) throw createError(401,'Contraseña incorrecta') // Anteriormente; return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Genera un token JWT válido por 1 día
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true, // La cookie solo es accesible por el servidor
      secure: process.env.NODE_ENV === 'production', // La cookie solo se envía sobre HTTPS ya que definimos en producción
      sameSite: 'Strict', // 'Strict': Solo se envía en solicitudes del mismo sitio. 'Lax' (default): Se envía con navegación segura entre sitios. 'None': Se envía en todos los contextos (requiere secure: true)
      maxAge: 24 * 60 * 60 * 1000 // 1 día
    });
    res.status(200).json({ message: 'Login exitoso' });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => { // Limpiamos la cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  res.json({ message: 'Sesión cerrada' });
};


module.exports = { register, login, logout };
