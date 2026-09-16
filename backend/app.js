const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const weatherRouter = require('./controllers/weather')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/weather', weatherRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app