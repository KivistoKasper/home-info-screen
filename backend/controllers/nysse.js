const NysseRouter = require('express').Router();
const { request } = require('express');
const {MemoryCache, NodeFetchCache} = require('node-fetch-cache');
const {DateTime} = require('luxon');

const logger = require('../utils/logger');

/**
 * Set Fetch with cache
 */
const fetch = NodeFetchCache.create({
  // Only cache responses with a 2xx status code
  shouldCacheResponse: (response) => response.ok,
  cache: new MemoryCache({ttl: 1000 * 60 * 15}), // 15 minutes
});


NysseRouter.get('/', async (req, res) => {

  const url = 'https://tremonitori.digitransit.fi/view?cont=aCeKLtgcSJOOGwCdqsR6jw%3D%3D';
  const options = {
    method: 'GET',
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  }
  catch (error) {
    logger.error('Failed to fetch nysse data', error);
    res.status(500).json({ error: 'Failed to fetch nysse data' });
  }
 
});

module.exports = NysseRouter