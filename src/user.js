const Challenge = require('./challenge')

class User {
  challenges = []
  points = 0
  constructor(name, level) {
    this.name = name
    this.level = level
  }

  createChallenge = (level, challengesName) => {
    const challenge = new Challenge(level, challengesName)

    this.challengesName = challengesName
    this.challenges.push(challenge)
    challenge.attendees.push(this.name)

    return challenge
  }
  joinChallenge = challenge => {
    this.challenges.push(challenge)
    this.challenges[0].attendees.push(name)
    console.log(this.challenges[0].attendees)
  }
  static create = (name, level) => {
    const newUser = new User(name, level)
    User.list.push(newUser)
    return new User(name, level)
  }
  static list = []
}

module.exports = User
