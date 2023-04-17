const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  level: String,
})
class Question {
  // constructor({ question, options, answer, level }) {
  //   this.question = question
  //   this.options = options
  //   this.answer = answer
  //   this.level = level
  // }
}
// The problem arises here when I dont use another file as b2.js and I try to export the questions from this file.

// B2[0].v
// module.exports = { Question, allQuestions }
module.exports = mongoose.model('Question', questionSchema)
