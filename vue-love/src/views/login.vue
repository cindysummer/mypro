<template>
<div class="total">
  <el-container>
    <el-header height="120px" class="el-header" style="text-align:right">
     <img src="../assets/logo.png" alt="">
      <img src="../assets/logo1.png" alt="" width="100px">
    </el-header>
    <el-main class="el-main">
      <el-card class="box-card">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名">
            <el-input v-model="userAccount"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="userPwd"></el-input>
          </el-form-item>
          <el-form-item class="cen">
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
           <el-form-item class="goreg">
           <el-link  type="info" @click="register">去注册</el-link>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
  </div>
</template>
<script>
import { loginService } from "../service/users";
export default {
  name: "login",
  data() {
    return {
      userAccount: "",
      userPwd: ""
    };
  },
  methods: {
    login() {
      this.$router.push("/platformSystem");
    },
    register() {
      this.$router.push("/register");
    }
  },
  async beforeRouteLeave(to, from, next) {
    if (to.name == "platformSystem") {
      if (this.userAccount == "" || this.userPwd == "") {
        this.$message({
          message: "请填写账号或密码",
          type: "warning"
        });
      } else {
        let data = await loginService({
          userAccount: this.userAccount,
          userPwd: this.userPwd
        });
        if (!data) {
          this.$message({
            message: "账号不存在，请注册",
            type: "warning"
          });
          next("/register");
        } else if (data[0].userType == "1") {
          document.cookie = `_id=${data[0]._id}`;
          next();
        } else if (data[0].userType == "0" && data[0].userStatus == "0") {
          this.$alert("账号正在等待审核", "提示", {
            confirmButtonText: "确定"
          });
          next(false);
        } else if (data[0].userType == "0" && data[0].userStatus == "1") {
          document.cookie = `_id=${data[0]._id}`;
          next("/shopSystem");
        } else {
          this.$message({
            message: "账号不可用，请重新注册",
            type: "warning"
          });
          next("/register");
        }
      }
    } else if (to.name == "register"){
      next();
    }else{
      next(false)
    }
  }
};
</script>

<style scoped>
.total{
  background: url("../assets/bcg.png") no-repeat ;
  background-position: 208px 100px;
}
.el-main {
  margin: 0px auto 0;
  width: 650px;
  padding: 0;
}
.el-card {
  width: 400px;
  height: 322px;
  box-sizing: border-box;
  float: right;
  padding-top: 55px;
}
.cen{
  padding-left: 55px;
  box-sizing: border-box;
}
.goreg{
   padding-left: 67px;
}
/* .el-header {
  background-color: #fff;
  color: #86e3ce;
  margin: auto;
  font-size: 60px;
  line-height: 120px;
  margin-bottom: 20px;
  font-family: "FZWeiBei-S03S", Arial, serif;
} */
</style>