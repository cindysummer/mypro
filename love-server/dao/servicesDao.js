// 服务管理
// 数据层 
const mongoose = require("mongoose");
module.exports.addServices = async function (data) {
    return await mongoose.model("serviceModel").create(data);
}
module.exports.getServicesByUserId=async function(userId){
    return await mongoose.model("serviceModel").find(userId);
}

//获取所有services
module.exports.getServices = async (data) => {
    return await mongoose.model("serviceModel").create(data);
}

//按页获取services
module.exports.getServicesByPage = async function ({ currentPage, eachPage }) {
    let count = await mongoose.model("serviceModel").find().countDocuments();
    let totalPage = Math.ceil(count / eachPage);
    let services = await mongoose.model("serviceModel")
        .find()
        .skip((currentPage - 1) * eachPage)
        .limit(eachPage - 0);
    let pageDate = {
        currentPage: ~~currentPage,
        eachPage: ~~eachPage,
        totalPage,
        count,
        services,
    };
    return pageDate
}

module.exports.removeServiceById = async function (_id) {
    return await mongoose.model("serviceModel").deleteOne(_id)
}