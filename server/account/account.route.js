const express = require("express");
const passportService = require("../services/passport.services");
const passport = require("passport");
const router = express.Router();
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", {
	session: false
});
const accountControllers = require("./account.controller");

router.post("/register", accountControllers.register);
router.post("/login", requireLogin, accountControllers.login);
router.post("/single-account-info", accountControllers.singleAccountInfo);

module.exports = router;
