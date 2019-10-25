const express = require("express");
const controllers = require('./audience.controller');
const { auth, audienceAccess } = require("../middleware/role");

const router = express.Router();

router.get('/showListOfQuestions', [auth, audienceAccess], controllers.showListOfQuestions);
router.post('/rateQuestionList', [auth, audienceAccess], controllers.rateQuestionList);
router.post('/answerQuestions/:questionSetID/:numberOfQuestions', [auth, audienceAccess], controllers.answerQuestions);

module.exports = router;
