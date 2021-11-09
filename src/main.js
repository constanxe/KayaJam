import 'v-tooltip/dist/v-tooltip.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap';

import VueLogger from 'vuejs-logger';
import VueSocialSharing from 'vue-social-sharing';
import VTooltip from 'v-tooltip';

import store from './store';
import PubNubVue from 'pubnub-vue';

import Keycloak from 'keycloak-js'
import { keycloakInitOptions } from './utils';

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

const options = {
  showLogLevel : true,
  showMethodName : true,
  separator: ':',
  showConsoleColors: true
};
Vue.use(VueLogger, options);

Vue.use(VueSocialSharing)
Vue.use(VTooltip)

const publish_Key = process.env.VUE_APP_PUBNUB_PUB_KEY;
const subscribe_Key = process.env.VUE_APP_PUBNUB_SUB_KEY;
/* reference: https://www.pubnub.com/blog/vuejs-group-chat-app-tutorial/ */
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

/* reference: https://www.keycloak.org/securing-apps/vue */
let keycloak = Keycloak(keycloakInitOptions);
keycloak.init({onLoad: keycloakInitOptions.onLoad}).then((auth) => {
  if(!auth) {
    window.location.reload();
  } else {
    Vue.$log.info("Authenticated");

    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')

    //Token Refresh
    setInterval(() => {
      keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
          Vue.$log.info('Token refreshed' + refreshed);
        } else {
          Vue.$log.warn('Token not refreshed, valid for '
            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        }
      }).catch(() => {
        Vue.$log.error('Failed to refresh token');
      });
    }, 6000)

    /* reference: https://ibm-developer.gitbook.io/get-started-with-security-for-your-java-microservi/authentication-and-authorization-with-keycloak-and-quarkus/application_authentication */
    let payload = {
      idToken: keycloak.idToken,
      accessToken: keycloak.token,
      name: keycloak.tokenParsed.preferred_username
    }
    if (keycloak.token && keycloak.idToken && keycloak.token != '' && keycloak.idToken != '') {
      store.commit("login", payload);
      console.log("User has logged in: " + keycloak.subject)
    } else {
      /* reference:  & https://suedbroecker.net/2021/05/18/simply-logout-from-keycloak/ */
      payload = {
        idToken: "",
        accessToken: "",
        name: ""
      }
      store.commit("login", payload);
    }
  }
}).catch(() => {
  Vue.$log.error("Authenticated Failed");
});
