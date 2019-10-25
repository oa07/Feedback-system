const jwt = require('jsonwebtoken');

module.exports.auth = async (req, res, next) => {
  console.log('hi');
  try {
    const bearerHeader = req.headers.authorization;
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
      const access_token = bearerHeader.split(' ')[1];
      const tokenData = await jwt.verify(access_token, 'jwt_secret_key');
      req.user = tokenData;
      console.log(tokenData);

      next();
    }
  } catch (err) {
    return res.status(500).json({
      message: 'internal Server Error'
    })
  }
}

module.exports.researcherAccess = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.role === 'researcher') {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: 'No Access Permission. You are not a researcher'
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: 'internal Server Error'
    })
  }
}

module.exports.audienceAccess = async (req, res, next) => {
  try {
    if (req.user.role === 'audience') {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: 'No Access Permission. You are not a audience'
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: 'internal Server Error'
    })
  }
}