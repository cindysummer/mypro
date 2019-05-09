//新增商品
const addGoods = async (obj) => await fetch(`/goods/addGoods`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());
//按分页信息获取商品列表
const getGoodsByPage = async (
    { currentPage, eachPage } = {}) =>
    await fetch(`/goods/getGoodsByPage?currentPage=${currentPage}&eachPage=${eachPage}`).then(response => response.json())

//通过id删除对应商品
const removedGoodById = async (obj) => await fetch(`/goods/removeGoodById`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());
export default {
    addGoods, getGoodsByPage, removedGoodById
}