import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'Levannel API',
      version: '1.0.0',
      description:
        'API de gestion d’agence de voyage',
    },

    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
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
  },

  apis: [
    './src/routes/*.ts',
  ],
};

export const swaggerSpec =
  swaggerJsdoc(options);

export { swaggerUi };