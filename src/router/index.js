import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/basetable',
            component: resolve => require(['../components/page/BaseTable.vue'], resolve)
        },
        {
            path: '/vuetable',
            component: resolve => require(['../components/page/VueTable.vue'], resolve)
        },
        {
            path: '/baseform',
            component: resolve => require(['../components/page/BaseForm.vue'], resolve)
        }
    ]
})
