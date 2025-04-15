const express = require('express'); // Importa el framework Express para crear rutas
const auth = require('../middlewares/authMiddleware');
const validateClient = require('../validators/clientValidator');
const handleValidationErrors = require('../middlewares/validationMiddleware');
const authorize = require('../middlewares/roleMiddleware');
const {createClient,getClients,getClientById,updateClient,deleteClient} = require('../controllers/clientController');
/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones CRUD sobre clientes
 */
const router = express.Router();

router.use(auth); // proteger todas las rutas de abajo

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 */
router.post('/', validateClient, handleValidationErrors,authorize('admin','manager'), createClient); // Primero ejecuta las validaciones y Luego verifica si hubo errores

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Obtener todos los clientes del usuario autenticado con filtros
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar por nombre (coincidencia parcial, sin distinción de mayúsculas)
 *       - in: query
 *         name: company
 *         schema:
 *           type: string
 *         description: Filtrar por empresa (coincidencia parcial, sin distinción de mayúsculas)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número máximo de resultados a retornar
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Número de registros a omitir (útil para paginación)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [name, company, createdAt]
 *         description: Campo por el que ordenar los resultados
 *       - in: query
 *         name: direction
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Dirección de ordenamiento (ascendente o descendente)
 *     responses:
 *       200:
 *         description: Lista de clientes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       500:
 *         description: Error del servidor
 */
router.get('/',authorize('admin','manager'), getClients);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:id',authorize('admin','manager'), getClientById);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Actualizar un cliente por ID
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado
 */
router.put('/:id',authorize('admin','manager'), updateClient);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente eliminado
 *       403:
 *         description: Acceso denegado
 */
router.delete('/:id',authorize('admin','manager'), deleteClient);

module.exports = router;
