"use strict";

const express       = require('express');
const navRoutes  = express.Router();
const cookieValidator = require('../lib/cookie-validator');

module.exports = function() {
  
  navRoutes.get("/", function(req, res) {

    if (!req.session.cookie || !cookieValidator(req.session.cookie)) {
      res.json({ body: 'register/login'});
      return;
    } else if (cookieValidator(req.session.cookie)) {
      res.json({ body: 'compose/logout'});
    };
  });

  return navRoutes;
}