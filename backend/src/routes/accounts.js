const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/session', async function (req, res, next) {
  res.send(req.user)
})

router.post('/session', passport.authenticate('local'), function (req, res) {
  console.log('Logged in user:', req.user)
  console.log('Session ID:', req.sessionID)
  res.send(req.user)
})


router.delete('/session', function (req, res) {
  req.logout(() => {
    res.sendStatus(200)
  })
})

module.exports = router
