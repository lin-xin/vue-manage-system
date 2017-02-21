<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 图表</el-breadcrumb-item>
                <el-breadcrumb-item>混合图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            vue-charts：基于vue2和chart.js的图表组件。
            访问地址：<a href="https://github.com/hchstera/vue-charts" target="_blank">vue-charts</a>
        </div>
        <div class="mix-charts">
            <canvas id="mix" count="3"></canvas>
            <chartjs-line target="mix" bordercolor="#FF6384" :bind="true"
                          :datalabel="mylabel" :labels="mylabels" :data="mydata"
                          :linetension="0"></chartjs-line>
            <chartjs-bar target="mix" backgroundcolor="#36A2EB" :bind="true"
                         :datalabel="mylabel1" :labels="mylabels1" :data="mydata1"></chartjs-bar>
            <chartjs-bar target="mix" backgroundcolor="#FFCE56" :bind="true"
                         :datalabel="mylabel2" :labels="mylabels2" :data="mydata2"></chartjs-bar>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                mylabel : '2013-2017年价格趋势',
                mylabels : ['2013','2014','2015', '2016', '2017'],
                mydata : [15,30, 20, 50, 40],
                mylabel1 : '2013-2017年价格趋势',
                mylabels1 : ['2013','2014','2015', '2016', '2017'],
                mydata1 : [20,25, 50, 90, 70],
                mylabel2 : '2013-2017年价格趋势',
                mylabels2 : ['2013','2014','2015', '2016', '2017'],
                mydata2 : [40,50, 15, 60, 10]
            }
        }
    }
</script>

<style>
    .mix-charts{
        width:100%;
        max-width: 900px;
    }
</style>