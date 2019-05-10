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
        // getMessage: (state, payload) => {
        //     //一定不能解构state赋值，这样会破坏掉vue原本的响应式原理
        //     Object.assign(state, { message: payload });
        // }
        update: (state, payload) => {
            // console.log(payload);
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
            console.log(payload)
            if (payload.currentPage == 0) {
                payload.currentPage = 1
            }
            const data = await auditService.findShops(payload);
            // console.log(data);

            commit("update", data);
        },
        async updateshopsAsync({ dispatch }, payload) {
            const data = await auditService.updateshops(payload);
            console.log(data)
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
            console.log(data)
            context.commit("getAuditShopkeepersByPage", data)
        },
        //审核待办门店管理员
        async editStatusAsync({ dispatch }, payload) {
            const data = await auditService.editStatus(payload);
            // console.log(data);
            if (data) {
                dispatch("getAuditShopkeepersByPageAsync")
            }
        }
    }
}


// export default {

//         state: {
//             rows: [],
//             currentPage: 1,
//             eachPage: 10,
//             count: 0,
//             totalPage: 0,
//         },
//         mutations: {
//             getAuditShopkeepersByPage: (state, payload) => {
//                 Object.assign(state, payload)
//             },
//             //当前页和每页显示条数的设置
//             setEachPage: (state, eachPage) => {
//                 state.currentPage = 1;
//                 state.eachPage = eachPage;
//             },
//             setCurrentPage: (state, currentPage) => {
//                 state.currentPage = currentPage;
//             },
//         },
//         actions: {
//             //通过分页信息获取待审核门店管理员列表
//             async getAuditShopkeepersByPageAsync(context) {
//                 const { currentPage, eachPage } = context.state
//                 const data = await auditService.getAuditShopkeepersByPage({ currentPage, eachPage });
//                 console.log(data)
//                 context.commit("getAuditShopkeepersByPage", data)
//             },
//             //审核待办门店管理员
//             async editStatusAsync({ dispatch }, payload) {
//                 const data = await auditService.editStatus(payload);
//                 // console.log(data);
//                 if (data) {
//                     dispatch("getAuditShopkeepersByPageAsync")
//                 }
//             }
//         }
//     }