const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize para definir los tipos de datos de las columnas
const sequelize = require('../config/database'); // Importa la instancia de Sequelize configurada (conexión a la BD)

// Define el modelo Client usando sequelize.define()
// Primer parámetro: nombre del modelo ('Client')
// Segundo parámetro: objeto con definición de columnas
const Client = sequelize.define('Client', {
  name: {
    type: DataTypes.STRING, // Tipo de dato: STRING (VARCHAR en SQL)
    allowNull: false // No permite valores null (campo obligatorio)
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  company: {
    type: DataTypes.STRING
  },
  notes: {
    type: DataTypes.TEXT // Tipo de dato: TEXT (TEXTO en SQL)
  },
  createdBy: {
    type: DataTypes.INTEGER, // Tipo de dato: INTEGER (Numeros con punto en SQL)
    allowNull: false
  }
});

module.exports = Client;
