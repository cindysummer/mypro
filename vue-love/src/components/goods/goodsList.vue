<template>
  <div>
    <el-table :data="goods" border style="width: 80%">
      <el-table-column prop="_id" label="商品编号" width="90"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" width="90"></el-table-column>
      <el-table-column prop="goodsType" label="商品类型" width="90"></el-table-column>
      <el-table-column prop="goodsMaterial" label="材质" width="90"></el-table-column>
      <el-table-column prop="goodsCanFor" label="适用" width="90"></el-table-column>
      <el-table-column prop="goodsOnlyFor" label="专属" width="90"></el-table-column>
      <el-table-column prop="goodsSize" label="规则" width="90"></el-table-column>
      <el-table-column prop="goodsTaste" label="口味" width="90"></el-table-column>
      <el-table-column prop="goodsSpecial" label="特殊功用" width="90"></el-table-column>
      <el-table-column prop="goodsRegion" label="产地" width="90"></el-table-column>
      <el-table-column prop="goodsDate" label="生产日期" width="90"></el-table-column>
      <el-table-column prop="goodsTime" label="保质期" width="90"></el-table-column>
      <el-table-column prop="goodsSupplier" label="供应商" width="90"></el-table-column>
      <el-table-column prop="goodsIntro" label="简介" width="90"></el-table-column>
      <el-table-column prop="goodsPrice" label="价格" width="90"></el-table-column>
      <el-table-column prop="goodsImg" label="图片" width="90">
        <img src alt srcset>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" @click="removeGood">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="setEachPage"
        @current-change="setCurrentPage"
        :page-sizes="[1,2,3]"
        :page-size="~~eachPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="~~count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("goods");
export default {
  computed: {
    ...mapState(["currentPage", "eachPage", "totalPage", "count", "goods"])
  },
  watch: {
    eachPage() {
      this.getGoodsByPageAsync();
    },
    currentPage() {
      this.getGoodsByPageAsync();
    }
  },
  methods: {
    ...mapActions(["getGoodsByPageAsync"]),
    ...mapMutations(["setEachPage", "setCurrentPage"]),
    handleClick(row) {
      console.log(row);
    },
    removeGood() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
    }
  },
  mounted() {
    this.getGoodsByPageAsync();
  }
};
</script>
