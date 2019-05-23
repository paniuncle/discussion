<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <div class="create-message">
                    <el-button type="success" size="large" @click="dialogCreateMsgVisible = true">创建私信</el-button>
                </div>


                <el-menu default-active="2" >
                    <el-submenu index="1">

                        <template slot="title">
                            <i class="el-icon-message-solid"></i>
                            <span>系统消息</span>
                        </template>
                        <el-menu-item v-for="s in Message.System" :key="s.MessageID"><span><img :src="s.Avatar" class="avatar">{{ s.UserName }}</span></el-menu-item>
                    </el-submenu>
                    <el-submenu index="2" is-dot>
                        <template slot="title">
                            <i class="el-icon-message"></i>
                            <span>用户消息</span>
                        </template>
                        <el-menu-item v-for="u in Message.User" :key="u.MessageID"><span><img :src="u.Avatar" class="avatar">{{ u.UserName }}</span></el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="message-box">

                <div class="message-box-content">
                    <h1> 消息内容 </h1>
                    <p>aaaa</p>
                </div>

            </el-main>
        </el-container>
        <el-dialog title="创建私信" :visible.sync="dialogCreateMsgVisible">
            <el-form :model="form">
                <el-select
                        v-model="form.userId"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请输入用户名或ID来搜索用户"
                        class="form-user">

                    <el-option
                            v-for="item in userList"
                            :key="item.userID"
                            :label="item.userName"
                            :value="item.userID">
                    </el-option>
                </el-select>
                <mavon-editor v-model="form.messageContent"/>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateMsgVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogCreateMsgVisible = false">发 送</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Notification",
        data(){
            return {
                Message:{
                    System:[
                        { UserID: '10001', UserName: '帕尼', MessageID: '10001' , Avatar: 'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg'},
                        { UserID: '10002', UserName: '测试用户1', MessageID: '10002' , Avatar: 'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg'},
                        { UserID: '10003', UserName: '测试用户2', MessageID: '10003' , Avatar: 'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg'},
                        { UserID: '10004', UserName: '测试用户3', MessageID: '10004' , Avatar: 'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg'}
                    ],
                    User:[
                        { UserID: '10001', UserName: '帕尼', MessageID: '10001' , Avatar: 'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg'},
                        { UserID: '10002', UserName: '测试用户1', MessageID: '10002' , Avatar: 'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg'},
                        { UserID: '10003', UserName: '测试用户2', MessageID: '10003' , Avatar: 'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg'},
                        { UserID: '10004', UserName: '测试用户3', MessageID: '10004' , Avatar: 'https://ygobbs.com/uploads/default/original/2X/c/c74539e07b8e38be472f746c3035738aa29af9df.jpg'}
                    ]
                },
                form: {
                    userId: [],
                    messageContent: ''
                },
                rules: {
                    userId:[

                    ],
                    messageContent:[

                    ]
                },
                userList: [
                    {userID:'1', userName: '帕尼'},
                    {userID:'2', userName: '用户1'},
                    {userID:'3', userName: '用户2'},
                    {userID:'4', userName: '用户3'},
                ],
                dialogCreateMsgVisible: false
            }
        }
    }
</script>

<style scoped>
    .message-box{
        padding: 0 !important;
    }
    .message-box-content{
        padding-left: 30px;
    }
    .avatar{
        border-radius: 50%;
        width: 25px;
        margin-right: 10px;
    }
    .create-message{
        text-align: center;
        border-right: 1px solid #DCDFE6;
        padding-bottom: 10px;
    }
    .form-user{
        width: 100%;
        margin-bottom: 20px;
    }
</style>
