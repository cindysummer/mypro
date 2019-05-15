const { getMastersByPage, addMaster, removeMaster, login } = require("../dao/masterDao");

module.exports.getMastersByPage = async function (page) {
    return await getMastersByPage(page);
}

module.exports.addMaster = async function (obj) {
    return await addMaster(obj);
}
module.exports.removeMaster = async function (id) {
    return await removeMaster(id);
}
module.exports.login = async function (obj) {
     return await login(obj);
}