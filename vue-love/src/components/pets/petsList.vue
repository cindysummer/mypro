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
      <el-table-column prop="petType" label="宠物品类" width="120"></el-table-column>
      <el-table-column prop="petKind" label="宠物种类" width="100"></el-table-column>

      <el-table-column prop="price" label="价格(单位:元)" width="90"></el-table-column>

      <el-table-column prop="petColor" label="颜色" width="120"></el-table-column>
      <el-table-column prop="petNature" label="性格" width="270"></el-table-column>
      <el-table-column prop="petBirth" label="出生日期" width="130"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope" style="width:100px">
          <el-button type="text" @click="change(scope.row)">修改</el-button>
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

    <el-dialog title="修改宠物信息" :visible.sync="dialogFormVisible" width="35%">
      <el-form :model="petMsg">
        <el-form-item label="宠物名" :label-width="formLabelWidth">
          <el-input v-model="petMsg.petName" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="宠物品类" :label-width="formLabelWidth">
          <el-input v-model="petMsg.petType" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="宠物种类" :label-width="formLabelWidth">
          <el-input v-model="petMsg.petKind" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="颜色" :label-width="formLabelWidth">
          <el-input v-model="petMsg.petColor" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="性格" :label-width="formLabelWidth">
          <el-input v-model="petMsg.petNature" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="petMsg.price" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-date-picker type="date" style="width: 300px;" v-model="petMsg.petBirth"></el-date-picker>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("pets");
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
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
    change(row) {
      this.dialogFormVisible = true;
      Object.assign(this.petMsg, row);
    },
    confirm() {
      this.dialogFormVisible = false;
      // console.log(this.petMsg);
      this.petMsg.petBirth = this.moment(this.petMsg.petBirth).format("YYYY-MM-DD");
      let a={};
      a.petMsg=this.petMsg;
      a.pageData=this.pageData
      a.this=this;
      this.updatePetsAsync(a);
      
    },

    ...mapActions(["findpetsAsync"]),
    ...mapActions(["removePetsAsync"]),
    ...mapActions(["updatePetsAsync"]),
    open(a) {
      // console.log(a);

      this.$confirm(`是否删除  ${a.petName}  这条宠物信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let msg = this.pageData;
          msg._id = a._id;
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
    ...mapState(["tableData"]),
    ...mapState(["petMsg"])
  },

  mounted() {
    // console.log(555555);
    let msg = this.pageData;
    msg.currentPage = 1;
    const userId = document.cookie.slice(4);
    msg.userId = userId;
    this.findpetsAsync(msg);
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



