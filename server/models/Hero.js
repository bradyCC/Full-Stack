/**
 * Created by brady on 2019/6/15.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String }, // 名称
  avatar: { type: String }, // 头像
  title: { type: String },  //
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 职业，关联
  scores: {
    difficult: { type: Number },  // 难度
    skills: { type: Number }, // 技能
    attack: { type: Number }, // 攻击
    survive: { type: Number }, // 生存
  },
  skills: [
    {
      icon: { type: String }, // 图标
      name: { type: String }, // 名称
      description: { type: String },  // 描述
      tips: { type: String }, // 提示
    }
  ],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 顺风出装 装备，关联
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 逆风出装 装备，关联
  usageTips: { type: String },  // 使用技巧
  battleTips: { type: String }, // 对抗技巧
  teamTips: { type: String }, // 团战思路
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }, // 英雄，关联
      description: { type: String },  // 描述
    }
  ],
})

module.exports = mongoose.model('Hero', schema);
