var express = require('express');
var router = express.Router();

const {getUserMesById,login,getUserById,register}=require("../service/usersService");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/getUserMesById', async function (req, res, next) {
  res.send(await getUserMesById(req.body));
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

module.exports = router;
