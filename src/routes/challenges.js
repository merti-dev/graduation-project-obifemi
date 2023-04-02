var express = require('express')
var router = express.Router()
const Challenge = require('../challenge')
const User = require('../user')
/* GET users listing. */

//join a challlenge
router.post('/:challengeId/attendees', function (req, res, next) {
  const challenge = Challenge.list.find(challenge => challenge.challengesName === req.params.challengeId)
  const user = User.list.find(user => user.name === req.body.userId)
  user.joinChallenge(challenge)
  res.send(challenge)
})

// router.get('/', function (req, res, next) {
//   res.render('challenges', {
//     users: User.list,
//     title: 'German Challenge' + Challenge.list.length,
//   })
// })

router.get('/', function (req, res, next) {
  console.log(Challenge.list)
  if (req.query.view === 'json') return res.send(Challenge.list)

  res.render('challenges', {
    challenges: Challenge.list,
    // title: `Welcome to German Challenge! Now you are in:
    // ${
    //   Challenge.list.indexOf(Challenge.list.find(challenge => challenge.challengesName === req.params.challengeId)) + 1
    // }`,
  })
})

router.get('/:challengeId', function (req, res, next) {
  const challenge = Challenge.list.find(challenge => challenge.challengesName === req.params.challengeId)

  if (!challenge) {
    res.status(404).send('Challenge not found')
    return
  }

  if (req.query.view === 'json') return res.send(challenge)

  res.render('challenge', {
    challenge: challenge,
  })
})

//check the answers of the question and give the score to the user who answered correctly
router.post('/:challengeId/attendees/:userId', function (req, res, next) {
  const challenge = Challenge.list.find(challenge => challenge.challengesName === req.params.challengeId)
  const user = User.list.find(user => user.name === req.params.userId)
  const question = challenge.questions.find(q => q.question === req.body.question)
  if (question.answer === req.body.answer) {
    user.score += 1
  }
  res.send(user)
})

module.exports = router
