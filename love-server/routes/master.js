var express = require('express');
var router = express.Router();

/* GET home page. */

const { getMastersByPage, removeMaster, addMaster, isLogin, getMaster, login } = require("../service/masterService");

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/getMastersByPage", async function (req, res, next) {
  res.send(await getMastersByPage(req.query));//get传过来的数据在req的query身上
});

router.get("/addMaster", async function (req, res, next) {
  res.send(await addMaster(req.query));//get传过来的数据在req的query身上
});
router.get("/getMaster", async function (req, res, next) {
  res.send(await getMaster(req.query));//get传过来的数据在req的query身上
});

router.post('/removeMaster', async function (req, res, next) {
  let data = await removeMaster(req.body);
  res.send(data);
});
router.get("/isLogin", async function (req, res, next) {
  res.send(await isLogin(req.query));//get传过来的数据在req的query身上
})
router.post('/login', async function (req, res, next) {
  let data = await login(req.body);
  res.send(data);
});


module.exports = router;