const express = require('express'); // Importa el framework Express para crear rutas
const router = express.Router();  // Crea un nuevo enrutador de Express. Esto nos permite definir rutas específicas para proyectos
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController'); // Controladores de las rutas
const auth = require('../middlewares/authMiddleware'); //Intermediario para verificar que sea autenticado

router.use(auth);

router.post('/', createProject);
router.get('/', getProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
