const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
  format: format.combine(
    format.colorize(),
    format.simple(),
  ),
  transports: [
    new transports.Console({
      level: 'debug',
    }),
  ],
});
