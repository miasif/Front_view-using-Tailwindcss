require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoSessionStore = require("connect-mongodb-session")(session);
const passport = require("passport");

// Database connection

mongoose.connect("mongodb://localhost/foodApp", function (err, db) {
  if (err) {
    console.log(
      "Unable to connect to the server. Please start the server. Error:",
      err
    );
  } else {
    console.log("Connected to Server successfully!");
  }
});

//session store
const MongoDBStore = new MongoSessionStore({
  uri: "mongodb://localhost/foodApp",
  collection: "sessions",
});

app.use(
  session({
    secret: "COOKIE_SECRET",
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore,
  })
);
// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Assets
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
//Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
//template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`Listening on port xyz http://localhost:${PORT}`);
});
