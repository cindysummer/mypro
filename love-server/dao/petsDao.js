const mongoose = require("mongoose");
module.exports.addPets = async (shop) => {
    let pet = await mongoose.model("petModel").create(shop);
    return pet;
}

//宠物列表
module.exports.findPets = async (shop) => {  
    if (shop.select) {
        let count=await mongoose.model("petModel").find({userId:shop.userId,[shop.select]:shop.input}).countDocuments();
        let pet = await mongoose.model("petModel").find({userId:shop.userId,[shop.select]:shop.input})
        .skip((shop.currentPage - 1) * shop.pageSize)
        .limit(shop.pageSize - 0);
        pet.push(count);
        return pet
    }else{
        let pet = await mongoose.model("petModel").find({userId:shop.userId});
        return pet
    } 
}

module.exports.removePets = async (shop) => {
    let pet = await mongoose.model("petModel").deleteOne({_id:shop._id});
    if (pet) {
        return shop
    }
}
module.exports.updatePets = async (shop) => {
    let pet = await mongoose.model("petModel").updateOne({_id:shop.petMsg._id},shop.petMsg)
    if (pet.ok > 0) {
        return shop.pageData;
    } else {
        return false;
    }
}
// 通过用户id获取对应宠物
module.exports.getPetsByUserId = async function (userId) {
    return await mongoose.model("petModel").find(userId);
}