const Challenge = require('./challenge')
const Question = require('./question')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  level: String,
  challenges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      autopopulate: { maxDepth: 2 },
    },
  ],
  score: { type: Number, default: 0 },
})

// module.exports = mongoose.model('User', userSchema)
class User {
  async createChallenge(level, challengesName) {
    const challenge = await Challenge.create({ level: level, challengesName: challengesName })
    challenge.questions = await Question.find({ level: level })
    // this.challengesName = challengesName
    this.challenges.push(challenge._id)
    await this.save()
    challenge.attendees.push(this)
    await challenge.save()
    return challenge
  }
  async joinChallenge(challenge) {
    this.challenges.push(challenge)
    challenge.attendees.push(this)

    await this.save()
    await challenge.save()
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
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
module.exports = mongoose.model('User', userSchema)

// module.exports = User
