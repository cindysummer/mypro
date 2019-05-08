var express = require('express');
var router = express.Router();
const { addGoods, getGoods } = require("../service/goodsService");
const { uploadFile } = require("../util/upload");
//新增商品
router.post('/addGoods', async function (req, res, next) {
  console.log(req.body)
  res.send(await addGoods(req.body))
});

//获取全部商品
router.get('/getGoods', async function (req, res, next) {
  res.send(await getGoods(res.query))
});
//图片上传
router.post('/addImg', async function (req, res, next) {
  let result = await uploadFile(req, res, {
    fileType: "goods", //图片保存文件名
    path: './public/images' //保存路径
  });
  res.send(result)
})
module.exports = router;