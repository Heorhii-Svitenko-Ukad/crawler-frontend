import Vue from 'vue'
import VueResource from 'vue-resource'
import VueBootstrap from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'

Vue.use(VueResource)
Vue.use(VueBootstrap)
Vue.use(Vuelidate)

Vue.http.options.root = 'https://websitecrawlerwebapi.azurewebsites.net/api'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
