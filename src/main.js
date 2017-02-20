import Vue from 'vue';
import App from './App';
import router from './router';
require('chart.js/dist/Chart.bundle.min.js')
require('hchs-vue-charts/dist/vue-charts.js')
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

Vue.use(ElementUI);
Vue.use(VueCharts);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
