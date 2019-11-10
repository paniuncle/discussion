<template>
    <div id="container">
        <div class="header">
            <div class="bread-box">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
                    <el-breadcrumb-item>
                        <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    请选择一个板块<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="[0,-1]">全部</el-dropdown-item>
                                <el-dropdown-item v-for="(item,index) in formData.division" v-bind:key="item.did" :command="[item.did, index]">{{item.name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-breadcrumb-item>

                    <el-breadcrumb-item>帖子列表</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ divName }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="post-button-box">
                <span><el-button type="info" class="post-button" @click="dialogFormVisible = true"><i class="el-icon-edit"></i>发表帖子</el-button></span>
            </div>
        </div>

        <div class="board">
            <el-table
                    :data="postData"
                    style="width: 100%"
                    v-infinite-scroll="load"
                    highlight-current-row
                    @current-change="goToThread"
            >
                <el-table-column
                        label="主题"
                        min-width="350px">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label=""
                        min-width="50px">
                    <template slot-scope="scope">
                        <img :src="avatarURL + scope.row.uid" width="40px" style="border-radius: 50%;"/>
                    </template>
                </el-table-column>
                <el-table-column
                        label="回复"
                        min-width="40px">
                    <template slot-scope="scope">
                        <p>{{ scope.row.reply}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="浏览"
                        min-width="40px">
                    <template slot-scope="scope">
                        <p>{{ scope.row.view}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="活跃"
                        min-width="50px">
                    <template slot-scope="scope">
                        <p>{{ scope.row.active_time}}</p>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <div class="post-board">
            <el-dialog title="发布新主题" :visible.sync="dialogFormVisible" class="dialog">
                <el-form :model="formData" class="post-form">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-form-item>
                                <el-input v-model="formData.title" autocomplete="off" placeholder="帖子标题"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-select v-model="formData.chooseDiv" placeholder="请选择板块">
                                    <el-option v-for="d in formData.division" :key="d.did" :label="d.name" :value="d.did"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <mavon-editor v-model="formData.content" ref="mkd" @imgAdd="$imgAdd"/>
                    </el-form-item>


                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="PostArticle">发 表</el-button>
                </div>
            </el-dialog>

        </div>

    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        name: "Board",
        data(){
            return {
                divName: '全部',
                division: 0,
                page: 1,
                postData : [],
                dialogFormVisible: false,
                formData : {
                    title: '',
                    content: '',
                    chooseDiv: null,
                    division: []

                },
                avatarURL: this.GLOBAL_API.apiUrl + 'Profiles/getAvatar&uid='
            }
        },
        created(){
            this.getDivision();
        },
        methods: {
            handleCommand(command) {
                window.console.log(command);
                this.$message('已经切换到该板块');

                if(command[1] === -1){
                    this.divName = "全部";
                    this.division = 0;
                    this.reGetThread(0);
                }else{
                    this.divName = this.formData.division[command[1]].name;
                    this.division = command[0];
                    this.reGetThread(command[0]);
                }

            },
            $imgAdd(pos, $file){
                // 第一步.将图片上传到服务器.
                const that = this;
                let formdata = new FormData();
                formdata.append('image', $file);
                this.axios.post(this.GLOBAL_API.apiUrl + 'Uploads/uploads',formdata,{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid'),
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(function(res){
                        let $vm = that.$refs.mkd;
                        $vm.$img2Url(pos, res.data.url);

                });
            },
            getDivision: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'Division/getDivisionList').then(function(res){
                    if(res.data.errcode === 0){
                        that.formData.division = res.data.division;
                    }
                })
            },
            goToThread: function(row){
                this.$router.push("/Thread/" + row.tid);
            },
            reGetThread: function(div){
                this.page = 1;
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'ThreadList/getList',{
                    page: this.page,
                    div: div
                }).then(function(res){
                    window.console.log(res.data);
                    that.postData = [];
                    if(res.data.errcode === 0){
                        that.postData = res.data.thread;
                        that.page += 1;
                    }else if(res.data.errcode === 5 || es.data.errcode === 6){
                        that.$message({
                            type: "warning",
                            message: "已经滑到底了"
                        });
                    }
                })
            },
            getThread: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'ThreadList/getList',{
                    page: this.page,
                    div: this.division
                }).then(function(res){
                    window.console.log(res.data);
                    if(res.data.errcode === 0){
                        that.postData = that.postData.concat(res.data.thread);
                        that.page += 1;
                    }else if(res.data.errcode === 5 || es.data.errcode === 6){
                        that.$message({
                           type: "warning",
                           message: "已经滑到底了"
                        });
                    }
                })
            },
            load: function(){
                this.getThread();
            },
            PostArticle: function(){
                const title = this.formData.title;
                const content = this.formData.content;
                const division = this.formData.chooseDiv;
                const that = this;
                if(title === '' || content === '' || division == null){
                    that.$message({
                        message: '标题、内容、分区必选',
                        type: 'warning'
                    });

                }else{
                    that.DoPost();
                    this.dialogFormVisible = false
                }

            },
            /**
             * @return {number}
             */

            DoPost: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'PostNewThread/doPost',
                    {
                        title: this.formData.title,
                        content: this.formData.content,
                        div: this.formData.chooseDiv
                    },{
                    headers:{
                        'Authorization': that.$cookies.get('session'),
                        'Uid': that.$cookies.get('uid')
                    }
                }).then(function(res){
                    if(res.data.errcode === 0){
                        that.$notify({
                            type: "success",
                            title: "发布成功",
                            message: "该主题已被成功的发送，即将为您跳转到详情页面"
                        });
                        that.$router.push('/thread/' + res.data.tid);
                    }else if(res.data.errcode === 1001){
                        that.$notify({
                            type: "warning",
                            title: "发布失败",
                            message: "您没有登录，不能够发表帖子"
                        });
                    }else{
                        that.$notify({
                            type: "error",
                            title: "发布失败",
                            message: "服务器出现异常，请稍后再试"
                        });
                    }
                }).catch(function(err){
                    window.console.log(err);
                    that.$notify({
                        type: "error",
                        title: "服务器异常",
                        message: "服务器出现异常，请稍后再试"
                    });
                })
            }

        }
    }
</script>

<style>
    .header{
        height:50px;
        /*border-bottom: 1px solid #2c3e50;*/
    }
    .bread-box{
        width: 90%;
        float: left;
    }
    .bread {
        position: relative;
        top: 14px;
    }
    .post-button-box{
        width: 10%;
        float: left;
        vertical-align: middle;
    }
    .post-button{

    }
    .post-form{
        margin: 0 auto;
        text-align: center;
        width: 95%;
    }
    .dialog .el-dialog{
        width: 90% !important;
    }
</style>
