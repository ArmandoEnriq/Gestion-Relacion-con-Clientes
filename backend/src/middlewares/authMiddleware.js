const jwt = require('jsonwebtoken'); // Importa la librería 'jsonwebtoken' para trabajar con JWT (Tokens)
const createError = require('http-errors'); // Para lanzar errores con códigos de estado

// Define un middleware de autenticación (función que se ejecuta antes de las rutas protegidas)
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Recuperamos el token del emcabezado de autorizacion y con split dividimos el bearer<token> en 2 y con [1] definimos que queremos el segundo <token>
  if (!token) return next(createError(401, 'Token no proporcionado')); // Usamos next() para pasar al middleware de errores

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica y decodifica el token usando la clave secreta (almacenada en variables de entorno)
    req.user = decoded; // ahora tenemos acceso a req.user.id y req.user.role
    next();
  } catch (err) {
    next(createError(403, 'Token inválido o expirado')); // Si el token no es válido, lo lanzamos como un error
  }
};

module.exports = authMiddleware;
