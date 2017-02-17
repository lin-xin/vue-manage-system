<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>markdown</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            vue-markdown：一个基于vue.js的markdown语法解析插件。
            访问地址：<a href="https://github.com/miaolz123/vue-markdown" target="_blank">vue-markdown</a>
        </div>
        <textarea class="markdown-left" v-model="content"></textarea>
        <vue-markdown class="markdown-right" :source="content"></vue-markdown>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    export default {
        data: function(){
            return {
                content:'# Hello BBK'
            }
        },
        components: {
            VueMarkdown
        }
    }
</script>

<style scoped>
    .markdown-left,.markdown-right{
        width:48%;
        height: 700px;
        float: left;
        padding:10px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        overflow-y: scroll;
    }
    .markdown-right{
        margin-left: 3%;
    }
</style>