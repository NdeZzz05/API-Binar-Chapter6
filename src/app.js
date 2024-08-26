require("dotenv").config();
require("./config/sentry");
const Sentry = require("@sentry/node");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
const INDEX_ROUTES = require("./routes/index");
const ERROR_HANDLER = require("./middleware/errorHandling.middleware");
const NOT_FOUND_HANDLER = require("./middleware/notFoundHandling.middleware");
const cors = require("cors");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(INDEX_ROUTES);
Sentry.setupExpressErrorHandler(app);
app.use(NOT_FOUND_HANDLER);
app.use(ERROR_HANDLER);

module.exports = app;
