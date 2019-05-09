// 新增
const addShop = async (obj) => await fetch(`/shop/addShop`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());
// 更改门店（新增店员）
const updateShop = async (obj) => await fetch(`/shop/updateShop`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());
// 通过门店id获取门店店员信息
const getEmployeeByShopId = async (_id) => await fetch(`/shop/getEmployeeByShopId`, {
    method: "post",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded" //设置请求头为表单提交的方式
    },
    body: `_id=${_id}`
}).then(response => response.json());
// 根据门店管理员id去获取对应的商品、服务、宠物信息
const getUserMesById = async (_id) => await fetch(`/users/getUserMesById`, {
    method: "post",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded" //设置请求头为表单提交的方式
    },
    body: `_id=${_id}`
}).then(response => response.json());
// 通过当前页和每一页显示的条数去获取门店信息
const getShopsByPage = async ({ currentPage = 1, eachPage = 3, userId } = {}) => await fetch(`/shop/getShopsByPage?currentPage=${currentPage}&eachPage=${eachPage}&userId=${userId}`).then(response => response.json())
// 删除员工
const removeEmployeeByShopId = async (obj) => await fetch(`/shop/removeEmployeeByShopId`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());
const getServicesByUserId = async (_id) => await fetch(`/service/getServicesByUserId`, {
    method: "post",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded" //设置请求头为表单提交的方式
    },
    body: `userId=${_id}`
}).then(response => response.json());
export default {
    addShop, getUserMesById, getShopsByPage, updateShop,
    getEmployeeByShopId, removeEmployeeByShopId, getServicesByUserId
}
