/**
 * Created by brady on 2019/6/15.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String }, // 用户名
  password: { // 密码
    type: String,
    select: false, // 设置select: false 密码不查出，保存后不会更新
    set (val) {
      return require('bcrypt').hashSync(val, 10); // 散列模式
    }
  },
});

module.exports = mongoose.model('AdminUser', schema);
