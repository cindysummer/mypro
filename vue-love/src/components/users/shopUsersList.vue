<template>
  <div>
    <el-table :data="users" stripe fit>
      <el-table-column prop="_id" label="编号" width="180"></el-table-column>
      <el-table-column prop="userAccount" label="登录名称" width="120"></el-table-column>
      <el-table-column prop="userPwd" label="登录密码" width="100"></el-table-column>
      <el-table-column prop="userPhone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="userEmail" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="userName" label="真实姓名" width="170"></el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" @click="shop(scope.$index, scope.row)">查看门店</el-button>
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
        <el-table-column property="shopName" label="店铺名称" width="80"></el-table-column>
        <el-table-column property="shopLicenceNum" label="营业执照" width="80"></el-table-column>
        <el-table-column property="shopAdd" label="店铺地址" width="80"></el-table-column>
        <el-table-column property="shopTel" label="联系电话" width="80"></el-table-column>
        <el-table-column property="shopFeature" label="特色" width="150"></el-table-column>
        <el-table-column property="shopStatus" label="店铺状态" width="180"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import shop from "../../service/shop"
const {
  mapState,
  mapMutations,
  mapActions,
} = createNamespacedHelpers("users");
export default {
  name: "shopUsersList",
  data() {
    return {
      dialogTableVisible: false,
      shopArr:[]
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
   async  shop(index,row) {
      this.dialogTableVisible=true;
      this.shopArr=await shop.getShopByUserId(row._id);
    }
  },
  //生命周期，加载完成
  mounted() {
    this.getShopUsersAsync();
  }
};
</script>
