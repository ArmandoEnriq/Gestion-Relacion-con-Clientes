const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize para definir los tipos de datos de las columnas
const sequelize = require('../config/database'); // Importa la instancia de Sequelize configurada (conexión a la BD)

// Define el modelo Project usando sequelize.define()
// Primer parámetro: nombre del modelo ('Project')
// Segundo parámetro: objeto con definición de columnas
const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING, // Tipo de dato: STRING (VARCHAR en SQL)
    allowNull: false // No permite valores null (campo obligatorio)
  },
  description: {
    type: DataTypes.TEXT //Tipo de dato: TEXT 
  },
  status: {
    type: DataTypes.ENUM('activo', 'en pausa', 'completado'), // Tipo de dato definido en solo 3 instancias
    defaultValue: 'activo' // Valor por defecto 'activo'
  },
  startDate: {
    type: DataTypes.DATEONLY //Tipo de dato fecha
  },
  endDate: {
    type: DataTypes.DATEONLY 
  }
});

module.exports = Project;
