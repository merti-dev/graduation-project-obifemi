var express = require('express')
var router = express.Router()
const Challenge = require('../challenge')
const User = require('../user')

//Creation of Mert and Elif
router.post('/', function (req, res, next) {
  const user = User.create({ name: req.body.name, level: req.body.level })
  res.send(user)
})

/* GET users listing. */
router.get('/', function (req, res, next) {
  const users = User.find().then(users => {
    res.send(users)
  })
})
// router.get('/:userId', function (req, res, next) {
//   const user = User.list.find(user => user.name === req.params.userId)
//   if (!user) {
//     res.status(404).send('User not found')
//     return
//   }
//   res.send(user)
//   console.log(user)
// })

//Create a challenge for a user
// router.post('/:userId/challenges', function (req, res, next) {
//   const user = User.list.find(user => user.name === req.params.userId)
//   const challenge = user.createChallenge(req.body.level, req.body.challengesName)
//   res.send(challenge)
// })

// //join a challlenge
// router.post('/:userId/challenges/:challengeId/attendees', function (req, res, next) {
//   const challenge = Challenge.list.find(challenge => challenge.challengesName === req.params.challengeId)
//   const user = User.list.find(user => user.name === req.body.userId)
//   // console.log(Challenge.list)
//   if (!challenge) {
//     res.status(404).send('Challenge not found')
//     return
//   }
//   user.joinChallenge(challenge)
//   res.send(challenge)
//   console.log(user)
// })

module.exports = router
