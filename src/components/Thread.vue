<template>
    <div class="container">
        <div class="title-box">
            <span class="article-title"><el-tag class="article-tag">{{articleData.tag}}</el-tag> {{articleData.title}}</span>
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
            </div>
        </div>

        <div class="reply-list">
            <el-card class="box-card">
                <div class="user-info-box">
                    <el-image style="width: 100px; height: 100px" :src="url" fit="cover"></el-image>
                    <p>帕尼</p>
                </div>
                <div class="comment-box">
                    <p>asdjfsaio</p>
                </div>
            </el-card>
        </div>

        <div class="post-board">
            <el-dialog title="回复主题" :visible.sync="dialogFormVisible" class="dialog">
                <el-form :model="reply" class="post-form">
                    <el-form-item>
                        <mavon-editor v-model="reply.content"/>
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
            this.markedContent = this.compiledMarkdown(this.articleData.content);

            this.getUrl();
        },
        data(){
            return {
                articleData:{
                    title: '文章标题',
                    tag: '普通主题',
                    level: 0,
                    content: '# good! \n# hahah \n## hahahha!# good! \n# hahah \n## hahahha!# good! \n# hahah \n## hahahha!' +
                        '# good! \n# hahah \n## hahahha!# good! \n# hahah \n## hahahha!# good! \n# hahah \n## hahahha!' +
                        '# good! \n# hahah \n## hahahha!'
                },
                markedContent: '',
                dialogFormVisible: false,
                reply:{
                    content:''
                },
                nowUrl: ''
            }
        },
        methods:{
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
                    that.doPost()
                }else{
                    this.dialogFormVisible = false
                }
            },
            doPost: function(){
                return 0;
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

<style scoped>
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

</style>
