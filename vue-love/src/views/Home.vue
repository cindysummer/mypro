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
          <el-menu router
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
              <el-menu-item index="/home/addGoods">新增商品</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/home/goodsList">商品列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-coffee-cup"></i>
              <span>服务管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/addService">新增服务</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/home/serviceList">服务列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-chicken"></i>
              <span>宠物管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/addPets">新增宠物</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/home/petsList">宠物列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>门店管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/addShop">新增门店</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/home/shopList">门店列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
  .el-header {
    background-color: rgb(84, 92, 100);
    padding-top:35px!important;
    padding-bottom:35px!important;
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

  .el-header .logo>img {
    width: 100%;
    margin-right: 5px;
  }

  .el-header .logo>span {
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


  /* .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100vh;
  } */
  /* .el-menu{
    height: 100vh; 
     width:200px;
  } */
  /* .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  } */
</style>