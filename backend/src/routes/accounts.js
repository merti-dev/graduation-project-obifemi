const express = require('express')
const router = express.Router()
const User = require('../user')
const passport = require('passport')

router.get('/session', async function (req, res, next) {
  res.send(req.session)
})

router.post('/session', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
  res.redirect('/users')
})

module.exports = router
