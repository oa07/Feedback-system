const express = require("express");
const controllers = require("./researcher.controller");
const { auth, researcherAccess } = require("../middleware/role");
const router = express.Router();

router.post(
	"/submitQuestions",
	[auth, researcherAccess],
	controllers.submitQuestions
);

router.get('/seeAudienceReview',
	[auth, researcherAccess],
	controllers.seeAudienceReview
)

module.exports = router;
