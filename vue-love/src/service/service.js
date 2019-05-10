import Fetch from '../server/fetch';
const addService = async (obj) => await Fetch(`/service/addServices`, obj).then(res => res);
// const getServicesByPage = async (
//     { currentPage, eachPage,service,text,userId } = {}) =>
//     await fetch(`/service/getServicesByPage?currentPage=${currentPage}&eachPage=${eachPage}&service=${service}&text=${text}&userId=${userId}`).then(response => response.json());
const getServicesByPage = async (obj) => await Fetch(`/service/getServicesByPage`, obj).then(res => res);
//通过id删除对应服务
const removeServiceById = async (obj) => await Fetch(`/service/removeServiceById`, obj).then(res => res);
//更新服务信息
const updateServices = async (obj) => await Fetch(`/service/updateServices`, obj).then(res => res);
export default {
    addService, getServicesByPage, removeServiceById, updateServices
}



