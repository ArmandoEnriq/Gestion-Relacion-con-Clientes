const express = require('express'); // Importa el framework Express para crear rutas
const auth = require('../middlewares/authMiddleware');
const {createClient,getClients,getClientById,updateClient,deleteClient} = require('../controllers/clientController');

const router = express.Router();

router.use(auth); // proteger todas las rutas de abajo

router.post('/', createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
