// 页面层 服务管理
var express = require('express');
var router = express.Router();
const { addServices} = require("../service/servicesServive");
  
/* GET home page. */
router.post('/addServices',async function(req, res, next) {
  // console.log(req.body);
  res.send(await addServices(req.body));
});

// router.get("/getShopsByPage", async function (req, res, next) {
//   res.send(await getShopsByPage(req.query));
// });

module.exports = router;