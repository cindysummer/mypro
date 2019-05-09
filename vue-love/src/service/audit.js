const getAuditShopkeepersByPage = async (
    { currentPage, eachPage } = {}) =>
    await fetch(`/users/getAuditShopkeepersByPage?currentPage=${currentPage}&eachPage=${eachPage}&userStatus=0`).then(response => response.json())
const editStatus = async (
    { _id, userStatus } = {}) =>
    await fetch(`/users/editStatusByUserId?_id=${_id}&userStatus=${userStatus}`).then(response => response.json())

export default { getAuditShopkeepersByPage, editStatus }