"use strict";

const bcrypt          = require('bcrypt');
const express         = require('express');
const app             = express();
const registerRoutes  = express.Router();
const bodyParser      = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const cookieSession   = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],
  maxAge: 24 * 60 * 60 * 1000
}));
const cookieValidator = require('../lib/cookie-validator');

module.exports = function(db) {
  
  registerRoutes.post("/", function(req, res) {

    const users = db.collection('users');

    users.find().toArray((err, results) => {

      for (let i = 0; i < results.length; i++) {
        if (bcrypt.compareSync(req.body.register, results[i].user_name)) {
          return res.json({ body: 'username taken' });
        };
      }
      
      const user_name = bcrypt.hashSync(req.body.register, 10);
      req.session.cookie = user_name;
      users.insert({ 'user_name': user_name });
      res.json({ body: 'username created' });
    });
    
  });
    
  return registerRoutes;
  
}