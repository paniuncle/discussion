<template>
    <div class="container">
        <div class="title-box">
            <span class="article-title"> <img class="title-avatar" :src="userAvatar"><el-tag class="article-tag">{{articleData.base.division}}</el-tag> {{articleData.base.title}}</span>
        </div>

        <div class="content-box">
            <div class="context" v-html="markedContent"></div>
            <div class="content-button">
                <el-popover
                        placement="bottom"
                        title="点击按钮即可复制URL"
                        width="200"
                        trigger="click">
                    <el-input :value="nowUrl" id="urlText" class="input-with-select">
                        <el-button slot="append" icon="el-icon-document-copy" @click="copyUrl"></el-button>
                    </el-input>
                    <el-button slot="reference" icon="el-icon-paperclip" class="font-size-up"></el-button>
                </el-popover>
                <el-button type="primary" icon="el-icon-s-comment" class="font-size-up" @click="dialogFormVisible = true">回 复</el-button>
                <el-button type="danger" icon="el-icon-delete" class="font-size-up" @click="delThread" v-if="group !== 1">删 除</el-button>
            </div>
        </div>

        <div class="reply-list" v-infinite-scroll="load">
            <el-card class="box-card" v-for="(item, index) in replyList" v-bind:key="index">
                <div class="user-info-box">
                    <el-image style="width: 100px; height: 100px" :src="apiAvatar + item.uid" fit="cover"></el-image>
                    <p class="username-p">{{ item.username }}</p>
                    <!--<el-button type="danger" icon="el-icon-delete" class="font-size-up" @click="delReply(item.cid)" v-if="group !== 1">删 除</el-button>-->
                    <span class="delete-icon" @click="delReply(item.cid)" v-if="group !== 1"><i class="el-icon-delete"></i></span>
                    <span class="comment-icon" @click="doComment(item.content, item.username)"><i class="el-icon-chat-line-square"></i></span>
                </div>
                <div class="comment-box">
                    <div v-html="item.content"></div>
                </div>
            </el-card>
        </div>

        <div class="post-board">
            <el-dialog title="回复主题" :visible.sync="dialogFormVisible" class="dialog">
                <el-form :model="reply" class="post-form">
                    <el-form-item>
                        <mavon-editor v-model="reply.content" :toolbars="toolbars"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doReply">回 复</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import marked from 'marked'
    export default {
        name: "Thread",
        created(){
            this.getThread();
            this.getUrl();
            this.getUserGroup();
        },
        data(){
            return {
                group: 1,
                articleData:{
                    base: {},
                    content: {}
                },
                markedContent: '',
                dialogFormVisible: false,
                reply:{
                    content:''
                },
                nowUrl: '',
                userAvatar: '',
                page: 1,
                replyList:[],
                apiAvatar: this.GLOBAL_API.apiUrl + 'Profiles/getAvatar&uid=',
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                }
            }
        },
        methods:{
            doComment: function(content, username){
                let result = content.replace(/<\/?.+?>/g,"");
                let end = result.replace(/ /g,"");
                end = end.replace("\n","");
                this.reply.content = "@" + username + "\n" + "> " + end + "\n";
                this.dialogFormVisible = true;
            },
            getUserGroup: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'Authenticate/getUserGroup',
                    {
                        uid: that.$cookies.get('uid')
                    },{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                    if(res.data.errcode === 0){
                        that.group = res.data.group;

                    }else if(res.data.errcode === 1001){
                        that.group = 1;
                    }

                })
            },
            delThread: function(){
                this.$confirm('此操作将删除该帖子且不可恢复, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const that = this;
                    this.axios.post(this.GLOBAL_API.apiUrl + 'Thread/delThread',
                        {
                            tid: this.articleData.base.tid
                        },{
                            headers:{
                                'Authorization': that.$cookies.get('session'),
                                'Uid': that.$cookies.get('uid')
                            }
                        }).then(function(res){
                        if(res.data.errcode === 0){
                            that.$notify({
                                type: "success",
                                title: "删除成功",
                                message: "删除主题成功，即将跳转回主页面"
                            });
                            that.$router.push('/');
                        }else if(res.data.errcode === 1001){
                            that.$notify({
                                type: "error",
                                title: "删除失败",
                                message: "删除失败，您没有任何修改本页面的权限"
                            })
                        }

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除帖子'
                    });
                });

            },
            delReply: function(cid){
                this.$confirm('此操作将删除该评论且不可恢复, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const that = this;
                    this.axios.post(this.GLOBAL_API.apiUrl + 'Thread/delReply',
                        {
                            cid: cid
                        },{
                            headers:{
                                'Authorization': that.$cookies.get('session'),
                                'Uid': that.$cookies.get('uid')
                            }
                        }).then(function(res){
                        if(res.data.errcode === 0){
                            that.$notify({
                                type: "success",
                                title: "删除成功",
                                message: "删除评论成功，即将刷新评论页面"
                            });
                            that.page = 1;
                            that.replyList = [];
                            that.getComment();
                        }else if(res.data.errcode === 1001){
                            that.$notify({
                                type: "error",
                                title: "删除失败",
                                message: "删除失败，您没有任何修改本页面的权限"
                            })
                        }

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除评论'
                    });
                });

            },
            load: function(){
                this.getComment();

            },
            getComment: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'Thread/getReplyList',{
                    tid: this.articleData.base.tid,
                    page: this.page
                }).then(function(res){
                    window.console.log(res.data);
                    if(res.data.errcode === 0){

                        for(let i=0;i<res.data.comment.length;i++){
                            res.data.comment[i].content = that.compiledMarkdown(res.data.comment[i].content);
                        }
                        that.replyList = that.replyList.concat(res.data.comment);
                        that.page += 1;
                    }else if(res.data.errcode === 5){
                        that.$message({
                            type: "warning",
                            message: "已经滑到底了"
                        });
                    }
                })
            },
            getDivision: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'Division/getDivision',{
                    did: this.articleData.base.division
                }).then(function(res){
                    window.console.log(res.data);
                    if(res.data.errcode === 0){
                        that.articleData.base.division = res.data.division.name;
                    }
                })
            },
            getThread: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'Thread/getThread',{
                    tid: this.$route.params.tid
                }).then(function(res){
                    if(res.data.errcode === 0){
                        that.articleData.base = res.data.thread.base;
                        that.articleData.content = res.data.thread.content.content;
                        that.markedContent = that.compiledMarkdown(that.articleData.content);
                        that.getDivision();
                        that.userAvatar = that.GLOBAL_API.apiUrl + 'Profiles/getAvatar&uid=' + that.articleData.base.uid;
                        that.getComment();
                    }
                })
            },
            compiledMarkdown: function(value){
                return marked(value , { sanitize: true });

            },
            doReply: function(){
                const content = this.reply.content;
                const that = this;
                if(content === ''){
                    that.$message({
                        message: '必须填写内容',
                        type: 'warning'
                    });

                }else{
                    that.doPost();
                    that.dialogFormVisible = false;
                    that.reply.content = '';

                }
            },
            doPost: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'Thread/replyThread',
                    {
                        content: this.reply.content,
                        tid: this.articleData.base.tid
                    },{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                        if(res.data.errcode === 0){
                            that.$notify({
                                type: "success",
                                title: "回复成功",
                                message: "回复成功，即将为您刷新评论页面"
                            })
                        }
                    that.page = 1;
                    that.replyList = [];
                    that.getComment();

                }).catch(function(err){
                    window.console.log(err);
                    that.$notify({
                        type: "error",
                        title: "回复失败",
                        message: "服务器出现异常，请稍后再试"
                    })
                })
            },
            getUrl: function(){
                this.nowUrl = window.location.href
            },
            copyUrl: function(){
                const urlResult = document.getElementById('urlText');
                urlResult.select();
                document.execCommand("Copy");
                this.$message({
                    message: '复制Url成功！',
                    type: 'success'
                })


            }
        }
    }
