import GoodsService from '../service/goods';
export default {
    namespaced: true,
    state: {
        form: {
            goodsName: "猫粮",
            goodsType: "猫猫",
            goodsPrice: "34",
            goodsMaterial: "鱼",
            goodsIntro: "猫猫吃",
            goodsSupplier: "中粮",
            goodsTime: "",
            goodsDate: "",
            goodsRegion: "中国",
            goodsTast: "海鲜",
            goodsSize: "34",
            goodsCanFor: "43",
            goodsOnlyFor: "34",
            goodsImg: [],
            goodsSpecial: "343"
        },
        currentPage: 1,
        eachPage: 1,
        count: 0,
        totalPage: 0,
        goods: []
    },
    mutations: {
        getGoodsByPage: (state, payload) => {
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
        async addGoodsAsync({ dispatch }, payload) {
            const data = await GoodsService.addGoods(payload);
            if (data) {
                alert("新增成功")
            } else {
                alert("新增失败")
            }
        },
        async getGoodsByPageAsync(context) {
            const { currentPage, eachPage } = context.state
            const data = await GoodsService.getGoodsByPage({ currentPage, eachPage });
            console.log(data)
            context.commit("getGoodsByPage", data)
        }
    }
}