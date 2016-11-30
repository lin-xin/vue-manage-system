<template>
    <div class="content">
        <div class="widget-box">
            <div class="widget-title">
                <h5>H5模块信息</h5>
            </div>
            <div class="widget-content">
                <table class="el-table el-table--fit el-table--striped el-table--border">
                    <thead>
                    <tr>
                        <th width="50">#</th>
                        <th width="250">标题</th>
                        <th>内容</th>
                        <th width="150">所属项目</th>
                        <th width="90">状态</th>
                        <th width="150">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(value,i) in list">
                        <td>{{i+1}}</td>
                        <td>{{value.title}}</td>
                        <td v-html="value.content"></td>
                        <td>{{getMenuName(value.m_id)}}</td>
                        <td v-html="getstatus(value.status)"></td>
                        <td>
                            <el-button size="mini" type="info" :data-status="value.status"
                                       @click="clickFinishBtn(value.id, i)">完成</el-button>
                            <router-link :to="{path:'taskEdit',query:{id:value.id}}">
                                <el-button size="mini" type="warning">编辑</el-button>
                            </router-link>
                            <el-tooltip class="item" effect="dark" content="删除不可恢复" placement="top">
                                <el-button size="mini" type="danger" @click="clickDeleteBtn(value.id, i)">删除</el-button>
                            </el-tooltip>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            list: [], menu_list: {}
        }
    },
    methods: {
        getstatus(status) {
            switch (status){
                case '0':
                    return '<span class="el-tag el-tag--primary">未完成</span>';
                    break;
                case '1':
                    return '<span class="el-tag el-tag--success">已完成</span>';
                    break;
                case '2':
                    return '<span class="el-tag">不做了</span>';
                    break;
            }
        },
        getMenuList(callback) {
            let self = this;
            self.$http.get(server+'/menu/index').then((res) => {
                callback && callback();
                if(res.ok){
                    let response = res.data, list, sublist, i, j;
                    if(response.code=='200'){
                        list = response.result.list;
                        for(i=0 ; i<list.length; i++){
                            if(list[i].subMenu.length){
                                sublist = list[i].subMenu;
                                for(j = 0; j<sublist.length; j++){
                                    self.menu_list[sublist[j].id] = sublist[j].name;
                                }
                            }
                        }
                    }
                }else {
                    self.$message.error('获取一级菜单失败');
                }
            })
        },
        getMenuName(id) {
            return this.menu_list[id];
        },
        getListItem() {
            let self = this;
            self.$http.get(server+"/demand/get_list").then( (res) => {
                let response = res.data;
                if (response.code == '200') {
                    self.list = response.result;
                }
            })
        },
        clickFinishBtn(id,index) {
            let status = event.currentTarget.getAttribute('data-status'), self = this ,obj = self.list[index];
            status = status == '0'? '1': '0';
            self.$http.post(server+"demand/update", {id: id, status: status}).then( (res) => {
                let response = res.data;
                if (response.code == '200') {
                    status == '0'? self.$message.success('成功标为未完成'): self.$message.success('成功标为已完成');
                    obj.status = status;
                }
            })
        },
        clickDeleteBtn(id, index) {
            let self = this;
            self.$http.post(server+"/demand/del", {id: id}).then( (res) => {
                let response = res.data;
                if (response.code == '200') {
                    self.$message.success('删除成功');
                    self.list.splice(index,1)
                }else{
                    self.$message.error('删除失败');
                }
            })
        }
    },
    created() {
        this.getMenuList(this.getListItem);
    }
}
</script>