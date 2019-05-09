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

module.exports.getShopUsers = async function ({ currentPage, eachPage }) {
    let count = await mongoose.model("usersModel").find({userType:"0",userStatus:"1"}).countDocuments();
    let totalPage = Math.ceil(count / eachPage);
    let users = await mongoose.model("usersModel")
        .find({userType:"0",userStatus:"1"})
        .skip((currentPage - 1) * eachPage)
        .limit(eachPage - 0);
    let pageData = {
        currentPage, //当前页码
        eachPage, //每页显示条数
        totalPage, //总页数
        count, //总条数
        users
    }
    return pageData;
}