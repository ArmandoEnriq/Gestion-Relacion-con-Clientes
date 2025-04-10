// Awegger es una documentación interactiva de tu API. Te genera una página web donde puedes: Ver todos los endpoints de tu backend (GET, POST, PUT, DELETE, etc.). Saber qué parámetros necesita cada uno
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRM API',
      version: '1.0.0',
      description: 'Documentación profesional de la API CRM',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
        description: 'Servidor de desarrollo local',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        // Esquema de Cliente
        Client: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            company: { type: 'string' },
            notes: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        // Aquí podrías agregar otros esquemas, como por ejemplo de `User`, `Auth`, etc.
      },
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js'], // tus rutas van aquí
};

module.exports = swaggerJSDoc(options);
