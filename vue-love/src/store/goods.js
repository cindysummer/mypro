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
        //更新绑定
        updateForm: {
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
        }
        ,
        currentPage: 1,
        eachPage: 4,
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
        restImg: (state) => {
            state.form.goodsImg = []
        },
        // //当前页和每页显示条数的设置
        setEachPage: (state, eachPage) => {
            state.currentPage = 1;
            state.eachPage = eachPage
        },
        setCurrentPage: (state, currentPage) => {
            state.currentPage = currentPage;
        },
        editGoods: (state, payload) => {
            state.updateForm = payload
        }
    },
    actions: {
        //新增商品
        async addGoodsAsync({ commit }, payload) {
            const data = await GoodsService.addGoods(payload);
            if (data) {
                alert("新增成功");
                commit("restImg")
            } else {
                alert("新增失败")
            }
        },
        //通过分页信息获取商品列表
        async getGoodsByPageAsync(context, payload) {
            const userId = document.cookie.slice(4);
            const { currentPage, eachPage } = context.state
            if (payload) {
                const { goodsType, text } = payload
                const data = await GoodsService.getGoodsByPage({ currentPage, eachPage, userId, goodsType, text });
                context.commit("getGoodsByPage", data)
            } else {
                const data = await GoodsService.getGoodsByPage({ currentPage, eachPage, userId });
                context.commit("getGoodsByPage", data)
            }
        },
        //通过商品id删除商品
        async removeGoodsByIdAsync({ dispatch }, payload) {
            const data = await GoodsService.removedGoodById({ _id: payload });
            if (data) {
                dispatch("getGoodsByPageAsync")
            }
        },
        //更新商品信息
        async updateGoodsAsync({ dispatch }, payload) {
            const data = await GoodsService.updateGoods(payload);
            if (data) {
                dispatch("getGoodsByPageAsync")
            }

        }

    }
}