import Vuex from "vuex";
import Vue from "vue";
import wolves from  './modules/wolves';
import wolfPacks from  './modules/wolfPacks';

//load vuex
Vue.use(Vuex);

// create store
export default new Vuex.Store({
    namespaced: true,
    modules: {
        wolves,
        wolfPacks
    }
})