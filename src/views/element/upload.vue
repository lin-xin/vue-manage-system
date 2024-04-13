<template>
    <div class="container">
        <div class="content-title">支持拖拽</div>
        <div class="plugins-tips">
            Element Plus自带上传组件。 访问地址：
            <a href="https://element-plus.org/zh-CN/component/upload.html" target="_blank">Element Plus Upload</a>
        </div>
        <el-upload class="upload-demo" drag action="http://jsonplaceholder.typicode.com/api/posts/" multiple
            :on-change="handle">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
        </el-upload>

        <div class="content-title">支持裁剪</div>
        <div class="plugins-tips">
            vue-cropper：一个简单的vue图片裁剪插件。 访问地址：
            <a href="https://github.com/xyxiao001/vue-cropper" target="_blank">vue-cropper</a>。 示例请查看
            <router-link to="/ucenter">个人中心-我的头像</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
const handle = (rawFile: any) => {
    console.log(rawFile);
};
</script>

<style scoped>
.content-title {
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}

.upload-demo {
    width: 360px;
}
</style>
