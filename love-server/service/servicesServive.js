// 服务管理
// 逻辑层
let { addServices, getServices, removeServiceById, getServicesByPage, getServicesByUserId,updateServices } = require("../dao/servicesDao");
module.exports.addServices = async function (user) {
    let data = await addServices(user);
    if (data.length > 0) {
        return false;
    } else {
        return true;
    }
}
module.exports.getServicesByUserId = async function (userId) {
    return await getServicesByUserId(userId);
    console.log(data);
    //  await addServices(user);
    console.log(data);
    //  await addServices(user);
}

//获取全部商品
module.exports.getServices = async function () {
    return await getServices();
}

module.exports.removeServiceById = async function (id) {
    let data = await removeServiceById(id);
    if(data.ok>0){
        return true;
    }else{
        return false;
    }
}

//按分页获取goods
module.exports.getServicesByPage = async function ({ currentPage, eachPage }) {
    return await getServicesByPage({ currentPage, eachPage });
}


//更新商品信息
module.exports.updateServices = async function (data) {
    let ret = await updateServices(data);
    if (ret.ok) {
        return true
    } else {
        return false
    }
}
