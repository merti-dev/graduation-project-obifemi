const { allQuestions } = require('../question')

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

  get details() {
    return `
     # Level: ${this.level},
     ## Challenge's Name: ${this.challengesName},
      Questions: ${this.questions.map(q => q.question)},
      Options: ${this.questions.map(q => q.options + '|')},
      Answers: ${this.questions.map(q => q.answer)},
      Attendees: ${this.attendees.map(a => a.name)},
    `
  }
  set details({ newDetails }) {
    throw new Error('You cannot change the details of a challenge')
  }
}

// ch = new Challenge('B2', ['Mert', 'Ali'])
// ch.questionsLog()
module.exports = Challenge
