var express = require('express');
var router = express.Router();

const { addShop,getShopsByPage ,updateShop,findshops,updateshops,
    getEmployeeByShopId,removeEmployeeByShopId,
    addServiceIdOnShops,getServiceByShopId,removeServiceOnShop,
    addGoodsIdOnShops,getGoodsByShopId,removeGoodsOnShop,
    addPetsIdOnShops,getPetsByShopId,removePetsOnShop,getShopByUserId } = require("../service/shopService");
const { uploadFile } = require("../util/upload");
// 新增门店
router.post('/addShop', async function (req, res, next) {
    res.send(await addShop(req.body));
});
// 更改门店(新增店员)
router.post('/updateShop', async function (req, res, next) {
    res.send(await updateShop(req.body));
});
// 通过门店id获取店员信息
router.post('/getEmployeeByShopId', async function (req, res, next) {
    res.send(await getEmployeeByShopId(req.body));
});
// 删除员工
router.post('/removeEmployeeByShopId', async function (req, res, next) {
    res.send(await removeEmployeeByShopId(req.body));
});
//营业执照图片上传
router.post('/addShopLicenceImg', async function (req, res, next) {
    let result = await uploadFile(req, res, {
        fileType: "ShopLicenceImg", //图片保存文件名
        path: './public/images' //保存路径
    });
    res.send(result)
});
// 头图上传（门店店招图片）
router.post('/addShopImg', async function (req, res, next) {
    let result = await uploadFile(req, res, {
        fileType: "ShopImg", //图片保存文件名
        path: './public/images' //保存路径
    });
    res.send(result)
});
//通过传过来的页数获取门店数据
router.get("/getShopsByPage", async function (req, res, next) {
    res.send(await getShopsByPage(req.query));
});


//寻找待审核门店
router.post('/findshops', async function (req, res, next) {
    res.send(await findshops(req.body))    
});

//updateshops  更改门店状态
router.post('/updateshops', async function (req, res, next) {
    res.send(await updateshops(req.body))
})
    
// 新增服务
router.post("/addServiceIdOnShops", async function (req, res, next) {
    res.send(await addServiceIdOnShops(req.body));
});
// 获取服务
router.post("/getServiceByShopId", async function (req, res, next) {
    res.send(await getServiceByShopId(req.body));
});
// 删除服务
router.post("/removeServiceOnShop", async function (req, res, next) {
    res.send(await removeServiceOnShop(req.body));
});
// 新增商品
router.post("/addGoodsIdOnShops", async function (req, res, next) {
    res.send(await addGoodsIdOnShops(req.body));
});
// 获取商品
router.post("/getGoodsByShopId", async function (req, res, next) {
    res.send(await getGoodsByShopId(req.body));
});
// 删除商品
router.post("/removeGoodsOnShop", async function (req, res, next) {
    res.send(await removeGoodsOnShop(req.body));
});
// 新增宠物
router.post("/addPetsIdOnShops", async function (req, res, next) {
    res.send(await addPetsIdOnShops(req.body));
});
// 获取宠物
router.post("/getPetsByShopId", async function (req, res, next) {
    res.send(await getPetsByShopId(req.body));
});
// 删除宠物
router.post("/removePetsOnShop", async function (req, res, next) {
    res.send(await removePetsOnShop(req.body));
});


router.get("/getShopByUserId", async function (req, res, next) {
    res.send(await getShopByUserId(req.query));
});



module.exports = router;
