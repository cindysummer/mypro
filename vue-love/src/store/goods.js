import GoodsService from '../service/goods';
export default {
    namespaced: true,
    state: {
        form: {
            goodsName: "很多鱼",
            goodsType: "猫粮",
            goodsPrice: "34",
            goodsMaterial: "鱼",
            goodsIntro: "猫猫吃",
            goodsSupplier: "中粮",
            goodsTime: "6个月",
            goodsDate: "",
            goodsRegion: "中国",
            goodsTaste: "海鲜",
            goodsSize: "袋装",
            goodsCanFor: "猫猫",
            goodsOnlyFor: "加菲猫",
            goodsImg: [],
            goodsSpecial: "不好吃",
            userId: ""
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
        //新增商品
        async addGoodsAsync({ dispatch }, payload) {
            const data = await GoodsService.addGoods(payload);
            if (data) {
                alert("新增成功");


            } else {
                alert("新增失败")
            }
        },
        //通过分页信息获取商品列表
        async getGoodsByPageAsync(context) {
            const { currentPage, eachPage } = context.state
            const data = await GoodsService.getGoodsByPage({ currentPage, eachPage });
            // console.log(data.goods)
            context.commit("getGoodsByPage", data)
        },
        //通过商品id删除商品
        async removeGoodByIdAsync({ dispatch }, payload) {
            // console.log(payload)
            const data = await GoodsService.removedGoodById({ _id: payload });
            console.log(data);
            if (data) {
                dispatch("getGoodsByPageAsync")
            }
        }
    }
}