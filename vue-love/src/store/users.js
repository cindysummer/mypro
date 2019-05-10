import {getShopUsers} from "../service/users"
export default {
    namespaced: true,
    state: {
        currentPage: 1,
        eachPage: 3,
        totalPage: 2,
        count: 0,
        users: [],
    },
    mutations: {
        getShopUsers: (state, payload) => {
            Object.assign(state, payload)
        },

        setEachPage: (state, eachPage) => state.eachPage = eachPage,
        setCurrentPage: (state, currentPage) => state.currentPage = currentPage
    },

    actions: {
        async getShopUsersAsync(context) {
            const { currentPage, eachPage } = context.state
            const data = await getShopUsers({ currentPage, eachPage });
            context.commit("getShopUsers", data)
        }
    },
}