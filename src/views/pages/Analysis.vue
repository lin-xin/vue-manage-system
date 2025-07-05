<template>
    <div class="analysis-container">
        <!-- 顶部工具栏 -->
        <div class="toolbar">
            <h2 class="title">订单数据分析</h2>
            <div style="display: flex; gap: 20px; align-items: center;">
                <!-- 日期筛选 -->
                <div class="date-filter">
                    <el-date-picker
                        v-model="dateRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small"
                        @change="filterDataByDate"
                    />
                </div>
                
                <!-- 数据类型选择 -->
                <el-select v-model="dataType" placeholder="数据类型" size="small" style="width: 120px;" @change="switchDataType">
                    <el-option label="订单金额" value="amount" />
                    <el-option label="订单数量" value="count" />
                    <el-option label="客户数" value="customers" />
                </el-select>

                <button class="edit-btn" @click="showEditDialog = true">
                    编辑数据
                </button>
                <button class="edit-btn" @click="insertRandomData">
                    插入数据
                </button>
                <button class="edit-btn" @click="() => chartData.pop()">
                    删除数据
                </button>
                <button class="edit-btn" @click="exportData">
                    导出数据
                </button>
                <button class="edit-btn" @click="refreshData">
                    刷新数据
                </button>
            </div>
        </div>

        <!-- 快速统计卡片 -->
        <div class="quick-stats">
            <div class="quick-stat-item">
                <div class="trend-indicator" :class="trendClass">
                    {{ trendDirection }} {{ Math.abs(trendPercentage).toFixed(1) }}%
                </div>
                <div class="quick-stat-label">{{ periodLabel }}趋势</div>
            </div>
            <div class="quick-stat-item">
                <div class="quick-stat-value">{{ statistics.growth.toFixed(1) }}%</div>
                <div class="quick-stat-label">环比增长</div>
            </div>
            <div class="quick-stat-item">
                <div class="quick-stat-value">{{ statistics.volatility.toFixed(1) }}%</div>
                <div class="quick-stat-label">波动率</div>
            </div>
        </div>

        <!-- 统计信息卡片 -->
        <div class="stats-container">
            <div class="stat-card">
                <div class="stat-label">平均值</div>
                <div class="stat-value">{{ statistics.mean }}</div>
                <div class="stat-trend">{{ getDataUnit() }}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">最大值</div>
                <div class="stat-value">{{ statistics.max }}</div>
                <div class="stat-trend">峰值</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">最小值</div>
                <div class="stat-value">{{ statistics.min }}</div>
                <div class="stat-trend">谷值</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">总计</div>
                <div class="stat-value">{{ statistics.sum }}</div>
                <div class="stat-trend">累计</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">标准差</div>
                <div class="stat-value">{{ statistics.stdDev }}</div>
                <div class="stat-trend">离散度</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">中位数</div>
                <div class="stat-value">{{ statistics.median }}</div>
                <div class="stat-trend">中值</div>
            </div>
        </div>

        <!-- 对比分析 -->
        <div class="comparison-section">
            <h3>数据对比分析</h3>
            <div class="comparison-controls">
                <el-radio-group v-model="comparisonPeriod" size="small">
                    <el-radio-button value="week">周对比</el-radio-button>
                    <el-radio-button value="month">月对比</el-radio-button>
                    <el-radio-button value="quarter">季度对比</el-radio-button>
                </el-radio-group>
                <button class="edit-btn small" @click="generateComparisonData">
                    生成对比数据
                </button>
            </div>
            <div class="comparison-stats">
                <div class="comparison-item">
                    <div class="comparison-label">当前周期</div>
                    <div class="comparison-value current">{{ currentPeriodSum }}</div>
                </div>
                <div class="comparison-item">
                    <div class="comparison-label">上个周期</div>
                    <div class="comparison-value previous">{{ previousPeriodSum }}</div>
                </div>
                <div class="comparison-item">
                    <div class="comparison-label">增长率</div>
                    <div class="comparison-value" :class="growthRateClass">
                        {{ growthRate > 0 ? '+' : '' }}{{ growthRate.toFixed(1) }}%
                    </div>
                </div>
            </div>
        </div>

        <!-- 图表容器 -->
        <div class="chart-container">
            <div class="chart-header">
                <h2>{{ getChartTitle() }}</h2>
                <div class="chart-controls">
                    <el-radio-group v-model="chartType" size="small">
                        <el-radio-button value="line">折线图</el-radio-button>
                        <el-radio-button value="bar">柱状图</el-radio-button>
                        <el-radio-button value="area">面积图</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <v-chart class="map-chart" :option="mapOptions" />
        </div>
        <br><br><br>
        <div class="predict-chart-container">
            <div style="display: flex; gap: 20px; align-items: center; justify-content: space-between;">
                <div style="display: flex; gap: 20px; align-items: center;">
                    <h2>未来趋势预测</h2>
                    <el-radio-group v-model="ModelMethod" style="border: 1px solid #dccc13; padding: 5px; border-radius:15px;">
                        <el-radio value="1" size="large">线性回归</el-radio>
                        <el-radio value="2" size="large">指数回归</el-radio>
                        <el-radio value="3" size="large">多项式回归</el-radio>
                        <el-radio value="4" size="large">ARIMA回归</el-radio>
                    </el-radio-group>
                </div>
                <div class="prediction-controls">
                    <el-input-number v-model="predictionDays" :min="1" :max="30" size="small" />
                    <span style="margin-left: 10px; color: #666;">天</span>
                </div>
            </div>
            <br>
            <div class="prediction-accuracy">
                <div class="accuracy-item">
                    <span>预测准确度: </span>
                    <span class="accuracy-value">{{ predictionAccuracy.toFixed(1) }}%</span>
                </div>
                <div class="accuracy-item">
                    <span>置信区间: </span>
                    <span class="confidence-value">95%</span>
                </div>
            </div>
            <v-chart class="map-chart" :option="predictOptions" />
        </div>

        <!-- 数据洞察面板 -->
        <div class="insights-panel">
            <h3>数据洞察</h3>
            <br>
            <div class="insights-grid">
                <div class="insight-card">
                    <div class="insight-icon">📈</div>
                    <div class="insight-content">
                        <h4>趋势分析</h4>
                        <p>{{ getTrendInsight() }}</p>
                    </div>
                </div>
                <div class="insight-card">
                    <div class="insight-icon">🎯</div>
                    <div class="insight-content">
                        <h4>异常检测</h4>
                        <p>{{ getAnomalyInsight() }}</p>
                    </div>
                </div>
                <div class="insight-card">
                    <div class="insight-icon">💡</div>
                    <div class="insight-content">
                        <h4>建议</h4>
                        <p>{{ getRecommendation() }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 编辑数据对话框 -->
        <div v-if="showEditDialog" class="dialog-overlay" @click="closeDialog">
            <div class="dialog" @click.stop>
                <div class="dialog-header">
                    <h3>编辑{{ getDataUnit() }}数据</h3>
                    <button class="close-btn" @click="closeDialog">×</button>
                </div>
                <div class="dialog-content">
                    <div class="batch-operations">
                        <button class="batch-btn" @click="batchMultiply">批量乘以2</button>
                        <button class="batch-btn" @click="batchAdd">批量加100</button>
                        <button class="batch-btn" @click="resetData">重置数据</button>
                    </div>
                    <div class="input-group" v-for="(value, index) in tempChartData" :key="index">
                        <label>{{ getDataTypeLabel() }} {{ index + 1 }}:</label>
                        <input type="number" v-model.number="tempChartData[index]" class="data-input" />
                        <button class="delete-point-btn" @click="deleteDataPoint(index)">×</button>
                    </div>
                    <button class="add-point-btn" @click="addDataPoint">+ 添加数据点</button>
                </div>
                <div class="dialog-footer">
                    <button class="cancel-btn" @click="closeDialog">取消</button>
                    <button class="save-btn" @click="saveData">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';

// 新增响应式数据
const dataType = ref('amount');
const chartType = ref('line');
const dateRange = ref([]);
const comparisonPeriod = ref('week');
const predictionDays = ref(5);
const showEditDialog = ref(false);

// 数据集合
const originalData = ref({
    amount: [120, 132, 301, 134, 90, 230, 210, 100, 400],
    count: [45, 52, 68, 41, 33, 78, 65, 48, 89],
    customers: [28, 31, 45, 29, 21, 42, 38, 26, 56]
});

const chartData = computed(() => originalData.value[dataType.value]);
const tempChartData = ref([...chartData.value]);

const ModelMethod = ref('1');
const { graphic } = echarts;

// 注册必要的组件
use([
    CanvasRenderer,
    LineChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
]);

// 增强的统计信息
const statistics = computed(() => {
    const data = chartData.value;
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = Math.round((sum / data.length) * 100) / 100;
    const max = Math.max(...data);
    const min = Math.min(...data);
    
    // 中位数
    const sorted = [...data].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0 
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];

    // 方差和标准差
    const variance = Math.round((data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length) * 100) / 100;
    const stdDev = Math.round(Math.sqrt(variance) * 100) / 100;

    // 增长率
    const growth = data.length > 1 ? 
        ((data[data.length - 1] - data[data.length - 2]) / data[data.length - 2]) * 100 : 0;

    // 波动率 (变异系数)
    const volatility = mean !== 0 ? (stdDev / mean) * 100 : 0;

    return {
        mean: Math.round(mean),
        max,
        min,
        sum,
        stdDev,
        median: Math.round(median),
        growth,
        volatility
    };
});

