const express = require('express')
const router = express.Router()
const User = require('../models/user')
//request the highest 10 points of users
router.get('/leaderboard', async function (req, res, next) {
  const users = await User.find().sort({ points: -1 }).limit(10)
  res.send(users)
})

module.exports = router
