require("dotenv").config();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");
var favicon = require("serve-favicon");

var setUpPassport = require("./middlewares/passport");
var routes = require("./router/routes");
mongoose.Promise = global.Promise;

var app = express();
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

app.use(function(req, res, next) {
  res.status(404).send("Can't find that!");
});

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
