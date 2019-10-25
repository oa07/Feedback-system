const mongoose = require('mongoose');

const { Schema } = mongoose;

const researcherQuestionType = new Schema({
  researcherID: {
    type: String,
    required: true
  },
  numberOfQuestion: {
    type: String,
    required: true
  },
  questions: [{
    questionType: { type: String, required: true },
    answerType: { type: String, required: true }
  }]
});

module.exports.researcherQuestionType = mongoose.model('questionType', researcherQuestionType);
