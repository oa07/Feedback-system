const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { AccountModel } = require('./account.model');
const config = require('../../config/config');
const logger = require('../../config/logger');

const {
  signupDataValidation,
  loginDataValidation
} = require('./account.validation');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

module.exports.register = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const { error } = signupDataValidation(data);
  if (error)
    return next(new ErrorResponse(error.details.map(err => err.message), 400));

  const { role } = data;
  if (role !== 'admin' && role !== 'researcher' && role !== 'audience') {
    return next(
      new ErrorResponse(
        `Choose role between "admin", "researcher" & "audience"`,
        400
      )
    );
  }
  let user = await AccountModel.findOne({ email: data.email }).select([
    '-password'
  ]);
  if (user) return next(new ErrorResponse(`Email already Exists`, 400));

  user = await AccountModel.findOne({ phoneNumber: data.phoneNumber }).select([
    '-password'
  ]);
  if (user) return next(new ErrorResponse(`Phone Number already Exists`, 400));

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = new AccountModel({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    role: data.role,
    password: hashedPassword
  });
  await newUser.save();
  newUser.password = undefined;
  return res.status(201).json({
    success: true,
    message: 'Registration Successful',
    user: newUser
  });
});

module.exports.login = asyncHandler(async (req, res, next) => {
  const { error } = loginDataValidation(req.body);
  if (error)
    return next(new ErrorResponse(error.details.map(err => err.message), 400));

  // Big Bug (O_O)
  const payLoad = {
    email: req.user
  };

  const accessToken = jwt.sign(payLoad, config.jwtSecret, {
    expiresIn: '100d'
  });
  return res.json({ success: true, accessToken });
});

// GET /auth/allUserInfo
// only admin can access this page..
module.exports.singleAccountInfo = asyncHandler(async (req, res) => {
  const users = await AccountModel.find().select(['-password']);
  return res.status(200).json({ users });
});

// DELETE /auth/deleteAccount
// protected route
module.exports.deleteAccount = asyncHandler(async (req, res) => {
  await AuthModel.findByIdAndDelete({ _id: req.user._id });
  req.user = undefined;
  return res.status(200).json({
    message: 'account Deleted Successfully'
  });
});
