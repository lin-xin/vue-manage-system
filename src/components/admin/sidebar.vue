<template>
    <div class="sidebar">
        <ul class="el-menu el-menu--dark">
            <li class="el-menu-item">
                <router-link to="/admin/taskList"><i class="el-icon-upload"></i> 进入前台</router-link>
            </li>
            <li class="el-menu-item" :class="{'is-active':isNav('/taskList')}">
                <router-link to="/admin/taskList"><i class="el-icon-document"></i> 任务列表</router-link>
            </li>
            <li class="el-menu-item" :class="{'is-active':isNav('/taskEdit')}">
                <router-link to="/admin/taskEdit"><i class="el-icon-plus"></i> 添加任务</router-link>
            </li>
            <li class="el-menu-item":class="{'is-active':isNav('/moduleInfo')}">
                <router-link to="/admin/moduleInfo"><i class="el-icon-menu"></i> 项目列表</router-link>
            </li>
            <li class="el-menu-item":class="{'is-active':isNav('/addProject')}">
                <router-link to="/admin/addProject"><i class="el-icon-setting"></i> 添加项目</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        methods:{
            isNav: function(str){
                return this.$route.path.indexOf(str)>-1;
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 220px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        list-style: none;
        margin: 0 0 0;
        padding: 0;
        position: absolute;
        width: 220px;
        height:100%;
    }
    .sidebar > ul > li{
        transition: all .5s ease;
    }
    .sidebar > ul > li:hover{
        padding-left: 40px;
    }
    .sidebar > ul > li > a {
        display: block;
        color: #c0ccda;;
        cursor: pointer;
        text-decoration: none;
    }
    .sidebar > ul > li.is-active a {
        color: #20a0ff;
    }
</style>
