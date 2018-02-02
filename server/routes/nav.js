"use strict";

const express       = require('express');
const navRoutes  = express.Router();
const cookieValidator = require('../lib/cookie-validator');

module.exports = function(db) {
  
  navRoutes.get("/", function(req, res) {

    if (!req.session.cookie || !cookieValidator(db, req.session.cookie)) {
      res.json({ body: 'register/login' });
      return;
    } else if (cookieValidator(db, req.session.cookie)) {
      // res.json({ body: 'compose/logout' });
    };
  });

  return navRoutes;
}