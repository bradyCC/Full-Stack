/**
 * Created by brady on 2019/6/15.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String}
})

module.exports = mongoose.model('Category', schema);
