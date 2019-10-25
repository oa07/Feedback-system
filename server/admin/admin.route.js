const express = require("express");
const passportService = require("../services/passport.services");
const passport = require("passport");
const router = express.Router();
const { auth, adminAccess } = require("../middleware/role");
const adminControllers = require("./admin.controller");

router.get(
	"/show-question-set",
	[auth, adminAccess],
	adminControllers.allQuestionsSet
);

module.exports = router;
