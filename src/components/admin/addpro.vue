<template>
    <div class="content">
        <div class="widget-box">
            <div class="widget-title">
                <h5>H5模块信息</h5>
            </div>
            <div class="widget-content">
                <el-form label-width="90px" ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
                    <el-form-item label="项目名称" prop="name">
                        <el-input placeholder="请输入项目名" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="起始时间">
                        <el-date-picker v-model="ruleForm.start_time"
                                type="date"
                                placeholder="开始时间"
                                style="width:217px">
                        </el-date-picker>
                        <span class="line">-</span>
                        <el-date-picker v-model="ruleForm.uptime"
                                type="date"
                                placeholder="结束时间"
                                style="width:217px">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="所属项目">
                        <el-select v-model="ruleForm.project">
                            <el-option :value="p.id" v-for="p in prolist" :label="p.name">{{p.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="参与者">
                        <el-select v-model="ruleForm.engineer">
                            <el-option :value="u.id" v-for="u in userlist" :label="u.name">{{u.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="缩略图">
                        <img :src="ruleForm.shuticon" class="small-img" v-if="showimg" @click="delShuticon">
                        <el-upload action="/info/upload" :on-success="handleSuccess" :on-remove="handleRemove">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <span class="el-upload__tip" slot="tip">&nbsp;只能上传jpg/png文件，且不超过500kb</span>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="版本号" prop="version">
                        <el-input placeholder="请输入版本号" v-model="ruleForm.version"></el-input>
                    </el-form-item>
                    <el-form-item label="product" prop="pro">
                        <el-input placeholder="请输入生产环境地址" v-model="ruleForm.pro"></el-input>
                    </el-form-item>
                    <el-form-item label="develop" prop="dev">
                        <el-input placeholder="请输入开发环境地址" v-model="ruleForm.dev"></el-input>
                    </el-form-item>
                    <el-form-item label="module" prop="module">
                        <el-input placeholder="请输入模块环境地址" v-model="ruleForm.module"></el-input>
                    </el-form-item>
                    <el-form-item label="alpha" prop="alpha">
                        <el-input placeholder="请输入集成环境地址" v-model="ruleForm.alpha"></el-input>
                    </el-form-item>
                    <el-form-item label="beta" prop="beta">
                        <el-input placeholder="请输入灰度环境地址" v-model="ruleForm.beta"></el-input>
                    </el-form-item>
                    <el-form-item label="关键技术">
                        <el-input placeholder="请输入关键技术 用'/'隔开" v-model="ruleForm.technology"></el-input>
                    </el-form-item>
                    <el-form-item label="ideas">
                        <el-input placeholder="请输入ideas" v-model="ruleForm.ideas"></el-input>
                    </el-form-item>
                    <el-form-item label="其他备注">
                        <el-input placeholder="备注" v-model="ruleForm.mark"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" @click="handleSubmit()">提交</el-button>
                        <el-button @click="handleReset()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                info_id:'',prolist: [], userlist: [],showimg: false,
                ruleForm: {
                    name: '', project: 0, engineer: 0, technology: '', version: '', mark: '', ideas: '',
                    start_time: new Date(),uptime:new Date(), pro:'', dev:'', module:'', alpha:'', beta:'',shuticon:''
                },
                rules: {
                    name: [{ required: true, message: '请输入项目名', trigger: 'blur' }],
//                    start_time: [{ type: 'date', required: true, message: '请输入开始时间', trigger: 'change' }],
//                    uptime: [{ type: 'date', required: true, message: '请输入结束时间', trigger: 'change' }],
//                    project: [{required: true, message: '请选择所属项目', trigger: 'change' }],
//                    engineer: [{ required: true, message: '请选择参与者', trigger: 'change' }],
                    pro: [{ required: true, message: '请输入正式环境地址', trigger: 'blur' }],
                    dev: [{ required: true, message: '请输入开发环境地址', trigger: 'blur' }],
                    module: [{ required: true, message: '请输入模块环境地址', trigger: 'blur' }],
                    alpha: [{ required: true, message: '请输入集成环境地址', trigger: 'blur' }],
                    beta: [{ required: true, message: '请输入灰度环境地址', trigger: 'blur' }],
                    version: [{ required: true, message: '请输入版本号', trigger: 'blur' }]
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.addInfo();
                    } else {
                        return false;
                    }
                });
            },
            handleReset() {
                this.$refs.ruleForm.resetFields();
            },
            getInfoById(id) {
                let self = this;
                self.$http.get(server+'/info/show?id='+id).then( (res) => {
                    if(res.ok){
                        let response = res.data,info,urlobj;
                        if(response.code=='200'){
                            info = response.result[0];
                            urlobj = JSON.parse(info.env_url)
                            self.ruleForm = {
                                name : info.name,
                                project : info.project,
                                engineer : info.engineer,
                                start_time : new Date(parseInt(info.start_time)),
                                uptime : new Date(parseInt(info.uptime)),
                                shuticon : info.shuticon,
                                technology : info.technology,
                                ideas  : info.ideas ,
                                version : info.version,
                                mark : info.mark,
                                pro : urlobj.pro,
                                dev: urlobj.dev,
                                module: urlobj.module,
                                alpha: urlobj.alpha,
                                beta: urlobj.beta
                            }
                            if(self.ruleForm.shuticon){ self.showimg = true; }
                        }
                    }
                })
            },
            getOnceMenu() {
                let self = this;
                self.$http.get(server+'/menu/get_list').then( (res) => {
                    if(res.ok){
                        let response = res.data;
                        if(response.code=='200'){
                            self.prolist = response.result.list;
                            if(!self.info_id){self.ruleForm.project = self.prolist[0].id;}
                        }
                    }
                })
            },
            addInfo() {
                let self = this, params, url = '/info/add';
                params = self.ruleForm;
                params.start_time = Date.parse(params.start_time);
                params.uptime = Date.parse(params.uptime);
                params.env_url = {
                    pro : params.pro, dev : params.dev, module: params.module, alpha: params.alpha, beta: params.beta
                };
                params.env_url = JSON.stringify(params.env_url)
                delete params.pro; delete params.dev; delete params.module; delete params.alpha; delete params.beta;
                if(self.info_id){
                    params.id = self.info_id;
                    url = '/info/update';
                }
                console.log(params)
                self.$http.post(server + url, params).then( (res) => {
                    if (res.ok) {
                        let response = res.data;
                        if (response.code == '200') {
                            self.$message.success(response.msg);
                        } else {
                            self.$message.error(response.msg);
                        }
                    }else {
                        self.$message.error('网络出错');
                    }
                })
            },
            getUserName() {
                let self = this;
                self.$http.get(server+'/user/get_list').then( (res) => {
                    if(res.ok){
                        let response = res.data;
                        if(response.code=='200'){
                            self.userlist = response.result;
                            if(!self.info_id){self.ruleForm.engineer = self.userlist[0].id;}
                        }
                    }
                })
            },
            handleSuccess(file){
                this.ruleForm.shuticon = file.msg;
                this.showimg = true;
            },
            delShuticon() {
                this.showimg = false;
                this.ruleForm.shuticon = '';
            }
        },
        created() {
            this.info_id = this.$route.query.id;
            this.getOnceMenu();
            this.getUserName();
            this.info_id && this.getInfoById(this.info_id);
        }
    }
</script>
<style scoped>
    .el-input{
        width:500px;
    }
    .line {
        text-align: center;
    }
    label{
        width: 70px;
        display: inline-block;
        font-size:14px;
    }
    .small-img{
        width:50px;
        height:50px;
        vertical-align: middle;
    }
</style>