const { numberOfQuestion, correctAnswerType, userAnswerType } = require('./researcher.dummyData');

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