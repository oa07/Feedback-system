const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const helmet = require("helmet");
const passport = require("passport");
const config = require("./config");
const routes = require("../index.routes");

const app = express();
if (config.env === "development") app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(passport.initialize());

app.use("/api/v1/", routes);

module.exports = app;
