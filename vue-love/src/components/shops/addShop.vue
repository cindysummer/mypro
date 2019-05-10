<template>
    <el-card>
        <el-form :inline="true" :model="shopData" ref="shopData" label-width="100px">
            <el-form-item label="门店名称">
                <el-input v-model="shopData.shopName"></el-input>
            </el-form-item>
            <el-form-item label="门店地址">
                <el-input v-model="shopData.shopAdd"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="shopData.shopTel"></el-input>
            </el-form-item>
            <el-form-item label="特色">
                <el-input v-model="shopData.shopFeature"></el-input>
            </el-form-item>
            <el-form-item label="法人">
                <el-input v-model="shopData.shopCorporate"></el-input>
            </el-form-item>
            <el-form-item label="营业执照号码">
                <el-input v-model="shopData.shopLicenceNum"></el-input>
            </el-form-item>
            <el-form-item label="头图">
                <el-upload class="upload-demo" action="/shop/addShopImg" :on-success="addShopImg" :limit="1">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="营业执照图片">
                <el-upload class="upload-demo" action="/shop/addShopLicenceImg" :on-success="addShopLicenceImg"
                    :limit="1">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item style="text-align:center;width:80%">
                <el-button type="primary" @click="handleClick">新增</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapState, mapActions, mapMutations } = createNamespacedHelpers('shop');
    export default {
        name: "addShop",
        data() {
            return {
                shopData: {
                    shopName: "",
                    shopLicenceNum: "",
                    shopLicenceImg: "",
                    shopAdd: "",
                    shopCorporate: "",
                    shopTel: "",
                    shopImg: "",
                    shopFeature: "",
                    shopStatus: "申请中"
                }
            }
        },
        methods: {
            ...mapActions(["addShopAsync", "getUserMesByIdAsync"]),
            handleClick() {
                const userId=document.cookie.slice(4);
                const data=Object.assign(this.shopData,{userId});
                this.addShopAsync(data);
            },
            // 获取头图的路径
            addShopImg(response, file, fileList) {
                this.shopData.shopImg = response.data.url;
            },
            // 获取营业执照的图片的路径
            addShopLicenceImg(response, file, fileList) {
                this.shopData.shopLicenceImg = response.data.url;
            },
        }
    }
</script>

<style scoped>
    .el-card {
        height: 500px;
    }

    .el-form-item {
        width: 40%;
    }
</style>