const { addShop, getShopsByPage, updateShop, getEmployeeByShopId, removeEmployeeByShopId ,getShopByUserId} = require("../dao/shopDao");
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