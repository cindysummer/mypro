// 服务管理
// 数据层 
const mongoose = require("mongoose");
module.exports.addServices = async function (data) {
    return await mongoose.model("serviceModel").create(data);
}
module.exports.getServicesByUserId = async function (userId) {
    return await mongoose.model("serviceModel").find(userId);
}

//获取所有services
module.exports.getServices = async (data) => {
    return await mongoose.model("serviceModel").create(data);
}

//按页获取services
module.exports.getServicesByPage = async function ({ currentPage, eachPage, service, text, userId }) {
    let count, services;
    if (text === undefined) {
        count = await mongoose.model("serviceModel").find({ userId }).countDocuments();
        services = await mongoose.model("serviceModel")
            .find({ userId })
            .skip((currentPage - 1) * eachPage)
            .limit(eachPage - 0);
    } else {
        count = await mongoose.model("serviceModel").find({ userId, [service]: text }).countDocuments();
        services = await mongoose.model("serviceModel")
            .find({ userId, [service]: text })
            .skip((currentPage - 1) * eachPage)
            .limit(eachPage - 0);
    }
    let totalPage = Math.ceil(count / eachPage);
    let pageDate = {
        currentPage: ~~currentPage,
        eachPage: ~~eachPage,
        totalPage,
        count,
        services,
    };
    return pageDate
}
//通过id删除服务
module.exports.removeServiceById = async function (_id) {
    return await mongoose.model("serviceModel").deleteOne(_id)
}

//更新商品信息
module.exports.updateServices = async function (data) {
    return await mongoose.model("serviceModel").updateOne({ _id: data._id }, data)
}
