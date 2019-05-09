const mongoose = require("mongoose");
module.exports.getUserMesById = async (userId) => {
    return await mongoose.model("usersModel").find(userId)
        .populate("goodsId")
        .populate("serviceId")
        .populate("petId")
}

//登录
module.exports.login = async function (user) {
    return await mongoose.model("usersModel").find(user);
}
//获取用户信息
module.exports.getUserById = async function (_id) {
    return await mongoose.model("usersModel").find(_id);
}