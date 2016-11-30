<template>
    <div class="m-form">
    <div class="login">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
            <div class="error" v-if="ruleForm2.bHasErrorShow">{{ruleForm2.sErrorTips}}</div>
            <el-form-item label="用户名:" prop="name">
                <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
                <span class="el-icon-circle-close close" v-if="ruleForm2.bHasCloseName" @click="clearDataName"></span>
            </el-form-item>
            <el-form-item label="密码:" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                <span class="el-icon-circle-close close" v-if="ruleForm2.bHasClosePass" @click="clearDataPass"></span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit" class="w100">登 陆</el-button>
                <div class="fr u-line"><a @click="handleRegist">注册新账号</a> | <a>忘记密码?</a> </div>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>
<script>
   export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.ruleForm2.pass !== '') {
            this.$refs.ruleForm2.validateField('pass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          name: '',
          pass: '',
          bHasErrorShow: false,
          bHasCloseName: false,
          bHasClosePass: false,
          sErrorTips: '请输入正确的帐号！'
        },
        rules2: {
          name: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    watch: {
        'ruleForm2.name': function() {
            if(this.ruleForm2.name != ''){
                this.ruleForm2.bHasCloseName = true;
            }else{
                this.ruleForm2.bHasCloseName = false;
            }
        },
        'ruleForm2.pass': function() {
             if(this.ruleForm2.pass != ''){
                this.ruleForm2.bHasClosePass = true;
            }else{
                this.ruleForm2.bHasClosePass = false;
            }
        }
    },
    methods: {
        clearDataName() {
            this.ruleForm2.name = '';
          },
        clearDataPass() {
            this.ruleForm2.pass = '';
          },
        handleSubmit(ev) {
         let self = this,param = {
            username: self.ruleForm2.name,
            password: self.ruleForm2.pass
        }
        self.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            self.$http.post(server + '/user/login',param).then((res) => {
                if(res.ok) {
                    let response = res.data;
                    if(response.code == '200') {
                        console.log(response);
                        let sUsername = response.result.username;
                        let sUserId = response.result.user_id;
                        let sExpireTime = 3;
                        self.setCookie(sUsername,sUserId,sExpireTime);
                        location.href = '#/admin/';
                    }else {
                        self.ruleForm2.bHasErrorShow = true;
                    }
                }
            })
          } else {
            console.log('不能为空');
            return false;
          }
        });
        },
          setCookie(name, value, iDay) {
            let oDate = new Date();
            oDate.setDate(oDate.getDate() + iDay);
            document.cookie = name + '=' + value + ';expires=' + oDate;
          },
          handleRegist() {
            location.href = '#/regist/';
          }
    }
  }
</script>
<style>
    body {
        margin: 0;
        padding: 0;
    }
    .m-form {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #555f6e;
    }
    .m-form .login {
        position: relative;
        top: 30%;
        margin: 0 auto;
        border-radius: 8px;
        padding: 10px 20px 0 20px;
        width: 16%;
        background-color: #fff;
    }
    .m-form .close {
        float: right;
        position: absolute;
        top: 48px;
        right: 8px;
        color: #acb0b7;
    }
    .m-form .w100 {
        width: 100%;
        background-color: #63738e;
    }
    .m-form .error {
        font-size: 12px;
        color: red;
    }
    .fr {
        float: right;
    }
    .u-line a:hover {
        text-decoration: underline;
    }
</style>
