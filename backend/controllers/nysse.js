const NysseRouter = require('express').Router();
const { request } = require('express');
const {MemoryCache, NodeFetchCache} = require('node-fetch-cache');
const {DateTime} = require('luxon');

const logger = require('../utils/logger');

NysseRouter.get('/', async (req, res) => {

  return res.json({
    "data": "hello"
  });
});

export default NysseRouter;