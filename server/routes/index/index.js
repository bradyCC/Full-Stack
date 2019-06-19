var express = require('express');

module.exports = () => {
  const router = express.Router();

  /* GET home page. */
  // router.get('/', (req, res, next) => {
  //   res.render('index', { title: 'Express' });
  // });

  router.get('/', async (req, res, next) => {
    res.send();
  });

  return router;
}




