const { getMastersByPage, addMaster, removeMaster, isLogin, getMaster, login } = require("../dao/masterDao");

module.exports.getMastersByPage = async function (page) {
    return await getMastersByPage(page);
}

module.exports.addMaster = async function (obj) {
    return await addMaster(obj);
}
module.exports.getMaster = async function (memberAcount) {
    const data = await getMaster(memberAcount);
    if (data.length > 0) {
        return true;
    } else {
        return false;
    }
}
module.exports.removeMaster = async function (id) {
    return await removeMaster(id);
}
module.exports.isLogin = async function (user) {
    const data = await isLogin(user);
    if (data) {
        return data[0];
    } else {
        return false;
    }
}
module.exports.login = async function (obj) {
    return await login(obj);
}