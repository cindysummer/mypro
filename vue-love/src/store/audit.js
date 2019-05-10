import auditService from '../service/audit';
export default {
    namespaced: true,
    state: {
        pageData: {
            total: 0,
            currentPage: 1,
            pageSize: 5
        },

        shopData: [

        ]
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
        }
    },
    actions: {
        async findshopsAsync({ commit }, payload) {
            const data = await auditService. findShops(payload);
            // console.log(data);
            
            commit("update", data);
        },
        async updateshopsAsync({ dispatch }, payload) {
            const data = await auditService.updateshops(payload);
            if (data) {
                alert("操作成功");
                if ((data.total-1)%data.pageSize==0) {
                    data.currentPage = data.currentPage-1;
                }
                dispatch("findshopsAsync", data)            
            }
            
            
        },
    }

    
}