<<<<<<< HEAD
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
=======
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.http.options.emulateJSON = true;
const router = new VueRouter({
  routes:[
      //重定向到admin页面
    { path: '/', redirect: '/admin/taskList' },
    { path: '/login', component: resolve => require(['./components/admin/login.vue'], resolve) },
    { path: '/regist', component: resolve => require(['./components/admin/regist.vue'], resolve) },
    { path: '/admin', component: resolve => require(['./components/admin/admin.vue'], resolve) ,

      //子路由
      children:[
        { path: 'taskList', component: resolve => require(['./components/admin/list.vue'], resolve) },
        { path: 'taskEdit', component: resolve => require(['./components/admin/edit.vue'], resolve) },
        { path: 'moduleInfo', component: resolve => require(['./components/admin/info.vue'], resolve) },
        { path: 'addProject', component: resolve => require(['./components/admin/addpro.vue'], resolve) },
      ]
    },
    { path: '/index', component: function (resolve) { require(['./components/index/index.vue'], resolve) },
        children:[
            { path: 'proInfo', component: function (resolve) { require(['./components/admin/list.vue'], resolve) } },
            { path: 'demand', component: function (resolve) { require(['./components/admin/edit.vue'], resolve) } },
            { path: 'aboutus', component: function (resolve) { require(['./components/admin/info.vue'], resolve) } },
        ]
    }
  ]
});

const app = new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

>>>>>>> 1dea681... first commit
