const { Sequelize } = require('sequelize');
require('dotenv').config();

// Crea una nueva instancia de Sequelize para la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST, // Host donde está alojada la base de datos
    dialect: 'postgres', // Tipo de base de datos (PostgreSQL)
    port: process.env.DB_PORT // Puerto de conexión a la base de datos
  }
);

module.exports = sequelize;
