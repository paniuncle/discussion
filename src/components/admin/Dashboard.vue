<template>
    <div class="container" style="height: 100%!important;">
        <el-row :gutter="10">
            <el-col :span="12">
                <el-card shadow="hover" class="card-user">
                    <i class="el-icon-user icon-style"></i>
                    <p class="tips-font">注册用户</p>
                    <p class="number-font">{{num.userNum}}</p>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover" class="card-post">
                    <i class="el-icon-tickets icon-style"></i>
                    <p class="tips-font">帖子数量</p>
                    <p class="number-font">{{num.threadNum}}</p>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        created(){
            this.getNum();
        },
        data(){
          return {
              num:{
                  threadNum: 0,
                  userNum: 0
              }
          }
        },
        methods:{
            getNum: function(){
                const that = this;
                this.axios.post(this.GLOBAL_API.apiUrl + 'AdminBoard/getBaseNum',
                    {},{
                        headers:{
                            'Authorization': that.$cookies.get('session'),
                            'Uid': that.$cookies.get('uid')
                        }
                    }).then(function(res){
                        window.console.log(res.data);
                        if(res.data.errcode === 0){

                            that.num.threadNum = res.data.threadnum;
                            that.num.userNum = res.data.usernum;

                        }

                })
            }
        }
    }
</script>

<style>
    .icon-style{
        font-size: 40px;
    }

    .card-user{
        background-color: #6699FF !important;
        color: #FFF;
        text-align: center;
        font-size: 20px;
    }
    .card-post{
        background-color: #9999FF !important;
        color: #FFF;
        text-align: center;
        font-size: 20px;
    }
    .tips-font{
        position: relative;
        top:-20px;
        font-weight: bold;
    }
    .number-font{
        position: relative;
        top:-10px;
    }
</style>
