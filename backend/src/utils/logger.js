// - createLogger: Para crear instancias de loggers
// - transports: Para definir dónde se guardan los logs (consola, archivo, etc.)
// - format: Para configurar el formato de los mensajes de log
const { createLogger, transports, format } = require('winston');
// Crea una instancia del logger con configuración personalizada
const logger = createLogger({
  level: 'info', // Establece el nivel mínimo de logs que se registrarán (en este caso 'info' y niveles superiores)
  format: format.combine( // Configura el formato de los mensajes de log (agarra el log y le hace las modificaciones que quieras para despues combinarlo)
    format.timestamp(), // Añade automáticamente una marca de tiempo a cada mensaje
    format.printf(({ timestamp, level, message }) => { // Define un formato personalizado para los mensajes en ese orden
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`; // Ejemplo de formato: "[2023-05-20T12:00:00.000Z] INFO: Mensaje de log"
    })
  ), // Muestra los log en consola y Guarda los logs en un archivo 'logs/app.log'
  transports: [new transports.Console(), new transports.File({ filename: 'logs/app.log' })]
});

module.exports = logger;
