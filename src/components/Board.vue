<template>
    <div id="container">
        <div class="header">
            <div class="bread-box">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
                    <el-breadcrumb-item>
                        <el-dropdown>
                  <span class="el-dropdown-link">
                    选择一个板块<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>全部</el-dropdown-item>
                                <el-dropdown-item>板块1</el-dropdown-item>
                                <el-dropdown-item>板块2</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-breadcrumb-item>

                    <el-breadcrumb-item>帖子列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="post-button-box">
                <span><el-button type="info" class="post-button" @click="dialogFormVisible = true"><i class="el-icon-edit"></i>发表帖子</el-button></span>
            </div>

        </div>
        <div class="board">
            <el-table
                    :data="postData"
                    style="width: 100%">
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
                        <img :src="scope.row.avatar" width="40px" style="border-radius: 50%;"/>
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
                        min-width="40px">
                    <template slot-scope="scope">
                        <p>{{ scope.row.active}}</p>
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
                                    <el-option v-for="d in formData.division" :key="d.value" :label="d.label" :value="d.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <mavon-editor v-model="formData.content"/>
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
                postData : [
                    {title: 'Test1', avatar:'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg', reply: '1K', view:'30.5K', active:'1小时前'},
                    {title: 'Test2', avatar:'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg', reply: '1K', view:'30.5K', active:'1小时前'},
                    {title: 'Test3', avatar:'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg', reply: '1K', view:'30.5K', active:'1小时前'},
                    {title: 'Test4', avatar:'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg', reply: '1K', view:'30.5K', active:'1小时前'},
                    {title: 'Test5', avatar:'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg', reply: '1K', view:'30.5K', active:'1小时前'},
                ],
                dialogFormVisible: false,
                formData : {
                    title: '',
                    content: '',
                    chooseDiv: null,
                    division: [
                        { label: '分区1', value: 1 },
                        { label: '分区2', value: 2 },
                        { label: '分区3', value: 3 },
                        ]

                }
            }
        },
        methods: {
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
                    that.DoPost;
                }else{
                    this.dialogFormVisible = false
                }

            },
            /**
             * @return {number}
             */
            DoPost: function(){
                return 0;
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
