const { allQuestions } = require('./question')

class Challenge {
  winner = ''
  questions = []

  constructor(level, challengesName) {
    this.attendees = []
    this.level = level
    this.challengesName = challengesName
    this.questions = allQuestions.filter(q => q.level === level)
    // this.deneme = {
    //   first: this.questions[0].answer,
    // }
  }

  get details() {
    return `
     # Level: ${this.level}

     ## Challenge's Name: ${this.challengesName}

     ## Questions: ${this.questions.map(q => q.question)}

     ## Options:\n ${this.questions.map((q, index) => {
       return `Option for Question ${index + 1}:\n${q.options.join('\n')}\n`
     })}

     ## Answers: ${this.questions.map(q => q.answer)}

     ## Attendees: ${this.attendees.map(a => a.name)}
    `
  }
  set details({ newDetails }) {
    throw new Error('You cannot change the details of a challenge')
  }

  static create = (level, challengesName) => {
    const newChallenge = new Challenge(level, challengesName)
    Challenge.list.push(newChallenge)
    return newChallenge
  }
  static list = []
}

// ch = new Challenge('B2', ['Mert', 'Ali'])
// ch.questionsLog()
module.exports = Challenge
