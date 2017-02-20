<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 图表</el-breadcrumb-item>
                <el-breadcrumb-item>VueCharts</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            vue-charts：基于vue2和chart.js的图表组件。
            访问地址：<a href="https://github.com/hchstera/vue-charts" target="_blank">vue-charts</a>
        </div>
        <chartjs-line class="chart-box"
                      :datalabel="mylabel" :labels="mylabels" :data="mydata"
                      :linetension="0"></chartjs-line>
        <chartjs-bar class="chart-box"
                     :datalabel="mylabel" :labels="mylabels" :data="mydata"></chartjs-bar>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                mylabel : '2013-2017年走势',
                mylabels : ['2013','2014','2015', '2016', '2017'],
                mydata : [15,30, 20, 80, 100]
            }
        }
    }
</script>

<style>
    .chart-box{
        float: left;
        width:500px;
        margin: 20px 30px;
    }
</style>