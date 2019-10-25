const express = require("express");
const controllers = require("./researcher.controller");
<<<<<<< HEAD
const { auth, researcherAccess } = require("../middleware/role");
const router = express.Router();

router.post("/submitQuestions", [auth, researcherAccess], controllers.submitQuestions);
=======
const submitAccess = require("../middleware/submitQuesAccessibility");
const router = express.Router();

router.post("/submitQuestions", submitAccess, controllers.submitQuestions);
>>>>>>> 601d1ad97d9ad3652e028373cf9888e0f444b5be
router.post("/login", controllers.login);

module.exports = router;
