const { AudienceQuestionSubmitModel } = require('../audience/audience.model');
const { ResearcherQuestionSetModel } = require('./researcher.model');

const undefinedOrEmpty = data => {
  return data === undefined || data === '';
};

// numberOfQuestions, willShowTill, tag, ques1, ansType1, options1 => from input
// user ID => from token
module.exports.submitQuestions = async (req, res) => {
  console.log('hey');
  console.log(req.body);
  try {
    const { numberOfQuestions, tag } = req.body;
    const willShowTill = new Date(
      Date.now() + parseFloat(req.body.willShowTill) * 24 * 60 * 60 * 1000
    );
    const QuestionSet = {
      numberOfQuestions,
      tag,
      willShowTill,
      researcherID: req.user._id,
      questionAnswer: []
    };

    const numberOfQuestionsInt = parseInt(req.body.numberOfQuestions, 10);
    for (let i = 0; i < numberOfQuestionsInt; i++) {
      let questionAnswer = {};

      if (undefinedOrEmpty(req.body[`ques${i + 1}`])) {
        return res.status(400).json({
          success: false,
          message: `question ${i + 1} is empty !!`
        });
      } else {
        questionAnswer.question = req.body[`ques${i + 1}`];
      }
      if (undefinedOrEmpty(req.body[`ansType${i + 1}`])) {
        return res.status(400).json({
          success: false,
          message: `Answer type of question ${i + 1} is empty !!`
        });
      } else {
        questionAnswer.ansType = req.body[`ansType${i + 1}`];
      }
      if (
        req.body[`ansType${i + 1}`] !== 'textarea' &&
        req.body[`ansType${i + 1}`] !== 'textbox'
      ) {
        const options = [];
        if (
          req.body[`options${i + 1}`] === undefined ||
          req.body[`options${i + 1}`].length === 0
        ) {
          return res.status(400).json({
            success: false,
            message: `There should be some options in question ${i + 1} !!`
          });
        } else if (typeof req.body[`options${i + 1}`] === 'string') {
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
    const QuestionSetDB = new ResearcherQuestionSetModel(QuestionSet);
    await QuestionSetDB.save();
    return res.status(200).json({
      success: true,
      QuestionSet: QuestionSetDB
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error
    });
  }
};

// all audience's answer
module.exports.seeAudienceReview = async (req, res) => {
  try {
    const researcherID = req.user._id;
    const QuestionSetID = req.query.questionSetID;
    const review = await AudienceQuestionSubmitModel.find({
      researcherID,
      QuestionSetID
    });
    return res.status(200).json({
      success: true,
      reviews: review
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error
    });
  }
};

// only valid audience's answer
module.exports.seeValidAudienceReview = async (req, res) => {
  try {
    const validReviewInAParticularQuestionSet = await AudienceQuestionSubmitModel.find(
      {
        researcherID: req.user._id,
        QuestionSetID: req.query.questionSetID,
        approved: true
      }
    );
    return res.status(200).json({
      success: true,
      validReview: validReviewInAParticularQuestionSet
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
