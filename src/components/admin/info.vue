<template>
    <div class="content">
        <div class="widget-box">
            <div class="widget-title">
                <h5>H5模块信息</h5>
            </div>
            <div class="widget-content">
                <table class="el-table el-table--fit el-table--striped el-table--border">
                    <thead>
                    <tr>
                        <th width="50">#</th>
                        <th>项目名</th>
                        <th>所属项目</th>
                        <th width="150">参与者</th>
                        <th width="150">版本</th>
                        <th width="150">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in list">
                        <td>{{(page-1)*pagesize+index+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{getNameById(item.project,pro_list)}}</td>
                        <td>{{getNameById(item.engineer,user_list)}}</td>
                        <td>{{item.version}}</td>
                        <td>
                            <el-button size="mini" type="info" @click="viewDetail(index)">详情</el-button>
                            <router-link :to="{path:'addProject',query:{id:item.id}}">
                                <el-button size="mini" type="warning">编辑</el-button>
                            </router-link>
                            <el-tooltip class="item" effect="dark" content="删除不可恢复" placement="top">
                                <el-button size="mini" type="danger" @click="delInfo(item.id, index)">删除</el-button>
                            </el-tooltip>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="page-box">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="1"
                            :page-size="pagesize"
                            layout="total, prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>
            </div>

            <div class="dialog" :class="{'dialog-show':dialog}">
                <div class="dialog-wrapper">
                    <div class="dialog-header">
                        <span class="dialog-header-title">信息详情</span>
                        <span class="dialog-close" @click="closeDialog()"><i class="el-icon-close"></i></span>
                    </div>
                    <div class="dialog-content">
                        <div class="mgb5 div-cell"><label>项目名</label><span>{{detail.name}}</span></div>
                        <div class="mgb5 div-cell"><label>版本号</label><span>{{detail.version}}</span></div>
                        <div class="mgb5 div-cell"><label>所属项目</label><span>{{getNameById(detail.project,pro_list)}}</span></div>
                        <div class="mgb5 div-cell"><label>参与者</label><span>{{getNameById(detail.engineer,user_list)}}</span></div>
                        <div class="mgb5 div-cell"><label>开始时间</label><span>{{getTime(detail.start_time)}}</span></div>
                        <div class="mgb5 div-cell"><label>结束时间</label><span>{{getTime(detail.uptime)}}</span></div>
                        <div class="mgb5" v-if="detail.technology"><label>所用技术</label>
                            <el-tag type="success" v-for="item in detail.technology.split('/')">{{item}}</el-tag>
                        </div>
                        <div class="mgb5" v-if="detail.ideas"><label>ideas </label><span>{{detail.ideas}}</span></div>
                        <div class="mgb5" v-if="detail.shuticon"><label>缩略图</label><span class="small-img">
                            <img :src="detail.shuticon" title="查看大图" @click="viewBigImg(detail.shuticon)"/></span></div>
                        <div class="mgb5" v-if="detail.env_url.pro"><label>product</label><span>{{detail.env_url.pro}}</span></div>
                        <div class="mgb5" v-if="detail.env_url.dev"><label>develop</label><span>{{detail.env_url.dev}}</span></div>
                        <div class="mgb5" v-if="detail.env_url.module"><label>module</label><span>{{detail.env_url.module}}</span></div>
                        <div class="mgb5" v-if="detail.env_url.alpha"><label>alpha</label><span>{{detail.env_url.alpha}}</span></div>
                        <div class="mgb5" v-if="detail.env_url.beta"><label>beta</label><span>{{detail.env_url.beta}}</span></div>
                        <div class="mgb5" v-if="detail.mark"><label>备注</label><span>{{detail.mark}}</span></div>
                        <div class="clearfix"></div>
                        <div class="big-img" v-show="showbig">
                            <img ref="bigimg" @click="showbig = false" title="关闭大图">
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[],user_list:[],pro_list:[],detail:{env_url:{}},dialog:false,page:1,pagesize: 15,total:0,showbig:false
            }
        },
        methods:{
            handleCurrentChange(val) {
                this.page = val;
                this.getInfoList();
            },
            viewDetail(index){
                this.detail = {
                    name : this.list[index].name,
                    start_time : this.list[index].start_time,
                    uptime : this.list[index].uptime,
                    project : this.list[index].project,
                    engineer : this.list[index].engineer,
                    shuticon  : this.list[index].shuticon ,
                    env_url  : eval("("+this.list[index].env_url+")"),
                    technology  : this.list[index].technology ,
                    ideas   : this.list[index].ideas  ,
                    version   : this.list[index].version  ,
                    mark   : this.list[index].mark  ,
                }
                this.openDialog();
            },
            getNameById(id,list){
                let i, len = list.length;
                for(i = 0; i < len; i++){
                    if(list[i].id == id){
                        return list[i].name;
                    }
                }
            },
            getInfoList(){
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
            getOnceMenu(){
                let self = this;
                self.$http.get(server+'/menu/get_list').then( (res) => {
                    if(res.ok){
                        let response = res.data;
                        if(response.code=='200'){
                            self.pro_list = response.result.list;
//                            callback && callback()
                        }
                    }
                })
            },
            delInfo(id, index) {
                let self = this;
                self.$http.post(server+'/info/del',{id:id}).then( (res) => {
                    if(res.ok){
                        let response = res.data;
                        if(response.code=='200'){
                            self.$message.success('删除成功');
                            self.list.splice(index,1)
                        }else{
                            self.$message.error('删除失败');
                        }
                    }
                })
            },
            openDialog(){
                this.dialog =true;
            },
            closeDialog() {
                this.dialog = false;
            },
            getTime(str) {
                let d = new Date(parseInt(str))
                return d.getFullYear() + '年' + (d.getMonth()+1) + '月' +d.getDate() + '日';
            },
            viewBigImg(url) {
                this.$refs.bigimg.setAttribute('src',url);
                this.showbig = true;
                this.$refs.bigimg.classList.add('showbig')
            },
            getUserName() {
                let self = this;
                self.$http.get(server+'/user/get_list').then( (res) => {
                    if(res.ok){
                        let response = res.data;
                        if(response.code=='200'){
                            self.user_list = response.result;
                        }
                    }
                })
            },
        },
        created(){
            this.getUserName();
            this.getOnceMenu();
        }
    }
