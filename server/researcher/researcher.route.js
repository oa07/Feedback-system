const express = require("express");
const controllers = require("./researcher.controller");
const submitAccess = require("../middleware/submitQuesAccessibility");
const router = express.Router();

router.post("/submitQuestions", submitAccess, controllers.submitQuestions);
router.post("/login", controllers.login);

module.exports = router;
