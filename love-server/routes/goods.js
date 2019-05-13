var express = require('express');
var router = express.Router();
const { addGoods, getGoods, getGoodsByPage, removeGoodById, updateGoods, getGoodsByUserId } = require("../service/goodsService");
// const { addGoods, getGoods, getGoodsByPage, removeGoodById, } = require("../service/goodsService");
const { uploadFile } = require("../util/upload");
//新增商品
router.post('/addGoods', async function (req, res, next) {
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
//按分页进行查询goods
router.post('/getGoodsByPage', async function (req, res, next) {
  res.send(await getGoodsByPage(req.body))
});
//，根据id删除商品
router.post('/removeGoodById', async function (req, res, next) {
  res.send(await removeGoodById(req.body))
})
//更新商品信息
router.post('/updateGoods', async function (req, res, next) {
  res.send(await updateGoods(req.body))
})
// 通过用户id去拿其名下所有的商品
router.post('/getGoodsByUserId', async function (req, res, next) {
  res.send(await getGoodsByUserId(req.body));
})

module.exports = router;