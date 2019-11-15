const express = require('express');
const controllers = require('./audience.controller');
const { auth, audienceAccess } = require('../middleware/role');

const router = express.Router();

router.get(
  '/showListOfQuestions',
  [auth, audienceAccess],
  controllers.showListOfQuestions
);
router.post(
  '/rateQuestionList',
  [auth, audienceAccess],
  controllers.rateQuestionList
);
router.post(
  '/answerQuestions/:questionSetID',
  [auth, audienceAccess],
  controllers.answerQuestions
);

router.get(
  '/userReached/:questionSetID',
  [auth, audienceAccess],
  controllers.userReached
);

router.get('/seeResponse', [auth, audienceAccess], controllers.seeResponse);

router.put(
  '/updateResponse/:responseID',
  [auth, audienceAccess],
  controllers.updateResponse
);
module.exports = router;
