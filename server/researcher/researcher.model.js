const mongoose = require('mongoose');

const { Schema } = mongoose;

const ResearcherQuestionSetSchema = new Schema({
  researcherID: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  numberOfQuestions: {
    type: String,
    required: true
  },
  questionAnswer: [{
    question: { type: String, required: true },
    ansType: { type: String, required: true },
    options: [{
      type: String
    }]
  }]
});

module.exports.ResearcherQuestionSetModel = mongoose.model('questionSetType', ResearcherQuestionSetSchema);
