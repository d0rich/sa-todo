import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.mixin({
  methods:{
    DateToString(date){
      const d = new Date(date);
      let datePart = `${d.getDate()}`;
      if(d.getDate() < 10)
        datePart = `0${d.getDate()}`
      let monthPart = `${d.getMonth()}`;
      if(d.getMonth() < 10)
        monthPart = `0${d.getMonth()}`
      return(`${datePart}/${monthPart}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
