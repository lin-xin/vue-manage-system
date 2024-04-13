<template>
	<div class="container">
		<TableCustom :columns="columns" :tableData="tableData" :hasToolbar="false" :hasPagination="false">
			<template #name="{ rows }">
				<el-input v-if="rows.editing" v-model="rows.name"></el-input>
				<span v-else>{{ rows.name }}</span>
			</template>
			<template #password="{ rows }">
				<el-input v-if="rows.editing" v-model="rows.password"></el-input>
				<span v-else>{{ rows.password }}</span>
			</template>
			<template #email="{ rows }">
				<el-input v-if="rows.editing" v-model="rows.email"></el-input>
				<span v-else>{{ rows.email }}</span>
			</template>
			<template #role="{ rows }">
				<el-select v-if="rows.editing" v-model="rows.role">
					<el-option label="管理员" value="管理员"></el-option>
					<el-option label="普通用户" value="普通用户"></el-option>
				</el-select>
				<span v-else>{{ rows.role }}</span>
			</template>
			<template #operator="{ rows, index }">
				<template v-if="!rows.editing">
					<el-button type="primary" size="small" :icon="Edit" @click="handleEdit(rows)">
						编辑
					</el-button>
					<el-button type="danger" size="small" :icon="Delete" @click="">
						删除
					</el-button>
				</template>
				<template v-else>
					<el-button type="success" size="small" :icon="Select" @click="rows.editing = false">
						保存
					</el-button>
					<el-button type="default" size="small" :icon="CloseBold" @click="handleCancel(rows, index)">
						取消
					</el-button>
				</template>
			</template>
		</TableCustom>
	</div>
</template>

<script setup lang="ts" name="table-editor">
import { ref } from 'vue';
import { Delete, Edit, CloseBold, Select } from '@element-plus/icons-vue';
import TableCustom from '@/components/table-custom.vue';
import { fetchUserData } from '@/api/index';

let columns = ref([
	{ type: 'index', label: '序号', width: 55, align: 'center' },
	{ prop: 'name', label: '用户名' },
	{ prop: 'password', label: '密码' },
	{ prop: 'email', label: '邮箱' },
	{ prop: 'role', label: '角色' },
	{ prop: 'operator', label: '操作', width: 180 },
])
const tableData = ref([]);
const getData = async () => {
	const res = await fetchUserData();
	tableData.value = res.data.list;
};
getData();

const rowData = ref({})

const handleEdit = (row) => {
	rowData.value = { ...row };
	row.editing = true;
};

const handleCancel = (row, index) => {
	row.editing = false;
	tableData.value[index] = { ...rowData.value };
};
</script>

<style scoped></style>
