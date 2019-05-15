const mongoose = require("mongoose");
module.exports.addShop = async (shop) => {
    return await mongoose.model("shopModel").create(shop);
}
module.exports.updateShop = async (shopMes) => {
    const { _id, shopEmployee } = shopMes;
    const [data] = await mongoose.model("shopModel").find({ _id });
    data.shopEmployee.push(shopEmployee);
    return await mongoose.model("shopModel").updateOne({ _id }, { shopEmployee: data.shopEmployee });
}
module.exports.getEmployeeByShopId = async function (shopId) {
    return await mongoose.model("shopModel").find(shopId);
}
module.exports.removeEmployeeByShopId = async function (shop) {
    const { _id, shopEmployeeId } = shop;
    const [data] = await mongoose.model("shopModel").find({ _id });
    const newShopEmployee = data.shopEmployee.filter(item => item._id != shopEmployeeId);
    return await mongoose.model("shopModel").updateOne({ _id }, { shopEmployee: newShopEmployee });
}
module.exports.updateEmployeeByShopId = async function (shop) {
    const { _id, shopEmployee } = shop;
    const [data] = await mongoose.model("shopModel").find({ _id });
    const newShopEmployee = data.shopEmployee.filter(item => {
        if (item._id.toString() !== shopEmployee._id) {
            return item;
        }
    });
    newShopEmployee.push(shopEmployee);
    return await mongoose.model("shopModel").updateOne({ _id }, { shopEmployee: newShopEmployee });
}
// 新增服务
module.exports.addServiceIdOnShops = async function ({ _id, serviceId }) {
    const [data] = await mongoose.model("shopModel").find({ _id });
    data.serviceId.push(serviceId);
    return await mongoose.model("shopModel").updateOne({ _id }, { serviceId: data.serviceId });
}
// 获取服务
module.exports.getServiceByShopId = async function ({ shopId }) {
    const [data] = await mongoose.model("shopModel").find({ _id: shopId }).populate("serviceId");
    const service = data.serviceId;
    return service;
}
// 删除服务
module.exports.removeServiceOnShop = async function ({ _id, serviceId }) {
    const [data] = await mongoose.model("shopModel").find({ _id });
    const newSer = data.serviceId.filter(item => item != serviceId);
    return await mongoose.model("shopModel").updateOne({ _id }, { serviceId: newSer });
}
// 新增商品
module.exports.addGoodsIdOnShops = async function ({ _id, goodsId }) {
    const [data] = await mongoose.model("shopModel").find({ _id });
    data.goodsId.push(goodsId);
    return await mongoose.model("shopModel").updateOne({ _id }, { goodsId: data.goodsId });
}
// 获取商品
module.exports.getGoodsByShopId = async function ({ shopId }) {
    const [data] = await mongoose.model("shopModel").find({ _id: shopId }).populate("goodsId");
    const goods = data.goodsId;
    return goods;
}
// 删除商品
module.exports.removeGoodsOnShop = async function ({ _id, goodsId }) {
    const [data] = await mongoose.model("shopModel").find({ _id });
    const newGoods = data.goodsId.filter(item => item != goodsId);
    return await mongoose.model("shopModel").updateOne({ _id }, { goodsId: newGoods });
}
// 新增宠物
module.exports.addPetsIdOnShops = async function ({ _id, petsId }) {
    const [data] = await mongoose.model("shopModel").find({ _id });
    data.petsId.push(petsId);
    return await mongoose.model("shopModel").updateOne({ _id }, { petsId: data.petsId });
}
// 获取宠物
module.exports.getPetsByShopId = async function ({ shopId }) {
    const [data] = await mongoose.model("shopModel").find({ _id: shopId }).populate("petsId");
    const pets = data.petsId;
    return pets;
}
// 删除宠物
module.exports.removePetsOnShop = async function ({ _id, petsId }) {
    const [data] = await mongoose.model("shopModel").find({ _id });
    const newPets = data.petsId.filter(item => item != petsId);
    return await mongoose.model("shopModel").updateOne({ _id }, { petsId: newPets });
}
module.exports.getShopsByPage = async function ({ currentPage, eachPage, userId }) {
    let count = await mongoose.model("shopModel").find({ userId }).countDocuments();
    let totalPage = Math.ceil(count / eachPage);
    let shops = await mongoose.model("shopModel")
        .find({ userId })
        .skip((currentPage - 1) * eachPage)
        .limit(eachPage - 0);
    let pageData = {
        currentPage, //当前页码
        eachPage, //每页显示条数
        totalPage, //总页数
        count, //总条数
        shops  //学生数据
    }
    return pageData;
}

module.exports.findshops = async function (shop) {
    let count = await mongoose.model("shopModel").find({ shopStatus: "申请中" }).countDocuments();
    let msg = await mongoose.model("shopModel").find({ shopStatus: "申请中" })
        .skip((shop.currentPage - 1) * shop.pageSize)
        .limit(shop.pageSize - 0);
    let obj = {}
    obj.state = Object.assign(shop, { total: count });
    obj.msg = msg;
    return obj;
}

module.exports.updateshops = async function (shop) {
    return await mongoose.model("shopModel").updateOne({ _id: shop._id }, { shopStatus: shop.shopStatus })
}
module.exports.getShopByUserId = async (userId) => {
    return await mongoose.model("shopModel").find({ userId });
}
<<<<<<< HEAD
// 获取所有门店信息
module.exports.getShopsAll=async function(){
    return await mongoose.model("shopModel").find({shopStatus:"已审批"})
    .populate("goodsId").populate("serviceId").populate("petsId")
}
=======
module.exports.getShop = async () => {
    return await mongoose.model("shopModel").find({shopStatus:"已审批"})
        .populate("goodsId")
        .populate("serviceId")
        .populate("petId")


}  
>>>>>>> 2ac7204f054d414a5054a4e4db6ba3b9016692ae
