const logger = require('../utils/logger');

// eslint-disable-next-line no-unused-vars
const logError = (err, req, res, next) => {
  logger.error(
    `${res.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`,
  );
};

module.exports = logError;
