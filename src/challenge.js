const { Question, B2 } = require('./question')

class Challenge {
  scoreHost = 0
  scoreGuest = 0
  winner = ''
  questions = []
  constructor(level, attendees) {
    this.level = level
    this.attendees = attendees
    this.questions = B2.filter(q => q.level === level)
  }
  questionsLog = () => {
    console.log(`First question is ${this.questions[0].question}`)
  }
}

ch = new Challenge('B2', ['Mert', 'Ali'])
ch.questionsLog()
module.exports = Challenge
