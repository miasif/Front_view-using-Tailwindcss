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

// //Session store
// let mongoStore = new MongoDbStore({
//   mongooseConnection: connect,
//   collcetion: "sessions",
// });

// //Session config
// app.use(
//   session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     mongoStore,
//     saveUniitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//   })
// );
app.use(flash());

// Assets
app.use(express.static("public"));

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
