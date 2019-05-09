var express = require('express');
var router = express.Router();

const {login,getUserById,register,getShopUsers}=require("../service/usersService");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async function (req, res, next) {
  let data = await login(req.body);
  res.send(data);
});

router.get('/getUserById',async function(req, res, next) {
  res.send(await getUserById(req.query));
});

router.post('/register', async function (req, res, next) {
  let data = await register(req.body);
  res.send(data);
});
//获取门店管理员信息
router.get('/getShopUsers',async function(req, res, next) {
  res.send(await getShopUsers(req.query));
});


module.exports = router;
