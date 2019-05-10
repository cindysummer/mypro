<template>
  <div>
    <div>
      <el-input placeholder="请输入内容" v-model="text" class="input-with-select">
        <el-select v-model="type" slot="prepend" placeholder="请选择" style="width:100px">
          <el-option label="商品名称" value="goodsName"></el-option>
          <el-option label="商品类型" value="goodsType"></el-option>
          <el-option label="商品产地" value="goodsRegion"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <el-table :data="goods" border>
      <el-table-column fixed="left" prop="goodsName" label="商品名称"></el-table-column>
      <el-table-column label="商品图片" width="120px">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.goodsImg[0]"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="goodsType" label="商品类型"></el-table-column>
      <el-table-column prop="goodsMaterial" label="材质"></el-table-column>
      <el-table-column prop="goodsCanFor" label="适用"></el-table-column>
      <el-table-column prop="goodsOnlyFor" label="专属"></el-table-column>
      <el-table-column prop="goodsSize" label="规则"></el-table-column>
      <el-table-column prop="goodsTaste" label="口味"></el-table-column>
      <el-table-column prop="goodsSpecial" label="特殊功用"></el-table-column>
      <el-table-column prop="goodsRegion" label="产地"></el-table-column>
      <el-table-column prop="goodsDate" label="生产日期"></el-table-column>
      <el-table-column prop="goodsTime" label="保质期"></el-table-column>
      <el-table-column prop="goodsSupplier" label="供应商"></el-table-column>
      <el-table-column prop="goodsIntro" label="简介" width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="goodsPrice" label="价格"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="removeGoods(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="setEachPage"
        @current-change="setCurrentPage"
        :page-sizes="[4,7,10]"
        :page-size="eachPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>

    <!-- 商品信息修改 -->
    <el-dialog title="商品信息修改" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="updateForm">
        <el-form-item required label="商品名称" prop="goodsName">
          <el-input v-model="updateForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item required label="商品种类" prop="goodsType">
          <el-input v-model="updateForm.goodsType"></el-input>
        </el-form-item>
        <el-form-item required label="制作方法" prop="goodsMaterial">
          <el-input v-model="updateForm.goodsMaterial"></el-input>
        </el-form-item>
        <el-form-item required label="使用规格" porps="goodsCanFor">
          <el-input v-model="updateForm.goodsCanFor"></el-input>
        </el-form-item>
        <el-form-item required label="专属规格" prop="goodsOnlyFor">
          <el-input v-model="updateForm.goodsOnlyFor"></el-input>
        </el-form-item>
        <el-form-item required label="包装规格" prop="goodsSize">
          <el-input v-model="updateForm.goodsSize"></el-input>
        </el-form-item>
        <el-form-item required label="口味" prop="goodsTaste">
          <el-input v-model="updateForm.goodsTaste"></el-input>
        </el-form-item>
        <el-form-item required label="产地" prop="goodsRegion">
          <el-input v-model="updateForm.goodsRegion"></el-input>
        </el-form-item>
        <el-form-item required label="生产日期" prop="goodsDate">
          <div class="block">
            <el-date-picker v-model="updateForm.goodsDate" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item required label="保质期" prop="goodsTime">
          <el-select v-model="updateForm.goodsTime" placeholder="请选择">
            <el-option value="3个月"></el-option>
            <el-option value="6个月"></el-option>
            <el-option value="12个月"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="供应商" prop="goodsSupplier">
          <el-input v-model="updateForm.goodsSupplier"></el-input>
        </el-form-item>
        <el-form-item required label="特色说明" prop="goodsIntro">
          <el-input v-model="updateForm.goodsIntro"></el-input>
        </el-form-item>
        <el-form-item required label="价格" prop="goodsPrice">
          <el-input v-model="updateForm.goodsPrice"></el-input>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfire">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 商品信息修改 -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("goods");
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      type: "",
      text: ""
    };
  },
  computed: {
    ...mapState([
      "currentPage",
      "eachPage",
      "totalPage",
      "count",
      "goods",
      "form",
      "updateForm"
    ])
  },
  watch: {
    eachPage() {
      if (this.type) {
        this.getGoodsByPageAsync({ goodsType: this.type, text: this.text });
      } else {
        this.getGoodsByPageAsync();
      }
    },
    currentPage() {
      if (this.type) {
        this.getGoodsByPageAsync({ goodsType: this.type, text: this.text });
      } else {
        this.getGoodsByPageAsync();
      }
    }
  },
  methods: {
    ...mapActions([
      "getGoodsByPageAsync",
      "removeGoodsByIdAsync",
      "updateGoodsAsync"
    ]),
    ...mapMutations(["editGoods", "setCurrentPage", "setEachPage"]),
    //编辑对应商品信息
    edit(row) {
      this.dialogFormVisible = true;
      Object.assign(this.updateForm, row);
    },
    //修改时图片上传成功，图片路径
    successUpload(response, file, fileList) {
      this.updateForm.goodsImg = [];
      //图片路径
      this.updateForm.goodsImg.push(response.data.url);
      this.updateGoodsAsync(this.updateForm);
      this.dialogFormVisible = false;
    },
    //确认修改商品信息
    comfire() {
      //格式化事件时间
      this.updateForm.goodsDate = this.moment(this.updateForm.goodsDate).format(
        "YYYY-MM-DD"
      );
      this.$refs.upload.submit(); //上传图片
    },
    //,删除对应商品
    removeGoods(a) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.removeGoodsByIdAsync(a);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //
    search() {
      this.getGoodsByPageAsync({ goodsType: this.type, text: this.text });
    }
  },
  mounted() {
    //页面加载完成发送数据请求
    document.cookie;
    this.getGoodsByPageAsync();
  }
};
</script>


<style scoped>
.el-form-item {
  width: 40%;
}
.el-form-item__label {
  text-align: left;
  width: 80px;
}
</style>
