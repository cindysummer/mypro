// 服务管理
// 逻辑层
let { addServices,getServicesByUserId } = require("../dao/servicesDao");
module.exports.addServices = async function (user) {
    let data = await addServices(user);
    if (data.length > 0) {
        return false;
    } else {
        return true;
    }
}
module.exports.getServicesByUserId=async function(userId){
    return await getServicesByUserId(userId);
}