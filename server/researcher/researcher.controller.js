const { researcherQuestions, numberOfQuestion, correctAnswerType, userAnswerType, vaildData } = require('./researcher.dummyData');
const { loginDataValidation } = require('./researcher.validation');
const jwt = require('jsonwebtoken');
const { ResearcherQuestionSetModel } = require('./researcher.model');

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

module.exports.submitQuestions = async (req, res) => {
  const { numberOfQuestions } = researcherQuestions;
  const QuestionSet = {};
  QuestionSet.numberOfQuestions = numberOfQuestions;
  QuestionSet.researcherID = req.user.id;
  QuestionSet.tag = researcherQuestions.tag;
  QuestionSet.questionAnswer = [];
  for (let i = 0; i < numberOfQuestions; i++) {
    let questionAnswer = {};
    if (researcherQuestions[`ques${i + 1}`] === undefined || researcherQuestions[`ques${i + 1}`] === '') {
      // show error
    } else {
      questionAnswer.question = researcherQuestions[`ques${i + 1}`];
    }
    if (researcherQuestions[`ansType${i + 1}`] === undefined || researcherQuestions[`ansType${i + 1}`] === '') {
      // show error
    } else {
      questionAnswer.ansType = researcherQuestions[`ansType${i + 1}`];
    }
    if (researcherQuestions[`ansType${i + 1}`] !== 'textarea' && researcherQuestions[`ansType${i + 1}`] !== 'textbox') {
      const options = [];
      if (researcherQuestions[`options${i + 1}`] === undefined || researcherQuestions[`options${i + 1}`].length === 0) {
        // show error
      } else if (typeof researcherQuestions[`options${i + 1}`] === 'string') {
        options.push(researcherQuestions[`options${i + 1}`]);
      } else {
        for (let j = 0; j < researcherQuestions[`options${i + 1}`].length; j++) {
          options.push(researcherQuestions[`options${i + 1}`][j]);
        }
      }
      questionAnswer.options = options;
    }
    QuestionSet.questionAnswer.push(questionAnswer);
  }

  const questionType = new ResearcherQuestionSetModel(QuestionSet);
  await questionType.save();
  console.log(QuestionSet);


  return res.status(200).json({
    questionType
  })
}