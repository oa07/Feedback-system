const {
  ResearcherQuestionSetModel
} = require('../researcher/researcher.model');
const { AudienceQuestionSubmitModel } = require('../audience/audience.model');
const {
  promotionalMailByAdminToAllUsers
} = require('../../config/sendingEmail');
const colors = require('colors');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const { AccountModel } = require('../account/account.model');

module.exports.allQuestionsSet = asyncHandler(async (req, res) => {
  const questionList = await ResearcherQuestionSetModel.find();
  return res.status(200).json({
    success: true,
    count: questionList.length,
    questionList
  });
});

module.exports.seeResponsesInAParticularQuestionSet = asyncHandler(
  async (req, res) => {
    const response = await AudienceQuestionSubmitModel.find({
      questionSetID: req.query.questionSetID
    });
    return res.status(200).json({
      success: true,
      count: response.length,
      response
    });
  }
);

module.exports.seeDisapprovedUsers = asyncHandler(async (req, res) => {
  const audiences = await AccountModel.find({ role: 'audience' });
  const validAudiences = await AudienceQuestionSubmitModel.find({
    approved: true
  });
  let map = new Map();
  for (let i = 0; i < validAudiences.length; i++) {
    if (map.has(validAudiences[i].audienceID)) continue;
    map.set(validAudiences[i].audienceID, true);
  }
  let disapprovedAudiences = [];
  for (let i = 0; i < audiences.length; i++) {
    if (map.has(audiences[i]._id.toString().trim())) continue;
    disapprovedAudiences.push(audiences[i]._id);
  }
  return res.status(200).json({
    success: true,
    count: disapprovedAudiences.length,
    disapprovedAudiences
  });
});

module.exports.promotionalMailToUsers = asyncHandler(async (req, res) => {
  let audiences = await AccountModel.find({ role: 'audience' });
  const researchers = await AccountModel.find({ role: 'researcher' });
  const users = [...audiences, ...researchers];
  const { message } = req.body;
  let responses = [];
  for (let i = 0; i < users.length; i++) {
    const emailResponse = await promotionalMailByAdminToAllUsers(
      users[i].name,
      users[i].email,
      message
    );
    responses.push(emailResponse.response);
  }
  return res.status(200).json({
    success: true,
    emailResponses: responses
  });
});

module.exports.disapprovedQuestionSets = asyncHandler(async (req, res) => {
  const questionList = await ResearcherQuestionSetModel.find({
    approved: { $ne: true }
  });
  return res.status(200).json({
    success: true,
    count: questionList.length,
    questionList
  });
});

module.exports.disapprovedAnswers = asyncHandler(async (req, res) => {
  const disapprovedAnswers = await AudienceQuestionSubmitModel.find({
    questionSetID: req.query.questionSetID,
    approved: false
  });
  return res.status(200).json({
    success: true,
    count: disapprovedAnswers.length,
    disapprovedAnswers
  });
});

module.exports.top200AudienceInAQuestionSet = asyncHandler(async (req, res) => {
  const questionSetID = req.query.questionSetID;

  let SubmittedAnswer = await AudienceQuestionSubmitModel.find({
    approved: true,
    questionSetID
  }).sort({ _id: -1 });

  let map = new Map();
  let topUsers = [];
  for (let i = 0; i < SubmittedAnswer.length; i++) {
    if (map.has(SubmittedAnswer[i].audienceID)) continue;
    topUsers.push(SubmittedAnswer[i].audienceID);
    map.set(SubmittedAnswer[i].audienceID, true);
    if (map.size === 200) {
      break;
    }
  }
  return res.status(200).json({
    success: true,
    topUsers
  });
});
