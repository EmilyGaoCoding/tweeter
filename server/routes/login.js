"use strict";

const bcrypt          = require('bcrypt');
const express         = require('express');
const app             = express();
const loginRoutes     = express.Router();
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
  
  loginRoutes.post("/", function(req, res) {

    const users = db.collection('users');

    users.find().toArray((err, results) => {
      if (err) throw err;
  
      for (let i = 0; i < results.length; i++) {
        if (bcrypt.compareSync(req.body.login, results[i].user_name)) {
          req.session.cookie = results[i].user_name;
          return res.json({ body: "awesome, you're logged in" });
        }
      }

      return res.json({ body: "it's not a valid username" });
      
    });
    
  });
    
  return loginRoutes;
  
}