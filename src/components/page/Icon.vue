<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-emoji"></i> 自定义图标</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h2>使用方法</h2>
            <p>
                直接通过设置类名为 el-icon-lx-iconName 来使用即可。例如：
            </p>
            <p class="example-p">
                <i class="el-icon-lx-delete" style="font-size: 30px;"></i>
                <span>&lt;i class=&quot;el-icon-lx-delete&quot;&gt;&lt;/i&gt;</span>
            </p>
            <p class="example-p">
                <i class="el-icon-lx-weibo" style="font-size: 30px;color: red"></i>
                <span>&lt;i class=&quot;el-icon-lx-weibo&quot;&gt;&lt;/i&gt;</span>
            </p>
            <p class="example-p">
                <i class="el-icon-lx-favorfill" style="font-size: 30px;color: #ffc300"></i>
                <span>&lt;i class=&quot;el-icon-lx-favorfill&quot;&gt;&lt;/i&gt;</span>
            </p>
            <br>
            <h2>图标</h2>
            <div class="search-box">
                <el-input class="search" size="large" v-model="keyword" clearable placeholder="请输入图标名称"></el-input>
            </div>
            <ul>
                <li class="icon-li" v-for="(item,index) in list" :key="index">
                    <div class="icon-li-content">
                        <i :class="`el-icon-lx-${item}`"></i>
                        <span>{{item}}</span>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                keyword: '',
                iconList: [
                    'attentionforbid',
                    'attentionforbidfill',
                    'attention',
                    'attentionfill',
                    'tag',
                    'tagfill',
                    'people',
                    'peoplefill',
                    'notice',
                    'noticefill',
                    'mobile',
                    'mobilefill',
                    'voice',
                    'voicefill',
                    'unlock',
                    'lock',
                    'home',
                    'homefill',
                    'delete',
                    'deletefill',
                    'notification',
                    'notificationfill',
                    'notificationforbidfill',
                    'like',
                    'likefill',
                    'comment',
                    'commentfill',
                    'camera',
                    'camerafill',
                    'warn',
                    'warnfill',
                    'time',
                    'timefill',
                    'location',
                    'locationfill',
                    'favor',
                    'favorfill',
                    'full',
                    'text',
                    'group',
                    'friend',
                    'profile',
                    'addressbook',
                    'calendar',
                    'apps',
                    'copy',
                    'share',
                    'wifi',
                    'vipcard',
                    'goods',
                    'weibo',
                    'message',
                    'remind',
                    'qrcode',
                    'cart',
                    'refresh',
                    'top',
                    'filter',
                    'pic',
                    'settings',
                    'scan',
                    'cascades',
                    'search',
                    'emoji',
                    'edit'

                ]
            }
        },
        computed: {
            list(){
                return this.iconList.filter((item) => {
                    return item.indexOf(this.keyword) !== -1;
                })
            }
        }
    }
</script>

<style scoped>
.example-p{
    height: 45px;
    display: flex;
    align-items: center;
}
.search-box{
    text-align: center;
    margin-top: 10px;
}
.search{
    width: 300px;
}
ul,li{
    list-style: none;
}
.icon-li{
    display: inline-block;
    padding: 10px;
    width: 120px;
    height: 120px;
}
.icon-li-content{
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon-li-content i{
    font-size: 36px;
    color: #606266;
}
.icon-li-content span{
    margin-top: 10px;
    color: #787878;
}
</style>