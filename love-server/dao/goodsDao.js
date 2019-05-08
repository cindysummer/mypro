const mongoose = require("mongoose");
module.exports.addGoods = async (goods) => {
    return await mongoose.model("goodsModel").create(goods);
}
module.exports.getGoods = async (goods) => {
    return await mongoose.model("goodsModel").create(goods);
}   