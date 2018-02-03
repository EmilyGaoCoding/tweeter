"use strict";

// Basic express and dependencies setup:
const PORT          = 8080;
const express       = require("express");
const app           = express();
app.use(express.static("public"));

const bodyParser    = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],
  maxAge: 24 * 60 * 60 * 1000
}));

const bcrypt      = require('bcrypt');

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  } console.log(`Connected to mongodb: ${MONGODB_URI}`);
  
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // require routes files
  const loginRoutes = require('./routes/login')(db);
  const navRoutes = require("./routes/nav")(db);
  const registerRoutes = require('./routes/register')(db);
  const tweetsRoutes = require("./routes/tweets")(db, DataHelpers);

  // direct routes
  app.use("/login", loginRoutes);
  app.use("/nav", navRoutes);
  app.use("/register", registerRoutes);
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});