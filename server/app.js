var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors=require('cors');

var indexRouter = require('./routes/auth')
var usersRouter = require('./routes/users')
<<<<<<< HEAD
var resourceRouter = require('./routes/resource')
=======
var ptpRouter = require('./routes/ptp')
>>>>>>> ab725305116a236dd71cb98c721a6e6844e0fba7
const mongoose = require('mongoose')

var app = express()
require('dotenv').config()

// setup mongoose
mongoose
  .connect('mongodb://127.0.0.1:27017/arep', {
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error)
  })
  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  
app.use(cors(corsOptions));
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/auth', indexRouter)
app.use('/users', usersRouter)
app.use('/',indexRouter)
app.use('/resource', resourceRouter)
app.use('/ptp',ptpRouter)
 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send({'error':err})
  })

module.exports = app
