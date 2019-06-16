/**
 * Created by brady on 2019/6/15.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 所属分类，关联
  title: { type: String }, // 标题
  body: { type: String }, // 详情
})

module.exports = mongoose.model('Article', schema);
