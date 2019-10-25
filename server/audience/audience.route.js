const express = require("express");
const controllers = require('./audience.controller');
const { auth, audienceAccess } = require("../middleware/role");

const router = express.Router();

console.log('hi');
router.get('/showListOfQuestions', [auth, audienceAccess], controllers.showListOfQuestions);

module.exports = router;
