require('dotenv').config(); // Carga las variables de entorno definidas en el archivo .env
const express = require('express'); // Importa Express para crear el servidor web
const cors = require('cors'); // Importa CORS para permitir peticiones desde otros dominios
const sequelize = require('./config/database'); // Importa la conexión a la base de datos configurada en Sequelize
const clientRoutes = require('./routes/clientRoutes'); // Importa las rutas de clientes

const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación
const app = express(); // Crea una instancia de la aplicación Express
const PORT = process.env.PORT || 4000; // Define el puerto, usando el de las variables de entorno o 4000 por defecto

app.use(cors()); // Middleware para habilitar CORS (permite peticiones cruzadas)
app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones a JSON
// Rutas
app.use('/api/clients', clientRoutes); // Monta las rutas de clientes bajo el prefijo '/api/clients'
app.use('/api/auth', authRoutes); // Monta las rutas de autenticación bajo el prefijo '/api/auth'


// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API CRM funcionando 🚀');
});

// Sincroniza los modelos con la base de datos
sequelize.sync({ alter: true }).then(() => { // { alter: true } actualiza las tablas existentes sin borrar datos
  app.listen(PORT, () => {   // Una vez sincronizada la BD, inicia el servidor
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  // Manejo de errores si falla la conexión a la BD
  console.error('Error al conectar con la base de datos:', err);
});