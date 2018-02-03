"use strict";

const express         = require('express');
const app             = express();
const tweetsRoutes    = express.Router();
const bcrypt          = require('bcrypt');
const cookieValidator = require('../lib/cookie-validator');

module.exports = function(db, DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    const users = db.collection('users');

    if (!req.session.cookie || !cookieValidator(db, req.session.cookie)) {
      return res.json({ error: 'please log in first to tweet.'});
    } else if (cookieValidator(db, req.session.cookie)) {

      if (!req.body.text) {
        return res.json({ error: 'invalid request: no data in POST body'});
      }

      const tweet = {
        user: req.session.cookie,
        content: {
          text: req.body.text,
        },
        created_at: Date.now()
      };

      DataHelpers.saveTweet(tweet, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).send();
        }
      });

    }

  });

  return tweetsRoutes;

}