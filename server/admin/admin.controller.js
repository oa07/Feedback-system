const ResearcherQuestionSetModel = require("../researcher/researcher.model");
const { AudienceQuestionSubmitModel } = require("../audience/audience.model");
const {
  promotionalMailByAdminToAllUsers
} = require("../../config/sendingEmail");

const { AccountModel } = require("../account/account.model");
module.exports.allQuestionsSet = async (req, res) => {
  try {
    const questionList = await ResearcherQuestionSetModel.find({});
    return res.json({ success: true, questionList });
  } catch (error) {
    next(error);
  }
};

// NOT TESTED (1)
module.exports.seeDisapprovedUsers = async (req, res) => {
  try {
    const allAudience = await AccountModel.find({ role: "audience" });
    let disApprovedUsers = [];
    for (let i = 0; i < allAudience.length; i++) {
      let posts = await AudienceQuestionSubmitModel.find({
        audienceID: allAudience[i]._id,
        approved: true
      });
      if (posts.length === 0) {
        disApprovedUsers.push(allAudience[i]._id);
      }
    }
    return res.status(200).json({
      disApprovedUsers
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

// NOT TESTED (2)
module.exports.audienceListedin200 = async (req, res) => {
  try {
    let userAnswered = await AudienceQuestionSubmitModel.find({
      approved: true
    }).sort({ _id: -1 });

    let map = new Map();
    let topUsers = [];
    for (let i = 0; i < userAnswered.length; i++) {
      if (map.has(userAnswered[i].audienceID)) continue;
      topUsers.push(userAnswered[i].audienceID);
      map.set(userAnswered[i].audienceID, "#");
      if (map.size === 200) {
        break;
      }
    }
    return res.status(200).json({
      topUsers
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

// NOT TESTED (3)
module.exports.promotionalMailToUsers = async (req, res) => {
  const allAudience = await AccountModel.find({ role: "audience" });
  const { message } = req.body;
  for (let i = 0; i < allAudience.length; i++) {
    const emailResponse = await promotionalMailByAdminToAllUsers(
      allAudience[i].name,
      allAudience[i].email,
      message
    );
  }
};
