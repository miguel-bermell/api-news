require('dotenv').config();
require('./config/mongo');
const path = require('path');
const express = require('express');

const app = express();
const cors = require('cors');

const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares');
const logger = require('./utils/logger');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

module.exports = { app, server };
