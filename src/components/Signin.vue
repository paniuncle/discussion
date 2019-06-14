<template>
    <div id="container">
        <div class="login-box">
            <el-card class="login-card">
                <el-form :model="form" :rules="rules">
                    <el-form-item>
                        <h1>登 录</h1>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input placeholder="用户名" v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="signInButton" @click="SignIn">登 录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-link type="warning" :underline="false" @click="GoToSignUp">没有账号？去注册！</el-link>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Signin",
        data(){
            return{
                form:{
                    username: '',
                    password: ''
                },
                rules:{
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 4, max: 22, message: '长度在 4 到 22 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 22, message: '长度在 6 到 22 个字符', trigger: 'blur' }
                    ]
                },
                signInButton: false
            }
        },
        methods:{
            /**
             * @return {boolean}
             */
            PostSignIn: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'Authenticate/signIn', {
                    username: this.form.username,
                    password: this.form.password
                }).then(function(res){
                    if(res.data.errcode === 0){
                        that.$notify({
                            type: "success",
                            title: "登录成功",
                            message: "账号密码一致，即将为您跳转至首页"
                        });
                        that.$cookies.set('uid', res.data.uid, 60*60*24);
                        that.$cookies.set('session', res.data.session, 60*60*24);
                        that.$cookies.set('username', res.data.username, 60*60*24);
                        that.$router.push('/');

                    }else if(res.data.errcode === 1){
                        that.$notify({
                            type: "warning",
                            title: "登录失败",
                            message: "用户名或者密码为空，请重新填写"
                        });
                        that.signInButton = false;
                    }else if(res.data.errcode === 3){
                        that.$notify({
                            type: "warning",
                            title: "登录失败",
                            message: "该用户不存在，请先注册"
                        });
                        that.signInButton = false;
                    }else if(res.data.errcode === 4){
                        that.$notify({
                            type: "warning",
                            title: "登录失败",
                            message: "用户名和密码不一致，请重新输入"
                        });
                        that.signInButton = false;
                    }else{
                        that.$notify({
                            type: "error",
                            title: "登录失败",
                            message: "服务器出现问题，请稍后再试"
                        });
                        that.signInButton = false;

                    }
                })
            },
            SignIn: function(){
                this.signInButton = true;
                const that = this;
                if(this.form.username === '' || this.form.password === ''){
                    that.$message({
                        message: '请输入账号或密码',
                        type: 'warning'
                    });
                    that.signInButton = false;
                }else{
                    that.PostSignIn();
                }
            },
            GoToSignUp: function(){
                this.$router.push('/signup');
            }
        }
    }
</script>

<style scoped>
    .login-box {
        width: 400px;
        height:300px;
        margin: 80px auto;
    }
    .login-card {
        text-align: center;
    }
</style>
