const Challenge = require('./challenge')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  level: String,
  challenges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
    },
  ],
  score: Number,
})

module.exports = mongoose.model('User', userSchema)
class User {
  challenges = []
  score = 0
  constructor(name, level) {
    this.name = name
    this.level = level
  }

  createChallenge = (level, challengesName) => {
    const challenge = Challenge.create(level, challengesName)

    // this.challengesName = challengesName
    this.challenges.push(challenge)

    challenge.attendees.push(this.name)

    return challenge
  }
  joinChallenge = challenge => {
    this.challenges.push(challenge)
    challenge.attendees.push(this.name)
    // console.log(challenge)
    return challenge
  }
  static create = (name, level) => {
    const newUser = new User(name, level)
    User.list.push(newUser)
    return newUser
  }
  static list = []
}

// module.exports = User
