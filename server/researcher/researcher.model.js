const mongoose = require('mongoose');

const { Schema } = mongoose;

const ResearcherQuestionSetSchema = new Schema({
  researcherID: {
    type: String,
    required: true
  },
  numberOfQuestions: {
    type: Number,
    required: true
  },
  questions: [
    {
      question: { type: String, required: true },
      ansType: { type: String, required: true },
      options: [{ type: String }]
    }
  ],
  tag: [{ type: String, required: true }],
  willShowTill: { type: Date },
  approved: {
    type: Boolean,
    default: false
  },
  stars: [{ type: Number }]
});

module.exports.ResearcherQuestionSetModel = mongoose.model(
  'questionSet',
  ResearcherQuestionSetSchema
);
