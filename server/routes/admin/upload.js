/**
 * Created by brady on 2019-06-16.
 */
const express = require('express');
const multer = require('multer');

const upload = multer({dest: __dirname + '/../../public/upload'})
// app.use(multer({dest:'./public/upload'}).any());  //接收POST文件

module.exports = function() {
  let router = express.Router();

  // 上传图片
  router.post('/', upload.single('file'), async (req, res) => {
    const file = req.file;
    // file.url = `http://localhost:3000/public/upload/${file.filename}`
    file.url = `http://www.bradycc.com/public/upload/${file.filename}`
    res.send(file);
  });

  return router;
}
