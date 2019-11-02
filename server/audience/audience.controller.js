const {
  ResearcherQuestionSetModel
} = require("../researcher/researcher.model");
const { AudienceQuestionSubmitModel } = require("./audience.model");

module.exports.showListOfQuestions = async (req, res) => {
  try {
    const allQuestionSets = await ResearcherQuestionSetModel.find({
      tag: req.query.tag,
      willShowTill: { $gt: Date.now() }
    });
    return res.status(200).json({
      QuestionSets: allQuestionSets
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error
    });
  }
};

module.exports.rateQuestionList = async (req, res) => {
  try {
    const selectedQuestionSet = await ResearcherQuestionSetModel.findOne({
      _id: req.query.id
    });
    if (selectedQuestionSet) {
      selectedQuestionSet.stars.push(req.query.star);
      await selectedQuestionSet.save();
      return res.status(200).json({
        updatedQuestionSet: selectedQuestionSet
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Question Set Found in this ID"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error
    });
  }
};

module.exports.answerQuestions = async (req, res) => {
  try {
    const audienceID = req.user._id;
    const QuestionSetID = req.params.questionSetID;
    const questionSet = await ResearcherQuestionSetModel.findOne({
      _id: QuestionSetID
    });
    if (questionSet) {
      const { numberOfQuestions, researcherID } = questionSet;
      const answers = [];
      const NumberOfQuestionsInt = parseInt(numberOfQuestions, 10);
      for (let i = 0; i < NumberOfQuestionsInt; i++) {
        console.log(req.body[`ans${i + 1}`]);
        if (req.body[`ans${i + 1}`] === undefined) answers.push("");
        else answers.push(req.body[`ans${i + 1}`]);
      }
      const AudiencesAnswer = new AudienceQuestionSubmitModel({
        researcherID,
        audienceID,
        QuestionSetID,
        answers
      });
      await AudiencesAnswer.save();

      return res.status(200).json({
        success: true,
        AudiencesAnswer
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Question Set Found in this ID"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error
    });
  }
};
