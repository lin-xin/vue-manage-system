<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="表单名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="选择器" prop="region">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期时间">
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                    style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;">
                                </el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="城市级联" prop="options">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="选择开关" prop="delivery">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="多选框" prop="type">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="步步高" name="type"></el-checkbox>
                            <el-checkbox label="小天才" name="type"></el-checkbox>
                            <el-checkbox label="imoo" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="单选框" prop="resource">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="步步高"></el-radio>
                            <el-radio label="小天才"></el-radio>
                            <el-radio label="imoo"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="文本框" prop="desc">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button @click="onReset">重置表单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
export default {
    name: "baseform",
    setup() {
        const options = [
            {
                value: "guangdong",
                label: "广东省",
                children: [
                    {
                        value: "guangzhou",
                        label: "广州市",
                        children: [
                            {
                                value: "tianhe",
                                label: "天河区",
                            },
                            {
                                value: "haizhu",
                                label: "海珠区",
                            },
                        ],
                    },
                    {
                        value: "dongguan",
                        label: "东莞市",
                        children: [
                            {
                                value: "changan",
                                label: "长安镇",
                            },
                            {
                                value: "humen",
                                label: "虎门镇",
                            },
                        ],
                    },
                ],
            },
            {
                value: "hunan",
                label: "湖南省",
                children: [
                    {
                        value: "changsha",
                        label: "长沙市",
                        children: [
                            {
                                value: "yuelu",
                                label: "岳麓区",
                            },
                        ],
                    },
                ],
            },
        ];
        const rules = {
            name: [
                { required: true, message: "请输入表单名称", trigger: "blur" },
            ],
        };
        const formRef = ref(null);
        const form = reactive({
            name: "",
            region: "",
            date1: "",
            date2: "",
            delivery: true,
            type: ["步步高"],
            resource: "小天才",
            desc: "",
            options: [],
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                    console.log(form);
                    ElMessage.success("提交成功！");
                } else {
                    return false;
                }
            });
        };
        // 重置
        const onReset = () => {
            formRef.value.resetFields();
        };

        return {
            options,
            rules,
            formRef,
            form,
            onSubmit,
            onReset,
        };
    },
};
</script>