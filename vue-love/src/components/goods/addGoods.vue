<template>
  <el-card style="width:100%">
    <el-form ref="form" :inline="true" :model="form" label-width="80px">
      <el-form-item required label="商品名称" prop="goodsName">
        <el-input v-model="form.goodsName"></el-input>
      </el-form-item>
      <el-form-item required label="商品种类" prop="goodsType">
        <el-input v-model="form.goodsType"></el-input>
      </el-form-item>
      <el-form-item required label="制作方法" prop="goodsMaterial">
        <el-input v-model="form.goodsMaterial"></el-input>
      </el-form-item>
      <el-form-item required label="使用规格" porps="goodsCanFor">
        <el-input v-model="form.goodsCanFor"></el-input>
      </el-form-item>
      <el-form-item required label="专属规格" prop="goodsOnlyFor">
        <el-input v-model="form.goodsOnlyFor"></el-input>
      </el-form-item>
      <el-form-item required label="包装规格" prop="goodsSize">
        <el-input v-model="form.goodsSize"></el-input>
      </el-form-item>
      <el-form-item required label="口味" prop="goodsTaste">
        <el-input v-model="form.goodsTaste"></el-input>
      </el-form-item>
      <el-form-item required label="产地" prop="goodsRegion">
        <el-input v-model="form.goodsRegion"></el-input>
      </el-form-item>
      <el-form-item required label="生产日期" prop="goodsDate">
        <div class="block">
          <el-date-picker v-model="form.goodsDate" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item required label="保质期" prop="goodsTime">
        <el-select v-model="form.goodsTime" placeholder="请选择">
          <el-option value="3个月"></el-option>
          <el-option value="6个月"></el-option>
          <el-option value="12个月"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item required label="供应商" prop="goodsSupplier">
        <el-input v-model="form.goodsSupplier"></el-input>
      </el-form-item>
      <el-form-item required label="特色说明" prop="goodsIntro">
        <el-input v-model="form.goodsIntro"></el-input>
      </el-form-item>
      <el-form-item required label="价格" prop="goodsPrice">
        <el-input v-model="form.goodsPrice"></el-input>
      </el-form-item>
      <el-form-item required label="图片">
        <el-upload
          action="/goods/addImg"
          ref="upload"
          :auto-upload="false"
          :on-success="successUpload"
          list-type="picture-card"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog>
          <img width="100%" alt>
        </el-dialog>
      </el-form-item>
      <el-form-item style="width:70%;display:flex;justify-content:space-around">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("goods");
export default {
  name: "addGoods",
  computed: {
    ...mapState(["form"])
  },
  methods: {
    ...mapActions(["addGoodsAsync"]),
    ...mapMutations(["setUserId"]),
    //提交事件
    onSubmit() {
      //格式化时间
      this.form.goodsDate = this.moment(this.form.goodsDate).format(
        "YYYY-MM-DD"
      );
      this.$refs.upload.submit(); //上传图片
    },
    successUpload(response, file, fileList) {
      //保存图片路径
      this.form.goodsImg.push(response.data.url);
      //清空图片
      this.addGoodsAsync(this.form);
      this.$refs.form.resetFields(); //恢复表单默认
      this.$refs.upload.clearFiles();
      this.form.goodsImg = [];
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    const userId = document.cookie.slice(4);
    this.form.userId = userId;
  }
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
.el-form-item {
  width: 40%;
}
</style>
