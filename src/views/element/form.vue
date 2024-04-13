<template>
    <div class="container">
        <el-radio-group class="mgb20" v-model="labelPosition">
            <el-radio-button value="left">Left</el-radio-button>
            <el-radio-button value="right">Right</el-radio-button>
            <el-radio-button value="top">Top</el-radio-button>
        </el-radio-group>
        <el-form ref="formRef" :rules="rules" :model="form" label-width="120px" :label-position="labelPosition">
            <el-row :gutter="50">
                <el-col :span="10">
                    <el-form-item label="文本框" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="数字框" prop="num">
                        <el-input-number v-model="form.num" :min="1" :max="10" />
                    </el-form-item>
                    <el-form-item label="日期选择" prop="date">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="时间选择" prop="time">
                        <el-time-picker placeholder="选择时间" v-model="form.time">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="选择器" prop="region">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="小明" label="小明" value="小明"></el-option>
                            <el-option key="小红" label="小红" value="小红"></el-option>
                            <el-option key="小白" label="小白" value="小白"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="城市级联" prop="options">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="文本框" prop="desc">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="评分" prop="rate">
                        <el-rate v-model="form.rate" allow-half />
                    </el-form-item>
                    <el-form-item label="滑块" prop="num">
                        <el-slider v-model="form.num" :step="1" show-stops :max="10" />
                    </el-form-item>
                    <el-form-item label="开关" prop="delivery">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="颜色选择" prop="color">
                        <el-color-picker v-model="form.color" />
                    </el-form-item>
                    <el-form-item label="多选框" prop="type">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="小明" value="小明" name="type"></el-checkbox>
                            <el-checkbox label="小红" value="小红" name="type"></el-checkbox>
                            <el-checkbox label="小白" value="小白" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="单选框" prop="resource">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="小明" value="小明"></el-radio>
                            <el-radio label="小红" value="小红"></el-radio>
                            <el-radio label="小白" value="小白"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="穿梭框" prop="transfer">
                        <el-transfer v-model="form.transfer" :data="transferData" />
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(formRef)">表单提交</el-button>
                        <el-button @click="onReset(formRef)">重置表单</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script setup lang="ts" name="forms">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormProps, FormRules } from 'element-plus';
const labelPosition = ref<FormProps['labelPosition']>('right')
const options = [
    {
        value: 'guangdong',
        label: '广东省',
        children: [
            {
                value: 'guangzhou',
                label: '广州市',
                children: [
                    {
                        value: 'tianhe',
                        label: '天河区',
                    },
                    {
                        value: 'haizhu',
                        label: '海珠区',
                    },
                ],
            },
            {
                value: 'dongguan',
                label: '东莞市',
                children: [
                    {
                        value: 'changan',
                        label: '长安镇',
                    },
                    {
                        value: 'humen',
                        label: '虎门镇',
                    },
                ],
            },
        ],
    },
    {
        value: 'hunan',
        label: '湖南省',
        children: [
            {
                value: 'changsha',
                label: '长沙市',
                children: [
                    {
                        value: 'yuelu',
                        label: '岳麓区',
                    },
                ],
            },
        ],
    },
];
const rules: FormRules = {
    name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
};
const formRef = ref<FormInstance>();
const form = reactive({
    name: '',
    region: '',
    date: '',
    time: '',
    delivery: true,
    type: ['小明'],
    resource: '小红',
    desc: '',
    options: [],
    color: '',
    num: 1,
    rate: 0,
    transfer: [],

});
const generateData = () => {
    const data = []
    for (let i = 1; i <= 15; i++) {
        data.push({
            key: i,
            label: `Option ${i}`,
            disabled: i % 4 === 0,
        })
    }
    return data
}

const transferData = ref(generateData())
// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
    // 表单校验
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            console.log(form);
            ElMessage.success('提交成功！');
        } else {
            return false;
        }
    });
};
// 重置
const onReset = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>