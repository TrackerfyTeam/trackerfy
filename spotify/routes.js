const express = require('express');
const route = express.Router();
const home = require('./src/controllers/home');
const afterLogin = require('./src/controllers/afterLogin');
const { middlewareGlobal } = require('./src/middlewares/middleware');

route.get('/', home.login);
route.get('/callback', middlewareGlobal,  afterLogin.callback);

module.exports = route;