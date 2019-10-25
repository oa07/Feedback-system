const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    const access_token = bearerHeader.split(' ')[1];
    const tokenData = await jwt.verify(access_token, 'jwt_secret_key');
    console.log(tokenData);
    if (tokenData.role === 'researcher') {
      req.user = tokenData;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: 'No Access Permission'
      })
    }
  }
}