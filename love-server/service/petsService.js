
const { addPets,findPets,removePets,getPetsByUserId,updatePets
} = require("../dao/petsDao.js");

module.exports.addPets = async (shop) => {
    let data = await addPets(shop);
    if(data) {
        return true;
    } else {
        return false;
    }
}

//宠物列表
module.exports.findPets = async (shop) => {
   if (shop.select) {
    let data = await findPets(shop);
    shop.total=data[data.length-1];
    data.splice(data.length-1,1);
    shop.userInputLastTime=shop.input;
    shop.userSelectLastTime=shop.select;
    delete shop.select;
    delete shop.input;
    let all={}
    all.data=data;
    all.state=shop
    return all

   }else{
    let a=shop;
    let data = await findPets(shop);
    let msg={};
    msg.total=data.length;
    msg.currentPage=a.currentPage;
    msg.pageSize=a.pageSize;
    let arr=[];
    for (let i = 0; i < a.pageSize; i++) {
        if ((a.currentPage-1)*a.pageSize+i>data.length-1) {
            continue;
        }
        arr.push(data[(a.currentPage-1)*a.pageSize+i])
    };
    let all={}
    all.data=arr;
    all.state=msg
    return all
   }
}

//删除宠物
module.exports.removePets = async (shop) => {
    let data = await removePets(shop);
    return data;
}
//修改宠物信息
module.exports.updatePets = async (shop) => {
    let data = await updatePets(shop);
    return data
 
  
}
module.exports.getPetsByUserId=async function(userId){
    return await getPetsByUserId(userId);
}
