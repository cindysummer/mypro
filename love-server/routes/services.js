// 页面层 服务管理
var express = require('express');
var router = express.Router();
const { addServices, getServicesByUserId, getServicesByPage,
  getServices, removeServiceById, updateServices } = require("../service/servicesServive");
const { uploadFile } = require("../util/upload");
/* GET home page. */
router.post('/addServices', async function (req, res, next) {
  res.send(await addServices(req.body));
});
// 通过用户id去拿其名下所有的服务
router.post('/getServicesByUserId', async function (req, res, next) {
  res.send(await getServicesByUserId(req.body));
})
//获取全部服务
router.get('/getServices', async function (req, res, next) {
  res.send(await getServices(res.query))
});


//，根据id删除服务
router.post('/removeServiceById', async function (req, res, next) {
  res.send(await removeServiceById(req.body));
})

//按分页进行查询
router.post('/getServicesByPage', async function (req, res, next) {
  res.send(await getServicesByPage(req.body))
});

//更新商品信息
router.post('/updateServices', async function (req, res, next) {
  res.send(await updateServices(req.body))
})
// 上传图片
router.post('/addserviceImg', async function (req, res, next) {
  let result = await uploadFile(req, res, {
    fileType: "ServiceImg", //图片保存文件名
    path: './public/images' //保存路径
  });
  res.send(result)
});
module.exports = router;