</script>

<style>
    blockquote{
        font: 14px/22px normal helvetica, sans-serif;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 50px;
        padding-left: 15px;
        padding-top: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        border-left: 3px solid #ccc;
        background-color:#f1f1f1
    }
    .container{
        width: 80%;
        margin: 0 auto;
    }
    .title-box {

    }
    .article-title {
        display: inline;
        font-size:30px;
    }
    .article-tag {
        position: relative;
        top:-5px;
    }
    .content-box{
        padding-bottom: 60px;
        border-bottom: 1px solid #EBEEF5;
    }
    .content-button{
        float: right;
    }
    .font-size-up{
        font-size: 16px;
        margin-left: 10px;
    }
    .box-card{
        padding-bottom: 20px;
    }
    .user-info-box{
        float: left;
        text-align: center;
        width:150px;
        border-right: 1px solid #EBEEF5;
    }
    .comment-box{
        float: left;
        width: auto;
        margin-left: 20px;
    }
    .title-avatar{
        width: 55px;
        vertical-align: middle;
        margin-right: 20px;
        border-radius: 3px;
    }
    .delete-icon{
        cursor: pointer;
        color: #FF6666;
        font-size: 25px;
        margin-right: 10px;
    }
    .delete-icon:hover{
        color: #FF3333;
    }
    .username-p{
        font-weight: bold;
        position: relative;
        top:-10px;
        color:#606266;
    }
    .comment-icon{
        cursor: pointer;
        font-size: 25px;
    }
    .comment-icon:hover{
        color: #999999;
    }
</style>
