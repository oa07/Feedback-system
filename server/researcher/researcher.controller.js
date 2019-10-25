const { numberOfQuestion, correctAnswerType, userAnswerType, vaildData } = require('./researcher.dummyData');
const { loginDataValidation } = require('./researcher.validation');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginDataValidation(req.body);
  if (error) return res.status(400).json(error.details.map((err) => err.message));

  let getIndex = -1;
  for (let i = 0; i < 3; i++) {
    if (email === vaildData[i].email && password === vaildData[i].password) {
      getIndex = i;
      break;
    }
  }
  if (getIndex === -1) {
    return res.status(400).json({
      success: false
    })
  } else {
    const accessToken = await jwt.sign(
      vaildData[getIndex],
      'jwt_secret_key',
      { expiresIn: '3600m' }
    );

    return res.status(200).json({
      success: true,
      accessToken,
      user: vaildData[getIndex]
    })
  }
}

module.exports.submitQuestions = (req, res) => {
  const response = [];

  if (userAnswerType.length !== numberOfQuestion) {

  }
  for (let i = 0; i < userAnswerType.length; i++) {
    console.log()
    if (userAnswerType[i].type === correctAnswerType[i].type) {
      response.push({
        success: true,
        message: 'OK'
      })
    } else {
      response.push({
        success: false,
        message: `answer type should be '${correctAnswerType[i].type}', but found '${userAnswerType[i].type}'`
      })
    }
  }

  return res.status(200).json({
    response
  })
}