<template>
  <div style="width:100%">
    <el-table :data="rows">
      <el-table-column prop="userAccount" label="申请名称"></el-table-column>
      <el-table-column prop="userName" label="申请人姓名"></el-table-column>
      <el-table-column prop="userPhone" label="手机号"></el-table-column>
      <el-table-column prop="userEmail" label="邮箱"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="pass(scope.row._id)">审核通过</el-button>
          <el-button type="text" @click="forbid(scope.row._id)">禁止</el-button>
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
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("audit");
export default {
  computed: {
    ...mapState(["currentPage", "eachPage", "totalPage", "count", "rows"])
  },
  watch: {
    eachPage() {
      this.getAuditShopkeepersByPageAsync();
    },
    currentPage() {
      this.getAuditShopkeepersByPageAsync();
    }
  },
  methods: {
    ...mapActions(["getAuditShopkeepersByPageAsync", "editStatusAsync"]),
    ...mapMutations(["setEachPage", "setCurrentPage"]),
    pass(a) {
      this.$confirm("是否确认审核通过, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.editStatusAsync({ _id: a, userStatus: "1" });
          this.$message({
            type: "success",
            message: "审核通过!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    forbid(a) {
      this.$confirm("审核不通过", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.editStatusAsync({ _id: a, userStatus: "2" });
          this.$message({
            type: "success",
            message: "审核不通过!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  mounted() {
    this.getAuditShopkeepersByPageAsync();
  }
  //
};
</script>
