<template>
    <div class="container">
        <el-tabs tab-position="left" style="height: auto;">
            <el-tab-pane label="基本信息">
                <div class="avatar-card">
                    <el-upload
                            class="avatar-uploader"
                            :show-file-list="false"
                            :auto-upload="true"
                            name="avatar"
                            :action="apiUrl"
                            :headers="headers"
                            :on-success="handleAvatarSuccess"
                            :on-error="handleAvatarError"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </el-tab-pane>
            <el-tab-pane label="账号安全">
                <div class="resetPasswd-card">
                    <h1>重置密码</h1>
                    <el-form :model="form" :rules="rules" status-icon>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="againPassword">
                            <el-input type="password" placeholder="确认密码" v-model="form.againPassword"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="resetPasswd">确认重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "Profiles",
        data() {
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                imageUrl: this.GLOBAL_API.apiUrl + 'Profiles/getAvatar?uid=' + this.$cookies.get('uid'),
                form:{
                    password: '',
                    againPassword: ''
                },
                rules:{
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 22, message: '长度在 6 到 22 个字符', trigger: 'blur' }
                    ],
                    againPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },
                headers:{
                    'Authorization': this.$cookies.get('session'),
                    'Uid': this.$cookies.get('uid')
                },
                apiUrl: this.GLOBAL_API.apiUrl + 'Profiles/resetAvatar'
            };
        },
        methods: {
            handleAvatarError: function(){
                this.$message({
                    type: "error",
                    message: "修改头像失败！"
                });
            },
            handleAvatarSuccess: function() {
                this.$message({
                    type: "success",
                    message: "修改头像成功！"
                });
                this.imageUrl = this.GLOBAL_API.apiUrl + 'Profiles/getAvatar?uid=' + this.$cookies.get('uid') + '&nonce=' + Math.floor(Math.random()*10+1);

            },
            beforeAvatarUpload: function(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是图片格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            resetPasswd: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'Profiles/resetPasswd',
                    {
                        password: this.form.password
                    },{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                        if(res.data.errcode === 0){
                            that.$notify({
                                type: "success",
                                title: "重置成功",
                                message: "重置密码成功，即将注销登录并返回登录页面"
                            });
                            that.$cookies.remove('uid');
                            that.$cookies.remove('session');
                            that.$cookies.remove('platform');
                            that.$router.push('/signin');
                        }
                });
            }
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .avatar-card{
        text-align: center;
    }
    .resetPasswd-card{
        margin-left: 30px;
    }
</style>