// 趋势分析
const trendAnalysis = computed(() => {
    const data = chartData.value;
    if (data.length < 2) return { direction: 'stable', percentage: 0 };
    
    const recent = data.slice(-3);
    const early = data.slice(0, 3);
    
    const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    const earlyAvg = early.reduce((sum, val) => sum + val, 0) / early.length;
    
    const percentage = earlyAvg !== 0 ? ((recentAvg - earlyAvg) / earlyAvg) * 100 : 0;
    
    return {
        direction: percentage > 5 ? 'up' : percentage < -5 ? 'down' : 'stable',
        percentage
    };
});

const trendDirection = computed(() => {
    const trend = trendAnalysis.value.direction;
    return trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→';
});

const trendClass = computed(() => {
    return `trend-${trendAnalysis.value.direction}`;
});

const trendPercentage = computed(() => trendAnalysis.value.percentage);

const periodLabel = computed(() => {
    const labels = { week: '周', month: '月', quarter: '季度' };
    return labels[comparisonPeriod.value] || '周期';
});

// 对比数据
const currentPeriodSum = computed(() => {
    const data = chartData.value;
    const halfLength = Math.floor(data.length / 2);
    return data.slice(halfLength).reduce((sum, val) => sum + val, 0);
});

const previousPeriodSum = computed(() => {
    const data = chartData.value;
    const halfLength = Math.floor(data.length / 2);
    return data.slice(0, halfLength).reduce((sum, val) => sum + val, 0);
});

