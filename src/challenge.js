// const { allQuestions } = require('./question')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const challengeSchema = new mongoose.Schema({
  level: String,
  challengesName: String,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      autopopulate: true,
    },
  ],
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
  ],
  winner: String,
})

class Challenge {
  // winner = ''
  // questions = []
  // attendees = []
  // constructor(level, challengesName) {
  //   this.level = level
  //   this.challengesName = challengesName
  //   this.questions = allQuestions.filter(q => q.level === level)
  //   // this.deneme = {
  //   //   first: this.questions[0].answer,
  //   // }
  // }

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

  // static create = (level, challengesName) => {
  //   const newChallenge = new Challenge(level, challengesName)
  //   Challenge.list.push(newChallenge)
  //   return newChallenge
  // }
  // static list = []
}

// ch = new Challenge('B2', ['Mert', 'Ali'])
// ch.questionsLog()
//module.exports = Challenge
challengeSchema.loadClass(Challenge)
challengeSchema.plugin(autopopulate)
module.exports = mongoose.model('Challenge', challengeSchema)
