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


export default {
    findShops,updateshops
}