<template>
    <div>
        <div class="container">
            <TableCustom :columns="columns" :tableData="menuData" row-key="index" :has-pagination="false"
                :viewFunc="handleView" :delFunc="handleDelete" :editFunc="handleEdit">
                <template #toolbarBtn>
                    <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
                </template>
                <template #icon="{ rows }">
                    <el-icon>
                        <component :is="rows.icon"></component>
                    </el-icon>
                </template>
            </TableCustom>

        </div>
        <el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
            :close-on-click-modal="false" @close="closeDialog">
            <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData">
                <template #parent>
                    <el-cascader v-model="rowData.pid" :options="cascaderOptions" :props="{ checkStrictly: true }"
                        clearable />
                </template>
            </TableEdit>
        </el-dialog>
        <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
            <TableDetail :data="viewData">
                <template #icon="{ rows }">
                    <el-icon>
                        <component :is="rows.icon"></component>
                    </el-icon>
                </template>
            </TableDetail>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="system-menu">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { Menus } from '@/types/menu';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import { FormOption } from '@/types/form-option';
import { menuData } from '@/components/menu';

// 表格相关
let columns = ref([
    { prop: 'title', label: '菜单名称', align: 'left' },
    { prop: 'icon', label: '图标' },
    { prop: 'index', label: '路由路径' },
    { prop: 'permiss', label: '权限标识' },
    { prop: 'operator', label: '操作', width: 250 },
])

const getOptions = (data: any) => {
    return data.map(item => {
        const a: any = {
            label: item.title,
            value: item.id,
        }
        if (item.children) {
            a.children = getOptions(item.children)
        }
        return a
    })
}
const cascaderOptions = ref(getOptions(menuData));


// 新增/编辑弹窗相关
let options = ref<FormOption>({
    labelWidth: '100px',
    span: 12,
    list: [
        { type: 'input', label: '菜单名称', prop: 'title', required: true },
        { type: 'input', label: '路由路径', prop: 'index', required: true },
        { type: 'input', label: '图标', prop: 'icon' },
        { type: 'input', label: '权限标识', prop: 'permiss' },
        { type: 'parent', label: '父菜单', prop: 'parent' },
    ]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref<any>({});
const handleEdit = (row: Menus) => {
    rowData.value = { ...row };
    isEdit.value = true;
    visible.value = true;
};
const updateData = () => {
    closeDialog();
};

const closeDialog = () => {
    visible.value = false;
    isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
    row: {},
    list: []
});
const handleView = (row: Menus) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        {
            prop: 'id',
            label: '菜单ID',
        },
        {
            prop: 'pid',
            label: '父菜单ID',
        },
        {
            prop: 'title',
            label: '菜单名称',
        },
        {
            prop: 'index',
            label: '路由路径',
        },
        {
            prop: 'permiss',
            label: '权限标识',
        },
        {
            prop: 'icon',
            label: '图标',
        },
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = (row: Menus) => {
    ElMessage.success('删除成功');
}
</script>

<style scoped></style>