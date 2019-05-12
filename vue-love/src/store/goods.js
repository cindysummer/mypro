import GoodsService from '../service/goods';
export default {
    namespaced: true,
    state: {
        form: {
            goodsName: "海洋味道",
            goodsType: "犬粮",
            goodsPrice: "34",
            goodsMaterial: "鱼，蚯蚓",
            goodsIntro: "猫猫吃的",
            goodsSupplier: " 皇誉宠物食品（上海）有限公司",
            goodsTime: "6个月",
            goodsDate: "2019-05-10",
            goodsRegion: "国产",
            goodsTaste: "其他",
            goodsSize: "kg/袋",
            goodsCanFor: "猫猫",
            goodsOnlyFor: "加菲猫",
            goodsImg: [],
            userId: ""
        },
        //更新绑定
        updateForm: {
            goodsName: "",
            goodsType: "",
            goodsPrice: "",
            goodsMaterial: "",
            goodsIntro: "",
            goodsSupplier: "",
            goodsTime: "",
            goodsDate: "",
            goodsRegion: "",
            goodsTaste: "",
            goodsSize: "",
            goodsCanFor: "",
            goodsOnlyFor: "",
            goodsImg: [],
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