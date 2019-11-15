const ErrorResponse = require('../utils/errorResponse');
const logger = require('../../config/logger');

const errorHandler = (err, req, res, next) => {
  // let error = err;
  let error = { ...err };
  error.message = err.message; // confused. It works when ID is invalid
  // Log to console for dev
  logger.error(error);

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose bad objectID
  if (error.name === 'CastError') {
    const message = `Resource not found with ID of ${error.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal server error'
  });
};

module.exports = errorHandler;
