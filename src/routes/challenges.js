var express = require('express')
var router = express.Router()
const Challenge = require('../challenge')
const User = require('../user')

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
  })
})

router.get('/:challengesName', function (req, res, next) {
  const challenge = Challenge.list.find(challenge => challenge.challengesName === req.params.challengesName)

  if (!challenge) {
    res.status(404).send('Challenge not found')
    return
  }

  if (req.query.view === 'json') return res.send(challenge)

  res.render('challenge', {
    challenge: challenge,
    questionID: 0,
  })
})
router.get('/:challengesName/:questionID', function (req, res, next) {
  const challenge = Challenge.list.find(challenge => challenge.challengesName === req.params.challengesName)
  console.log(challenge)
  const questionID = +req.params.questionID

  // res.redirect(`/challenges/${challenge.challengesName}/${questionID + 1}`)
  res.render('challenge', {
    challenge: challenge,
    questionID: questionID,
    message: req.query.message,
    score: req.query.score,
  })
})
//check the answers of the question and give the score to the user who answered correctly
router.post('/:challengesName/:questionID', function (req, res, next) {
  const challenge = Challenge.list.find(challenge => challenge.challengesName === req.params.challengesName)
  console.log(challenge)
  const questionID = +req.params.questionID
  const user = User.list.find(user => user.name === req.body.userID)
  console.log(User.list)

  const question = challenge.questions[questionID]
  console.log(question)

  if (question.answer === req.body.answer) {
    user.score += 1
    let scoree = String(user.score)
    res.redirect(`/challenges/${challenge.challengesName}/${questionID}?message=Correct&score=${user.score}`)
    return
  }
  res.redirect(`/challenges/${challenge.challengesName}/${questionID}?message=Incorrect`)
  // res.render('challenge', {
  //   challenge: challenge,
  //   questionID: questionID + 1,
  // })
})

module.exports = router
