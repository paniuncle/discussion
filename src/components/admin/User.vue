<template>
    <div class="container">
        <el-form :inline="true" :model="formData" class="search-form">
            <el-form-item label="UID">
                <el-input v-model="formData.uid" placeholder="UID"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="formData.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="formData.email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item label="用户组">
                <el-select v-model="formData.group" placeholder="用户组">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in groupData" v-bind:key="index" :label="item.name" :value="item.gid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchUserList">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="userData"
                style="width: 100%;height: 100%;"
                :row-class-name="tableRowClassName"
                >
            <el-table-column
                    label="UID"
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.uid }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="用户名"
                    width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="Email"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.email }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="注册时间"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.reg_time }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="用户组"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.groupname }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="changeUser(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="banUser(scope.row.uid)" v-if="scope.row.status === 0">封禁</el-button>
                    <el-button
                            size="mini"
                            type="success"
                            @click="unBanUser(scope.row.uid)" v-else>解封</el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
            <el-form :model="changeData">
                <el-form-item label="用户名" :label-width="40">
                    <el-input v-model="changeData.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="重置密码" :label-width="40">
                    <el-input v-model="changeData.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" :label-width="40">
                    <el-input v-model="changeData.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组" :label-width="40">
                    <el-select v-model="changeData.group" placeholder="用户组">
                        <el-option v-for="(item,index) in groupData" v-bind:key="index" :label="item.name" :value="item.gid"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="doChange">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "User",
        created(){
          this.getUserList();
          this.getGroupList();
        },
        data(){
            return {
                userData:[
                ],
                formData:{
                    uid: '',
                    username: '',
                    email: '',
                    group: '',
                    starttime: '',
                    endtime: '',
                },
                groupData:{

                },
                selectedUID: null,
                changeData:{
                    username: '',
                    password: '',
                    email: '',
                    group: 1,
                },
                dialogFormVisible: false,
            }
        },
        methods:{
            doChange: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'AdminBoard/changeUser',
                    {
                        uid: this.selectedUID,
                        username: this.changeData.username,
                        password: this.changeData.password,
                        email: this.changeData.email,
                        group: this.changeData.group
                    },{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                    window.console.log(res.data);
                    if(res.data.errcode === 0){
                        that.searchUserList();
                        that.$notify({
                            type: "success",
                            title: "更改成功",
                            message: "更改用户成功，即将刷新列表"
                        });
                        that.changeData.username = "";
                        that.changeData.password = "";
                        that.changeData.email = "";
                        that.changeData.group = 1;
                        that.dialogFormVisible = false;

                    }

                })

            },

            changeUser: function(row){
                this.selectedUID = row.uid;
                this.changeData.username = row.username;
                this.changeData.email = row.email;
                this.changeData.group = row.group;
                this.dialogFormVisible = true;
            },

            // eslint-disable-next-line
            tableRowClassName: function({row, rowIndex}) {
                if (row.status === 1) {
                    return 'warning-row';
                }
                return '';
            },
            unBanUser: function(uid){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'AdminBoard/unBanUser',
                    {
                        uid: uid
                    },{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                    window.console.log(res.data);
                    if(res.data.errcode === 0){
                        that.$notify({
                            type: "success",
                            title: "解封成功",
                            message: "解封这个用户成功，即将刷新列表"
                        })

                    }else{
                        that.$notify({
                            type: "error",
                            title: "解封失败",
                            message: "解封这个用户失败"
                        })
                    }
                    that.formData.uid = uid;
                    that.searchUserList();

                })
            },
            banUser: function(uid){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'AdminBoard/banUser',
                    {
                        uid: uid
                    },{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                        window.console.log(res.data);
                        if(res.data.errcode === 0){
                            that.$notify({
                                type: "success",
                                title: "封禁成功",
                                message: "封禁这个用户成功，即将刷新列表"
                            })

                        }else{
                            that.$notify({
                                type: "error",
                                title: "封禁失败",
                                message: "封禁这个用户失败"
                            })
                        }
                        that.formData.uid = uid;
                        that.searchUserList();

                })
            },
            getGroupList: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'AdminBoard/getUserGroup',
                    {},{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                    window.console.log(res.data);
                    if(res.data.errcode === 0){
                        that.groupData = res.data.group;

                    }

                })
            },
            getUserList: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'AdminBoard/getUserList',
                    {},{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                    window.console.log(res.data);
                    if(res.data.errcode === 0){
                        for(let i=0;i< res.data.userlist.length;i++){
                            if(res.data.userlist[i].group===1){
                                res.data.userlist[i].groupname = "普通用户";
                            }else if(res.data.userlist[i].group===2){
                                res.data.userlist[i].groupname = "超级管理员";
                            }else if(res.data.userlist[i].group===3){
                                res.data.userlist[i].groupname = "主持人";
                            }
                        }
                        that.userData = res.data.userlist;


                    }

                })
            },
            searchUserList: function(){
                window.console.log(this.formData);
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'AdminBoard/getUserList',
                    {
                        uid: this.formData.uid,
                        username: this.formData.username,
                        email: this.formData.email,
                        group: this.formData.group,

                    },{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                    window.console.log(res.data);
                    if(res.data.errcode === 0){
                        for(let i=0;i< res.data.userlist.length;i++){
                            if(res.data.userlist[i].group===1){
                                res.data.userlist[i].groupname = "普通用户";
                            }else if(res.data.userlist[i].group===2){
                                res.data.userlist[i].groupname = "超级管理员";
                            }else if(res.data.userlist[i].group===3){
                                res.data.userlist[i].groupname = "主持人";
                            }
                        }
                        that.userData = res.data.userlist;


                    }

                })
            }
        }
    }
</script>

<style>
    .line{
        position: relative;
        left:15px;
    }
    .search-form{
        text-align: center;
    }
    .el-table .warning-row {
        background: oldlace;
    }

</style>
