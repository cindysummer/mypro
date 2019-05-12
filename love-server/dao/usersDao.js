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

module.exports.removeUser = async function (_id) {
    return await mongoose.model("usersModel").deleteOne(_id);
}

module.exports.updataUser = async function ({ _id, userPwd, userPhone,userEmail}) {
    return await mongoose.model("usersModel").updateOne({ _id }, { userPwd, userPhone,userEmail })
}


module.exports.getAuditShopkeepersByPage = async function ({ currentPage, eachPage, userStatus }) {
    let count = await mongoose.model("usersModel").find({ userStatus }).countDocuments();
    let totalPage = Math.ceil(count / eachPage);
    let rows = await mongoose.model("usersModel")
        .find({ userStatus })
        .skip((currentPage - 1) * eachPage)
        .limit(eachPage - 0);
    let pageDate = {
        currentPage: ~~currentPage,
        eachPage: ~~eachPage,
        totalPage,
        count,
        rows,
    };
    return pageDate
}
//对门店管理员的审核
module.exports.editStatusByUserId = async function ({ _id, userStatus }) {
    return await mongoose.model("usersModel").updateOne({ _id }, { userStatus })
}
module.exports.getShopUsers = async function ({ currentPage, eachPage }) {
    let count = await mongoose.model("usersModel").find({ userType: "0", userStatus: "1" }).countDocuments();
    let totalPage = Math.ceil(count / eachPage);
    let users = await mongoose.model("usersModel")
        .find({ userType: "0", userStatus: "1" })
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
