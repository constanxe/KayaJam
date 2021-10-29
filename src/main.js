import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap';
import 'startbootstrap-sb-admin/dist/js/scripts';

import VueSocialSharing from 'vue-social-sharing';

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueSocialSharing)

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
