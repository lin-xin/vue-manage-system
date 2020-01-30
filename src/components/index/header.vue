<template>
    <div class="container-fluid nav-bar">
        <div class="container">
            <!--<el-row :gutter="20">-->
                <!--<el-col :span="4"><div class="grid-content bg-purple"></div></el-col>-->
                <!--<el-col :span="16"><div class="grid-content bg-purple"></div></el-col>-->
                <!--<el-col :span="4"><div class="grid-content bg-purple"></div></el-col>-->
            <!--</el-row>-->
            <el-row :gutter="20">
                <el-col :span="4"><div class="grid-content bg-purple"><img src="../../assets/omw.png" alt="" class="logo"></div></el-col>
                <el-col :span="16">
                    <el-menu default-active="1" class="el-menu-demo clearfix" mode="horizontal" @select="handleSelect">
                        <!--<el-menu-item><img src="../../assets/omw.png" alt="" class="logo"></el-menu-item>-->
                        <el-menu-item index="1">
                            <router-link to="proInfo"><!--<i class="el-icon-document"></i>--> 项目信息</router-link>
                        </el-menu-item>
                        <el-menu-item index="2">功能需求</el-menu-item>
                        <!--<el-submenu index="2">-->
                            <!--<template slot="title">功能需求</template>-->
                            <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
                            <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
                            <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
                        <!--</el-submenu>-->
                        <el-menu-item index="3">关于平台</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>

        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {

            }
        },
        methods: {
            handleSelect (key, keyPath) {
                console.log(key, keyPath);
            }
        },
        getMenuList () {
            let self = this;
            self.$http.get(server+'/info/index?page='+self.page+'&pagesize='+self.pagesize).then( (res) => {
                if(res.ok){
                    let response = res.data;
                    if(response.code=='200'){
                        self.list = response.result.list;
                        self.total = response.result.total;
                    }else {
                        self.$message.error('加载失败');
                    }
                }else {
                    self.$message.error('网络出错');
                }
            })
        },
    }
</script>
<style>
    .logo {
        height: 60px;
        width: 120px;
    }
</style>
