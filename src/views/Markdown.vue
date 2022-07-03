<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>markdown编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                md-editor-v3：vue3版本的 markdown 编辑器，配置丰富，请详看文档。
                访问地址：
                <a href="https://imzbf.github.io/md-editor-v3/index" target="_blank">md-editor-v3</a>
            </div>
            <md-editor class="mgb20" v-model="text" @on-upload-img="onUploadImg"/>
            <el-button type="primary">提交</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref} from "vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
const onUploadImg = (files)=>{
    console.log(files)
}
</script>