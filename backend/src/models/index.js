const sequelize = require('../config/database'); // tu instancia de Sequelize

// Modelos
const User = require('./User');
const Client = require('./Client');
const Project = require('./Proyect');

// Relaciones

// Usuario crea muchos clientes
User.hasMany(Client, { foreignKey: 'createdBy', onDelete: 'CASCADE' }); // Estableemos que un usuario puede tener varios clientes le creamos una llave foranea que referencia al usuario que lo creo y onDelete: 'CASCADE': Si se elimina un usuario, todos sus clientes se eliminarán
Client.belongsTo(User, { foreignKey: 'createdBy' }); // Lado inverso cada cliente solo puede tener un usuario usa la misma llave foranea

// Cliente tiene muchos proyectos
Client.hasMany(Project, { foreignKey: 'clientId', onDelete: 'CASCADE' }); // Estableemos que un cliente puede tener varios proyectos le creamos una llave foranea que referencia al cliente y onDelete: 'CASCADE': Si se elimina un cliente, todos sus proyectos se eliminarán
Project.belongsTo(Client, { foreignKey: 'clientId' }); // Lado inverso un proyecto solo puede tener un usuario y usa la misma llave foranea

// Puedes agregar más relaciones aquí (por ejemplo con Tareas después)

// Exportar todo
module.exports = {
  sequelize,
  User,
  Client,
  Project
};
