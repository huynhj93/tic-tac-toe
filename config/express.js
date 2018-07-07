const express = require('express');
const bodyParser = require('body-parser');
const logger =  require('morgan');

const routes = require('../server/routes');

const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/', routes);

app.use((err, req, res, next) => {
  return res.status(err.status).send(`\nStatusCode ${err.status}: ${err.message} \n`);
});
module.exports = app;