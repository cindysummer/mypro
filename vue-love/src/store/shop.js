import ShopService from '../service/shop';
export default {
    namespaced: true,
    state: {
        currentPage: 1,
        eachPage: 3,
        count: 0,
        totalPage: 0,
        shops: []
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
        }
    },
    actions: {
        async getShopsByPageAsync({ state, commit }) {
            const { currentPage, eachPage } = state;
            const data = await ShopService.getShopsByPage({ currentPage, eachPage });
            //将从后台拿到的数据从异步转回同步，相当于在组件里面的methods方法下面            commit("getShopsByPage", data);
        },
        async getUserMesByIdAsync({ commit }, _id) {
            // const data = await ShopService.getUserMesById(_id);
            // commit("getUserMesById", data);
        },
        async addShopAsync({ dispatch }, payload) {
            const data = await ShopService.addShop(payload);
        }
    }
}