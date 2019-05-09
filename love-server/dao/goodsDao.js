const mongoose = require("mongoose");
//新增goods
module.exports.addGoods = async (goods) => {
    console.log(goods);
    
    return await mongoose.model("goodsModel").create(goods);
}
//获取所有goods
module.exports.getGoods = async () => {
    return await mongoose.model("goodsModel").find();
}

// 按页获取goods
module.exports.getGoodsByPage = async function ({ currentPage, eachPage }) {
    let count = await mongoose.model("goodsModel").countDocuments();
    let totalPage = Math.ceil(count / eachPage);
    let goods = await mongoose.model("goodsModel")
        .find()
        .skip((currentPage - 1) * eachPage)
        .limit(eachPage - 0);
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