import Vue from 'vue'
import App from './App.vue'
// import router
import router from './router';

// import css
import 'semantic-ui-css/semantic.css'

// turns off development mode warning message
Vue.config.productionTip = false

new Vue({
  router,
  render: h =>h(App)
}).$mount('#app');
