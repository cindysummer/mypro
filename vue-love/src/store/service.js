import serviceService from "../service/service";
// export default {
//     namespaced: true,
//     state: {
//         form: {
//             // 名称
//             serviceName: '',
//             // 服务类型
//             serviceType: '',
//             // 服务时间
//             serviceSchedule: '',
//             // 适用规格
//             serviceCanFor: '',
//             // 服务规格
//             serviceDetial: '',
//             //    耗时
//             serviceTime: '',
//             // 服务员等级
//             serviceLevel: "",
//             // 价格
//             servicePrice: ``,
//         }
//     },
//     mutations: {
//     },
//     actions: {
//         // 新增
//         async addServiceAsync({ dispatch }, payload) {
//             const data = await serviceService.addService(payload);
//             if(data){
//                 alert("新增成功")
//             }else{
//                 alert("新增失败")
//             }
//         },
//         // 查询
//         async getServiceAsync(context){
//             const {currentPage,eachPage}=context.state
//             const data=await serviceService.getService({currentPage,eachPage})
//             context.commit("getService",data)
//         }
//     }
// }



export default {
    namespaced: true,
    state: {
        form: {
            // 名称
            serviceName: '',
            // 服务类型
            serviceType: '',
            // 服务时间
            serviceSchedule: '',
            // 适用规格
            serviceCanFor: '',
            // 服务规格
            serviceDetial: '',
            //    耗时
            serviceTime: '',
            // 服务员等级
            serviceLevel: "",
            // 价格
            servicePrice: ``,
        },
        currentPage: 1,
        eachPage: 1,
        count: 0,
        totalPage: 0,
        services: []
    },
    mutations: {
        getServicesByPage: (state, payload) => {
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
        async addServiceAsync({ dispatch }, payload) {
            const data = await serviceService.addService(payload);
            if (data) {
                alert("新增成功")
            } else {
                alert("新增失败")
            }
        },

        async DelServiceAsync({ dispatch }, payload) {
            return await serviceService.DelService(payload);
        },


        async getServicesByPageAsync(context) {
            const { currentPage, eachPage } = context.state
            const data = await serviceService.getServicesByPage({ currentPage, eachPage });
            console.log(data)
            context.commit("getServicesByPage", data)
        }
    }
}