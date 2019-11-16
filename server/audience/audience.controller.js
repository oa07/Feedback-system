const {
  ResearcherQuestionSetModel
} = require('../researcher/researcher.model');
const {
  thankYouMsgFromResearcherToAudience
} = require('../../config/sendingEmail');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { AudienceQuestionSubmitModel } = require('./audience.model');
const { AccountModel } = require('../account/account.model');
const logger = require('../../config/logger');

module.exports.showListOfQuestions = asyncHandler(async (req, res) => {
  logger.info(`URL: ${req.url}`);

  const questionSets = await ResearcherQuestionSetModel.find({
    tag: req.query.tag,
    willShowTill: { $gt: Date.now() }
  });
  return res.status(200).json({
    success: true,
    count: questionSets.length,
    data: questionSets
  });
});

module.exports.rateQuestionList = asyncHandler(async (req, res, next) => {
  logger.info(`URL: ${req.url}`);
  const questionSet = await ResearcherQuestionSetModel.findOne({
    _id: req.query.questionSetID
  });
  if (!questionSet) {
    return next(
      new ErrorResponse(
        `No question set found in this Id: ${req.query.questionSetID}`,
        400
      )
    );
  }

  questionSet.stars.push(parseInt(req.query.star, 10));
  await questionSet.save();
  return res.status(200).json({
    success: true,
    data: questionSet
  });
});

module.exports.answerQuestions = asyncHandler(async (req, res, next) => {
  logger.info(`URL: ${req.url}`);

  const audienceID = req.user._id;
  const questionSetID = req.params.questionSetID;
  const questionSet = await ResearcherQuestionSetModel.findOne({
    _id: questionSetID
  });
  if (!questionSet) {
    return next(
      new ErrorResponse(
        `No question set found in this Id: ${req.params.questionSetID}`,
        400
      )
    );
  }
  const { numberOfQuestions, researcherID } = questionSet;
  const researcherInfo = await AccountModel.findOne({
    _id: researcherID
  }).select(['-password']);

  const answers = [];
  for (let i = 0; i < numberOfQuestions; i++) {
    if (req.body[`ans${i + 1}`] === undefined) answers.push('');
    else answers.push(req.body[`ans${i + 1}`]);
  }
  const audienceResponse = {
    researcherID,
    audienceID,
    questionSetID,
    answers
  };
  const dbsavedData = await AudienceQuestionSubmitModel.create(
    audienceResponse
  );
  const emailResponse = await thankYouMsgFromResearcherToAudience(
    researcherInfo.email,
    req.user.email,
    req.user.name
  );
  return res.status(201).json({
    success: true,
    response: dbsavedData,
    emailResponse: emailResponse.response
  });
});

module.exports.userReached = asyncHandler(async (req, res) => {
  logger.info(`URL: ${req.url}`);

  const { questionSetID } = req.params;
  const answers = await AudienceQuestionSubmitModel.find({ questionSetID });
  let map = new Map();
  let counter = 0;
  for (let i = 0; i < answers.length; i++) {
    if (map.has(answers[i].audienceID)) continue;
    counter++;
  }
  return res.status(200).json({
    success: true,
    count: counter.length,
    userReached: counter
  });
});

module.exports.seeResponse = asyncHandler(async (req, res, next) => {
  logger.info(`URL: ${req.url}`);

  const answers = await AudienceQuestionSubmitModel.find({
    questionSetID: req.query.questionSetID,
    audienceID: req.user._id
  });
  return res.status(200).json({
    success: true,
    count: answers.length,
    data: answers
  });
});

module.exports.updateResponse = asyncHandler(async (req, res, next) => {
  logger.info(`URL: ${req.url}`);

  const { responseID } = req.params;
  const response = await AudienceQuestionSubmitModel.findOne({
    _id: responseID,
    audienceID: req.user._id
  });
  const answers = response.answers;
  const data = req.body;
  for (let i = 1; i <= response.answers.length; i++) {
    if (data[`ans${i}`]) answers[i - 1] = data[`ans${i}`];
  }
  const updatedData = await AudienceQuestionSubmitModel.findByIdAndUpdate(
    responseID,
    { answers },
    {
      new: true,
      runValidators: true
    }
  );
  return res.status(200).json({
    success: true,
    message: 'data is successfully updated',
    data: updatedData
  });
});

// **********************************************************
// ***************** For testing purpose ********************
// **********************************************************

module.exports.checkForASet = asyncHandler(async (req, res, next) => {
  const questionSet = await ResearcherQuestionSetModel.findById(req.params.id);
  if (questionSet)
    return res.status(200).json({
      success: true
    });

  return res.status(400).json({
    success: false
  });
});
