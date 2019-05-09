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

module.exports.register = async function (user) {
    return await mongoose.model("usersModel").create(user);
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
//审核
module.exports.editStatusByUserId = async function ({ _id, userStatus }) {
    return await mongoose.model("usersModel").updateOne({ _id },{userStatus})

}

