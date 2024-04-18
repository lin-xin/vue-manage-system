<template>
    <div>
        <div class="user-container">
            <el-card class="user-profile" shadow="hover" :body-style="{ padding: '0px' }">
                <div class="user-profile-bg"></div>
                <div class="user-avatar-wrap">
                    <el-avatar class="user-avatar" :size="120" :src="avatarImg" />
                </div>
                <div class="user-info">
                    <div class="info-name">{{ name }}</div>
                    <div class="info-desc">
                        <span>@lin-xin</span>
                        <el-divider direction="vertical" />
                        <el-link href="https://lin-xin.gitee.io" target="_blank">lin-xin.gitee.io</el-link>
                    </div>
                    <div class="info-desc">FE Developer</div>
                    <div class="info-icon">
                        <a href="https://github.com/lin-xin" target="_blank"> <i class="el-icon-lx-github-fill"></i></a>
                        <i class="el-icon-lx-qq-fill"></i>
                        <i class="el-icon-lx-facebook-fill"></i>
                        <i class="el-icon-lx-twitter-fill"></i>
                    </div>
                </div>
                <div class="user-footer">
                    <div class="user-footer-item">
                        <el-statistic title="Follower" :value="1800" />
                    </div>
                    <div class="user-footer-item">
                        <el-statistic title="Following" :value="666" />
                    </div>
                    <div class="user-footer-item">
                        <el-statistic title="Total Post" :value="888" />
                    </div>
                </div>
            </el-card>
            <el-card
                class="user-content"
                shadow="hover"
                :body-style="{ padding: '20px 50px', height: '100%', boxSizing: 'border-box' }"
            >
                <el-tabs tab-position="left" v-model="activeName">
                    <el-tab-pane name="label1" label="消息通知" class="user-tabpane">
                        <TabsComp />
                    </el-tab-pane>
                    <el-tab-pane name="label2" label="我的头像" class="user-tabpane">
                        <div class="crop-wrap" v-if="activeName === 'label2'">
                            <vueCropper
                                ref="cropper"
                                :img="imgSrc"
                                :autoCrop="true"
                                :centerBox="true"
                                :full="true"
                                mode="contain"
                            >
                            </vueCropper>
                        </div>
                        <el-button class="crop-demo-btn" type="primary"
                            >选择图片
                            <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
                        </el-button>
                        <el-button type="success" @click="saveAvatar">上传并保存</el-button>
                    </el-tab-pane>
                    <el-tab-pane name="label3" label="修改密码" class="user-tabpane">
                        <el-form class="w500" label-position="top">
                            <el-form-item label="旧密码：">
                                <el-input type="password" v-model="form.old"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码：">
                                <el-input type="password" v-model="form.new"></el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码：">
                                <el-input type="password" v-model="form.new1"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane name="label4" label="赞赏作者" class="user-tabpane">
                        <div class="plugins-tips">
                            如果该框架
                            <el-link href="https://github.com/lin-xin/vue-manage-system" target="_blank"
                                >vue-manage-system</el-link
                            >
                            对你有帮助，那就请作者喝杯饮料吧！<el-icon>
                                <ColdDrink />
                            </el-icon>
                            加微信号 linxin_20 探讨问题。
                        </div>
                        <div>
                            <img src="https://lin-xin.gitee.io/images/weixin.jpg" />
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts" name="ucenter">
import { reactive, ref } from 'vue';
import { VueCropper } from 'vue-cropper';
import 'vue-cropper/dist/index.css';
import avatar from '@/assets/img/img.jpg';
import TabsComp from '../element/tabs.vue';

const name = localStorage.getItem('vuems_name');
const form = reactive({
    new1: '',
    new: '',
    old: '',
});
const onSubmit = () => {};

const activeName = ref('label1');

const avatarImg = ref(avatar);
const imgSrc = ref(avatar);
const cropImg = ref('');
const cropper: any = ref();

const setImage = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.includes('image/')) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (event: any) => {
        imgSrc.value = event.target.result;
        cropper.value && cropper.value.replace(event.target.result);
    };
    reader.readAsDataURL(file);
};

const cropImage = () => {
    cropImg.value = cropper.value?.getCroppedCanvas().toDataURL();
};

const saveAvatar = () => {
    avatarImg.value = cropImg.value;
};
</script>

<style scoped>
.user-container {
    display: flex;
}

.user-profile {
    position: relative;
}

.user-profile-bg {
    width: 100%;
    height: 200px;
    background-image: url('../../assets/img/ucenter-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.user-profile {
    width: 500px;
    margin-right: 20px;
    flex: 0 0 auto;
    align-self: flex-start;
}

.user-avatar-wrap {
    position: absolute;
    top: 135px;
    width: 100%;
    text-align: center;
}

.user-avatar {
    border: 5px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 7px 12px 0 rgba(62, 57, 107, 0.16);
}

.user-info {
    text-align: center;
    padding: 80px 0 30px;
}

.info-name {
    margin: 0 0 20px;
    font-size: 22px;
    font-weight: 500;
    color: #373a3c;
}

.info-desc {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
}

.info-desc,
.info-desc a {
    font-size: 18px;
    color: #55595c;
}

.info-icon {
    margin-top: 10px;
}

.info-icon i {
    font-size: 30px;
    margin: 0 10px;
    color: #343434;
}

.user-content {
    flex: 1;
}

.user-tabpane {
    padding: 10px 20px;
}

.crop-wrap {
    width: 600px;
    height: 350px;
    margin-bottom: 20px;
}

.crop-demo-btn {
    position: relative;
}

.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}

.w500 {
    width: 500px;
}

.user-footer {
    display: flex;
    border-top: 1px solid rgba(83, 70, 134, 0.1);
}

.user-footer-item {
    padding: 20px 0;
    width: 33.3333333333%;
    text-align: center;
}

.user-footer > div + div {
    border-left: 1px solid rgba(83, 70, 134, 0.1);
}
</style>

<style>
.el-tabs.el-tabs--left {
    height: 100%;
}
</style>
