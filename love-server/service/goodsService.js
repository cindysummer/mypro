const { addGoods, getGoods } = require("../dao/goodsDao");
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

