import serviceService from "../service/service";
import { log } from "util";


export default {
    namespaced: true,
    state: {
        form: {
            // 名称
            serviceName: '1',
            // 服务类型
            serviceType: '1',
            // 服务时间
            serviceSchedule: '1',
            // 适用规格
            serviceCanFor: '1',
            // 服务规格
            serviceDetial: '1',
            //    耗时
            serviceTime: '1',
            // 服务员等级
            serviceLevel: "1",
            // 价格
            servicePrice: `1`,
        },
        currentPage: 1,
        eachPage: 2,
        count: 0,
        totalPage: 0,
        services: []
    },
    mutations: {
        getServicesByPage: (state, payload) => {
            Object.assign(state, payload)
        },
        setUserId: (state, payload) => {
            state.userId = payload
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
        // 新增
        async addServiceAsync({ dispatch }, payload) {
            const data = await serviceService.addService(payload);
            if (data) {
                alert("新增成功")
            } else {
                alert("新增失败")
            }
        },

        // async DelServiceAsync({ dispatch }, payload) {
        //     return await serviceService.DelService(payload);
        // },

        //通过分页信息获取商品列表
        async getServicesByPageAsync(context) {
            const { currentPage, eachPage } = context.state
            const data = await serviceService.getServicesByPage({ currentPage, eachPage });
            context.commit("getServicesByPage", data)
        },
    //通过商品id删除商品
    async removeServiceByIdAsync({dispatch }, payload) {
        const data = await serviceService.removeServiceById({ _id: payload });
        if (data) {
            dispatch("getServicesByPageAsync")
        }
    }
    } 
}