const growthRate = computed(() => {
    return previousPeriodSum.value !== 0 
        ? ((currentPeriodSum.value - previousPeriodSum.value) / previousPeriodSum.value) * 100
        : 0;
});

const growthRateClass = computed(() => {
    return growthRate.value > 0 ? 'positive' : growthRate.value < 0 ? 'negative' : 'neutral';
});

const predictionAccuracy = computed(() => {
    // 模拟预测准确度计算
    const baseAccuracy = 85;
    const dataLength = chartData.value.length;
    const variability = statistics.value.volatility;
    
    let accuracy = baseAccuracy - Math.min(variability * 0.5, 20) + Math.min(dataLength * 2, 10);
    return Math.max(60, Math.min(95, accuracy));
});

// 工具函数
const getDataUnit = () => {
    const units = { amount: '元', count: '单', customers: '人' };
    return units[dataType.value] || '';
};

const getDataTypeLabel = () => {
    const labels = { amount: '订单金额', count: '订单数量', customers: '客户数' };
    return labels[dataType.value] || '数据';
};

const getChartTitle = () => {
    const titles = { 
        amount: '订单金额趋势', 
        count: '订单数量趋势', 
        customers: '客户数量趋势' 
    };
    return titles[dataType.value] || '数据趋势';
};

// 数据操作方法
const switchDataType = () => {
    tempChartData.value = [...chartData.value];
};

