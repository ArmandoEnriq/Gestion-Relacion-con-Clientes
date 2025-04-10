//  Importa el módulo express-validator que se usa para validar datos en Express.
const { body } = require('express-validator'); // 'body' es una función que se usa para validar campos específicos del cuerpo de la solicitud

// Define un array de middlewares de validación para un cliente
const validateClient = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'), //Verifica que el nombre no este vacio
  body('email').isEmail().withMessage('Email no válido'), // Verifica que el email sea con una estructura correcta
  body('phone').notEmpty().isLength({ min: 10 }), //Debe tener al menos 10 digitos
  body('company').optional().isString(),
  body('notes').optional().isString()
];

module.exports = validateClient;
