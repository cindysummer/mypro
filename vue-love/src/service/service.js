const addService = async (obj) => await fetch(`/service/addServices`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());

// const DelService = async (obj) => await fetch(`/service/removeServiceById`, {
//     method: "post",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(obj)
// }).then(response => response.json());

const getServicesByPage = async (
    { currentPage, eachPage } = {}) =>
    await fetch(`/service/getServicesByPage?currentPage=${currentPage}&eachPage=${eachPage}`).then(response => response.json());


//通过id删除对应商品
const removeServiceById = async (obj) => await fetch(`/service/removeServiceById`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());


export default {
    addService,getServicesByPage,removeServiceById
}



