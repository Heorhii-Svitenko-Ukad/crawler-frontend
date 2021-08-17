import Vue from 'vue'
import VueResource from 'vue-resource'
import VueBootstrap from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'

Vue.use(VueResource)
Vue.use(VueBootstrap)
Vue.use(Vuelidate)

Vue.http.options.root = 'https://localhost:44302/api'

new Vue({
  render: h => h(App),
}).$mount('#app')
