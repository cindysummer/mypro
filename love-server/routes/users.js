var express = require('express');
var router = express.Router();

const { login, getUserById,
  register, getAuditShopkeepersByPage, editStatusByUserId,getShopUsers ,removeUser,updataUser} = require("../service/usersService");

router.post('/login', async function (req, res, next) {
  let data = await login(req.body);
  res.send(data);
});

router.post('/removeUser', async function (req, res, next) {
  let data = await removeUser(req.body);
  res.send(data);
});

router.post('/updataUser', async function (req, res, next) {
  let data = await updataUser(req.body);
  res.send(data);
});

router.get('/getUserById', async function (req, res, next) {
  res.send(await getUserById(req.query));
});

router.post('/register', async function (req, res, next) {
  let data = await register(req.body);
  
  res.send(data);
});
//获取待审核门店管理员
router.get('/getAuditShopkeepersByPage', async function (req, res, next) {
  res.send(await getAuditShopkeepersByPage(req.query))

});
//审核

router.get('/editStatusByUserId', async function (req, res, next) {
  res.send(await editStatusByUserId(req.query))

})
//获取门店管理员信息
router.get('/getShopUsers',async function(req, res, next) {
  res.send(await getShopUsers(req.query));
});


module.exports = router;
