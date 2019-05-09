// 服务管理
// 数据层 
const mongoose = require("mongoose");
module.exports.addServices = async function (data) {
    return await mongoose.model("serviceModel").create(data);
}
module.exports.getServicesByUserId=async function(userId){
    return await mongoose.model("serviceModel").find(userId);
}