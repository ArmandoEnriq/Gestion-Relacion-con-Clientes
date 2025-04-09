const jwt = require('jsonwebtoken'); // Importa la librería 'jsonwebtoken' para trabajar con JWT (Tokens)

// Define un middleware de autenticación (función que se ejecuta antes de las rutas protegidas)
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization; // Recuperamos el token del emcabezado de autorizacion y con split dividimos el bearer<token> en 2 y con [1] definimos que queremos el segundo <token>
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica y decodifica el token usando la clave secreta (almacenada en variables de entorno)
    req.user = decoded; // ahora tenemos acceso a req.user.id y req.user.role
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
