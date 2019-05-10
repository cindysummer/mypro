<template>
  <div>
    <el-table :data="users" stripe fit align="center">
      <el-table-column type="index"  label="序号"></el-table-column>
      <el-table-column prop="userAccount" label="登录名称" ></el-table-column>
      <el-table-column prop="userPwd" label="登录密码" ></el-table-column>
      <el-table-column prop="userPhone" label="手机号" ></el-table-column>
      <el-table-column prop="userEmail" label="邮箱" ></el-table-column>
      <el-table-column prop="userName" label="真实姓名" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="shop(scope.$index, scope.row)">查看门店</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="removeUser(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="open(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="~~eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>

    <el-dialog title="店铺详情" :visible.sync="dialogTableVisible">
      <el-table :data="shopArr">
        <el-table-column label="店铺图片" width="80">
          <template slot-scope="scope">
            <el-image style="width:100px;height:100px" :src="scope.row.shopImg"></el-image>
          </template>
        </el-table-column>
        <el-table-column property="shopName" label="店铺名称" width="80"></el-table-column>
        <el-table-column property="shopLicenceNum" label="营业执照" width="80"></el-table-column>
        <el-table-column property="shopAdd" label="店铺地址" width="80"></el-table-column>
        <el-table-column property="shopTel" label="联系电话" width="80"></el-table-column>
        <el-table-column property="shopFeature" label="特色" width="150"></el-table-column>
        <el-table-column property="shopStatus" label="店铺状态" width="180"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="门店管理员信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="upUser">
        <el-form-item label="登录名称">
          <el-input v-model="upUser.userAccount" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="upUser.userPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="upUser.userPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="upUser.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="upUser.userName" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataUser">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import shop from "../../service/shop";
import { removeUserFetch, updataUserFetch } from "../../service/users";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("users");

export default {
  name: "shopUsersList",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      shopArr: [],
      upUser: {}
    };
  },
  watch: {
    eachPage() {
      this.getShopUsersAsync();
    },
    currentPage() {
      this.getShopUsersAsync();
    }
  },
  computed: {
    ...mapState(["totalPage", "eachPage", "currentPage", "count", "users"]),
    eachPage: {
      get: mapState(["eachPage"]).eachPage,
      set: mapMutations(["setEachPage"]).setEachPage
    },
    currentPage: {
      get: mapState(["currentPage"]).currentPage,
      set: mapMutations(["setCurrentPage"]).setCurrentPage
    }
  },
  methods: {
    ...mapActions(["getShopUsersAsync"]),
    ...mapMutations(["setCurrentPage", "setEachPage"]),
    async shop(index, row) {
      this.dialogTableVisible = true;
      let data = await shop.getShopByUserId(row._id);
      this.shopArr = data;
    },
    removeUser(index, row) {
      let _this = this;
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeUserFetch({ _id: row._id }).then(res => {
            if (res.ok == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              _this.getShopUsersAsync();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    open(index, row) {
      this.dialogFormVisible = true;
      this.upUser = row;
    },
    async updataUser() {
      let _this = this;
      let data = await updataUserFetch(this.upUser);
      this.dialogFormVisible = false;
      this.$message({
        message: "恭喜你，修改成功",
        type: "success"
      });
      _this.getShopUsersAsync();
    }
  },
  //生命周期，加载完成
  mounted() {
    this.getShopUsersAsync();
  }
};
</script>