<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-upload2"></i> 拖拽排序</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="drag-box-left">
            <div class="drag-title">未完成</div>
            <div class="drag-list" draggable="true" 
                v-for="list in data1" 
                :data-id="list.id" 
                @dragstart="dragstartEvent"
                @dragend="dragendEvent"
                @dragenter="dragenterEvent"
                @dragleave="dragleaveEvent"
                @dragover="dragoverEvent"
            >{{list.title}}</div>
        </div>
        <div class="drag-box-right">
            <div class="drag-title">已完成</div>
            <div class="drag-list" draggable="true"
                v-for="list in data2"
                :data-id="list.id"
                @dragstart="dragstartEvent"
                @dragend="dragendEvent"
                @dragenter="dragenterEvent"
                @dragleave="dragleaveEvent"
                @dragover="dragoverEvent"
            >{{list.title}}</div>
        </div>
        
    </section>
</template>

<script>
    export default {
        data() {
            return {
                dragElement: null,
                lock: true,
                data1: [
                    {id: 1, title: '这里是列表1的标题'},
                    {id: 2, title: '这里是列表2的标题'},
                    {id: 3, title: '这里是列表3的标题'},
                    {id: 4, title: '这里是列表4的标题'},
                    {id: 5, title: '这里是列表5的标题'},
                    {id: 6, title: '这里是列表6的标题'},
                    {id: 7, title: '这里是列表7的标题'}
                ],
                data2: [
                    {id: 1, title: '这里是列表11的标题'},
                    {id: 2, title: '这里是列表12的标题'},
                    {id: 3, title: '这里是列表13的标题'},
                    {id: 4, title: '这里是列表14的标题'}
                ]
            }
        },
        methods: {
            dragstartEvent(ev) {
                const self = this;
                self.dragElement = ev.target;
                ev.target.style.backgroundColor = '#f8f8f8';
            },
            dragendEvent(ev) {
                ev.target.style.backgroundColor = '#fff';
                ev.preventDefault();
            },
            dragenterEvent(ev) {
                const self = this;
                if(self.dragElement != ev.target){
                    ev.target.parentNode.insertBefore(self.dragElement, ev.target);
                }
            },
            dragleaveEvent(ev) {
                const self = this;
                if(self.dragElement != ev.target){
                    if(self.lock && (ev.target == ev.target.parentNode.lastElementChild || ev.target == ev.target.parentNode.lastChild)){
                        ev.target.parentNode.appendChild(self.dragElement);
                        self.lock = false;
                    }else{
                        self.lock = true;
                    }
                }
            },
            dragoverEvent(ev) {
                ev.preventDefault();
            }
        }
    }
</script>

<style scoped>
    .drag-box-left{
        float: left;
        width: 45%;
    }
    .drag-box-right{
        float: right;
        width: 45%;
    }
    .drag-list{
        border: 1px solid #ddd;
        padding:20px;
        margin-bottom: 20px;
        transition: border .3s;
    }
    .drag-list:hover{
        border: 1px solid #20a0ff;
    }
    .drag-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
</style>