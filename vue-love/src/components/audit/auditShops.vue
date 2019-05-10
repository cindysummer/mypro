<template >
  <div>
    <el-table
      :data="shopData"
      border
      style="width: 1050px"
      :stripe="true"
      :highlight-current-row="true"
    >
      <el-table-column prop="shopName" label="门店名" width="120"></el-table-column>
      <el-table-column prop="shopLicenceNum" label="营业执照号码" width="150"></el-table-column>
      <el-table-column prop="shopLicenceImg" label="营业执照图片" width="170"></el-table-column>
      <el-table-column prop="shopAdd" label="地址" width="160"></el-table-column>
      <el-table-column prop="shopCorporate" label="法人" width="90"></el-table-column>
      <el-table-column prop="shopTel" label="联系电话" width="150"></el-table-column>
      <el-table-column prop="shopStatus" label="状态" width="90"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope" style="width:100px">
          <el-button type="text" size="medium" @click="open1(scope.row)">禁止</el-button>
          <el-button type="text" size="medium" @click="open(scope.row)">审核通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.currentPage"
        :page-sizes="[3,5,7]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
      ></el-pagination>
    </div>
  </div>
  
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("audit");
export default {
  methods: {
    handleSizeChange(val) {
      let msg = this.pageData;
      msg.pageSize = `${val}`;
      msg.currentPage = 1;
      this.findshopsAsync(msg);
    },
    handleCurrentChange(val) {
      let msg = this.pageData;
      msg.currentPage = `${val}` - 0;
      this.findshopsAsync(msg);
    },
    ...mapActions(["findshopsAsync"]),
    ...mapActions(["updateshopsAsync"]),
    open(a) {

      this.$confirm(`是否通过  ${a.shopName}  的审核?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let msg = this.pageData;
          msg._id = a._id;
          msg.shopStatus="已审批"
          this.updateshopsAsync(msg); 
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
     open1(a) {
      this.$confirm(`是否禁止  ${a.shopName}  审核的通过?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let msg = this.pageData;
          msg._id = a._id;
          msg.shopStatus="禁止"
          this.updateshopsAsync(msg); 
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    ...mapState(["pageData"]),
    ...mapState(["shopData"])
  },
  mounted() {
    // console.log(555555);
    let msg = this.pageData;
    msg.currentPage = 1;
    this.findshopsAsync(msg);
  }
};
</script>
