import auditService from '../service/audit';
export default {
    namespaced: true,
    state: {
        pageData: {
            total: 0,
            currentPage: 1,
            pageSize: 5
        },
        shopData: [],
        rows: [],
        currentPage: 1,
        eachPage: 10,
        count: 0,
        totalPage: 0,
    },
    mutations: {
        update: (state, payload) => {
            state.shopData = payload.msg;
            Object.assign(state.pageData, payload.state)
        },
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
        }

    },
    actions: {
        async findshopsAsync({ commit }, payload) {
            if (payload.currentPage == 0) {
                payload.currentPage = 1
            }
            const data = await auditService.findShops(payload);
            commit("update", data);
        },
        async updateshopsAsync({ dispatch }, payload) {
            const data = await auditService.updateshops(payload);
            if (data) {
                alert("操作成功");
                if ((data.total - 1) % data.pageSize == 0) {
                    data.currentPage = data.currentPage - 1;
                }
                dispatch("findshopsAsync", data)
            }
        },
        //通过分页信息获取待审核门店管理员列表
        async getAuditShopkeepersByPageAsync(context) {
            const { currentPage, eachPage } = context.state
            const data = await auditService.getAuditShopkeepersByPage({ currentPage, eachPage });
            context.commit("getAuditShopkeepersByPage", data)
        },
        //审核待办门店管理员
        async editStatusAsync({ dispatch }, payload) {
            const data = await auditService.editStatus(payload);
            if (data) {
                dispatch("getAuditShopkeepersByPageAsync")
            }
        }
    }
}