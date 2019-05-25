<template>
    <div id="container">
        <div class="register-box">
            <el-card class="register-card">
                <el-form :model="form" :rules="rules" status-icon>
                    <el-form-item>
                        <h1>注 册</h1>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input placeholder="用户名" v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="againPassword">
                        <el-input type="password" placeholder="确认密码" v-model="form.againPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="signUpButton" @click="SignUp">注 册</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-link type="warning" :underline="false" @click="GoToSignIn">已经有账号了？去登录！</el-link>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Signup",
        data(){
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                form:{
                    username: '',
                    password: '',
                    againPassword: ''
                },
                rules:{
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 4, max: 22, message: '长度在 4 到 22 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 22, message: '长度在 6 到 22 个字符', trigger: 'blur' }
                    ],
                    againPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },
                signUpButton: false
            }
        },
        methods:{
            /**
             * @return {boolean}
             */
            PostSignUp: function(){
                return false;
            },
            SignUp: function(){
                this.signUpButton = true;
                const username = this.form.username;
                const password = this.form.password;
                const password2 = this.form.againPassword;
                const that = this;
                if(username === '' || password === ''){
                    that.$message({
                        message: '请输入账号或密码',
                        type: 'warning'
                    });
                    that.signUpButton = false;
                }else{
                    if(password !== password2){
                        that.$message({
                            message: '两次的密码不一致',
                            type: 'warning'
                        });
                        that.signUpButton = false;
                    }
                    that.PostSignUp();
                }
            },
            GoToSignIn: function(){
                this.$router.push('/signin');
            }
        }
    }
</script>

<style scoped>
    .register-box {
        width: 400px;
        height:300px;
        margin: 80px auto;
    }
    .register-card {
        text-align: center;
    }
</style>
