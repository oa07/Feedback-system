const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./config/express');
const logger = require('./config/logger');

const dbURI = config.env === 'test' ? config.mongoUrlTest : config.mongodbHost;

mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  () => logger.info('connected to database!')
);
app.listen(config.port, () =>
  logger.info(`Server is running on ${config.port}`)
);

module.exports = app;
