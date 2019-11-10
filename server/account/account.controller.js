const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { AccountModel } = require('./account.model');
const config = require('../../config/config');
const {
  signupDataValidation,
  loginDataValidation
} = require('./account.validation');

/*
  HTTP Status Codes
  https://www.restapitutorial.com/httpstatuscodes.html
  200 => OK
  400 => Bad Request
  404 => Not Found
  406 => Not Acceptable
*/
module.exports.register = async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = signupDataValidation(data);
    if (error)
      return res.status(400).json(error.details.map(err => err.message));
    const { role } = data;
    if (role !== 'admin' && role !== 'researcher' && role !== 'audience') {
      return res.status(400).json({
        message: 'Choose designation between "admin", "researcher" & "audience"'
      });
    }
    let user = await AccountModel.findOne({ email: data.email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: 'Email already Exists' });
    // console.log(data, user);
    user = await AccountModel.findOne({ phoneNumber: data.phoneNumber });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: 'Phone Number already Exists' });
    // console.log(data, user);

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
    return res.status(200).json({
      success: true,
      message: 'Registration Successful',
      user: newUser
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Testing DONE
// POST /auth/login
// input => email, password
module.exports.login = async (req, res, next) => {
  try {
    const { error } = loginDataValidation(req.body);
    if (error)
      return res.status(400).json(error.details.map(err => err.message));
    const payLoad = {
      email: req.user
    };
    const accessToken = jwt.sign(payLoad, config.jwtSecret, {
      expiresIn: '100d'
    });
    return res.json({ success: true, accessToken });
  } catch (error) {
    next(error);
  }
  next();
};

// GET /auth/allUserInfo
// only admin can access this page..
module.exports.singleAccountInfo = async (req, res) => {
  try {
    const users = await AccountModel.find();
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// DELETE /auth/deleteAccount
// protected route
module.exports.deleteAccount = async (req, res) => {
  try {
    await AuthModel.findByIdAndDelete({ _id: req.user._id });
    req.user = undefined;
    return res.status(200).json({
      message: 'account Deleted Successfully'
    });
    // No logout needed. because there is no user correspondent to the jwt_token.
    // So, just redirect to the login page.
  } catch (err) {
    return res.status(500).json({
      message: 'server error'
    });
  }
};
