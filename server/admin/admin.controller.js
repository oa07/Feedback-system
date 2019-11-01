const ResearcherQuestionSetModel = require("../researcher/researcher.model");

module.exports.allQuestionsSet = async (req, res) => {
  try {
    const questionList = await ResearcherQuestionSetModel.find({});
    return res.json({ success: true, questionList });
  } catch (error) {
    next(error);
  }
};
