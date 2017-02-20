<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>图片上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            Vue-Core-Image-Upload：一款轻量级的vue上传插件，支持裁剪。
            访问地址：<a href="https://github.com/Vanthink-UED/vue-core-image-upload" target="_blank">Vue-Core-Image-Upload</a>
        </div>
        <img class="pre-img" :src="src" alt="">
        <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
                               :crop="true"
                               text="上传图片"
                               url="/api/posts/"
                               extensions="png,gif,jpeg,jpg"
                               v-on:imageuploaded="imageuploaded"></vue-core-image-upload>
    </div>
</template>

<script>
    import VueCoreImageUpload  from 'vue-core-image-upload';
    export default {
        data: function(){
            return {
                src: '../../../static/img/img.jpg',
            }
        },
        components: {
            VueCoreImageUpload
        },
        methods:{
            imageuploaded(res) {
                console.log(res)
            },
        }
    }
</script>

<style>
    .pre-img{
        width:250px;
        height: 250px;
        margin-bottom: 20px;
    }
    .pure-button{
        width:150px;
        height:40px;
        line-height: 40px;
        text-align: center;
        background: #00a2ff;
        color: #fff;
        border-radius: 3px;
    }
    .g-core-image-corp-container .info-aside{
        height:45px;
    }
</style>