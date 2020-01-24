import Vue from 'vue'
import VueRouter  from 'vue-router'

import Home from './views/Home'
import Wolf from './views/Wolf'
import Packs from './views/Packs'
import Pack from './views/Pack'
import MapView from './views/MapView'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'hash',
    routes: [
        {path: '/', component: Home},
        {path: '/packs', component: Packs},
        {path: '/wolf/:id', name: 'wolf', component: Wolf},
        {path: '/packs/:id', name: 'pack', component: Pack},
        {path: '/mapview', name: 'MapView', component: MapView}
    ]
})