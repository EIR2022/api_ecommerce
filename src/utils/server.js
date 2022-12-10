require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./logger');
const v1Router = require('../v1/routes/index');
const logError = require('../middlewares/errorHandling');

const createServer = () => {
  const app = express();

  app.set('port', process.env.PORT);
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use('/api/v1', v1Router);
  app.use(logError);

  return app;
};

module.exports = createServer;
