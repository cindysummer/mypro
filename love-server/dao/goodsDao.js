const mongoose = require("mongoose");
//新增goods
module.exports.addGoods = async (goods) => {
    return await mongoose.model("goodsModel").create(goods);
}
//获取所有goods
module.exports.getGoods = async () => {
    return await mongoose.model("goodsModel").find();
}

// 按页获取goods
module.exports.getGoodsByPage = async function ({ currentPage, eachPage, userId, goodsType, text }) {
    let goods, count;
    if (goodsType == undefined || text == undefined) {
        count = await mongoose.model("goodsModel").find({ userId }).countDocuments();
        goods = await mongoose.model("goodsModel")
            .find({ userId })
            .skip((currentPage - 1) * eachPage)
            .limit(eachPage - 0);
    }
    else {
        count = await mongoose.model("goodsModel").find({ userId, [goodsType]: text }).countDocuments();
        goods = await mongoose.model("goodsModel")
            .find({ userId, [goodsType]: text })
            .skip((currentPage - 1) * eachPage)
            .limit(eachPage - 0);
    }
    let totalPage = Math.ceil(count / eachPage);
    let pageDate = {
        currentPage: ~~currentPage,
        eachPage: ~~eachPage,
        totalPage,
        count,
        goods,
    };
    return pageDate
}
//通过id删除商品
module.exports.removeGoodById = async function (_id) {
    return await mongoose.model("goodsModel").deleteOne(_id)
}
//更新商品信息
module.exports.updateGoods = async function (goods) {
    return await mongoose.model("goodsModel").updateOne({ _id: goods._id }, goods)
}
// 通过用户id获取对应商品
module.exports.getGoodsByUserId = async function (userId) {
    return await mongoose.model("goodsModel").find(userId);
}