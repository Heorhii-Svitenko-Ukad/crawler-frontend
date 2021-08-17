import Vue from 'vue'
import VueResource from 'vue-resource'
import VueBootstrap from 'bootstrap-vue'
import App from './App.vue'

Vue.use(VueResource)
Vue.use(VueBootstrap)

new Vue({
  render: h => h(App),
}).$mount('#app')
