const mongoose = require("mongoose");
module.exports.addPets = async (shop) => {
    // console.log(shop);
    let pet = await mongoose.model("petModel").create(shop);
    return pet
    // return await cinemasModel.create(shop);
}

//宠物列表
module.exports.findPets = async (shop) => {
    // console.log(shop);
    
    let pet = await mongoose.model("petModel").find({userId:shop.userId});
    return pet
    
}

module.exports.removePets = async (shop) => {
    // console.log(shop);
    let pet = await mongoose.model("petModel").deleteOne({_id:shop._id});
    if (pet) {
        return shop
    }

    // return pet
    
    
}