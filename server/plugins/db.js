/**
 * Created by brady on 2019/6/15.
 */
module.exports = app => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue', {
    useNewUrlParser: true
  })

  require('require-all')(__dirname + '/../models');



}
