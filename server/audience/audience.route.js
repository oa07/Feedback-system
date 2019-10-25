const express = require("express");
const controllers = require('./audience.controller');
const { auth, audienceAccess } = require("../middleware/role");

const router = express.Router();

console.log('hi');
router.get('/showListOfQuestions', [auth, audienceAccess], controllers.showListOfQuestions);
router.post('/rateQuestionList', [auth, audienceAccess], controllers.rateQuestionList);
module.exports = router;
