const Challenge = require('./challenge')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const userSchema = new mongoose.Schema({
  name: String,
  level: String,
  challenges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      autopopulate: { maxDepth: 1 },
    },
  ],
  score: Number,
})

// module.exports = mongoose.model('User', userSchema)
class User {
  challenges = []
  score = 0
  constructor(name, level) {
    this.name = name
    this.level = level
  }

  async createChallenge(level, challengesName) {
    const challenge = await Challenge.create({ level: level, challengesName: challengesName })

    // this.challengesName = challengesName
    this.challenges.push(challenge._id)

    challenge.attendees.push(this)
    challenge.save()
    return challenge
  }
  joinChallenge = challenge => {
    this.challenges.push(challenge._id)
    challenge.attendees.push(this.name_id)
    // console.log(challenge)
    return challenge
  }

  // static create = (name, level) => {
  //   const newUser = new User(name, level)
  //   User.list.push(newUser)
  //   return newUser
  // }
  // static list = []
}
userSchema.loadClass(User)
userSchema.plugin(autopopulate)
module.exports = mongoose.model('User', userSchema)

// module.exports = User
