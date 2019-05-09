// 页面层 服务管理
var express = require('express');
var router = express.Router();
const { addServices} = require("../service/servicesServive");
  
/* GET home page. */
router.post('/addServices',async function(req, res, next) {
  // console.log(req.body);
  res.send(await addServices(req.body));
});

//获取全部服务
router.get('/getServices', async function (req, res, next) {
  res.send(await getServices(res.query))
});
// router.get("/getShopsByPage", async function (req, res, next) {
//   res.send(await getShopsByPage(req.query));
// });

//，根据id删除服务
router.post('/removeServiceById', async function (req, res, next) {
  console.log(req.body);
  res.send(await removeServiceById(req.body));
})

//按分页进行查询goods
router.get('/getServicesByPage', async function (req, res, next) {
  console.log(req.query)
  res.send(await getServicesByPage(req.query))
});

module.exports = router;