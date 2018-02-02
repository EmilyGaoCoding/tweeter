"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function isCookieValid(db, cookie) {

  const users = db.collection('users');

  users.find().toArray((err, results) => {
    results.forEach(result => {
      if (result === cookie) {
        return true;
      } return false;
    });
  })
    
};