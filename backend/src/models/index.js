const sequelize = require('../config/database'); // tu instancia de Sequelize

// Modelos
const User = require('./User');
const Client = require('./Client');
const Project = require('./Proyect');
const Task = require('./Task');

// Relaciones

// Usuario crea muchos clientes
User.hasMany(Client, { foreignKey: 'createdBy', onDelete: 'CASCADE' }); // Estableemos que un usuario puede tener varios clientes le creamos una llave foranea que referencia al usuario que lo creo y onDelete: 'CASCADE': Si se elimina un usuario, todos sus clientes se eliminarán
Client.belongsTo(User, { foreignKey: 'createdBy', onDelete: 'CASCADE' }); // Lado inverso cada cliente solo puede tener un usuario usa la misma llave foranea

// Cliente tiene muchos proyectos
Client.hasMany(Project, { foreignKey: 'clientId', onDelete: 'CASCADE' }); // Estableemos que un cliente puede tener varios proyectos le creamos una llave foranea que referencia al cliente y onDelete: 'CASCADE': Si se elimina un cliente, todos sus proyectos se eliminarán
Project.belongsTo(Client, { foreignKey: 'clientId', onDelete: 'CASCADE' }); // Lado inverso un proyecto solo puede tener un usuario y usa la misma llave foranea

// Proyecto tiene muchas tareas
Project.hasMany(Task, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId', onDelete: 'CASCADE' });

// usuario tiene muhas tareas
User.hasMany(Task, { foreignKey: 'assignedTo', onDelete: 'SET NULL' });
Task.belongsTo(User, { foreignKey: 'assignedTo',onDelete: 'SET NULL' });

// Puedes agregar más relaciones aquí 

// Exportar todo
module.exports = {
  sequelize,
  User,
  Client,
  Project,
  Task
};
