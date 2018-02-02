// "use strict";

// const express       = require('express');
// const registerRoutes  = express.Router();

// module.exports = function() {
  
//   registerRoutes.post("/", function(req, res) {
//     if (!req.body.text) {
//       res.status(400).json({ error: 'invalid request: no data in POST body'});
//       return;
//     }
    
//     const users = db.collection('users');
//     users.find().toArray((err, results) => {
//       if (err) throw err;
      
//       results.forEach(user => {
//         if (user.user_name === req.body.text) {
//           res.status(400).json({ body: 'Username already exists. Please log in or choose another username.'});
//           return;
//         }
//       };
      
//       const user = {
//         user_name: req.body.text
//       }
//       users.insertOne(user);
//     });
//   });

// return registerRoutes;

// }