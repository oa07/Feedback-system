const { ResearcherQuestionSetModel } = require('../researcher/researcher.model');

module.exports.showListOfQuestions = async (req, res) => {
  const allQuestionSets = await ResearcherQuestionSetModel.find({ tag: req.query.tag });
  console.log(allQuestionSets);
  return res.status(200).json({
    QuestionSets: allQuestionSets
  })
}