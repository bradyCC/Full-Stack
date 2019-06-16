/**
 * Created by brady on 2019/6/15.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String }, // 名称
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }, // 上级分类，关联
})

module.exports = mongoose.model('Category', schema);
