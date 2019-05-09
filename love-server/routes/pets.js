var express = require('express');
var router = express.Router();

const { addPets,findPets,removePets
} = require("../service/petsService.js");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//添加宠物
router.post('/addPets', async function(req, res, next) {
  // console.log(req.body);
  res.send(await addPets(req.body));
  // res.send(true);
});

//宠物列表
router.post('/findPets', async function(req, res, next) {
  res.send(await findPets(req.body));
});

//删除宠物
router.post('/removePets', async function(req, res, next) {
  // console.log(req.body);
  res.send(await removePets(req.body));
});

module.exports = router;


// db.users.insert({
//   userAccount:"123",
//   userPwd:"123",
//   userType:"1",
//   userStatus:"1"
// })

// db.users.insert({
//   userAccount:"456",
//   userPwd:"456",
//   userType:"0",
//   userStatus:"1"
// })