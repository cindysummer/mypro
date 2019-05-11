const { addGoods, getGoods, getGoodsByPage, removeGoodById, updateGoods, getGoodsByUserId } = require("../dao/goodsDao");
//新增商品
module.exports.addGoods = async function (goods) {
    let data = await addGoods(goods);
    if (data._id) {
        return true
    } else {
        return false
    }
}
//获取全部商品
module.exports.getGoods = async function () {
    return await getGoods();
}
//按分页获取goods
module.exports.getGoodsByPage = async function ({ currentPage, eachPage, userId, goodsType, text }) {
    const data = await getGoodsByPage({ currentPage, eachPage, userId, goodsType, text });
    return data
}
//删除商品
module.exports.removeGoodById = async function (id) {
    let data = await removeGoodById(id);
    if (data.ok > 0) {
        return true
    } else {
        return false;
    }
}

//更新商品信息
module.exports.updateGoods = async function (goods) {
    let data = await updateGoods(goods);
    if (data.ok) {
        return true
    } else {
        return false
    }
}
module.exports.getGoodsByUserId = async function (userId) {
    return await getGoodsByUserId(userId);
}