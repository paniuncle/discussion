<template>
    <div id="division">
        <el-button type="primary" @click="dialogFormVisible = true">创建板块</el-button>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="did"
                    label="DID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="板块名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="desc"
                    label="描述">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="delDiv(scope.row.did)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="创建板块" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="板块名称">
                    <el-input v-model="formData.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简单描述">
                    <el-input v-model="formData.desc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="createDiv">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Divsion",
        created(){
          this.getDivData();
        },
        data(){
            return{
                dialogFormVisible: false,
                tableData:[],
                formData:{
                    name:'',
                    desc:''
                }
            }
        },
        methods:{
            getDivData(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'Division/getDivisionList').then(function(res){
                    if(res.data.errcode === 0){
                        that.tableData = res.data.division;
                    }
                })
            },
            createDiv(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'AdminBoard/addDiv',{
                    div_name: this.formData.name,
                    div_desc: this.formData.desc
                },{
                    headers: {
                        'Authorization': that.$cookies.get('session'),
                        'Uid': that.$cookies.get('uid')
                    }
                }).then(function (res) {
                    if (res.data.errcode === 0){
                        that.$message({
                            type: 'success',
                            message: '创建板块成功！'
                        });
                        that.getDivData();
                    }
                });
                this.dialogFormVisible = false;

            },
            delDiv(did){
                const that = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post(this.GLOBAL_API.apiUrl + 'AdminBoard/delDiv',{
                        div_id: did
                    },{
                        headers: {
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function (res) {
                        if (res.data.errcode === 0){
                            that.$message({
                                type: 'success',
                                message: '删除板块成功！'
                            });
                            that.getDivData();
                        }
                    });
                    this.dialogFormVisible = false;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            }
        }
    }
</script>

<style scoped>
    #division{
        text-align: center;
    }
</style>