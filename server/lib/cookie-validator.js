"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function isCookieValid(db, cookie) {

  const users = db.collection('users');

  users.find().toArray((err, results) => {

    for (let i = 0; i < results.length; i++) {
      if (results[i] === cookie) {
        return true;
      }
    }

    return false;

  });
    
};