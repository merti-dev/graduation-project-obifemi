var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./database-connection')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var challengesRouter = require('./routes/challenges')
var Question = require('./models/question')
var accountsRouter = require('./routes/accounts')
var analyticsRouter = require('./routes/analytics')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const User = require('./models/user')
const passport = require('passport')
const createSocketServer = require('./socket-connection')

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

var app = express()
app.set('trust proxy', 1)
app.use(cors({
  origin: ['https://frontend-565623834769.europe-west1.run.app', 'http://localhost:5173'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const clientPromise = mongoose.connection.asPromise().then(connection => connection.getClient())

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 3600000 * 24 * 7
    },
    store: MongoStore.create({
      clientPromise,
      stringify: false,
    })
  })
)
app.use(passport.initialize())
app.use(passport.session())
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
app.use((req, res, next) => {
  console.log('SESSION CHECK:', req.session)
  next()
})

// View engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/challenges', challengesRouter)
app.use('/accounts', accountsRouter)
app.use('/analytics', analyticsRouter)

app.post('/questions', async (req, res) => {
  const allQuestions = [
    { question: 'Ich gehe ___ Schule.', options: ['zur', 'in die', 'auf die', 'an die'], answer: 'zur', level: 'B2' },
    { question: 'Ich komme ___ Deutschland.', options: ['aus', 'von', 'nach', 'zu'], answer: 'aus', level: 'B2' },
    { question: 'Ich wohne ___ Berlin.', options: ['in', 'auf', 'an', 'bei'], answer: 'in', level: 'B2' },
    { question: 'Ich fahre ___ Arbeit.', options: ['zur', 'in die', 'auf die', 'an die'], answer: 'zur', level: 'B2' },
    { question: 'Ich bin ___ Bahnhof.', options: ['am', 'im', 'auf dem', 'in dem'], answer: 'am', level: 'B2' },
  ]
  for (const q of allQuestions) await Question.create(q)
  res.send('done')
})

app.use(function (err, req, res, next) {
  console.log('ERROR:', err)
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

app.createSocketServer = createSocketServer
module.exports = app
