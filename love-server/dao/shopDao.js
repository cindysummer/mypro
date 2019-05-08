const mongoose = require("mongoose");
module.exports.addShop = async (shop) => {
    return await mongoose.model("shopModel").create(shop);
}
module.exports.getShopsByPage = async function ({ currentPage, eachPage }) {
    let count = await mongoose.model("shopModel").countDocuments();
    let totalPage = Math.ceil(count / eachPage);
    let shops = await mongoose.model("shopModel")
        .find()
        .skip((currentPage - 1) * eachPage)
        .limit(eachPage-0);
    let pageData = {
        currentPage, //当前页码
        eachPage, //每页显示条数
        totalPage, //总页数
        count, //总条数
        shops  //学生数据
    }
    return pageData;
}