var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('dotenv').config()
require('./database-connection')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var challengesRouter = require('./routes/challenges')
var Question = require('./question')
// var questionsRouter = require('./routes/questions')

var app = express()

// if (app.get('env') === 'development') {
//   app.use(require('livereload')())

//   require('livereload')
//     .createServer({ extraExts: ['pug'] })
//     .watch([__dirname + '/public', __dirname + '/views'])
// }

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/challenges', challengesRouter)
// app.use('/questions', questionsRouter)
app.post('/questions', async (req, res) => {
  const allQuestions = [
    {
      question: 'Ich gehe ___ Schule.',
      options: ['zur', 'in die', 'auf die', 'an die'],
      answer: 'zur',
      level: 'B2',
    },
    {
      question: 'Ich komme ___ Deutschland.',
      options: ['aus', 'von', 'nach', 'zu'],
      answer: 'aus',
      level: 'B2',
    },
    {
      question: 'Ich wohne ___ Berlin.',
      options: ['in', 'auf', 'an', 'bei'],
      answer: 'in',
      level: 'B2',
    },
    {
      question: 'Ich fahre ___ Arbeit.',
      options: ['zur', 'in die', 'auf die', 'an die'],
      answer: 'zur',
      level: 'B2',
    },
    {
      question: 'Ich bin ___ Bahnhof.',
      options: ['am', 'im', 'auf dem', 'in dem'],
      answer: 'am',
      level: 'B2',
    },
  ]
  for (const q of allQuestions) {
    await Question.create(q)
  }
  res.send('done')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
