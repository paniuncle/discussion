<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu default-active="2" class="el-menu-demo" mode="horizontal">
          <el-menu-item><img src="./assets/logo.png" class="logo"/></el-menu-item>
          <el-menu-item class="menu-right" index="1" @click="goToSignIn">登录 | 注册</el-menu-item>
          <el-menu-item class="menu-right" index="2" @click="goToNotificatioin">消息中心</el-menu-item>
          <el-menu-item class="menu-right" index="3" @click="goToIndex">首页</el-menu-item>
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
  methods:{
    goToNotificatioin: function(){
      this.$router.push('/notification');
    },
    goToSignIn: function(){
      this.$router.push('/Signin');
    },
    goToIndex: function(){
      this.$router.push('/');
    }
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
