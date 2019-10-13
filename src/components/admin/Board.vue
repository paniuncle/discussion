<template>
    <div class="container">
        <el-tabs tab-position="left">
            <el-tab-pane label="仪表盘">
                <admin-dashboard></admin-dashboard>
            </el-tab-pane>
            <el-tab-pane label="用户管理">
                <admin-user></admin-user>
            </el-tab-pane>
            <el-tab-pane label="板块管理">
                <divsion></divsion>
            </el-tab-pane>
            <el-tab-pane label="网站设置">
                <admin-setting></admin-setting>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import AdminDashboard from './Dashboard'
    import AdminSetting from './Setting'
    import AdminUser from './User'
    import Divsion from "./Divsion";
    export default {
        name: "Board",
        components:{
            AdminDashboard,
            AdminSetting,
            AdminUser,
            Divsion,
        }
    }
</script>

<style>
    .container{
        width: 100% !important;
    }
</style>
