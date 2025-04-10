require('dotenv').config(); // Carga las variables de entorno definidas en el archivo .env
const express = require('express'); // Importa Express para crear el servidor web
const cors = require('cors'); // Importa CORS para permitir peticiones desde otros dominios
const sequelize = require('./config/database'); // Importa la conexión a la base de datos configurada en Sequelize
const clientRoutes = require('./routes/clientRoutes'); // Importa las rutas de clientes
const errorHandler = require('./middlewares/errorHandler'); //Manejador de errores globales
const cookieParser = require('cookie-parser'); //Uso de cookies 
const swaggerUi = require('swagger-ui-express'); // pagina grafica para swegger
const swaggerSpec = require('./docs/swagger'); // swegger creado manualmente
const swaggerDocument = require('./docs/swagger-output.json'); // swegger creado con swegger-auto


const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación
const app = express(); // Crea una instancia de la aplicación Express
const PORT = process.env.PORT || 4000; // Define el puerto, usando el de las variables de entorno o 4000 por defecto

app.use(cors({
  origin: 'http://localhost:5173', // Solo permitira solicitudes por este puerto normalmente react
  credentials: true // Permite el envío de cookies y headers de autenticación entre dominios
})); // Middleware para habilitar CORS (permite peticiones cruzadas)
app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones a JSON
app.use(cookieParser()); // Parsea las cookies incluidas en las peticiones HTTP
// Ruta para la documentación
app.use('/api/docs1', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Con swegger-auto
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Manual
// Rutas
app.use('/api/clients', clientRoutes); // Monta las rutas de clientes bajo el prefijo '/api/clients'
app.use('/api/auth', authRoutes); // Monta las rutas de autenticación bajo el prefijo '/api/auth'
// Ruta de errores
app.use(errorHandler); 

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