const Client = require('../models/Client'); // Modelo de clientes de Sequelize

const createClient = async (req, res) => { // Funcion para crear clientes
  try {
    const { name, email, phone, company, notes } = req.body; // Extrae datos del cuerpo de la petición
    const client = await Client.create({ // Crea al cliente en la base de datos 
      name,
      email,
      phone,
      company,
      notes,
      createdBy: req.user.id
    });
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear cliente', details: err.message });
  }
};

const getClients = async (req, res) => { // Funcion para obtener todos los clientes
  try {
    const clients = await Client.findAll({ where: { createdBy: req.user.id } }); // Filtra por el ID del usuario logueado
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clientes', details: err.message });
  }
};

const getClientById = async (req, res) => {// Funcion para obtener clientes por id
  try {
    const client = await Client.findOne({ where: { id: req.params.id, createdBy: req.user.id } }); // Busca un cliente con el ID y usuario especificados
    if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener cliente', details: err.message });
  }
};

const updateClient = async (req, res) => { // Funcion para actualizar clientes 
  try {
    const updated = await Client.update(req.body, {
      where: { id: req.params.id, createdBy: req.user.id } // Actualiza el cliente SOLO si coincide con el ID y usuario
    });
    if (updated[0] === 0) return res.status(404).json({ error: 'Cliente no encontrado o sin permisos' });
    res.json({ message: 'Cliente actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cliente', details: err.message });
  }
};

const deleteClient = async (req, res) => { // Funcion para Borrar clientes
  try {
    const deleted = await Client.destroy({ where: { id: req.params.id, createdBy: req.user.id } }); // Elimina el cliente SOLO si coincide con el ID y usuario
    if (!deleted) return res.status(404).json({ error: 'Cliente no encontrado o sin permisos' }); 
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar cliente', details: err.message });
  }
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
};
