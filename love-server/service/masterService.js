const {getMastersByPage ,addMaster} = require("../dao/masterDao");

module.exports.getMastersByPage = async function (page) {
    return await getMastersByPage(page);
}

module.exports.addMaster = async function (obj) {
    return await addMaster(obj);
}