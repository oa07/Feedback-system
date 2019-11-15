const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = (req, res, next) => {
  let accessToken;
  let hasMultiplePlaces = false;
  const HEADER_AUTHORIZATION_KEY = 'Bearer';
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === HEADER_AUTHORIZATION_KEY) {
      if (accessToken) {
        hasMultiplePlaces = true;
      }
      accessToken = parts[1];
    } else {
      return res.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Bad HTTP authentication header format'
      });
    }
  }
  if (hasMultiplePlaces) {
    return res.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message:
        'RFC6750 states the access_token MUST NOT be provided in more than one place in a single request'
    });
  }
  if (accessToken) {
    jwt.verify(accessToken, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          statusCode: 401,
          error: 'Unauthorized',
          message: err.message
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'No token provided'
    });
  }
};
