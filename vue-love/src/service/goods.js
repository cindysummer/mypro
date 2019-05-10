//新增商品
const addGoods = async (obj) => await fetch(`/goods/addGoods`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());

//按分页信息获取商品列表
// const getGoodsByPage = async (
//     { currentPage, eachPage, userId, goodsType, text } = {}) =>
//     await fetch(`/goods/getGoodsByPage?currentPage=${currentPage}&eachPage=${eachPage}&userId=${userId}$goodsType=${goodsType}&text=${text}`).then(response => response.json())

const getGoodsByPage = async (obj) => await fetch(`/goods/getGoodsByPage`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());
//通过id删除对应商品
const removedGoodById = async (obj) => await fetch(`/goods/removeGoodById`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());

//更新商品信息
const updateGoods = async (obj) => await fetch(`/goods/updateGoods`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());

export default {
    addGoods, getGoodsByPage, removedGoodById, updateGoods
}