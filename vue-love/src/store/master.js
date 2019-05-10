import MasterServe from "../service/master"
export default {
    namespaced: true,
    state: {
        currentPage: 1,
        eachPage: 3,
        totalPage: 2,
        count: 0,
        masters: [],
    },
    mutations: {
        getMastersByPage: (state, payload) => {
            Object.assign(state, payload)
        },

        setEachPage: (state, eachPage) => state.eachPage = eachPage,
        setCurrentPage: (state, currentPage) => state.currentPage = currentPage
    },

    actions: {
        async getMastersByPageAsync(context) {
            const { currentPage, eachPage } = context.state
            const data = await MasterServe.getMastersByPage({ currentPage, eachPage });
            context.commit("getMastersByPage", data)
        }
    },
}