require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./logger');

const connect = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URL);
    logger.info(`Se conecto a la BD: ${process.env.MONGO_URL}`);
  } catch (error) {
    logger.error(
      `Ocurrio un erro al conectar a la base de datos - ${JSON.stringify(
        error,
      )}`,
    );
    process.exit(1);
  }
};

module.exports = connect;
