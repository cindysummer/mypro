import ShopService from '../service/shop';
export default {
    namespaced: true,
    state: {
        currentPage: 1,
        eachPage: 3,
        count: 0,
        totalPage: 0,
        shops: [],
        eachShop: {},
        shopEmployee: [],
        serviceArr: [],
        shopService: [],
        goodsArr: [],
        shopGoods: [],
        petsArr: [],
        shopPets: []
    },
    mutations: {
        getShopsByPage: (state, payload) => {
            // 不能直接将payload=state,这样就更改了原本响应式的state变成了非响应式state
            Object.assign(state, payload);
        },
        setEachPage: (state, eachPage) => {
            state.eachPage = eachPage;
            state.currentPage = 1;
        },
        setCurrentPage: (state, currentPage) => {
            state.currentPage = currentPage;
        },
        getEmployeeByShopId: (state, [payload]) => {
            state.shopEmployee = payload.shopEmployee;
        },
        // 保存当前点击门店的信息
        more: (state, payload) => {
            state.eachShop = payload;
        },
        getServicesByUserId: (state, payload) => {
            state.serviceArr = payload;
        },
        getServiceByShopId: (state, payload) => {
            state.shopService = payload;
        },
        getGoodsByUserId: (state, payload) => {
            state.goodsArr = payload;
        },
        getGoodsByShopId: (state, payload) => {
            state.shopGoods = payload;
        },
        getPetsByUserId: (state, payload) => {
            state.petsArr = payload;
        },
        getPetsByShopId: (state, payload) => {
            state.shopPets = payload;
        },
    },
    actions: {
        // 新增门店
        async addShopAsync(context, payload) {
            const that = payload.this;
            const addMes = payload.data;
            const data = await ShopService.addShop(addMes);
            if (data) {
                that.$message({
                    message: '新增成功！',
                    type: 'success'
                });
            }
        },
        // 通过页面限制获取门店信息
        async getShopsByPageAsync({ state, commit }) {
            const { currentPage, eachPage } = state;
            const userId = document.cookie.slice(4);
            const data = await ShopService.getShopsByPage({ currentPage, eachPage, userId });
            //将从后台拿到的数据从异步转回同步，相当于在组件里面的methods方法下面 
            commit("getShopsByPage", data);
        },
        // 获取员工信息
        async getEmployeeByShopIdAsync({ state, commit }) {
            const shopId = state.eachShop._id;
            const data = await ShopService.getEmployeeByShopId({ _id: shopId });
            commit("getEmployeeByShopId", data);
        },
        // 新增员工
        async updateShopAsync({ state, dispatch }, payload) {
            const shopId = state.eachShop._id;
            const data = await ShopService.updateShop({ _id: shopId, shopEmployee: payload });
            // 如果新增店员成功的话就获取店员信息
            if (data) {
                dispatch("getEmployeeByShopIdAsync")
            }
        },
        // 删除员工
        async removeEmployeeByShopIdAsync({ state, dispatch }, { _id }) {
            const shopId = state.eachShop._id;
            const data = await ShopService.removeEmployeeByShopId({ _id: shopId, shopEmployeeId: _id });
            if (data) {
                dispatch("getEmployeeByShopIdAsync")
            }
        },
        // 修改员工
        async updateEmployeeByShopIdAsync({ state, dispatch },payload){
            const shopId = state.eachShop._id;
            const data = await ShopService.updateEmployeeByShopId({ _id: shopId, shopEmployee: payload});
            if (data) {
                dispatch("getEmployeeByShopIdAsync")
            }
        },
        // 通过用户id去获取所有的服务
        async getServicesByUserIdAsync({ commit }) {
            const userId = document.cookie.slice(4);
            const data = await ShopService.getServicesByUserId({ userId });
            commit("getServicesByUserId", data);
        },
        // 获取门店服务
        async getServiceByShopIdAsync({ state, commit }) {
            const shopId = state.eachShop._id;
            const data = await ShopService.getServiceByShopId({ shopId });
            commit("getServiceByShopId", data);
        },
        // 在门店里面新增服务（添加服务id）
        async addServiceIdOnShopsAsync({ state, dispatch }, payload) {
            // 门店id
            const _id = state.eachShop._id;
            const data = await ShopService.addServiceIdOnShops({ serviceId: payload._id, _id });
            if (data) {
                dispatch("getServiceByShopIdAsync");
            }
        },
        // 删除门店里的某项服务
        async removeServiceOnShopAsync({ state, dispatch }, { _id }) {
            const shopId = state.eachShop._id;
            const data = await ShopService.removeServiceOnShop({ _id: shopId, serviceId: _id });
            if (data) {
                dispatch("getServiceByShopIdAsync");
            }
        },
        // 通过用户id去获取所有的商品
        async getGoodsByUserIdAsync({ commit }) {
            const userId = document.cookie.slice(4);
            const data = await ShopService.getGoodsByUserId({ userId });
            commit("getGoodsByUserId", data);
        },
        // 获取门店商品
        async getGoodsByShopIdAsync({ state, commit }) {
            const shopId = state.eachShop._id;
            const data = await ShopService.getGoodsByShopId({ shopId });
            commit("getGoodsByShopId", data);
        },
        // 新增商品
        async addGoodsIdOnShopsAsync({ state, dispatch }, payload) {
            // 门店id
            const _id = state.eachShop._id;
            const data = await ShopService.addGoodsIdOnShops({ goodsId: payload._id, _id });
            if (data) {
                dispatch("getGoodsByShopIdAsync");
            }
        },
        // 删除门店里的某项商品
        async removeGoodsOnShopAsync({ state, dispatch }, { _id }) {
            const shopId = state.eachShop._id;
            const data = await ShopService.removeGoodsOnShop({ _id: shopId, goodsId: _id });
            if (data) {
                dispatch("getGoodsByShopIdAsync");
            }
        },
        // 通过用户id去获取所有的宠物
        async getPetsByUserIdAsync({ commit }) {
            const userId = document.cookie.slice(4);
            const data = await ShopService.getPetsByUserId({ userId });
            commit("getPetsByUserId", data);
        },
        // 获取门店商品
        async getPetsByShopIdAsync({ state, commit }) {
            const shopId = state.eachShop._id;
            const data = await ShopService.getPetsByShopId({ shopId });
            commit("getPetsByShopId", data);
        },
        // 新增商品
        async addPetsIdOnShopsAsync({ state, dispatch }, payload) {
            // 门店id
            const _id = state.eachShop._id;
            const data = await ShopService.addPetsIdOnShops({ petsId: payload._id, _id });
            if (data) {
                dispatch("getPetsByShopIdAsync");
            }
        },
        // 删除门店里的某项商品
        async removePetsOnShopAsync({ state, dispatch }, { _id }) {
            const shopId = state.eachShop._id;
            const data = await ShopService.removePetsOnShop({ _id: shopId, petsId: _id });
            if (data) {
                dispatch("getPetsByShopIdAsync");
            }
        }
    }
}