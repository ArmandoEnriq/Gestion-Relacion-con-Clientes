const Client = require('../models/Client'); // Modelo de clientes de Sequelize
const createError = require('http-errors'); // Creador de errores que podemos manejar
const { Op } = require('sequelize'); // Op contiene operadores especiales que Sequelize utiliza para crear consultas más complejas y expresivas con SQL.

const createClient = async (req, res) => { // Funcion para crear clientes
  try {
    const { name, email, phone, company, notes } = req.body; // Extrae datos del cuerpo de la petición
    // Si es un admin, se permite cualquier usuario a cualquier empleado
    const createdBy = req.user.role === 'admin' ? req.body.createdBy : req.user.id; 

    const client = await Client.create({ // Crea al cliente en la base de datos 
      name,
      email,
      phone,
      company,
      notes,
      createdBy: req.user.name //Cambiamos id por name
    });
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};

//Obtener usuarios por medio de filtros
const getClients = async (req, res) => {
  try {
    const { name, company, limit, offset, order, direction } = req.query;

     const where = req.user.role === 'admin' 
      ? {} // Admin puede ver todos los clientes
      : { createdBy: req.user.id }; // Usuarios normales solo ven los suyos

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` }; // Op.iLIKE para comparacion insensible a mayúsculas/minúsculas y Los % son comodines en SQL que significan "cualquier secuencia de caracteres" "alberto" "juan alberto" "albertosanchez"
    }

    if (company) {
      where.company = { [Op.iLike]: `%${company}%` };
    }

    // Validar campos de orden permitidos
    const allowedOrderFields = ['name', 'company', 'createdAt'];
    let orderClause;

    if (order && allowedOrderFields.includes(order)) { // verificamos que los campos sean los permitidos
      orderClause = [[order, direction?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']]; // Especifica que campo de la consulta y en que orden con condicion que si es asc y cambias a desc
    }

    const clients = await Client.findAll({
      where,
      limit: limit ? parseInt(limit) : undefined, // Si especificaron limit lo convertimos a numero
      offset: offset ? parseInt(offset) : undefined,
      order: orderClause // Verificamos el orden establecido
    });

    res.json(clients); //mostramos el resultado en json
  } catch (err) {
    next(err)
  }
};

const getClientById = async (req, res) => {// Funcion para obtener clientes por id
  try {
    const client = await Client.findOne({ where: req.user.role==='admin' ?{id:req.params.id} : { id: req.params.id, createdBy: req.user.id } }); // Si es admin puede ver cualquiera y sino Busca un cliente con el ID y usuario especificados
    if (!client) throw createError(404,'Cliente no encontrado') //Modificado return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(client);
  } catch (err) {
    next(err);
  }
};

const updateClient = async (req, res) => { // Funcion para actualizar clientes 
  try {
    const updated = await Client.update(req.body, {
      where: req.user.role === 'admin'
        ? { id: req.params.id } // Admin puede actualizar cualquier cliente
        : { id: req.params.id, createdBy: req.user.id } // Usuario solo puede actualizar los suyos 
    });
    if (updated[0] === 0) throw createError(404,'Cliente no encontrado o sin permiso') //return res.status(404).json({ error: 'Cliente no encontrado o sin permisos' });
    res.json({ message: 'Cliente actualizado' });
  } catch (err) {
    next(err);
  }
};

const deleteClient = async (req, res) => { // Funcion para Borrar clientes
  try {
    const deleted = await Client.destroy({ where: req.user.role === 'admin' ? { id: req.params.id } : { id: req.params.id, createdBy: req.user.id } }); // Si es admin puede eliminar a cualquier y sino Elimina el cliente SOLO si coincide con el ID y usuario
    if (!deleted) throw createError(404,'Cliente no encontrado') //return res.status(404).json({ error: 'Cliente no encontrado o sin permisos' }); 
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
};
