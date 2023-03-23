const Challenge = require('./challenge')

class User {
  challenges = []
  points = []
  constructor(name, level) {
    this.name = name
    this.level = level
  }
  joinChallenge(challenge) {
    this.challenges.push(challenge)
    challenge.attendees.push(this)
  }
  createChallenge = (level, challengesName) => {
    const challenge = new Challenge(level, challengesName)

    this.challengesName = challengesName
    this.challenges.push(challenge)
    challenge.attendees.push(this)

    return challenge
  }
}

module.exports = User
