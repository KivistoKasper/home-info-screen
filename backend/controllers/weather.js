const weatherRouter = require('express').Router()
const { request } = require('express')

weatherRouter.get('/', async (req, res) => {
    res.json('hello from weather router!')
  })

  module.exports = weatherRouter