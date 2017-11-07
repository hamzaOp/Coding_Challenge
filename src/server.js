// @flow
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const favicon = require("serve-favicon");
const routes = require("./router/router");
const setUpPassport = require("./middlewares/passport");

mongoose.Promise = global.Promise;

const app = express();
app.use(favicon(path.join(__dirname, "../public/images", "favicon.ico")));
mongoose.connect(process.env.DB_URL, { useMongoClient: true });
setUpPassport();

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "..", "/public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "qgJHw9tLa08oVIuMefHu", // Random string
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// $FlowFixMe
app.use((req, res) => {
  res.status(404).send("Can't find that!");
});

app.listen(app.get("port"), () => {
  // $FlowFixMe
  console.log(`Server started on port ${app.get("port")}`);
});
