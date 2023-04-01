var express = require('express')
var router = express.Router()
const Challange = require('../challenge')

const User = require('../user')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list.map(user => user.name))
})

//Creation of Mert and Elif
router.post('/', function (req, res, next) {
  const user = User.create(req.body.name, req.body.level)
  res.send(user)
})

//Create a challenge for a user
router.post('/:userId/challenges', function (req, res, next) {
  const user = User.list.find(user => user.name === req.params.userId)
  const challenge = user.createChallenge(req.body.level, req.body.challengesName)
  res.send(challenge)
})

//join a challlenge
router.post('/:userId/challenges/:challangeId/attendees', function (req, res, next) {
  const challange = Challange.list.find(challange => challange.challengesName === req.params.challangeId)
  const user = User.list.find(user => user.name === req.body.userId)
  console.log(user)
  user.joinChallenge(challange)
  res.send(challange)
})

module.exports = router
