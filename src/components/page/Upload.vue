<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 资源列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
               
                <el-input v-model="query.name" placeholder="资源名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="res_name" label="资源名称"></el-table-column>
                <el-table-column prop="author" label="作者"></el-table-column>

                <el-table-column prop="press" label="出版社"></el-table-column>
                <el-table-column prop="tag_name" label="标签"></el-table-column>
                <el-table-column prop="name" label="上传者"></el-table-column>
                <el-table-column label="操作" width="100" align="center">
                   <template slot-scope="scope">
                        <el-link target="_blank" :href="(scope.row.file_path)" :underline="false" 
                        style="margin-left:15px">
                          <el-button
                            type="text"
                            icon="el-icon-info"
                        >查看</el-button>
                        </el-link>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.row.id)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

       
    </div>
</template>

<script>
import { getresData, deleteresData } from '../../api/resource'

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                keys: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            getresData(this.query).then(res => {
                console.log(res);
                this.tableData = res.msg.result;
                this.pageTotal = res.msg.total;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },

        // 删除操作
        handleDelete(id) {
            // 二次确认删除
            this.res_id = id;
            let data ={
                res_id : this.res_id,
            }
            console.log(data)
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                deleteresData(data).then((res)=>{
                    console.log(res)
                })
                this.$message.success('删除成功');
                this.getData();
            })
            .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index,
            this.form = row,
            this.editVisible = true;

        },
       
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
