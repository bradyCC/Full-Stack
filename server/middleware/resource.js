/**
 * Created by brady on 2019/6/18.
 */
const inflection = require('inflection'); // 处理单复数转换

module.exports = options => {

  return (req, res, next) => {
    // 获取参数大写类名
    const modelName = inflection.classify(req.params.resourse);
    // 获取Model模型
    req.Model = require(`../models/${modelName}`);

    next();
  }
}
