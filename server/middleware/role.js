const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const logger = require('../../config/logger');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

module.exports.auth = asyncHandler(async (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const access_token = bearerHeader.split(' ')[1];
    const tokenData = await jwt.verify(access_token, config.jwtSecret);
    req.user = tokenData.email;
    next();
  } else {
    return next(new ErrorResponse(`please login first`, 401));
  }
});

module.exports.researcherAccess = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'researcher') {
    logger.info(
      `${req.user.role} | name: ${req.user.name} | id: ${req.user._id}`
    );
    next();
  } else {
    return next(new ErrorResponse(`no permission to access this page`, 401));
  }
});

module.exports.audienceAccess = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'audience') {
    logger.info(
      `${req.user.role} | name: ${req.user.name} | id: ${req.user._id}`
    );
    next();
  } else {
    return next(new ErrorResponse(`no permission to access this page`, 401));
  }
});

module.exports.adminAccess = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'admin') {
    logger.info(
      `${req.user.role} | name: ${req.user.name} | id: ${req.user._id}`
    );
    next();
  } else {
    return next(new ErrorResponse(`no permission to access this page`, 401));
  }
});
