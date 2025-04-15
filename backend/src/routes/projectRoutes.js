const express = require('express'); // Importa el framework Express para crear rutas
const router = express.Router();  // Crea un nuevo enrutador de Express. Esto nos permite definir rutas específicas para proyectos
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController'); // Controladores de las rutas
const auth = require('../middlewares/authMiddleware'); //Intermediario para verificar que sea autenticado
const authorize = require('../middlewares/roleMiddleware');

router.use(auth);

router.post('/',authorize('admin','manager'), createProject);
router.get('/',authorize('admin','manager'), getProjects);
router.put('/:id',authorize('admin','manager'), updateProject);
router.delete('/:id',authorize('admin','manager'), deleteProject);

module.exports = router;
