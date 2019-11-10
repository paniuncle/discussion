<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu default-active="2" class="el-menu-demo" mode="horizontal">
          <el-menu-item><img src="./assets/logo.png" class="logo"/></el-menu-item>

          <el-menu-item class="menu-right" index="1" @click="goToSignIn" v-if="session == null">登录 | 注册</el-menu-item>
          <el-submenu class="menu-right" index="1" v-else>
            <template slot="title"><img :src="avatarURL + uid" width="30px" style="border-radius: 50%">  {{ username }}</template>
            <el-menu-item index="2-1" @click="goToProfiles"><i class="el-icon-user-solid"></i> 用户中心</el-menu-item>
            <el-menu-item index="2-2" @click="signOut"><i class="el-icon-switch-button"></i> 退出登录</el-menu-item>
          </el-submenu>
          <!--<el-menu-item class="menu-right" index="2" @click="goToNotificatioin">消息中心</el-menu-item>-->
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
  data(){
    return{
      username: null,
      uid: null,
      session: null,
      avatarURL: this.GLOBAL_API.apiUrl + 'Profiles/getAvatar&uid='
    }
  },
  created(){
    this.getBaseInfo();
    this.username = this.$cookies.get('username');
    this.uid = this.$cookies.get('uid');
    this.session = this.$cookies.get('session');
  },
  updated(){
    this.username = this.$cookies.get('username');
    this.uid = this.$cookies.get('uid');
    this.session = this.$cookies.get('session');
  },
  methods:{
    getBaseInfo: function(){
      this.axios.post(this.GLOBAL_API.apiUrl + 'Base/getBase', {}).then(function(res){
        window.console.log(res.data);
        if(res.data.errcode === 0){
          window.document.title = res.data.title;

        }

      })
    },
    goToNotificatioin: function(){
      this.$router.push('/notification');
    },
    goToSignIn: function(){
      this.$router.push('/Signin');
    },
    goToIndex: function(){
      this.$router.push('/');
    },
    goToProfiles: function(){
      this.$router.push('/Profiles');
    },
    signOut: function(){
      this.$cookies.remove('username');
      this.$cookies.remove('uid');
      this.$cookies.remove('session');
      this.$router.go(0);
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
    -o-user-select: none;
    -moz-user-select: none; /*火狐 firefox*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10+*/
    -khtml-user-select :none; /*早期的浏览器*/
    user-select: none;
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
