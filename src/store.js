/**
 * Created by Administrator on 2017.05.16.
 */
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {}
    },
    mutations: {
        login (state, user) {
            state.user = user;
        },
        logout (state) {
            state.user = {};
        }
    }
})
