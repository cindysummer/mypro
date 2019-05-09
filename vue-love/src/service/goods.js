const addGoods = async (obj) => await fetch(`/goods/addGoods`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());

const getGoodsByPage = async (
    { currentPage, eachPage } = {}) =>
    await fetch(`/goods/getGoodsByPage?currentPage=${currentPage}&eachPage=${eachPage}`).then(response => response.json())


const removedGoodById = async (obj) => await fetch(`/goods/removeGoodById`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());
export default {
    addGoods, getGoodsByPage
}