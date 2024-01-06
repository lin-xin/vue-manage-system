<template>
    <div class="container">
        <div class="plugins-tips">
            wangEditor：轻量级 web 富文本编辑器，配置方便，使用简单。 访问地址：
            <a href="https://www.wangeditor.com/doc/" target="_blank">wangEditor</a>
        </div>
        <div style="border: 1px solid #ccc; margin-bottom: 10px">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
            <Editor
                style="height: 500px; overflow-y: hidden"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                @onCreated="handleCreated"
            />
        </div>
        <el-button type="primary" @click="syncHTML">提交</el-button>
    </div>
</template>

<script setup lang="ts" name="editor">
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, ref, reactive, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
    }, 1500);
});

const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});

const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};
const syncHTML = () => {
    console.log(valueHtml.value);
};
</script>

<style></style>
