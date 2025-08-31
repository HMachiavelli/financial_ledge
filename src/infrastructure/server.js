const express = require('express');
const { setupRoutes } = require('./routes');

const app = express();

app.use(express.json());

setupRoutes(app);

module.exports = app;
