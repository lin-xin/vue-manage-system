<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>Vue表格组件</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            vue-datasource：一个用于动态创建表格的vue.js服务端组件。
            访问地址：<a href="https://github.com/coderdiaz/vue-datasource" target="_blank">vue-datasource</a>
        </div>
        <datasource language="en" :table-data="getData" :columns="columns" :pagination="information.pagination"
                :actions="actions"
                v-on:change="changePage"
                v-on:searching="onSearch"></datasource>
    </div>
</template>

<script>
    import Datasource from 'vue-datasource';
    export default {
        data: function(){
            return {
                information: {
                    pagination: {
                        total: 25, // Number of total rows (default 0)
                        per_page: 15, // Number of rows to show (default 15)
                        current_page: 1, // Actual page
                        last_page: 2, // Last page
                        from: 1, // Beginning of visible rows
                        to: 15 // End of visible rows
                    },
                    data: [{
                        "id": 1,
                        "name": "Jaylen Schmidt",
                        "email": "aheaney@example.org",
                        "city": "Conroyburgh",
                        "company": "Kunde, Gerhold and Runte"
                        },
                        {
                            "id": 2,
                            "name": "Ms. Desiree Franecki III",
                            "email": "pweissnat@example.net",
                            "city": "New Mathew",
                            "company": "Davis Ltd"
                        },
                        {
                            "id": 3,
                            "name": "Clyde Corwin",
                            "email": "rolfson.lexus@example.com",
                            "city": "East Ron",
                            "company": "Zieme and Sons"
                        }]
                },
                columns: [
                    {
                        name: 'Id',
                        key: 'id',
                    },
                    {
                        name: 'Name',
                        key: 'name',
                    },
                    {
                        name: 'email',
                        key: 'email',
                    },
                    {
                        name: 'company',
                        key: 'company',
                    }
                ],
                actions: [
                    {
                        text: 'Click me', // Button label
                        icon: 'glyphicon glyphicon-check', // Button icon
                        class: 'btn-primary', // Button class (background color)
                        event(e, row) { // Event handler callback. Gets event instace and selected row
                            console.log('Click row: ', row); // If no row is selected, row will be NULL
                        }
                    }
                ],
                query:''
            }
        },
        components: {
            Datasource
        },
        methods: {
            changePage(values) {
                this.information.pagination.per_page = values.perpage;
                this.information.data = this.information.data;
            },
            onSearch(searchQuery) {
                this.query = searchQuery;
            }
        },
        computed:{
            getData(){
                const self = this;
                return self.information.data.filter(function (d) {
                    if(d.name.indexOf(self.query) > -1){
                        return d;
                    }
                })
            }
        }
    }
</script>

<style src="../../../static/css/datasource.css"></style>