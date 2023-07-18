const { STATUS_CODE } = require('./constants');

function handleError(error, res) {
  if (error.code === 11000 || error.name === 'MongoServerError') {
    // Duplicate key error
    const message = error.message || 'Duplicate key error';
    return res.status(STATUS_CODE.CONFLICT).json({ error: message });
  }

  if (error.name === 'ValidationError') {
    // Validation error
    const message = error.message || 'Validation error';
    return res.status(STATUS_CODE.BAD_REQUEST).json({ error: message });
  }

  if (error.name === 'CastError') {
    // Invalid ID error
    const message = 'Invalid ID';
    return res.status(STATUS_CODE.BAD_REQUEST).json({ error: message });
  }

  const statusCode = error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
  const message = error.message || 'An unexpected error occurred';

  res.status(statusCode).json({ error: message });
}

module.exports = {
  handleError,
};
