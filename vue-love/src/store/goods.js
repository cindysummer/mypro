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

        }

    },
    mutations: {

    },
    actions: {
        async addGoodsAsync({ dispatch }, payload) {
            console.log(payload)
            const data = await GoodsService.addGoods(payload);

        }
    }
}