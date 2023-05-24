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
// var questionsRouter = require('./routes/questions')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')

// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/user')
const passport = require('passport')
const createSocketServer = require('./socket-connection')

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

var app = express()
app.set('trust proxy', 1)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const clientPromise = mongoose.connection.asPromise().then(connection => (connection = connection.getClient()))

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 3600000 * 24 * 7,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : true,
      domain: process.env.NODE_ENV === 'production' && 'api.mertin.info',
    },

    store: MongoStore.create({
      // mongoUrl: process.env.MONGODB_CONNECTION_STRING,
      clientPromise,
      stringify: false,
      // ttl: 3600000 * 24 * 7,
    }),
  })
)
app.use(passport.initialize())
app.use(passport.session())
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
app.use((req, res, next) => {
  const numberOfVisits = req.session.numberOfVisits || 0
  req.session.numberOfVisits = numberOfVisits + 1
  req.session.history = req.session.history || []
  req.session.history.push({ url: req.url, ip: req.ip })

  console.log('req.session:', req.session)
  // console.log('numberOfVisits:', numberOfVisits)
  next()
})

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

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/challenges', challengesRouter)
app.use('/accounts', accountsRouter)
app.use('/analytics', analyticsRouter)
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
// app.use(function (req, res, next) {
//   next(createError(404))
// })

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

app.createSocketServer = createSocketServer

// app.createSocketServer = function (server) {
//   const io = require('socket.io')(server)

//   console.log('socket.io server created')

//   io.on('connection', function (socket) {
//     console.log('a user connected')

//     socket.on('disconnect', function () {
//       console.log('user disconnected')
//     })
//   })
// }

module.exports = app
