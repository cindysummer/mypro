var express = require('express');
var router = express.Router();

/* GET home page. */

const {getMastersByPage,removeMaster,addMaster } = require("../service/masterService");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/getMastersByPage", async function (req, res, next) {
  res.send(await getMastersByPage(req.query));//get传过来的数据在req的query身上
});

router.get("/addMaster", async function (req, res, next) {
  res.send(await addMaster(req.body));//get传过来的数据在req的query身上
});

router.post('/removeMaster', async function (req, res, next) {
  let data = await removeMaster(req.body);
  res.send(data);
});


module.exports = router;