const { getUserMesById, login, getUserById, register, getAuditShopkeepersByPage,updataUser, editStatusByUserId,getShopUsers,removeUser } = require("../dao/usersDao");
module.exports.getUserMesById = async (userId) => {
    let data = await getUserMesById(userId);
    const { goodsId, serviceId, petId } = data[0];
    const goodsArr = goodsId.map(item => ({
        _id: item._id,
        goodsName: item.goodsName
    }));
    const serviceArr = serviceId.map(item => ({
        _id: item._id,
        serviceName: item.serviceName
    }));
    const petArr = petId.map(item => ({
        _id: item._id,
        petName: item.petName
    }));
    const result = { goodsArr, serviceArr, petArr }
    return result;
}

module.exports.login = async function (user) {
    let data = await login(user);
    if (data.length > 0) {
        return data; //如果存在返回该用户的角色和状态
    } else {
        return false//表示用户不存在
    }
}
module.exports.getUserById = async function (id) {
    return await getUserById(id);
}
module.exports.updataUser = async function (obj) {
    return await updataUser(obj);
}

module.exports.removeUser = async function (id) {
    return await removeUser(id);
}


module.exports.getShopUsers = async function (userType) {
    return await getShopUsers(userType);
}

module.exports.register = async function (user) {
    return await register(user);
}
//获取待审核门店管理员
module.exports.getAuditShopkeepersByPage = async function (userStatus) {
    return await getAuditShopkeepersByPage(userStatus);
}

//对门店管理员的审核
module.exports.editStatusByUserId = async function ({ _id, userStatus }) {
    const data = await editStatusByUserId({ _id, userStatus });
    if (data.ok) {
        return true
    } else {
        return false
    }

}

