// Importa la función validationResult de express-validator
const { validationResult } = require('express-validator'); // Esta función permite obtener los resultados de las validaciones ejecutadas

const handleValidationErrors = (req, res, next) => { // // Define un middleware para manejar los errores de validación
   // Verifica si hay errores de validación
    const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Si errors.isEmpty() es false (hay errores), envía una respuesta con status 400
  next();
};

module.exports = handleValidationErrors;
