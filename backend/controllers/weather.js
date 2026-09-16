const weatherRouter = require('express').Router()
const { request } = require('express')
const logger = require('../utils/logger');

weatherRouter.get('/', async (req, res) => {
    res.json('hello from weather router!')
  })

  module.exports = weatherRouter