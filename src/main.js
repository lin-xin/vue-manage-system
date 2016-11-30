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

