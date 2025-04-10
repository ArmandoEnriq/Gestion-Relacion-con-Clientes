//Para ejecutarlo debemos estar en su ruta y con node .\swagger-setup.js
const swaggerAutogen = require('swagger-autogen')(); // Importa el módulo swagger-autogen para generar documentación Swagger/OpenAPI

// Objeto de configuración para la documentación Swagger
const doc = {
  // Sección de información básica sobre la API
  info: {
    title: 'My API',  // Título de la API
    description: 'Documentación profesional de la API CRM', // Descripción general
  },
  host: 'localhost:4000/api', // Host donde se aloja la API 
  schemes: ['http'], // Protocolos soportados (http y/o https)
  // Definiciones de seguridad para la API
  securityDefinitions: {
    bearerAuth: { // Configura autenticación por token Bearer
      type: 'http', // Tipo de esquema de autenticación
      scheme: 'bearer', // Esquema específico (en este caso, Bearer token)
      bearerFormat: 'JWT' // Formato del token (JWT en este caso)
    }
  }
};

// Ruta donde se guardará el archivo JSON de salida con la documentación generada
const outputFile = './swagger-output.json';
// Array con las rutas de los archivos que contienen los endpoints a documentar
const endpointsFiles = ['../routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // Callback que se ejecuta cuando la generación ha terminado
  console.log('Documentación Swagger generada correctamente');
});