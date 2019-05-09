const mongoose = require("mongoose");

module.exports.getMastersByPage = async function ({ currentPage, eachPage }) {
    let count = await mongoose.model("masterModel").countDocuments();//studentsModel身上有个方法countDocuments可以获取到当前关联的数据集合的数据条数
    let totalPage = Math.ceil(count / eachPage);//总页数等于总条数除以每个页面显示的条数
    let masters = await mongoose.model("masterModel")
        .find()
        .populate("petId")
        .skip((currentPage - 1) * eachPage)
        .limit(eachPage - 0);
    let pageData = {
        currentPage, //当前页码
        eachPage, //每页显示条数
        totalPage, //总页数
        count, //总条数
        masters
    }
    return pageData;
}

module.exports.addMaster = async (master) => {
    return await mongoose.model("masterModel").create(master);
}