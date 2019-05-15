var express = require('express');
var router = express.Router();


const { addPets, findPets, removePets, getPetsByUserId, updatePets
} = require("../service/petsService.js");
const { uploadFile } = require("../util/upload");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//上传图片
router.post('/addPetImg', async function (req, res, next) {
  let result = await uploadFile(req, res, {
    fileType: "pets", //图片保存文件名
    path: './public/images' //保存路径
  });
  res.send(result)
})
//添加宠物
router.post('/addPets', async function (req, res, next) {
  console.log(req.body);

  res.send(await addPets(req.body));
});

//宠物列表
router.post('/findPets', async function (req, res, next) {
  res.send(await findPets(req.body));
});

//删除宠物
router.post('/removePets', async function (req, res, next) {
  res.send(await removePets(req.body));
});

//修改宠物信息
router.post('/updatePets', async function (req, res, next) {
  res.send(await updatePets(req.body));
});


// 通过用户id去拿其名下所有的宠物
router.post('/getPetsByUserId', async function (req, res, next) {
  res.send(await getPetsByUserId(req.body));
})
module.exports = router;