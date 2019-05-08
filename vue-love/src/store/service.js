import serviceService from "../service/service";
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
        }
    },
    mutations: {
    },
    actions: {
        // 新增
        async addServiceAsync({ dispatch }, payload) {
            const data = await serviceService.addService(payload);
            if(data){
                alert("新增成功")
            }else{
                alert("新增失败")
            }
        },
        // 查询
        async getServiceAsync(context){
            const {currentPage,eachPage}=context.state
            const data=await serviceService.getService({currentPage,eachPage})
            context.commit("getService",data)
        }
    }
}