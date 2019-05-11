<template>
  <el-container>
    <el-header>
      <div class="logo">
        <img src="../assets/logo1.png" alt>
        <span>爱宠帮</span>
      </div>
      <h2>门店管理系统</h2>
      <ul>
        <li>
          <a href="javascript:;" title="欢迎您">
            <i class="el-icon-s-custom"></i>
            <span>{{userAccount}}</span>
          </a>
        </li>
        <li style="margin-left:20px">
          <a href="javascript:;" title="退出登录">
            <i class="el-icon-switch-button" @click="quit"></i>
          </a>
        </li>
      </ul>
    </el-header>
    <el-container>
      <el-aside>
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
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/shopSystem/addGoods">新增商品</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/shopSystem/goodsList">商品列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-coffee-cup"></i>
              <span>服务管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/shopSystem/addService">新增服务</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/shopSystem/serviceList">服务列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-chicken"></i>
              <span>宠物管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/shopSystem/addPets">新增宠物</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/shopSystem/petsList">宠物列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>门店管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/shopSystem/addShop">新增门店</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/shopSystem/shopList">门店列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-card>
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { getUserById } from "../service/users";
export default {
  name: "shopSystem",
  data() {
    return {
      userAccount: ""
    };
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
<style scoped>
.el-header {
  background-color: rgb(84, 92, 100);
  height: 10vh;
  font-family: "Helvetica Neue";
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-header .logo {
  width: 111px;
  height: 60px;
  display: flex;
}

.el-header .logo > img {
  width: 100%;
  margin-right: 5px;
}

.el-header .logo > span {
  color: #fff;
  font-size: 16px;
}

li {
  list-style: none;
}

.el-header ul {
  display: flex;
}

.el-header a {
  text-decoration: none;
  color: #fff;
}

.el-header a i {
  font-size: 22px;
}

.el-header a:hover {
  color: #fdcb32;
}

.el-aside {
  width: 200px !important;
  height: 90vh;
}
.el-menu-vertical-demo {
  height: 100%;
}
.el-main {
  padding: 5px !important;
}
.el-card {
  height: 88vh;
}
</style>