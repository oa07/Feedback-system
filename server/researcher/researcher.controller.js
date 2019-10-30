const { ResearcherQuestionSetModel } = require("./researcher.model");

module.exports.submitQuestions = async (req, res) => {
  const { numberOfQuestions } = req.body;
  const QuestionSet = {};
  QuestionSet.numberOfQuestions = numberOfQuestions;
  QuestionSet.researcherID = req.user._id;
  QuestionSet.tag = req.body.tag;
  QuestionSet.questionAnswer = [];
  const numberOfQuestionsi = parseInt(numberOfQuestions, 10);
  for (let i = 0; i < numberOfQuestionsi; i++) {
    let questionAnswer = {};
    if (
      req.body[`ques${i + 1}`] === undefined ||
      req.body[`ques${i + 1}`] === ""
    ) {
      // show error
    } else {
      questionAnswer.question = req.body[`ques${i + 1}`];
    }
    if (
      req.body[`ansType${i + 1}`] === undefined ||
      req.body[`ansType${i + 1}`] === ""
    ) {
      // show error
    } else {
      questionAnswer.ansType = req.body[`ansType${i + 1}`];
    }
    if (
      req.body[`ansType${i + 1}`] !== "textarea" &&
      req.body[`ansType${i + 1}`] !== "textbox"
    ) {
      const options = [];
      if (
        req.body[`options${i + 1}`] === undefined ||
        req.body[`options${i + 1}`].length === 0
      ) {
        // show error
      } else if (typeof req.body[`options${i + 1}`] === "string") {
        options.push(req.body[`options${i + 1}`]);
      } else {
        for (let j = 0; j < req.body[`options${i + 1}`].length; j++) {
          options.push(req.body[`options${i + 1}`][j]);
        }
      }
      questionAnswer.options = options;
    }
    QuestionSet.questionAnswer.push(questionAnswer);
  }
  const questionType = new ResearcherQuestionSetModel(QuestionSet);
  await questionType.save();
  return res.status(200).json({
    questionType
  });
};
