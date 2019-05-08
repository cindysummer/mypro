const addGoods = async (obj) => await fetch(`/goods/addGoods`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());
export default {
    addGoods
}