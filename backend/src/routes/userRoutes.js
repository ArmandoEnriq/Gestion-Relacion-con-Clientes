const express = require('express'); // Importa el framework Express para crear rutas
const router = express.Router();  // Crea un nuevo enrutador de Express. Esto nos permite definir rutas específicas para proyectos
const { getAllEmployees,updateEmployee,deleteEmployee } = require('../controllers/userController'); // Controladores de las rutas
const auth = require('../middlewares/authMiddleware'); //Intermediario para verificar que sea autenticado
const authorizeRoles = require('../middlewares/roleMiddleware');

router.use(auth);
router.use(authorizeRoles('admin'));

router.get('/', getAllEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
