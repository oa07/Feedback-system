const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.services');

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', {
  session: false
});
const accountControllers = require('./account.controller');
const { auth } = require('../middleware/role');
const authorize = require('../middleware/authorization.middleware');

router.post('/register', accountControllers.register);
router.post('/login', requireLogin, accountControllers.login);
router.get('/single-account-info', auth, accountControllers.singleAccountInfo);

module.exports = router;
