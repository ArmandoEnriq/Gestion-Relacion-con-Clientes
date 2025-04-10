const express = require('express'); // Importa el framework Express para crear rutas
// Importa las funciones controladoras (register y login) desde el archivo authController
// Estas funciones contendrán la lógica para registrar y autenticar usuarios
const { register, login, logout } = require('../controllers/authController'); 
/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para login y registro
 */
const router = express.Router(); // Crea un nuevo enrutador de Express. Esto nos permite definir rutas específicas para la autenticación
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error de validación o usuario existente
 */
router.post('/register', register); // Define la ruta POST '/register' que usará la función register como controlador. Cuando se haga una petición POST a esta ruta, se ejecutará la función register

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', login); // Define la ruta POST '/login' que usará la función login como controlador. Cuando se haga una petición POST a esta ruta, se ejecutará la función login

router.post('/logout', logout)

module.exports = router;
