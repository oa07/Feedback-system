const express = require("express");
const controllers = require("./account.controller");
const router = express.Router();

router.post("/register", controllers.register);

module.exports = router;
