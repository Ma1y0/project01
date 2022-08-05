require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

const app = express()

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('successfully connected to mongodb'))

const indexRouter = require('./routes/index')
const directorsRouter = require('./routes/directors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyparser.urlencoded({ limit: '10mb', extended: false }))

app.use('/', indexRouter)
app.use('/directors', directorsRouter)

app.listen(process.env.PORT)