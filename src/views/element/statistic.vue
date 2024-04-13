<template>
    <div>


        <el-card class="mgb20" shadow="hover">
            <template #header>基础用法</template>
            <el-row>
                <el-col :span="6" style="text-align: center">
                    <el-statistic title="Daily active users" :value="268500" />
                </el-col>
                <el-col :span="6" style="text-align: center">
                    <el-statistic :value="138">
                        <template #title>
                            <div style="display: inline-flex; align-items: center">
                                Ratio of men to women
                            </div>
                        </template>
                        <template #suffix>/100</template>
                    </el-statistic>
                </el-col>
                <el-col :span="6" style="text-align: center">
                    <el-statistic title="数字滚动" :value="outputValue" />
                </el-col>
                <el-col :span="6" style="text-align: center">
                    <el-countdown title="倒计时" :value="value" />
                </el-col>
            </el-row>
        </el-card>

        <el-card class="mgb20" shadow="hover">
            <template #header>CountUp.js</template>
            <div class="plugins-tips">
                countup.js：用于快速创建以更有趣的方式显示数字数据的动画。 访问地址：
                <a href="https://github.com/inorganik/countUp.js" target="_blank">countUp.js</a>
            </div>
            <el-row>
                <el-col :span="8" style="text-align: center">
                    <p>基础用法</p>
                    <countup class="countup" :end="6666" />
                </el-col>
                <el-col :span="8" style="text-align: center">
                    <p>具体配置</p>
                    <countup class="countup" :end="8888.5" :options="options" />
                </el-col>
                <el-col :span="8" style="text-align: center">
                    <p>更新数值</p>
                    <countup class="countup" :end="value1" />
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mgb20" shadow="never">
            <template #header>统计卡片</template>

            <el-row :gutter="20" class="mgb20">
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <el-icon class="card-icon color1">
                            <User />
                        </el-icon>
                        <div class="card-content text-right">
                            <el-statistic title="日活跃用户量" :value="268500" />
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <el-icon class="card-icon color2">
                            <ChatDotRound />
                        </el-icon>
                        <div class="card-content text-right">
                            <el-statistic title="系统消息" :value="16800" />
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <el-icon class="card-icon color3">
                            <Goods />
                        </el-icon>
                        <div class="card-content text-right">
                            <el-statistic title="商品数量" :value="8888" />
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <el-icon class="card-icon color4">
                            <ShoppingCartFull />
                        </el-icon>
                        <div class="card-content text-right">
                            <el-statistic title="今日订单量" :value="56888" />
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mgb20">
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <div class="card-content text-left">
                            <el-statistic :value-style="{ color: '#2d8cf0' }" title="日活跃用户量" :value="268500" />
                        </div>
                        <el-icon class="card-icon color1">
                            <User />
                        </el-icon>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <div class="card-content text-left">
                            <el-statistic :value-style="{ color: '#64d572' }" title="系统消息" :value="16800" />
                        </div>
                        <el-icon class="card-icon color2">
                            <ChatDotRound />
                        </el-icon>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <div class="card-content text-left">
                            <el-statistic :value-style="{ color: '#f25e43' }" title="商品数量" :value="8888" />
                        </div>
                        <el-icon class="card-icon color3">
                            <Goods />
                        </el-icon>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <div class="card-content text-left">
                            <el-statistic :value-style="{ color: '#e9a745' }" title="今日订单量" :value="56888" />
                        </div>
                        <el-icon class="card-icon color4">
                            <ShoppingCartFull />
                        </el-icon>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mgb20">
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <el-icon class="card-icon bg1">
                            <User />
                        </el-icon>
                        <div class="card-content">
                            <countup class="card-num color1" :end="6666" />
                            <div>用户访问量</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <el-icon class="card-icon bg2">
                            <ChatDotRound />
                        </el-icon>
                        <div class="card-content">
                            <countup class="card-num color2" :end="168" />
                            <div>系统消息</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <el-icon class="card-icon bg3">
                            <Goods />
                        </el-icon>
                        <div class="card-content">
                            <countup class="card-num color3" :end="8888" />
                            <div>商品数量</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body">
                        <el-icon class="card-icon bg4">
                            <ShoppingCartFull />
                        </el-icon>
                        <div class="card-content">
                            <countup class="card-num color4" :end="568" />
                            <div>今日订单量</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mgb20">
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body bg1">
                        <el-icon class="card-icon ">
                            <User />
                        </el-icon>
                        <div class="card-content color0">
                            <countup class="card-num" :end="6666" />
                            <div>用户访问量</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body bg2">
                        <el-icon class="card-icon">
                            <ChatDotRound />
                        </el-icon>
                        <div class="card-content color0">
                            <countup class="card-num" :end="168" />
                            <div>系统消息</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body bg3">
                        <el-icon class="card-icon">
                            <Goods />
                        </el-icon>
                        <div class="card-content color0">
                            <countup class="card-num " :end="8888" />
                            <div>商品数量</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" body-class="card-body bg4">
                        <el-icon class="card-icon">
                            <ShoppingCartFull />
                        </el-icon>
                        <div class="card-content color0">
                            <countup class="card-num " :end="568" />
                            <div>今日订单量</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
import countup from '@/components/countup.vue';

const source = ref(0)
const outputValue = useTransition(source, {
    duration: 1500,
})
source.value = 172000

const value = ref(Date.now() + 1000 * 60 * 60 * 7)
const value1 = ref(1000);
setTimeout(() => {
    value1.value = 8000;
}, 5000);
const options = {
    startVal: 1000,
    decimalPlaces: 2,
    duration: 5,
    useGrouping: false,
    prefix: '$',
    separator: ',',
    decimal: '.',
    suffix: '',
}
</script>

<style>
.card-body {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0;
}

.bg1 {
    background: #2d8cf0;
}

.bg2 {
    background: #64d572;
}

.bg3 {
    background: #f25e43;
}

.bg4 {
    background: #e9a745;
}
</style>
<style scoped>
.countup {
    font-size: 24px;
}

.card-content {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
    padding: 0 20px;
}

.card-num {
    font-size: 30px;
}

.card-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}


.color0 {
    color: #fff;
}

.color1 {
    color: #2d8cf0;
}

.color2 {
    color: #64d572;
}

.color3 {
    color: #f25e43;
}

.color4 {
    color: #e9a745;
}

.text-right {
    text-align: right;
}

.text-left {
    text-align: left;
}
</style>