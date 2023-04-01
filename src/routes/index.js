var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    characters: [
      { name: 'Ali', surname: 'Mert' },
      { name: 'Veli', surname: 'Mert' },
      { name: 'Ayşe', surname: 'Mert' },
      { name: 'Fatma', surname: 'Mert' },
    ],
    title: 'title deneme Express',
  })
})

module.exports = router