const insertRandomData = () => {
    const ranges = {
        amount: [50, 500],
        count: [20, 100],
        customers: [10, 80]
    };
    const [min, max] = ranges[dataType.value];
    const newValue = Math.floor(Math.random() * (max - min + 1)) + min;
    originalData.value[dataType.value].push(newValue);
};

const exportData = () => {
    const data = chartData.value;
    const csv = data.map((value, index) => `${index + 1},${value}`).join('\n');
    const blob = new Blob([`序号,${getDataTypeLabel()}\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${getDataTypeLabel()}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
};

const refreshData = () => {
    // 模拟数据刷新
    const ranges = {
        amount: [80, 450],
        count: [25, 95],
        customers: [15, 75]
    };
    const [min, max] = ranges[dataType.value];
    originalData.value[dataType.value] = originalData.value[dataType.value].map(() => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
};

const filterDataByDate = () => {
    // 模拟日期筛选逻辑
    if (dateRange.value && dateRange.value.length === 2) {
        console.log('筛选日期范围:', dateRange.value);
        // 这里可以实现真实的日期筛选逻辑
    }
};

const generateComparisonData = () => {
    // 模拟生成对比数据
    console.log('生成', comparisonPeriod.value, '对比数据');
};

// 批量操作
const batchMultiply = () => {
    tempChartData.value = tempChartData.value.map(val => Math.round(val * 2));
};

const batchAdd = () => {
    tempChartData.value = tempChartData.value.map(val => val + 100);
};

const resetData = () => {
    tempChartData.value = [120, 132, 301, 134, 90, 230, 210, 100, 400];
};

const deleteDataPoint = (index) => {
    tempChartData.value.splice(index, 1);
};

const addDataPoint = () => {
    const ranges = {
        amount: [50, 500],
        count: [20, 100],
        customers: [10, 80]
    };
    const [min, max] = ranges[dataType.value];
    tempChartData.value.push(Math.floor(Math.random() * (max - min + 1)) + min);
};

// 洞察分析
const getTrendInsight = () => {
    const trend = trendAnalysis.value;
    if (trend.direction === 'up') {
        return `数据呈上升趋势，增长${Math.abs(trend.percentage).toFixed(1)}%，表现良好。`;
    } else if (trend.direction === 'down') {
        return `数据呈下降趋势，下降${Math.abs(trend.percentage).toFixed(1)}%，需要关注。`;
    }
    return '数据相对稳定，波动较小。';
};

const getAnomalyInsight = () => {
    const data = chartData.value;
    const mean = statistics.value.mean;
    const stdDev = statistics.value.stdDev;
    const anomalies = data.filter(val => Math.abs(val - mean) > 2 * stdDev);
    
    if (anomalies.length > 0) {
        return `检测到${anomalies.length}个异常值，建议进一步分析原因。`;
    }
    return '未检测到明显异常值，数据质量良好。';
};

const getRecommendation = () => {
    const growth = statistics.value.growth;
    const volatility = statistics.value.volatility;
    
    if (growth > 10 && volatility < 20) {
        return '保持当前策略，继续扩大市场份额。';
    } else if (growth < -10) {
        return '建议优化营销策略，提升业务表现。';
    } else if (volatility > 30) {
        return '数据波动较大，建议稳定业务流程。';
    }
    return '继续监控关键指标，优化业务策略。';
};

// 增强的图表配置
const mapOptions = computed(() => {
    const baseOption = {
        xAxis: {
            type: 'category',
            boundaryGap: chartType.value === 'bar',
            data: chartData.value.map((_, index) => `${index + 1}`),
        },
        yAxis: {
            type: 'value',
            name: getDataUnit(),
        },
        grid: {
            top: '5%',
            left: '3%',
            right: '3%',
            bottom: '5%',
            containLabel: true,
        },
        color: ['#1976d2'],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#1976d2',
            textStyle: { color: '#fff' },
            formatter: (params) => {
                const point = params[0];
                return `${getDataTypeLabel()}: ${point.value}${getDataUnit()}`;
            }
        },
        series: [{
            type: chartType.value === 'area' ? 'line' : chartType.value,
            data: chartData.value,
            smooth: chartType.value === 'line',
            symbolSize: 8,
            lineStyle: chartType.value === 'line' ? { width: 4 } : undefined,
            areaStyle: chartType.value === 'area' ? {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(25, 118, 210, 0.8)' },
                    { offset: 1, color: 'rgba(25, 118, 210, 0)' }
                ])
            } : undefined
        }]
    };
    
    return baseOption;
});

// 线性回归预测
function linearRegression(data) {
    const n = data.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = data;

    const sumX = x.reduce((sum, val) => sum + val, 0);
    const sumY = y.reduce((sum, val) => sum + val, 0);
    const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
    const sumXX = x.reduce((sum, val) => sum + val * val, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return slope * n + intercept;
}

// 指数平滑预测
function exponentialSmoothing(data, alpha) {
    if (data.length === 0) return 0;

    let smoothed = data[0];
    for (let i = 1; i < data.length; i++) {
        smoothed = alpha * data[i] + (1 - alpha) * smoothed;
    }

    // 计算趋势
    const recent = data.slice(-Math.min(5, data.length));
    const trend = recent.length > 1 ?
        (recent[recent.length - 1] - recent[0]) / (recent.length - 1) : 0;

    return smoothed + trend;
}

// 多项式回归预测
function polynomialRegression(data, degree) {
    const n = data.length;
    if (n < degree + 1) return data[n - 1];

    // 使用最小二乘法拟合多项式
    const x = Array.from({ length: n }, (_, i) => i);
    const y = data;

    // 构建范德蒙德矩阵
    const matrix = [];
    const target = [];

    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j <= degree; j++) {
            row.push(Math.pow(x[i], j));
        }
        matrix.push(row);
        target.push(y[i]);
    }

    // 简化的多项式拟合 (仅处理二次)
    if (degree === 2 && n >= 3) {
        const x1 = x[n - 3], y1 = y[n - 3];
        const x2 = x[n - 2], y2 = y[n - 2];
        const x3 = x[n - 1], y3 = y[n - 1];

        // 二次函数拟合: y = ax² + bx + c
        const denom = (x1 - x2) * (x1 - x3) * (x2 - x3);
        if (Math.abs(denom) < 1e-10) return y3 + (y3 - y2);

        const a = (x3 * (y2 - y1) + x2 * (y1 - y3) + x1 * (y3 - y2)) / denom;
        const b = (x3 * x3 * (y1 - y2) + x2 * x2 * (y3 - y1) + x1 * x1 * (y2 - y3)) / denom;
        const c = (x2 * x3 * (x2 - x3) * y1 + x3 * x1 * (x3 - x1) * y2 + x1 * x2 * (x1 - x2) * y3) / denom;

        const nextX = n;
        return a * nextX * nextX + b * nextX + c;
    }

    return data[n - 1];
}

// ARIMA简化版本 (自回归移动平均)
function arimaSimplified(data) {
    const n = data.length;
    if (n < 3) return data[n - 1];

    // AR(2) 模型: y(t) = φ1*y(t-1) + φ2*y(t-2) + ε
    const y1 = data[n - 1];
    const y2 = data[n - 2];

    // 简单的AR系数估计
    const phi1 = 0.7; // 一阶自回归系数
    const phi2 = 0.2; // 二阶自回归系数

    // 计算残差的移动平均
    const errors = [];
    for (let i = 2; i < n; i++) {
        const predicted = phi1 * data[i - 1] + phi2 * data[i - 2];
        errors.push(data[i] - predicted);
    }

    const avgError = errors.length > 0 ?
        errors.reduce((sum, err) => sum + err, 0) / errors.length : 0;

    // MA(1) 组件
    const theta = 0.3; // 移动平均系数
    const prediction = phi1 * y1 + phi2 * y2 + theta * avgError;

    return prediction;
}

const predictData = computed(() => {
    const data = chartData.value;
    const predictions = [];

    if (data.length < 3) return Array(predictionDays.value).fill(data[data.length - 1] || 0);

    for (let i = 0; i < predictionDays.value; i++) {
        let predictedValue;
        const currentData = [...data, ...predictions];

        switch (ModelMethod.value) {
            case '1':
                predictedValue = linearRegression(currentData);
                break;
            case '2':
                predictedValue = exponentialSmoothing(currentData, 0.3);
                break;
            case '3':
                predictedValue = polynomialRegression(currentData, 2);
                break;
            case '4':
                predictedValue = arimaSimplified(currentData);
                break;
        }

        const seasonalFactor = Math.sin((currentData.length + i) * Math.PI / 6) * 0.1 + 1;
        predictedValue *= seasonalFactor;

        const trendDecay = Math.exp(-i * 0.1);
        const baseline = currentData.slice(-Math.min(5, currentData.length))
            .reduce((sum, val) => sum + val, 0) / Math.min(5, currentData.length);

        predictedValue = baseline + (predictedValue - baseline) * trendDecay;

        const noiseIntensity = 15 * Math.exp(-i * 0.3);
        const noise = (Math.random() - 0.5) * noiseIntensity;

        predictedValue = Math.max(0, Math.round(predictedValue + noise));

        if (predictions.length > 0) {
            const lastPrediction = predictions[predictions.length - 1];
            const maxChange = Math.abs(lastPrediction * 0.3);

            if (Math.abs(predictedValue - lastPrediction) > maxChange) {
                const direction = predictedValue > lastPrediction ? 1 : -1;
                predictedValue = lastPrediction + direction * maxChange;
            }
        }

        predictions.push(predictedValue);
    }

    return predictions;
});

const predictOptions = computed(() => ({
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: predictData.value.map((_, index) => `预测${index + 1}`),
    },
    yAxis: {
        type: 'value',
        name: getDataUnit(),
    },
    grid: {
        top: '10%',
        left: '3%',
        right: '3%',
        bottom: '5%',
        containLabel: true,
    },
    color: ['#dccc13'],
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderColor: '#dccc13',
        textStyle: { color: '#fff' },
        formatter: (params) => {
            const point = params[0];
            return `预测${getDataTypeLabel()}: ${point.value}${getDataUnit()}`;
        }
    },
    series: [{
        type: 'line',
        areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(255, 246, 143, 0.8)' },
                { offset: 1, color: 'rgba(255, 246, 143, 0)' }
            ])
        },
        smooth: true,
        lineStyle: { width: 4 },
        symbolSize: 8,
        data: predictData.value,
    }]
}));

// 方法
const closeDialog = () => {
    showEditDialog.value = false;
    tempChartData.value = [...chartData.value]; // 重置临时数据
};

const saveData = () => {
    originalData.value[dataType.value] = [...tempChartData.value];
    showEditDialog.value = false;
};

// 监听对话框开启，更新临时数据
watch(showEditDialog, (newVal) => {
    if (newVal) {
        tempChartData.value = [...chartData.value];
    }
});
</script>

<style scoped>
.analysis-container {
    padding: 20px;
    background: linear-gradient(135deg, #e3f2fd 0%, #f1f8e9 100%);
    min-height: 100vh;
}

.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 10px;
    flex-wrap: wrap;
    gap: 15px;
}

.title {
    color: #1565c0;
    margin: 0;
    font-weight: 600;
}

.date-filter {
    min-width: 250px;
}

.edit-btn {
    background: linear-gradient(45deg, #1976d2, #42a5f5);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
}

.edit-btn.small {
    padding: 5px 15px;
    font-size: 12px;
}

.edit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(25, 118, 210, 0.4);
    background: linear-gradient(45deg, #1565c0, #2196f3);
}

/* 快速统计 */
.quick-stats {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.quick-stat-item {
    background: white;
    padding: 15px 20px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(25, 118, 210, 0.1);
    text-align: center;
    min-width: 120px;
}

.quick-stat-value, .trend-indicator {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}

.quick-stat-label {
    font-size: 12px;
    color: #666;
}

.trend-up { color: #4caf50; }
.trend-down { color: #f44336; }
.trend-stable { color: #ff9800; }

/* 统计卡片增强 */
.stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px;
    margin-bottom: 25px;
}

.stat-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(25, 118, 210, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
    border-left: 4px solid #1976d2;
}

.stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 20px rgba(25, 118, 210, 0.15);
}

.stat-label {
    font-size: 14px;
    color: #546e7a;
    margin-bottom: 8px;
    font-weight: 500;
}

.stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #1976d2;
    margin-bottom: 5px;
}

.stat-trend {
    font-size: 12px;
    color: #999;
}

/* 对比分析 */
.comparison-section {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(25, 118, 210, 0.1);
    margin-bottom: 25px;
}

.comparison-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.comparison-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
}

.comparison-item {
    text-align: center;
}

.comparison-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
}

.comparison-value {
    font-size: 24px;
    font-weight: bold;
}

.comparison-value.current { color: #1976d2; }
.comparison-value.previous { color: #666; }
.comparison-value.positive { color: #4caf50; }
.comparison-value.negative { color: #f44336; }
.comparison-value.neutral { color: #ff9800; }

/* 图表容器增强 */
.chart-container, .predict-chart-container {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(25, 118, 210, 0.1);
    margin-bottom: 25px;
}

.chart-container {
    border: 3px solid #1976d2;
}

.predict-chart-container {
    border: 3px solid #dccc13;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.chart-controls {
    display: flex;
    gap: 10px;
}

.prediction-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.prediction-accuracy {
    display: flex;
    gap: 30px;
    margin-bottom: 15px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 8px;
}

.accuracy-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.accuracy-value {
    font-weight: bold;
    color: #4caf50;
}

.confidence-value {
    font-weight: bold;
    color: #2196f3;
}

.map-chart {
    width: 100%;
    height: 400px;
}

/* 数据洞察面板 */
.insights-panel {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(25, 118, 210, 0.1);
    margin-bottom: 25px;
}

.insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.insight-card {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #1976d2;
}

.insight-icon {
    font-size: 24px;
    flex-shrink: 0;
}

.insight-content h4 {
    margin: 0 0 8px 0;
    color: #1976d2;
    font-size: 16px;
}

.insight-content p {
    margin: 0;
    color: #666;
    font-size: 14px;
    line-height: 1.4;
}

/* 对话框增强 */
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(25, 118, 210, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
}

.dialog {
    background: white;
    border-radius: 15px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(25, 118, 210, 0.3);
    border-top: 4px solid #1976d2;
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e3f2fd;
    background: linear-gradient(135deg, #e3f2fd, #f8f9fa);
}

.dialog-header h3 {
    margin: 0;
    color: #1565c0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #546e7a;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.close-btn:hover {
    background: #e3f2fd;
    color: #1976d2;
}

.dialog-content {
    padding: 20px;
    max-height: 400px;
    overflow-y: auto;
}

.batch-operations {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.batch-btn {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #f8f9fa;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 12px;
}

.batch-btn:hover {
    background: #e9ecef;
    border-color: #1976d2;
}

.input-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    gap: 10px;
}

.input-group label {
    flex: 0 0 120px;
    color: #546e7a;
    font-weight: 500;
}

.data-input {
    flex: 1;
    padding: 8px 12px;
    border: 2px solid #e3f2fd;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.data-input:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.delete-point-btn {
    background: #f44336;
    color: white;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.add-point-btn {
    width: 100%;
    padding: 10px;
    border: 2px dashed #1976d2;
    background: none;
    color: #1976d2;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.3s ease;
}

.add-point-btn:hover {
    background: #e3f2fd;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px;
    border-top: 1px solid #e3f2fd;
    background: linear-gradient(135deg, #e3f2fd, #f8f9fa);
}

.cancel-btn,
.save-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
}

.cancel-btn {
    background: #eceff1;
    color: #546e7a;
    border: 1px solid #cfd8dc;
}

.cancel-btn:hover {
    background: #cfd8dc;
    color: #37474f;
}

.save-btn {
    background: linear-gradient(45deg, #1976d2, #42a5f5);
    color: white;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
}

.save-btn:hover {
    background: linear-gradient(45deg, #1565c0, #2196f3);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .toolbar {
        flex-direction: column;
        align-items: stretch;
    }
    
    .quick-stats {
        flex-direction: column;
    }
    
    .comparison-stats {
        grid-template-columns: 1fr;
    }
    
    .chart-header {
        flex-direction: column;
        gap: 15px;
    }
    
    .insights-grid {
        grid-template-columns: 1fr;
    }
}
</style>