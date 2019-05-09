const addService = async (obj) => await fetch(`/service/addServices`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(response => response.json());
const getService = async ({ currentPage = 1, eachpage = 4 } = {}) => await fetch(`/service/getService?currentPage=${currentPage}&eachpage=${eachpage}`)
    .then(response => response.json())
export default {
    addService,getService
}