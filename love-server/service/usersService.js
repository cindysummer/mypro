const { getUserMesById } = require("../dao/usersDao");
module.exports.getUserMesById = async (userId) => {
    let data=await getUserMesById(userId);
    const {goodsId,serviceId,petId}=data[0];
    const goodsArr=goodsId.map(item=>({
        _id:item._id,
        goodsName:item.goodsName
    }));
    const serviceArr=serviceId.map(item=>({
        _id:item._id,
        serviceName:item.serviceName
    }));
    const petArr=petId.map(item=>({
        _id:item._id,
        petName:item.petName
    }));
    const result={goodsArr,serviceArr,petArr}
    return result;
}