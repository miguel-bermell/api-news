const mongoose = require('mongoose');

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;
const { TEST } = require('../utils/constants');
const logger = require('../utils/logger');

const connectionString = NODE_ENV === TEST
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI;

mongoose.connect(connectionString)
  .then(() => {
    logger.info('Connected to MongoDB');
  }).catch((err) => {
    logger.error(err);
  });

process.on('uncaughtException', (error) => {
  logger.error(error);
  mongoose.disconnect();
});
