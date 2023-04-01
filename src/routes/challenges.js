var express = require('express')
var router = express.Router()
const Challange = require('../challenge')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(Challange.list)
})

//join a challlenge
router.post('/:challangeId/attendees', function (req, res, next) {
  const challange = Challange.list.find(challange => challange.challengesName === req.params.challangeId)
  const user = User.list.find(user => user.name === req.body.userId)
  user.joinChallenge(challange)
  res.send(challange)
})

module.exports = router
