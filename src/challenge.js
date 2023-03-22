const { allQuestions } = require('./question')

class Challenge {
  winner = ''
  questions = []
  attendees = []
  constructor(level, challengesName) {
    this.level = level
    this.challengesName = challengesName
    this.questions = allQuestions.filter(q => q.level === level)
    // this.deneme = {
    //   first: this.questions[0].answer,
    // }
  }
}

// ch = new Challenge('B2', ['Mert', 'Ali'])
// ch.questionsLog()
module.exports = Challenge
