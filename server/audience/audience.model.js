const mongoose = require('mongoose');

const { Schema } = mongoose;

const AudienceQuestionSubmitSchema = new Schema({
  audienceID: {
    type: String,
    required: true
  },
  QuestionSetID: {
    type: String,
    required: true
  },
  answers: [{
    type: String
  }]
});

module.exports.AudienceQuestionSubmitModel = mongoose.model('audienceQuesAnswer', AudienceQuestionSubmitSchema);
