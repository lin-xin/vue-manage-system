<template>
    <div class="container">
        <div class="step-div" v-if="step === 0">
            <p>输入注册时的邮箱，我们会发送验证码到您的邮箱</p>
            <el-input placeholder="请输入邮箱"></el-input>
            <el-button class="step-btn" type="primary" @click="step++">下一步</el-button>
        </div>
        <div class="step-div" v-else-if="step === 1">
            <p>验证码已发送至您的邮箱，请输入验证码</p>
            <el-input placeholder="请输入验证码"></el-input>
            <el-button class="step-btn" type="primary" @click="step++">下一步</el-button>
        </div>

        <div class="step-div" v-else-if="step === 2">
            <p>请输入6位以上密码</p>
            <el-input placeholder="请输入新密码"></el-input>
            <el-button class="step-btn" type="primary" @click="step++">保存</el-button>
        </div>
        <div v-else>
            <el-result icon="success" title="保存成功" sub-title="请退出后重新登录"></el-result>
        </div>
        <el-steps class="step-style" :active="step" align-center finish-status="success">
            <el-step title="Step 1" description="填写邮箱" />
            <el-step title="Step 2" description="填写验证码" />
            <el-step title="Step 3" description="修改密码" />
        </el-steps>
        <el-steps class="step-style" :active="step" finish-status="success" simple>
            <el-step title="填写邮箱" />
            <el-step title="填写验证码" />
            <el-step title="修改密码" />
        </el-steps>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const step = ref(0)
</script>

<style scoped>
.step-div {
    max-width: 500px;
    margin: 0 auto;
}

.step-div p {
    margin-bottom: 20px;
    color: #787878;
}

.step-btn {
    display: block;
    width: 100%;
    margin: 20px 0;
}

.step-style {
    max-width: 800px;
    margin: 40px auto;
}
</style>