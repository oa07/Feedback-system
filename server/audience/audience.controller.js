const { ResearcherQuestionSetModel } = require('../researcher/researcher.model');
const { AudienceQuestionSubmitModel } = require('./audience.model');

// DONE
module.exports.showListOfQuestions = async (req, res) => {
  const allQuestionSets = await ResearcherQuestionSetModel.find({ tag: req.query.tag, willShowTill: { $gt: Date.now() } });
  console.log(allQuestionSets);
  return res.status(200).json({
    QuestionSets: allQuestionSets
  })
}

// DONE
module.exports.rateQuestionList = async (req, res) => {
  const selectedQuestionSet = await ResearcherQuestionSetModel.findOne({ _id: req.query.id });
  selectedQuestionSet.stars.push(req.query.star);
  await selectedQuestionSet.save();
  return res.status(200).json({
    updatedQuestionSet: selectedQuestionSet
  })
}

// DONE
// params: questionSetID,numberOfQuestions
module.exports.answerQuestions = async (req, res) => {
  const audienceID = req.user._id;
  const QuestionSetID = req.params.questionSetID;
  const NumberOfQuestions = req.params.numberOfQuestions;
  const answers = [];
  for (let i = 0; i < NumberOfQuestions; i++) {
    if (req.body[`ans${i + 1}`] === undefined) answers.push('');
    else answers.push(req.body[`ans${i + 1}`]);
  }
  const questionSetData = await ResearcherQuestionSetModel.findOne({ _id: QuestionSetID });
  const data = new AudienceQuestionSubmitModel({ approved: false, researcherID: questionSetData.researcherID, audienceID, QuestionSetID, answers });
  await data.save();

  return res.status(200).json({
    message: true,
    usersAnswer: data
  })
}
