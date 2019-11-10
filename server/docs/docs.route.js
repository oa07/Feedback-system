const express = require("express");
const passportService = require("../services/passport.services");
const passport = require("passport");
const router = express.Router();

const docsControllers = require("./docs.controller");

router.get(
	"/api",
	docsControllers.docsView
);

module.exports = router;
