const express = require('express');
const controllers = require('./researcher.controller');
const { auth, researcherAccess } = require('../middleware/role');

const router = express.Router();

router.post(
  '/submitQuestions',
  [auth, researcherAccess],
  controllers.submitQuestions
);

router.get(
  '/seeAudienceReview',
  [auth, researcherAccess],
  controllers.seeAudienceReview
);

router.get(
  '/seeValidAudienceReview',
  [auth, researcherAccess],
  controllers.seeValidAudienceReview
);

router.get(
  '/topAudienceInQuestionSet',
  [auth, researcherAccess],
  controllers.top200AudienceInAQuestionSet
);

router.get(
  '/totalQuesSetCount',
  [auth, researcherAccess],
  controllers.totalQuesSetCount
);

router.get(
  '/analysisReport',
  [auth, researcherAccess],
  controllers.analysisReport
);

router.get(
  '/filterBasedOnTag',
  [auth, researcherAccess],
  controllers.filterBasedOnTag
);

module.exports = router;
