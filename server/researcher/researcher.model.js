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
  stars: [{
    type: String
  }],
  questionAnswer: [{
    question: { type: String, required: true },
    ansType: { type: String, required: true },
    options: [{
      type: String
    }]
  }],
  willShowTill: {
    type: Date
  }
});

module.exports.ResearcherQuestionSetModel = mongoose.model('questionSetType', ResearcherQuestionSetSchema);
