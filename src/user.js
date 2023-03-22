const Challange = require('./challenge')

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
  createChallenge = (level, attendees) => {
    const challenge = new Challenge(level, attendees)
    this.challenges.push(challenge)
    challenge.attendees.push(this)
    return challenge
  }
}
module.exports = User
