'use strict'
const fs = require('fs-extra');

module.exports = {
    copyFile(req, res) {
      let path = '../src/assets/' + req.body.fileName;
      let outPath = '../static/' + req.body.fileName;
      fs.copy(path, outPath)
      .then(() => res.json({code: 200, msg: outPath}))
      .catch(err => res.json({code: 500, msg: '图片加载失败！'}))
    }
}
