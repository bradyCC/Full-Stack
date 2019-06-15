/**
 * Created by brady on 2019/6/15.
 */
const express = require('express');
const Categroy = require('../models/Category');

module.exports = function() {
  let router = express.Router();

  router.get('/', (req, res) => {
    res.send('Hello World');
  });

  router.post('/categories', async (req, res) => {
    const model = await Categroy.create(req.body);
    res.send(model);
  });

  return router;
}
