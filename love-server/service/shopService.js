const { addShop, getShopsByPage, updateShop, 
    getEmployeeByShopId, removeEmployeeByShopId ,findshops,updateshops} = require("../dao/shopDao");
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

module.exports.removeEmployeeByShopId = async function (shop) {
    const data = await removeEmployeeByShopId(shop);
    if (data.ok > 0) {
        return true;
    } else {
        return false;
    }
}

//
module.exports.findshops = async function (shop) {
    // console.log(shop);
    const data = await findshops(shop);
    // console.log(data);
    
    return data;

}
//

module.exports.updateshops = async function (shop) {
    const data = await updateshops(shop);
    if (data.ok > 0) {
        delete shop._id;
        delete shop.shopStatus;
        return shop;
    } else {
        return false;
    }
}

