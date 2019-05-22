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
                <span><el-button type="info" class="post-button"><i class="el-icon-edit"></i>发表帖子</el-button></span>
            </div>

        </div>
        <div class="board">
            <el-table
                    :data="postData"
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="主题"
                        min-width="350px">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="作者头像"
                        min-width="50px">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="回复"
                        min-width="25px">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="浏览"
                        min-width="25px">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="活跃"
                        min-width="25px">
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Board",
        data(){
            return {
                postData : null
            }
        }
    }
</script>

<style scoped>
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
</style>
