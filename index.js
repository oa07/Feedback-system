const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./config/express');

mongoose.connect(
  config.mongodbHost,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('connected to db!')
);
app.listen(config.port, () =>
  console.log(`Server is running on ${config.port}`)
);

module.exports = app;
