<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item><img src="./assets/logo.png" class="logo"/></el-menu-item>
          <el-menu-item class="menu-right" index="1">登录 | 注册</el-menu-item>
          <el-menu-item class="menu-right" index="2">消息中心</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 0;
    margin: 0;
  }
  .el-header{
    padding:0 !important;
  }
  .logo{
    line-height: 60px;
    height: 40px;
    width: auto;
    vertical-align: middle;
  }
  .menu-right{
    float: right !important;
  }
  .main{
    height: calc(100vh - 60px);
    width: 80%;
    margin: 0 auto;
  }
</style>
