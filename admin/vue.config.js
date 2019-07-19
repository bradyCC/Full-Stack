/**
 * Created by brady on 2019/6/15.
 */
module.exports = {
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/',
  devServer: {
    // public: '192.168.1.119:8080'
  }
}
