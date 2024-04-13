<template>
    <div>
        <el-tree
            class="mgb10"
            ref="tree"
            :data="data"
            node-key="id"
            default-expand-all
            show-checkbox
            :default-checked-keys="checkedKeys"
        />
        <el-button type="primary" @click="onSubmit">保存权限</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElTree } from 'element-plus';
import { menuData } from '@/components/menu';

const props = defineProps({
    permissOptions: {
        type: Object,
        required: true,
    },
});

const menuObj = ref({});
// const data = menuData.map((item) => {
//     if (item.children) {
//         menuObj.value[item.id] = item.children.map((sub) => sub.id);
//     }
//     return {
//         id: item.id,
//         label: item.title,
//         children: item.children?.map((child) => {
//             return {
//                 id: child.id,
//                 label: child.title,
//             };
//         }),
//     };
// });

const getTreeData = (data) => {
    return data.map((item) => {
        const obj: any = {
            id: item.id,
            label: item.title,
        };
        if (item.children) {
            menuObj.value[item.id] = item.children.map((sub) => sub.id);
            obj.children = getTreeData(item.children);
        }
        return obj;
    });
};
const data = getTreeData(menuData);
const checkData = (data: string[]) => {
    return data.filter((item) => {
        return !menuObj.value[item] || data.toString().includes(menuObj.value[item].toString());
    });
};
// 获取当前权限
const checkedKeys = ref<string[]>(checkData(props.permissOptions.permiss));

// 保存权限
const tree = ref<InstanceType<typeof ElTree>>();
const onSubmit = () => {
    // 获取选中的权限
    const keys = [...tree.value!.getCheckedKeys(false), ...tree.value!.getHalfCheckedKeys()] as number[];
    console.log(keys);
};
</script>

<style scoped></style>
