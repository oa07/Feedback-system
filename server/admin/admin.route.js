const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.services');
const router = express.Router();
const { auth, adminAccess } = require('../middleware/role');
const adminControllers = require('./admin.controller');

router.get(
  '/show-all-question-set',
  [auth, adminAccess],
  adminControllers.allQuestionsSet
);

router.get(
  '/answer-of-audience',
  [auth, adminAccess],
  adminControllers.seeResponsesInAParticularQuestionSet
);

router.get(
  '/disapproved-audience',
  [auth, adminAccess],
  adminControllers.seeDisapprovedUsers
);

router.post(
  '/promotionalMailToUsers',
  [auth, adminAccess],
  adminControllers.promotionalMailToUsers
);

router.get(
  '/disapprovedQuestionSets',
  [auth, adminAccess],
  adminControllers.disapprovedQuestionSets
);

router.get(
  '/disapprovedAnswers',
  [auth, adminAccess],
  adminControllers.disapprovedAnswers
);

router.get(
  '/topResponse',
  [auth, adminAccess],
  adminControllers.top200AudienceInAQuestionSet
);
module.exports = router;
