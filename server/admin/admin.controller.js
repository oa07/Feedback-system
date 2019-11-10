const {
  ResearcherQuestionSetModel
} = require('../researcher/researcher.model');
const { AudienceQuestionSubmitModel } = require('../audience/audience.model');
const {
  promotionalMailByAdminToAllUsers
} = require('../../config/sendingEmail');
const colors = require('colors');

const { AccountModel } = require('../account/account.model');

module.exports.allQuestionsSet = async (req, res) => {
  try {
    const questionList = await ResearcherQuestionSetModel.find();
    return res.status(200).json({ success: true, questionList });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error
    });
  }
};

module.exports.seeResponsesInAParticularQuestionSet = async (req, res) => {
  try {
    const review = await AudienceQuestionSubmitModel.find({
      QuestionSetID: req.query.questionSetID
    });
    return res.status(200).json({
      success: true,
      review
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error
    });
  }
};

module.exports.seeDisapprovedUsers = async (req, res) => {
  try {
    const audiences = await AccountModel.find({ role: 'audience' });
    const validAudiences = await AudienceQuestionSubmitModel.find({
      approved: true
    });
    let map = new Map();
    for (let i = 0; i < validAudiences.length; i++) {
      if (map.has(validAudiences[i].audienceID)) continue;
      console.log('hi');
      map.set(validAudiences[i].audienceID, true);
    }
    let disapprovedAudiences = [];
    for (let i = 0; i < audiences.length; i++) {
      if (map.has(audiences[i]._id.toString().trim())) continue;
      disapprovedAudiences.push(audiences[i]._id);
    }
    return res.status(200).json({
      success: true,
      disapprovedAudiences
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error
    });
  }
};

module.exports.promotionalMailToUsers = async (req, res) => {
  try {
    let audiences = await AccountModel.find({ role: 'audience' });
    const researchers = await AccountModel.find({ role: 'researcher' });
    const users = [...audiences, ...researchers];
    const { message } = req.body;
    let responses = [];
    console.log(users);
    for (let i = 0; i < users.length; i++) {
      console.log(users[i]);
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error
    });
  }
};

module.exports.disapprovedQuestionSets = async (req, res) => {
  try {
    const questionList = await ResearcherQuestionSetModel.find({
      approved: { $ne: true }
    });
    return res.status(200).json({ success: true, questionList });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error
    });
  }
};

module.exports.disapprovedAnswers = async (req, res) => {
  try {
    const disapprovedAnswersInAParticularQuestionSet = await AudienceQuestionSubmitModel.find(
      {
        QuestionSetID: req.query.questionSetID,
        approved: false
      }
    );
    return res.status(200).json({
      success: true,
      disapprovedAnswers: disapprovedAnswersInAParticularQuestionSet
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error
    });
  }
};

module.exports.top200AudienceInAQuestionSet = async (req, res) => {
  try {
    const QuestionSetID = req.query.questionSetID;

    let SubmittedAnswer = await AudienceQuestionSubmitModel.find({
      approved: true,
      QuestionSetID
    }).sort({ _id: -1 });

    let map = new Map();
    let top200Users = [];
    for (let i = 0; i < SubmittedAnswer.length; i++) {
      if (map.has(SubmittedAnswer[i].audienceID)) continue;
      top200Users.push(SubmittedAnswer[i].audienceID);
      map.set(SubmittedAnswer[i].audienceID, true);
      if (map.size === 200) {
        break;
      }
    }
    return res.status(200).json({
      success: true,
      top200Users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error
    });
  }
};
// top 200 users answer of a question
