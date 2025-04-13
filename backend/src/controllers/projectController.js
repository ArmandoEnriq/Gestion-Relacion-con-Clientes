const { Project, Client } = require('../models');
const createError = require('http-errors'); // Creador de errores que podemos manejar

// Crear proyecto
const createProject = async (req, res, next) => {
  try {
    const { name, description, status, startDate, endDate, clientId } = req.body;

    // Validar que el cliente exista y pertenezca al usuario
    const client = await Client.findOne({
      where: { id: clientId, createdBy: req.user.id }
    });
    if (!client)  throw createError(404,'Cliente no encontrado o no autorizado') // return res.status(404).json({ error: 'Cliente no encontrado o no autorizado' });

    const project = await Project.create({
      name, description, status, startDate, endDate, clientId
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

// Obtener todos los proyectos del usuario
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      include: {
        model: Client,
        where: { createdBy: req.user.id },
        attributes: ['name', 'company']
      }
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// Actualizar proyecto
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: { model: Client, attributes: ['createdBy'] }
    });

    if (!project || project.Client.createdBy !== req.user.id) {
      throw createError(403,'No autorizado') // return res.status(403).json({ error: 'No autorizado' });
    }

    await project.update(req.body);
    res.json(project);
  } catch (err) {
    next(err)
  }
};

// Eliminar proyecto
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: { model: Client, attributes: ['createdBy'] }
    });

    if (!project || project.Client.createdBy !== req.user.id) {
        throw createError(403,'No autorizado') // return res.status(403).json({ error: 'No autorizado' });
    }

    await project.destroy();
    res.json({ message: 'Proyecto eliminado' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject
};
