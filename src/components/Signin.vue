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
                return false;
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
