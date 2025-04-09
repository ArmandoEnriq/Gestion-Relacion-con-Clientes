const express = require('express'); // Importa el framework Express para crear rutas
// Importa las funciones controladoras (register y login) desde el archivo authController
// Estas funciones contendrán la lógica para registrar y autenticar usuarios
const { register, login } = require('../controllers/authController'); 
const router = express.Router(); // Crea un nuevo enrutador de Express. Esto nos permite definir rutas específicas para la autenticación

router.post('/register', register); // Define la ruta POST '/register' que usará la función register como controlador. Cuando se haga una petición POST a esta ruta, se ejecutará la función register
router.post('/login', login); // Define la ruta POST '/login' que usará la función login como controlador. Cuando se haga una petición POST a esta ruta, se ejecutará la función login

module.exports = router;
