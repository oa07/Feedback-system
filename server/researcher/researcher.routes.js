const express = require('express');
const controllers = require('./researcher.controllers');

const router = express.Router();

router.post('/submitQuestions', controllers.submitQuestions);

module.exports = router;