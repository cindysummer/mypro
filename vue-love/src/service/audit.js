const findShops = async (obj) => await fetch(`/shop/findshops`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());


const updateshops = async (obj) => await fetch(`/shop/updateshops`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());

const getAuditShopkeepersByPage = async (
    { currentPage, eachPage } = {}) =>
    await fetch(`/users/getAuditShopkeepersByPage?currentPage=${currentPage}&eachPage=${eachPage}&userStatus=0`).then(response => response.json())
const editStatus = async (
    { _id, userStatus } = {}) =>
    await fetch(`/users/editStatusByUserId?_id=${_id}&userStatus=${userStatus}`).then(response => response.json())

export default { getAuditShopkeepersByPage, editStatus, findShops,updateshops }
