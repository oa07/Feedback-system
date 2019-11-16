const { AudienceQuestionSubmitModel } = require('../audience/audience.model');
const { ResearcherQuestionSetModel } = require('./researcher.model');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const logger = require('../../config/logger');

const undefinedOrEmpty = data => {
  return data === undefined || data === '';
};

const makeArray = data => {
  if (data === null || data === undefined) return [];
  if (typeof data === 'string') return [data];
  return data;
};

module.exports.submitQuestions = asyncHandler(async (req, res) => {
  logger.info(`URL: ${req.url}`);

  const { numberOfQuestions } = req.body;
  const tag = makeArray(req.body.tag);
  const willShowTill = new Date(
    Date.now() + req.body.willShowTill * 24 * 60 * 60 * 1000
  );
  const questionSet = {
    _id: req.body._id,
    numberOfQuestions,
    tag,
    willShowTill,
    researcherID: req.user._id,
    questions: []
  };

  for (let i = 0; i < numberOfQuestions; i++) {
    let questionAnswer = {};

    if (undefinedOrEmpty(req.body[`ques${i + 1}`]))
      return next(new ErrorResponse(`question ${i + 1} is empty !!`, 400));
    else questionAnswer.question = req.body[`ques${i + 1}`];

    if (undefinedOrEmpty(req.body[`ansType${i + 1}`]))
      return next(
        new ErrorResponse(`Answer type of question ${i + 1} is empty !!`, 400)
      );
    else questionAnswer.ansType = req.body[`ansType${i + 1}`];

    if (
      req.body[`ansType${i + 1}`] !== 'textarea' &&
      req.body[`ansType${i + 1}`] !== 'textbox'
    ) {
      const options = [];
      if (
        req.body[`options${i + 1}`] === undefined ||
        req.body[`options${i + 1}`].length === 0
      ) {
        return next(
          new ErrorResponse(
            `There should be some options in question ${i + 1} !!`,
            400
          )
        );
      } else if (typeof req.body[`options${i + 1}`] === 'string') {
        options.push(req.body[`options${i + 1}`]);
      } else {
        for (let j = 0; j < req.body[`options${i + 1}`].length; j++) {
          options.push(req.body[`options${i + 1}`][j]);
        }
      }
      questionAnswer.options = options;
    }
    questionSet.questions.push(questionAnswer);
  }
  const dbSavedData = await ResearcherQuestionSetModel.create(questionSet);
  return res.status(201).json({
    success: true,
    data: dbSavedData
  });
});

module.exports.seeAudienceReview = asyncHandler(async (req, res) => {
  logger.info(`URL: ${req.url}`);

  const response = await AudienceQuestionSubmitModel.find({
    researcherID: req.user._id,
    questionSetID: req.query.questionSetID
  });
  return res.status(200).json({
    success: true,
    count: response.length,
    response
  });
});

module.exports.seeValidAudienceReview = asyncHandler(async (req, res) => {
  logger.info(`URL: ${req.url}`);

  const validResponse = await AudienceQuestionSubmitModel.find({
    researcherID: req.user._id,
    questionSetID: req.query.questionSetID,
    approved: true
  });
  return res.status(200).json({
    success: true,
    count: validResponse.length,
    response: validResponse
  });
});

module.exports.top200AudienceInAQuestionSet = asyncHandler(async (req, res) => {
  logger.info(`URL: ${req.url}`);

  const { questionSetID } = req.query;

  let responses = await AudienceQuestionSubmitModel.find({
    approved: true,
    questionSetID
  }).sort({ _id: -1 });

  let map = new Map();
  let topUsers = [];
  for (let i = 0; i < responses.length; i++) {
    if (map.has(responses[i].audienceID)) continue;
    topUsers.push(responses[i].audienceID);
    map.set(responses[i].audienceID, true);
    if (map.size === 200) {
      break;
    }
  }
  return res.status(200).json({
    success: true,
    topUsers
  });
});

module.exports.totalQuesSetCount = asyncHandler(async (req, res, next) => {
  logger.info(`URL: ${req.url}`);

  const review = await AudienceQuestionSubmitModel.find({
    researcherID: req.user._id
  });
  const map = new Map();
  const counter = {};
  for (let i = 0; i < review.length; i++) {
    let id = review[i].questionSetID.toString().trim();
    if (map.has(id)) counter[id]++;
    else {
      map.set(id, true);
      counter[id] = 1;
    }
  }
  const totalSets = await ResearcherQuestionSetModel.find();
  for (let i = 0; i < totalSets.length; i++) {
    let id = totalSets[i]._id.toString().trim();
    if (map.has(id)) continue;
    map.set(id, true);
    counter[id] = 0;
  }
  return res.status(200).json({
    success: true,
    responseCount: counter
  });
});

module.exports.analysisReport = asyncHandler(async (req, res, next) => {
  logger.info(`URL: ${req.url}`);

  const { questionSetID } = req.query;
  const quesSet = await ResearcherQuestionSetModel.findOne({
    _id: questionSetID
  });
  const review = await AudienceQuestionSubmitModel.find({
    researcherID: req.user._id,
    questionSetID: questionSetID
  });

  const allQuestionAnswerType = quesSet.questions;

  const audienceAnswers = [];
  for (let i = 0; i < review.length; i++) {
    audienceAnswers.push(review[i].answers);
  }

  let analysis = [];
  for (let i = 0; i < allQuestionAnswerType.length; i++) {
    let ques = allQuestionAnswerType[i];
    let eachQuestionAnalysis = {
      QuestionID: ques._id,
      answers: [],
      inputBox: false
    };

    if (ques.ansType === 'textbox' || ques.ansType === 'textarea')
      eachQuestionAnalysis.inputBox = true;

    let map = new Map();
    let counter = {};

    for (let j = 0; j < audienceAnswers.length; j++) {
      const ans = audienceAnswers[j][i];
      if (eachQuestionAnalysis.inputBox) {
        eachQuestionAnalysis.answers.push(ans);
      } else {
        if (map.has(ans)) {
          counter[ans]++;
        } else {
          map.set(ans, true);
          counter[ans] = 1;
        }
      }
    }
    if (!eachQuestionAnalysis.inputBox) eachQuestionAnalysis.answers = counter;
    analysis.push(eachQuestionAnalysis);
  }
  return res.status(200).json({
    success: true,
    analysis
  });
});

module.exports.filterBasedOnTag = asyncHandler(async (req, res) => {
  logger.info(`URL: ${req.url}`);

  const questionSets = await ResearcherQuestionSetModel.find({
    tag: req.query.tag,
    researcherID: req.user._id
  });
  return res.status(200).json({
    success: true,
    count: questionSets.length,
    questionSets
  });
});
