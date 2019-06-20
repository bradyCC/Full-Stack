/**
 * Created by brady on 2019/6/15.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String }, // 名称
  items: [
    {
      image: { type: String }, // 图片
      url: { type: String }, // url
    }
  ]
});

module.exports = mongoose.model('Ad', schema);
