/**
 * Created by brady on 2019/6/15.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String }, // 名称
  icon: { type: String }, // 图标
})

module.exports = mongoose.model('Item', schema);
