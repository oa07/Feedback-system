const { ResearcherQuestionSetModel } = require('../researcher/researcher.model');

module.exports.showListOfQuestions = async (req, res) => {
  const allQuestionSets = await ResearcherQuestionSetModel.find({ tag: req.query.tag });
  console.log(allQuestionSets);
  return res.status(200).json({
    QuestionSets: allQuestionSets
  })
}

module.exports.rateQuestionList = async (req, res) => {
  const selectedQuestionSet = await ResearcherQuestionSetModel.findOne({ _id: req.query.id });
  selectedQuestionSet.stars.push(req.query.star);
  await selectedQuestionSet.save();
  return res.status(200).json({
    updatedQuestionSet: selectedQuestionSet
  })
}

module.exports.answerQuestions = async (req, res) => {
  const userID = req.user._id;
  const userData = [];
  const QuestionSetID = req.params.questionSetID;
  const NumberOfQuestions = req.params.numberOfQuestions;
  for (let i = 0; i < NumberOfQuestions; i++) {
    userData.push(req.body[`ans${i + 1}`])
  }
}