<template>
    <div class="container">
        <el-button type="primary" @click="open = true">开始引导</el-button>

        <el-divider />

        <el-space>
            <el-button ref="ref1">上传</el-button>
            <el-button ref="ref2" type="primary">保存</el-button>
            <el-button ref="ref3" :icon="MoreFilled" />
        </el-space>

        <el-tour v-model="open">
            <el-tour-step :target="ref1?.$el" title="上传文件">
                <img style="width: 120px" src="../../assets/img/img.jpg" alt="tour.png" />
                <div>点击这里选择文件</div>
            </el-tour-step>
            <el-tour-step :target="ref2?.$el" title="保存" description="点击进行上传" />
            <el-tour-step :target="ref3?.$el" title="更多操作" description="点击查看更多操作" />
        </el-tour>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'

const ref1 = ref()
const ref2 = ref()
const ref3 = ref()

const open = ref(false)
</script>