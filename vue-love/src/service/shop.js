import Fetch from '../server/fetch';
// 新增
const addShop = async (obj) => await Fetch(`/shop/addShop`,obj).then(res=>res);
// 更改门店（新增店员）
const updateShop = async (obj) => await Fetch(`/shop/updateShop`,obj).then(res=>res);
// 通过门店id获取门店店员信息
const getEmployeeByShopId = async (obj) => await Fetch(`/shop/getEmployeeByShopId`,obj).then(res=>res);
//通过用户id获取门店
const getShopByUserId = async (_id) => await fetch(`/shop/getShopByUserId?_id=${_id}`).then(Response => Response.json());

// 通过当前页和每一页显示的条数去获取门店信息
const getShopsByPage = async ({ currentPage = 1, eachPage = 3, userId } = {}) => await fetch(`/shop/getShopsByPage?currentPage=${currentPage}&eachPage=${eachPage}&userId=${userId}`).then(response => response.json())
// 删除员工
const removeEmployeeByShopId = async (obj) => await Fetch(`/shop/removeEmployeeByShopId`,obj).then(res=>res);
const getServicesByUserId = async (obj) => await Fetch(`/service/getServicesByUserId`,obj).then(res=>res);
// 新增服务
const addServiceIdOnShops = async (obj) => await Fetch(`/shop/addServiceIdOnShops`,obj).then(res=>res);
const getServiceByShopId = async (obj) => await Fetch(`/shop/getServiceByShopId`,obj).then(res=>res);
const removeServiceOnShop = async (obj) => await Fetch(`/shop/removeServiceOnShop`,obj).then(res=>res);
const getGoodsByUserId = async (obj) => await Fetch(`/goods/getGoodsByUserId`,obj).then(res=>res);
// 新增商品
const addGoodsIdOnShops = async (obj) => await Fetch(`/shop/addGoodsIdOnShops`,obj).then(res=>res);
const getGoodsByShopId = async (obj) => await Fetch(`/shop/getGoodsByShopId`,obj).then(res=>res);
const removeGoodsOnShop = async (obj) => await Fetch(`/shop/removeGoodsOnShop`,obj).then(res=>res);
const getPetsByUserId = async (obj) => await Fetch(`/pet/getPetsByUserId`,obj).then(res=>res);
// 新增宠物
const addPetsIdOnShops = async (obj) => await Fetch(`/shop/addPetsIdOnShops`,obj).then(res=>res);
const getPetsByShopId = async (obj) => await Fetch(`/shop/getPetsByShopId`,obj).then(res=>res);
const removePetsOnShop = async (obj) => await Fetch(`/shop/removePetsOnShop`,obj).then(res=>res);
export default {
    addShop,  getShopsByPage, updateShop,
    getEmployeeByShopId, removeEmployeeByShopId, getServicesByUserId,
    addServiceIdOnShops, getServiceByShopId, removeServiceOnShop,
    getGoodsByUserId, addGoodsIdOnShops, getGoodsByShopId, removeGoodsOnShop,
    getPetsByUserId, addPetsIdOnShops, getPetsByShopId, removePetsOnShop,getShopByUserId
}
