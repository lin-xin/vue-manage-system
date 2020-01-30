<template>
    <div class="m-form">
    <div class="regist" id="regist">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
            <div class="error" v-if="ruleForm2.bHasErrorShow">{{ruleForm2.sErrorTips}}</div>
        <el-form-item label="用户名:" prop="username">
            <el-input v-model.number="ruleForm2.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称:" prop="name">
            <el-input v-model.number="ruleForm2.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit2" class="w100">立即注册</el-button>
        </el-form-item>
    </el-form>
    </div>
        <div class="regist-success" style="display: none">
          <div class="content">
            <div class="el-icon-check">注册成功</div>
            <div>账号是:{{ruleForm2.name}}</div>
            <div id="login" @click="returnLogin">立即登录</div>
         </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      let checkUsername = (rule, value, callback) => {
     if(value === ''){
           return callback(new Error('用户名不能为空'));
        }else{
          callback();
        }
      };
      let checkName = (rule, value, callback) => {
        if(value === ''){
           return callback(new Error('昵称不能为空'));
        }else{
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          bHasErrorShow: false,
          sErrorTips: '该用户已存在',
          name: '',
          username: '',
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ],
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
    handleReset() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        let self = this,param = {
            username: self.ruleForm2.username,
            name: self.ruleForm2.name,
            password: self.ruleForm2.checkPass
            }
        self.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            console.log(param);
            self.$http.post(server + '/user/register',param).then((res) => {
                if(res.ok) {
                    let response = res.data;
                    if(response.code == '200') {
                        document.querySelector('.regist').style.display = 'none';
                        document.querySelector('.regist-success').style.display = 'block';
                    }else {
                        self.ruleForm2.bHasErrorShow = true;
                        setTimeout( function(){
                            self.handleReset();
                        },1000)
                    }
                }
            })
          } else {
            console.log('不能为空');
            return false;
          }
        });
      },
      returnLogin() {
        location.href = '#/login/';
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
    .m-form .regist {
        position: relative;
        top: 20%;
        margin: 0 auto;
        border-radius: 8px;
        padding: 10px 20px 1px 20px;
        width: 16%;
        background-color: #fff;
    }
    .m-form .w100 {
        width: 100%;
        background-color: #63738e;
    }
    .m-form .error {
        font-size: 12px;
        color: red;
    }
    .regist-success {
        position: absolute;
        margin: auto;
        height: 100%;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        color: #000;
        background-color: #fff
    }
    .regist-success div {
        padding: 10px;
        font-weight: bold;
        font-size: 20px;
    }
    .regist-success .content {
        position: relative;
        top: 30%;
    }
    .regist-success #login {
        padding: 6px;
        margin: 0 auto;
        font-size: 20px;
        width: 100px;
        background: #3499da;
        color: #fff;
    }
</style>
