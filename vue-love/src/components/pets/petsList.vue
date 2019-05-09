<template >
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 1050px"
      :stripe="true"
      :highlight-current-row="true"
    >
      <el-table-column prop="petName" label="宠物名" width="120"></el-table-column>
      <el-table-column prop="petType" label="宠物品类" width="150"></el-table-column>
      <el-table-column prop="petKind" label="宠物种类" width="120"></el-table-column>
      <el-table-column prop="petColor" label="颜色" width="120"></el-table-column>
      <el-table-column prop="petNature" label="性格" width="270"></el-table-column>
      <el-table-column prop="petBirth" label="出生日期" width="150"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope" style="width:100px">
          <el-button type="text" size="medium">修改</el-button>
          <el-button type="text" size="medium" @click="open(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.currentPage"
        :page-sizes="[3, 4,5]"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("pets");
export default {
  methods: {
    handleSizeChange(val) {
      let msg = this.pageData;
      msg.pageSize = `${val}`;
      msg.currentPage = 1;
      this.findpetsAsync(msg);
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let msg = this.pageData;
      msg.currentPage = `${val}` - 0;
      //  console.log(msg);
      this.findpetsAsync(msg);
      // console.log(`当前页: ${val}`);
    },
    ...mapActions(["findpetsAsync"]),
    ...mapActions(["removePetsAsync"]),
    open(a) {
      // console.log(a._id);
      
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let msg = this.pageData;
          msg._id=a._id
          this.removePetsAsync(msg);         
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });


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
    ...mapState(["tableData"])
  },

  mounted() {
    // console.log(555555);
     let msg = this.pageData;
      msg.currentPage = 1;
    this.findpetsAsync(this.pageData);
  }
};
</script>
<style scoped>
.el-card {
  height: 550px;
}
.big {
  margin-left: 50px;
}
</style>
