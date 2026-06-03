import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'Levannel API',
      version: '1.0.0',
      description:
        'API REST de gestion d’agence de voyage développée avec Node.js, Express, TypeScript et PostgreSQL.',
    },

    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
      {
        url: 'https://levanel-api.onrender.com',
        description: 'Production Server',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    './src/routes/*.ts',
    './dist/routes/*.js',
  ],
};

export const swaggerSpec =
  swaggerJsdoc(options);

export { swaggerUi };