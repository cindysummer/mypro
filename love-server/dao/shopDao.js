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