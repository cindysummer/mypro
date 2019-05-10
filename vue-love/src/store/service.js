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
        editServices: (state, payload) => {
            state.form = payload
        }
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

        //通过分页信息获取服务列表
        async getServicesByPageAsync(context, payload) {
            const { currentPage, eachPage } = context.state;
            const userId = document.cookie.slice(4);
            if (payload) {
                const { service, text } = payload;
                const data = await serviceService.getServicesByPage({ currentPage, eachPage, service, text, userId });
                context.commit("getServicesByPage", data);
            } else {
                const data = await serviceService.getServicesByPage({ currentPage, eachPage, userId });
                context.commit("getServicesByPage", data);
            }
        },
        //通过id删除服务
        async removeServiceByIdAsync({ dispatch }, payload) {
            const data = await serviceService.removeServiceById({ _id: payload });
            if (data) {
                dispatch("getServicesByPageAsync")
            }
        },
        //更新服务信息
        async updateServicesAsync({ dispatch }, payload) {
            // console.log(payload);
            const data = await serviceService.updateServices(payload);
            if (data) {
                dispatch("getServicesByPageAsync")
            }

        }
    }
}