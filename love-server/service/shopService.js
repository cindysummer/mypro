const {
    getEmployeeByShopId, removeEmployeeByShopId,addShop,getShopsByPage,updateShop,findshops,updateshops,
    addServiceIdOnShops,getServiceByShopId,removeServiceOnShop,updateEmployeeByShopId,
    addGoodsIdOnShops,getGoodsByShopId,removeGoodsOnShop,
    addPetsIdOnShops,getPetsByShopId,removePetsOnShop,getShopByUserId ,getShop} = require("../dao/shopDao");
module.exports.addShop = async (shop) => {
    let data = await addShop(shop);
    if (data) {
        return true;
    } else {
        return false;
    }
}
module.exports.getShopsByPage = async function (page) {
    return await getShopsByPage(page);
}
module.exports.updateShop = async function (shopMes) {
    const data = await updateShop(shopMes);
    if (data.ok > 0) {
        return true;
    } else {
        return false;
    }
}
module.exports.getEmployeeByShopId = async function (shopId) {
    return await getEmployeeByShopId(shopId);
}

module.exports.getShopByUserId = async function (userId) {
   
    return await getShopByUserId(userId);
}

module.exports.removeEmployeeByShopId = async function (shop) {
    const data = await removeEmployeeByShopId(shop);
    if (data.ok > 0) {
        return true;
    } else {
        return false;
    }
}
module.exports.updateEmployeeByShopId=async function(shop){
    const data = await updateEmployeeByShopId(shop);
    if (data.ok > 0) {
        return true;
    } else {
        return false;
    }
}
//
module.exports.findshops = async function (shop) {
    const data = await findshops(shop);
    return data;
}
//

module.exports.updateshops = async function (shop) {
    const data = await updateshops(shop);
    if (data.ok > 0) {
        delete shop._id;
        delete shop.shopStatus;
        return shop;
    }
}
// 新增服务
module.exports.addServiceIdOnShops=async function(obj){
    const data= await addServiceIdOnShops(obj);
    if (data.ok > 0) {
        return true;
    } else {
        return false;
    }
}

// 获取服务
module.exports.getServiceByShopId=async function(shopId){
    return await getServiceByShopId(shopId);
}
// 删除服务
module.exports.removeServiceOnShop=async function(obj){
    const data= await removeServiceOnShop(obj);
    if (data.ok > 0) {
        return true;
    } else {
        return false;
    }
}
// 新增商品
module.exports.addGoodsIdOnShops=async function(obj){
    const data= await addGoodsIdOnShops(obj);
    if (data.ok > 0) {
        return true;
    } else {
        return false;
    }
}
// 获取商品
module.exports.getGoodsByShopId=async function(shopId){
    return await getGoodsByShopId(shopId);
}
// 删除商品
module.exports.removeGoodsOnShop=async function(obj){
    const data= await removeGoodsOnShop(obj);
    if (data.ok > 0) {
        return true;
    } else {
        return false;
    }
}
// 新增宠物
module.exports.addPetsIdOnShops=async function(obj){
    const data= await addPetsIdOnShops(obj);
    if (data.ok > 0) {
        return true;
    } else {
        return false;
    }
}
// 获取宠物
module.exports.getPetsByShopId=async function(shopId){
    return await getPetsByShopId(shopId);
}
// 删除宠物
module.exports.removePetsOnShop=async function(obj){
    const data= await removePetsOnShop(obj);
    if (data.ok > 0) {
        return true;
    } else {
        return false;
    }
}

// 获取所有门店
module.exports.getShop=async function(){
    return await getShop();
}