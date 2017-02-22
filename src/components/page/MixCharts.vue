<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 图表</el-breadcrumb-item>
                <el-breadcrumb-item>混合图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            vue-echarts-v3：基于vue2和eCharts.js3的图表组件。
            访问地址：<a href="https://github.com/xlsdg/vue-echarts-v3" target="_blank">vue-echarts-v3</a>
        </div>
        <div class="mix-echarts">
            <IEcharts :option="mix" ></IEcharts>
        </div>
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3';
    export default {
        data: function(){
            return {
                mix:{
                    color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
                    legend: {
                        data:['步步高','小天才','imoo']
                    },
                    xAxis: {
                        data: ['周一','周二','周三','周四','周五','周末']
                    },
                    yAxis:{},
                    series: [
                        {
                            name: "步步高",
                            type: "line",
                            data: [15, 20, 26, 30, 40, 27]
                        },
                        {
                            name: "小天才",
                            type: "bar",
                            data: [5, 30, 36, 10, 34, 20]
                        },
                        {
                            name: "imoo",
                            type: "bar",
                            data: [35, 40, 30, 50, 60, 40]
                        }
                    ]
                }
            }
        },
        components: {
            IEcharts
        }
    }
</script>

<style scoped>
    .mix-echarts{
        width:900px;
        height:600px;
    }
</style>