</script>
<style scoped>
    .el-tag{
        margin-right: 10px;
    }
    .dialog-content .mgb5{
        margin-bottom: 10px;
    }
    .dialog-content .mgb5 label{
        display: inline-block;
        width:80px;
        line-height: 30px;
        background: #20A0FF;
        color: #fff;
        border-radius: 3px;
        padding-left: 10px;
        margin-right: 20px;
    }
    .dialog-content .mgb5:nth-child(2n) label,.dialog-content .mgb5:nth-child(5n) label{
        background: #13CE66;
    }
    .dialog-content .mgb5:nth-child(3n) label{
        background: #F7BA2A;
    }
    .dialog-content .mgb5:nth-child(4n) label{
        background: #FF4949;
    }
    .div-cell{
        display: inline-block;
        width:50%;
        float: left;
    }
    .clearfix{
        content: '';
        display: table;
        clear: both;
    }
    .small-img{
        display: inline-block;
        width:50px;
        height: 50px;
        overflow: hidden;
        vertical-align: middle;
    }
    .small-img img{
        width:50px;
        cursor: pointer;
    }
    .big-img{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        text-align: center;
        background: rgba(0,0,0,.4);
    }
    .big-img img{
        max-width:100%;
        vertical-align: middle;
        cursor: pointer;
    }
    .big-img img.showbig{
        animation: scale .5s ease;
    }
    .big-img span{
        display: inline-block;
        width:0;
        height:100%;
        vertical-align: middle;
    }
    @keyframes scale {
        from{
            transform: scale(0.1);
        }
    }
</style>