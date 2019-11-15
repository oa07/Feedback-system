const mongoose = require('mongoose');

const { Schema } = mongoose;

const AudienceQuestionSubmitSchema = new Schema({
  audienceID: {
    type: String,
    required: true
  },
  researcherID: {
    type: String,
    required: true
  },
  questionSetID: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  answers: [{ type: String }]
});

module.exports.AudienceQuestionSubmitModel = mongoose.model(
  'audienceQuesAnswer',
  AudienceQuestionSubmitSchema
);
