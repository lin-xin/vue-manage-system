<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-rank"></i> 拖拽排序</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="drag-box">
                <div class="drag-box-item">
                    <div class="item-title">todo</div>
                    <ul id="todo" class="item-ul">
                        <li v-for="(item, index) in todo" :key="index" class="drag-list" :data-index="index">
                            {{ item.content }}
                        </li>
                    </ul>
                </div>
                <div class="drag-box-item">
                    <div class="item-title">doing</div>
                    <ul id="doing" class="item-ul">
                        <li v-for="(item, index) in doing" :key="index" class="drag-list" :data-index="index">
                            {{ item.content }}
                        </li>
                    </ul>
                </div>
                <div class="drag-box-item">
                    <div class="item-title">done</div>
                    <ul id="done" class="item-ul">
                        <li v-for="(item, index) in done" :key="index" class="drag-list" :data-index="index">
                            {{ item.content }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Sortable from 'sortablejs';
    export default {
        data() {
            return {
                todo: [
                    {
                        content: '开发图表组件'
                    },
                    {
                        content: '开发拖拽组件'
                    },
                    {
                        content: '开发权限测试组件'
                    }
                ],
                doing: [
                    {
                        content: '开发登录注册页面'
                    },
                    {
                        content: '开发头部组件'
                    },
                    {
                        content: '开发表格相关组件'
                    },
                    {
                        content: '开发表单相关组件'
                    }
                ],
                done:[
                    {
                        content: '初始化项目，生成工程目录，完成相关配置'
                    },
                    {
                        content: '开发项目整体框架'
                    }
                ],
                dragElement: null,
                lock: true,

            }
        },
        methods: {
            initSortable(id, vm){
                let list = document.getElementById(id);
                Sortable.create(list, {
                    group: {
                        name: 'list',
                        pull: true
                    },
                    ghostClass: 'placeholder-style',
                    animation: 120,
                    scroll: true,
                    onRemove(event) {
                        let content;
                        const idx = event.item.getAttribute('data-index');
                        if(event.from.id === 'todo'){
                            content = vm.todo[idx];
                        }else if(event.from.id === 'doing'){
                            content = vm.doing[idx];
                        }else if(event.from.id === 'done'){
                            content = vm.done[idx];
                        }
                        if(event.to.id === 'todo'){
                            vm.todo.splice(event.newIndex, 0, content);
                        }else if(event.to.id === 'doing'){
                            vm.doing.splice(event.newIndex, 0, content);
                        }else if(event.to.id === 'done'){
                            vm.done.splice(event.newIndex, 0, content);
                        }
                    },
                    onEnd(event){
                        if(event.to.id === event.from.id){
                            event.item.removeAttribute('draggable');
                        }
                    }
                });
            }
        },
        mounted() {
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            };
            let vm = this;
            this.initSortable('todo', this);
            this.initSortable('doing', this);
            this.initSortable('done', this);
        }
    }

</script>

<style scoped>
    .drag-box{
        display: flex;
        user-select: none;
    }
    .drag-box-item {
        flex: 1;
        max-width: 330px;
        min-width: 300px;
        background-color: #eff1f5;
        margin-right: 16px;
        border-radius: 6px;
        border: 1px #e1e4e8 solid;
    }
    .item-title{
        padding: 8px 8px 8px 12px;
        font-size: 14px;
        line-height: 1.5;
        color: #24292e;
        font-weight: 600;
    }
    .item-ul{
        padding: 0 8px 8px;
        height: 600px;
        overflow-y: scroll;
    }
    .item-ul::-webkit-scrollbar{
        width: 0;
    }
    .drag-list {
        border: 1px #e1e4e8 solid;
        padding: 10px;
        margin: 5px 0 10px;
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
    }
    .drag-list[draggable="false"]{
        display: none;
    }
    .drag-list:hover {
        border: 1px solid #20a0ff;
    }
    .drag-title {
        font-weight: 400;
        line-height: 25px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
</style>
