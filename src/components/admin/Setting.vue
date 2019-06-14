<template>
    <div class="container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="网站标题">
                <el-input v-model="setting.title"></el-input>
            </el-form-item>
            <el-form-item label="网站描述">
                <el-input v-model="setting.des"></el-input>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="setting.keywords"></el-input>
            </el-form-item>
            <!--
            <el-form-item label="注册账号">
                <el-switch
                        v-model="setting.allowReg">
                </el-switch>
            </el-form-item>
            <el-form-item label="登录账号">
                <el-switch
                        v-model="setting.allowLog">
                </el-switch>
            </el-form-item>
            <el-form-item label="浏览网站">
                <el-switch
                        v-model="setting.allowView">
                </el-switch>
            </el-form-item>
            <el-form-item label="发表帖子">
                <el-switch
                        v-model="setting.allowPost">
                </el-switch>
            </el-form-item>
            -->
            <el-form-item>
                <el-button type="primary" @click="doSet">保存设置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        data(){
            return {
                setting:{
                    title: 'Discussion - 论坛',
                    des: 'Discussion is a new bbs system.',
                    keywords: 'discussion,admin,admin,test',
                    allowReg: true,
                    allowLog: true,
                    allowPost: true,
                    allowView: true
                }
            }
        },
        methods:{
            doSet: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'AdminBoard/setWebsite',
                    {
                        title: this.setting.title,
                        desc: this.setting.des,
                        keywords: this.setting.keywords
                    },{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                    window.console.log(res.data);
                    if(res.data.errcode === 0){
                        that.$message({
                            type: "success",
                            message: "设置网站基础信息成功"
                        })

                    }

                })
            }
        }
    }
</script>

<style scoped>

</style>
