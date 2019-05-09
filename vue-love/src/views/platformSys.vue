<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <div class="logo">
            <img src="../assets/logo1.png" alt>
            <span>爱宠帮</span>
          </div>
          <h2>平台管理系统</h2>
          <ul>
            <li>
              <a href="javascript:;" title="欢迎您">
                <i class="el-icon-s-custom"></i>
                <span>{{userAccount}}</span>
              </a>
            </li>
            <li style="margin-left:20px">
              <a href="javascript:;" title="退出登录">
                <i class="el-icon-switch-button"  @click="quit"></i>
              </a>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row class="tac" style="display:flex">
      <el-col :span="4">
        <el-menu
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>待办事项</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/shopSystem/addGoods">待审核门店管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/shopSystem/goodsList">待审核门店管理员</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-coffee-cup"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/platformSystem/shopUsersList">门店管理员信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/platformSystem/mastersList">宠主信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <router-view></router-view>
    </el-row>
  </div>
</template>
<script>
import  {getUserById} from "../service/users";
export default {
  name: "shopSystem",
   data(){
    return{
        userAccount:"",
    }
  },
  methods: {
    quit() {
      this.$router.push("/");
    }
  },
  async mounted() {
    let string = document.cookie.slice(4);
    let [data] = await getUserById(string);
    this.userAccount = data.userAccount;
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.grid-content {
  height: 100px;
  padding: 0 20px;
  font-family: "Helvetica Neue";
  background: rgb(84, 92, 100);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 111px;
  height: 60px;
  display: flex;
}

.logo > img {
  width: 100%;
  margin-right: 5px;
}

.logo > span {
  color: #fff;
  font-size: 16px;
}

.grid-content h2 {
  color: #fff;
}

.grid-content ul {
  display: flex;
}

.grid-content li {
  list-style: none;
}

.grid-content a {
  text-decoration: none;
  color: #fff;
}

.grid-content a i {
  font-size: 22px;
}

.grid-content a:hover {
  color: #fdcb32;
}
.el-aside {
  height: 100%;
  background-color: #fdcb32;
}
.el-menu-vertical-demo {
  height: 500px;
}
</style>