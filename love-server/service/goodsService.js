const { addGoods, getGoods, getGoodsByPage, removeGoodById } = require("../dao/goodsDao");
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
module.exports.getGoodsByPage = async function ({ currentPage, eachPage }) {
    return await getGoodsByPage({ currentPage, eachPage });
}

//删除商品
module.exports.removeGoodById = async function (id) {
    let data = await removeGoodById(id);
    console.log(data);
    if (data.ok > 0) {
        return true
    } else {
        return false;
    }
}