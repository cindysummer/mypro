const mongoose = require("mongoose");

//登录
module.exports.login = async function (user) {
    return await mongoose.model("usersModel").find(user);
}
//获取用户信息
module.exports.getUserById = async function (_id) {
    return await mongoose.model("usersModel").find(_id);
}

module.exports.register = async function (user) {
    return await mongoose.model("usersModel").create(user);
}