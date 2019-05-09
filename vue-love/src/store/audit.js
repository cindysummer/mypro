import AuditService from '../service/audit';
export default {
    namespaced: true,
    state: {
        rows: [],
        currentPage: 1,
        eachPage: 10,
        count: 0,
        totalPage: 0,
    },
    mutations: {
        getAuditShopkeepersByPage: (state, payload) => {
            Object.assign(state, payload)
        },
        //当前页和每页显示条数的设置
        setEachPage: (state, eachPage) => {
            state.currentPage = 1;
            state.eachPage = eachPage;
        },
        setCurrentPage: (state, currentPage) => {
            state.currentPage = currentPage;
        },
    },
    actions: {
        //通过分页信息获取待审核门店管理员列表
        async getAuditShopkeepersByPageAsync(context) {
            const { currentPage, eachPage } = context.state
            const data = await AuditService.getAuditShopkeepersByPage({ currentPage, eachPage });
            console.log(data)
            context.commit("getAuditShopkeepersByPage", data)
        },
        //审核待办门店管理员
        async editStatusAsync({ dispatch }, payload) {
            const data = await AuditService.editStatus(payload);
            // console.log(data);
            if (data) {
                dispatch("getAuditShopkeepersByPageAsync")
            }
        }
    }
}