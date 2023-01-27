const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const logger = require('../utils/logger');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'api-ecommerce',
      version: '1.0.0',
    },
  },
  apis: ['src/v1/routes/*', 'src/models/database/*'],
};

const swaggerSpec = swaggerJSDoc(options);

// eslint-disable-next-line no-unused-vars
const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  logger.info(`Documentacion V1 -> http://localhost:${port}/api/v1/docs`);
};

module.exports = { swaggerDocs };
