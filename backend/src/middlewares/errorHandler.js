// Define un middleware de manejo de errores de Express
const logger = require('../utils/logger'); // Usamos logger con uso de winston para registrar los log

const errorHandler = (err, req, res, next) => { // Middleware que recibe 4 parámetros (err, req, res, next) que lo identifican como middleware de errores
    logger.error(`[${req.method} ${req.originalUrl}] ${err.message}`); //Registramos el error con el metodo(get,post,etc.), url solicitada, mensaje de error
    // Ejem. [POST /api/users] Email already registered
  const statusCode = err.status || 500;
  const message = err.message || 'Error interno del servidor'; //Usa el mensaje por defecto y sino el otro

  res.status(statusCode).json({ error: message }); //Devuelve la respuesta en objeto JSON
};

  
  module.exports = errorHandler;
  