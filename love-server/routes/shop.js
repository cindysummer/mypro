var express = require('express');
var router = express.Router();

const { addShop,getShopsByPage ,updateShop,getEmployeeByShopId,removeEmployeeByShopId} = require("../service/shopService");
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
module.exports = router;
