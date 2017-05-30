<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 图表</el-breadcrumb-item>
                <el-breadcrumb-item>基础图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            vue-schart：vue.js封装sChart.js的图表组件。
            访问地址：<a href="https://github.com/lin-xin/vue-schart" target="_blank">vue-schart</a>
        </div>
        <div class="content-title">柱状图</div>
        <schart canvasId="bar" width="500" height="400" :data="data1" type="bar" :options="options1"></schart>
        <div class="content-title">折线图</div>
        <schart canvasId="line" width="500" height="400" :data="data1" type="line" :options="options1"></schart>
        <div class="content-title">饼状图</div>
        <schart canvasId="pie" width="500" height="400" :data="data2" type="pie" :options="options2"></schart>
        <div class="content-title">环形图</div>
        <schart canvasId="ring" width="500" height="400" :data="data2" type="ring" :options="options2"></schart>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        components: {
            Schart
        },
        data: () => ({
            data1:[
                {name:'2012',value:1141},
                {name:'2013',value:1499},
                {name:'2014',value:2260},
                {name:'2015',value:1170},
                {name:'2016',value:970},
                {name:'2017',value:1450}
            ],
            data2 : [
                {name:'短袖',value:1200},
                {name:'休闲裤',value:1222},
                {name:'连衣裙',value:1283},
                {name:'外套',value:1314},
                {name:'羽绒服',value:2314}
            ],
            options1: {
                title: '某商店近年营业总额',
                bgColor: '#829dda',
                titleColor: '#ffffff',
                fillColor: '#72f6ff',
                axisColor: '#eeeeee',
                contentColor: '#bbbbbb'
            },
            options2: {
                title: '某商店各商品年度销量',
                bgColor: '#829dca',
                titleColor: '#ffffff',
                legendColor: '#ffffff'
            }
        })
    }
</script>

<style scoped>
    .content-title{
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    
</style>