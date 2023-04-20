var express = require('express')
var router = express.Router()
const Challenge = require('../challenge')
const User = require('../user')

//join a challlenge
// router.post('/:challengeId/attendees', async function (req, res, next) {
//   const challenge = await Challenge.list.find(challenge => challenge.challengesName === req.params.challengeId)
//   const user = await User.list.find(user => user.name === req.body.userId)
//   user.joinChallenge(challenge)
//   res.send(challenge)
// })

// router.get('/', function (req, res, next) {
//   res.render('challenges', {
//     users: User.list,
//     title: 'German Challenge' + Challenge.list.length,
//   })
// })

router.get('/', async function (req, res, next) {
  const challenges = await Challenge.find()
  if (req.query.view === 'json') return res.send(challenges)
  res.send(challenges)
  // res.render('challenges', {
  //   challenges: challenges,
  // })
})

router.get('/:challengesID', async function (req, res, next) {
  const challenge = await Challenge.findById(req.params.challengesID)
  //dummy user until we have auth
  const user = await User.findOne({ name: 'Mert' })

  if (!challenge) {
    res.status(404).send('Challenge not found')
    return
  }

  // if (req.query.view === 'json') return res.send(challenge)

  res.status(200).send({
    user: user,
    challenge: challenge,
    questionID: 0,
  })
})
router.get('/:challengesID/:questionID', async function (req, res, next) {
  const challenge = await Challenge.findById(req.params.challengesID)
  const questionID = +req.params.questionID
  //dummy user
  const user = await User.findOne({ name: 'Mert' })

  // res.redirect(`/challenges/${challenge.challengesName}/${questionID + 1}`)
  res.render('challenge', {
    challenge: challenge,
    questionID: questionID,
    message: req.query.message,
    score: req.query.score,
    user: user,
  })
})
//check the answers of the question and give the score to the user who answered correctly
router.post('/:challengesID/:questionID', async function (req, res, next) {
  const challenge = await Challenge.findById(req.params.challengesID)
  const questionID = +req.params.questionID
  const user = await User.findById(req.body.userID)
  const question = challenge.questions[questionID]

  if (question.answer === req.body.answer) {
    user.score += 1
    await user.save()
    // let scoree = String(user.score)
    res.redirect(`/challenges/${challenge._id}/${questionID}?message=Correct&score=${user.score}`)
    return
  }
  res.redirect(`/challenges/${challenge._id}/${questionID}?message=Incorrect`)
  // res.render('challenge', {
  //   challenge: challenge,
  //   questionID: questionID + 1,
  // })
})

module.exports = router
