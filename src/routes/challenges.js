var express = require('express')
var router = express.Router()
const Challenge = require('../challenge')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(Challenge.list)
})

//join a challlenge
router.post('/:challengeId/attendees', function (req, res, next) {
  const challenge = Challenge.list.find(challenge => challenge.challengesName === req.params.challengeId)
  const user = User.list.find(user => user.name === req.body.userId)
  user.joinChallenge(challenge)
  res.send(challenge)
})

module.exports = router
