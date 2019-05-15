<template >
  <div>
    <div style="margin-top: 15px;margin-bottom: 20px">
      <el-input placeholder="请输入搜索内容" v-model="search.input" style="width: 520px;">
        <el-select v-model="search.select" slot="prepend" placeholder="请选择" style="width: 120px;">
          <el-option label="宠物名" value="petName"></el-option>
          <el-option label="宠物品类" value="petType"></el-option>
          <el-option label="宠物种类" value="petKind"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="seek"></el-button>
      </el-input>
    </div>

    <el-table :data="tableData" border :stripe="true" :highlight-current-row="true">
      <el-table-column prop="petName" label="宠物名"></el-table-column>
      <el-table-column prop="petType" label="宠物品类"></el-table-column>
      <el-table-column prop="petKind" label="宠物种类"></el-table-column>
      <el-table-column prop="price" label="价格(单位:元)"></el-table-column>
      <el-table-column prop="petColor" label="颜色"></el-table-column>
      <el-table-column prop="petNature" label="性格"></el-table-column>
      <el-table-column prop="petBirth" label="出生日期"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
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

        <!--  -->
        <el-form-item required label="图片">
          <el-upload
            action="/pet/addPetImg"
            ref="upload"
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
        <!--  -->
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
    successUpload(response, file, fileList) {
      this.petMsg.image = response.data.url;
      console.log( this.petMsg);
    },
    seek() {
      if (this.search.select) {
        if (this.search.input) {
          let msg = {};
          Object.assign(msg, this.pageData);
          msg.currentPage = 1;
          const userId = document.cookie.slice(4);
          msg.userId = userId;
          msg.select = this.search.select;
          msg.input = this.search.input;
          this.findpetsAsync(msg);
        } else {
          let msg = this.pageData;
          msg.currentPage = 1;
          const userId = document.cookie.slice(4);
          msg.userId = userId;
          this.findpetsAsync(msg);
        }
      } else {
        this.$message({
          showClose: true,
          message: "没有选择搜索类型！",
          type: "error"
        });
      }
    },

    handleSizeChange(val) {
      if (this.search.input) {
        let msg = {};
        Object.assign(msg, this.pageData);
        msg.currentPage = 1;
        const userId = document.cookie.slice(4);
        msg.userId = userId;
        msg.select = this.pageData.userSelectLastTime;
        msg.input = this.pageData.userInputLastTime;
        msg.pageSize = `${val}`;
        this.findpetsAsync(msg);
      } else {
        let msg = {};
        Object.assign(msg, this.pageData);
        delete msg.userInputLastTime;
        delete msg.userSelectLastTime;
        msg.pageSize = `${val}`;
        msg.currentPage = 1;
        this.findpetsAsync(msg);
      }
    },
    handleCurrentChange(val) {
      if (this.search.input) {
        let msg = {};
        Object.assign(msg, this.pageData);
        msg.currentPage = `${val}` - 0;
        const userId = document.cookie.slice(4);
        msg.userId = userId;
        msg.select = this.pageData.userSelectLastTime;
        msg.input = this.pageData.userInputLastTime;
        this.findpetsAsync(msg);
      } else {
        let msg = {};
        Object.assign(msg, this.pageData);
        delete msg.userInputLastTime;
        delete msg.userSelectLastTime;
        msg.currentPage = `${val}` - 0;
        this.findpetsAsync(msg);
      }
    },
    change(row) {
      this.dialogFormVisible = true;
      Object.assign(this.petMsg, row);
    },
    confirm() {
      this.dialogFormVisible = false;
      this.petMsg.petBirth = this.moment(this.petMsg.petBirth).format(
        "YYYY-MM-DD"
      );
      let a = {};
      a.petMsg = this.petMsg;
      a.pageData = this.pageData;
      a.this = this;
      this.updatePetsAsync(a);
    },

    ...mapActions(["findpetsAsync"]),
    ...mapActions(["removePetsAsync"]),
    ...mapActions(["updatePetsAsync"]),
    open(a) {
      this.$confirm(`是否删除  ${a.petName}  这条宠物信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let msg = this.pageData;
          msg._id = a._id;
          this.removePetsAsync(msg);
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
    ...mapState(["petMsg", "search"])
  },

  mounted() {
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
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>



