import Vue from 'vue'
import VeeValidate from "vee-validate"
import App from './App.vue'
import Store from './store'
import {router} from './routes'


// require("dotenv").config()


Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store:Store,
}).$mount('#app')
