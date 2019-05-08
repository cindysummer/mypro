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
        shopEmployee: []
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
        getUserMesById: (state, payload) => {
            //一定不能解构state赋值，这样会破坏掉vue原本的响应式原理
            // Object.assign(state.shopData,payload);
            // console.log(state)
        },
        getEmployeeByShopId: (state, [payload]) => {
            state.shopEmployee = payload.shopEmployee;
        },
        // 保存当前点击门店的信息
        more: (state, payload) => {
            state.eachShop = payload;
        }
    },
    actions: {
        // 新增门店
        async addShopAsync({ dispatch }, payload) {
            const data = await ShopService.addShop(payload);
        },
        // 通过页面限制获取门店信息
        async getShopsByPageAsync({ state, commit }) {
            const { currentPage, eachPage } = state;
            const data = await ShopService.getShopsByPage({ currentPage, eachPage });
            //将从后台拿到的数据从异步转回同步，相当于在组件里面的methods方法下面 
            commit("getShopsByPage", data);
        },
        // 获取员工信息
        async getEmployeeByShopIdAsync({ state, commit }) {
            const shopId = state.eachShop._id;
            const data = await ShopService.getEmployeeByShopId(shopId);
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
        async removeEmployeeByShopIdAsync({ state,dispatch },{_id}) {
            const shopId = state.eachShop._id;
            const data = await ShopService.removeEmployeeByShopId({_id:shopId,shopEmployeeId:_id});
            if (data) {
                dispatch("getEmployeeByShopIdAsync")
            }
        },
        async getUserMesByIdAsync({ commit }, _id) {
            // const data = await ShopService.getUserMesById(_id);
            // commit("getUserMesById", data);
        }
    }
}