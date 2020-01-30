<template>
    <div class="content">
        <div class="widget-box">
            <div class="widget-title">
                <h5>新增菜单</h5>
            </div>
            <div class="widget-content nopadding">
                <el-select v-model="select_type" style="width: 120px;">
                    <el-option label="一级菜单" value="1">一级菜单</el-option>
                    <el-option label="二级菜单" value="2">二级菜单</el-option>
                </el-select>
                <el-select v-if="isShow" v-model="select_id" style="width: 120px;">
                    <el-option :value="m.id" v-for="m in menu" :label="m.name">{{m.name}}</el-option>
                </el-select>
                <el-input placeholder="菜单名称" v-model="menu_name" style="width:200px"></el-input>
                <el-button type="primary" @click="addMenu()">提交</el-button>
            </div>
        </div>
        <div class="widget-box">
            <div class="widget-title">
                <h5>新增内容</h5>
            </div>
            <div class="widget-content">
                <el-form label-width="70px" class="demo-ruleForm" v-show="!isedit">
                    <el-form-item label="所属项目">
                        <el-select v-model="add_once" style="width: 150px;">
                            <el-option v-for="(m,i) in first_menu" :value="m.id" :label="m.name">{{m.name}}</el-option>
                        </el-select>
                        <span class="line"> - </span>
                        <el-select v-model="add_second" style="width: 150px;">
                            <el-option v-for="m in second_menu" :value="m.id" :label="m.name">{{m.name}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form label-width="70px" class="demo-ruleForm" v-show="isedit">
                    <el-form-item label="所属项目">
                        <el-input v-model="name" style="width:100%" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
                <el-input class="mgb20" placeholder="请输入标题" v-model="title" style="width:100%"></el-input>
                <textarea id="editor" placeholder="请输入详细内容" autofocus v-model="content"></textarea>
                <el-button type="primary" @click="clickEvent()" style="margin-top: 20px">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'expose?$!jquery';
    import Simditor from 'simditor';
    export default {
        data () {
            return {
                first_menu:'', second_menu:'', add_once: '', add_second: '', title : '', content : '', menu_name : '',
                isShow : false, menu : [], select_type : '1', select_id : '', isedit : false, param_id :'', name:''
            }
        },
        created () {
            this.getOnceMenu();
            self.param_id = this.$route.query.id;
            if(self.param_id){
                this.getCnt(self.param_id);

            }
        },
        mounted () {
            let editor = new Simditor({
                textarea: $('#editor')
            });
        },
        watch:{
            'select_type' : function () {
                if(this.select_type == "2"){
                    this.isShow = true;
                }else{
                    this.isShow = false;
                }
            },
            'add_once' : function(){
                this.getSubMenuByPid(this.add_once)
            }
        },
        methods: {
            addMenu() {
                let self = this,param = {
                    name:self.menu_name,
                    type:self.select_type
                };
                if(param.type == '2'){ param.p_id = self.select_id; }
                if(self.menu_name.length){
                    self.$http.post(server+'/menu/add',param).then( (res) => {
                        if(res.ok){
                            let response = res.data;
                            console.log(response);
                            if(response.code=='200'){
                                self.$message.success('提交成功');
                            }else{
                                self.$message.error('提交失败');
                            }
                        }else {
                            self.$message.error('网络出错');
                        }
                    })
                }else{
                    self.$message.warning('请输入菜单名');
                }
            },
            getOnceMenu() {
                let self = this;
                self.$http.get(server+'/menu/get_list').then((res) => {
                    if(res.ok){
                        let response = res.data;
                        if(response.code=='200'){
                            self.menu = self.first_menu = response.result.list;
                            self.select_id = self.add_once = self.first_menu[0].id;
                        }
                    }else {
                        self.$message.error('获取一级菜单失败');
                    }
                })
            },
            getSubMenuByPid(pid) {
                let self = this;
                self.$http.get(server+'/menu/get_list?pid='+ pid).then((res) => {
                    if(res.ok){
                        let response = res.data;
                        if(response.code=='200'){
                            self.second_menu = response.result.list;
                            if(self.second_menu.length){
                                self.add_second = self.second_menu[0].id;
                            }else{
                                self.add_second = '';
                            }
                        }
                    }else {
                        self.$message.error('获取二级菜单失败');
                    }
                })
            },
            clickEvent() {
                if(self.param_id){
                    this.editCnt(self.param_id)
                }else{
                    this.addCnt();
                }
            },
            addCnt() {
                let self = this,
                    html = document.querySelector('.simditor-body').innerHTML,
                    param = {};
                self.content = (html == '<p><br></p>')?'':html;
                param = {m_id:self.add_second,title:self.title,content:self.content}
                if(param.title.length && param.content.length) {
                    self.$http.post(server+'/demand/add', param).then( (res) => {
                        if(res.ok){
                            let response = res.data;
                            if(response.code=='200'){
                                self.$message.success('提交成功');
                                self.title = self.content = '';
                                document.querySelector('.simditor-body').innerHTML = '';
                            }else{
                                self.$message.error('提交失败');
                            }
                        }else {
                            self.$message.error('网络出错');
                        }
                    })
                }else {
                    self.$message.warning('标题或详细内容不得为空');
                }
            },
            editCnt(id) {
                let self = this,
                    html = document.querySelector('.simditor-body').innerHTML,
                    param = {};
                self.content = (html == '<p><br></p>')?'':html;
                param = {id: id,title:self.title,content:self.content}
                if(self.title.length && self.content.length) {
                    self.$http.post(server+'/demand/update', param).then( (res) => {
                        if (res.ok) {
                            let response = res.data;
                            if (response.code == '200') {
                                self.$message.success('修改成功');
                                self.title = self.content = '';
                                document.querySelector('.simditor-body').innerHTML = '';
                            } else {
                                self.$message.error('修改失败');
                            }
                        }else {
                            self.$message.error('网络出错');
                        }
                    })
                }else {
                    self.$message.warning('标题和详细内容不得为空');
                }
            },
            getCnt(id) {
                let self = this;
                self.$http.get(server+'/demand/show?id='+id).then( (res) => {
                    if(res.ok){
                        let response = res.data;
                        if(response.code=='200'){
                            self.getMenuName(response.result[0].m_id)
                            self.title = response.result[0].title;
                            self.content = response.result[0].content;
                            document.querySelector('.simditor-placeholder').style.display = 'none';
                            document.querySelector('.simditor-body').innerHTML = self.content;
                            self.isedit = true;
                        }
                    }else {
                        self.$message.error('网络出错');
                    }
                })
            },
            getMenuName(id) {
                let self = this;
                self.$http.get(server+'/menu/show?id='+id).then((res) => {
                    if(res.ok){
                        let response = res.data;
                        if(response.code=='200'){
                            self.name = response.result[0].name;
                        }
                    }
                })
            }
        }
    }
</script>
<style src="simditor/styles/simditor.css"></style>