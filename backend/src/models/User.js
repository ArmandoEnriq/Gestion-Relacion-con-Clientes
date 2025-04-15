const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize para definir los tipos de datos de las columnas
// Importa la instancia de Sequelize configurada (conexión a la BD)
const sequelize = require('../config/database');

// Define el modelo User usando sequelize.define()
// Primer parámetro: nombre del modelo ('User')
// Segundo parámetro: objeto con definición de columnas
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING, // Tipo de dato: STRING (VARCHAR en SQL)
    allowNull: false // No permite valores null (campo obligatorio)
  },
  email: {
    type: DataTypes.STRING,
    unique: true, // Valor único (no se permiten duplicados)
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'employee', 'manager'), // ENUM: solo permite estos valores
    defaultValue: 'employee' // Valor por defecto si no se especifica
  }
});

module.exports = User;
