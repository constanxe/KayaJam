import 'v-tooltip/dist/v-tooltip.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap';
import 'startbootstrap-sb-admin/dist/js/scripts';

import VueSocialSharing from 'vue-social-sharing';
import VTooltip from 'v-tooltip';
import Toasted from 'vue-toasted';

import store from './store';
import PubNubVue from 'pubnub-vue';

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueSocialSharing)
Vue.use(VTooltip)
Vue.use(Toasted)

const publish_Key = process.env.VUE_APP_PUBNUB_PUB_KEY;
const subscribe_Key = process.env.VUE_APP_PUBNUB_SUB_KEY;

/* reference: https://www.pubnub.com/blog/vuejs-group-chat-app-tutorial/ */

// Make a unique uuid for each client
const myUuid = fourCharID();
const me = {
  uuid: myUuid,
};

try {
  if (!publish_Key || !subscribe_Key) {
    throw 'PubNub Keys are missing.';
  }
} catch (err) {
  console.log(err);
}

// Initialize the PubNub client API
Vue.use(PubNubVue, {
  subscribeKey: subscribe_Key,
  publishKey: publish_Key,
  ssl: true
}, store);

// Execute when the Vue instance is created
function created() {
  this.$store.commit('setMe', {
    me
  });
}

/**
 * Get a new 4 character ID. It is recommended to use a standard 128-bit UUID
 *     in production apps instead.
 *
 * @return {string} A unique ID for each user.  */

function fourCharID() {
  const maxLength = 4;
  const possible = 'abcdef0123456789';
  let text = '';

  for (let i = 0; i < maxLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

new Vue({
  router,
  store,
  created,
  render: function (h) { return h(App) }
}).$mount('#app')
