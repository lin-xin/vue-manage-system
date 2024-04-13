<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="18">
                <el-watermark :content="config.content" :font="config.font" :z-index="config.zIndex"
                    :rotate="config.rotate" :gap="config.gap" :offset="config.offset">
                    <div style="height: 600px" />
                </el-watermark>
            </el-col>
            <el-col :span="6">
                <el-form class="form" :model="config" label-position="top" label-width="50px">
                    <el-form-item label="Content">
                        <el-input v-model="config.content" />
                    </el-form-item>
                    <el-form-item label="Color">
                        <el-color-picker v-model="config.font.color" show-alpha />
                    </el-form-item>
                    <el-form-item label="FontSize">
                        <el-slider v-model="config.font.fontSize" />
                    </el-form-item>
                    <el-form-item label="zIndex">
                        <el-slider v-model="config.zIndex" />
                    </el-form-item>
                    <el-form-item label="Rotate">
                        <el-slider v-model="config.rotate" :min="-180" :max="180" />
                    </el-form-item>
                    <el-form-item label="Gap">
                        <el-space>
                            <el-input-number v-model="config.gap[0]" controls-position="right" />
                            <el-input-number v-model="config.gap[1]" controls-position="right" />
                        </el-space>
                    </el-form-item>
                    <el-form-item label="Offset">
                        <el-space>
                            <el-input-number v-model="config.offset[0]" placeholder="offsetLeft"
                                controls-position="right" />
                            <el-input-number v-model="config.offset[1]" placeholder="offsetTop"
                                controls-position="right" />
                        </el-space>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const config = reactive({
    content: 'vue-manage-system',
    font: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.15)',
    },
    zIndex: -1,
    rotate: -22,
    gap: [100, 100] as [number, number],
    offset: [] as unknown as [number, number],
})
</script>