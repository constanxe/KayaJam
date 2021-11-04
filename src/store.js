import styles from './assets/_config.scss';

/* reference: https://www.pubnub.com/blog/vuejs-group-chat-app-tutorial/ */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  theme: styles.defaultTheme,
  me: {},
  history: [],
};

const mutations = {
  setTheme(state, theme) {
    state.theme = theme;
  },
  setMe(state, {me}) {
    state.me = me;
  },
  addHistory(state, {history}){
    history.forEach(element => {
      state.history.push(element.entry);
    });
  },
}

const getters = {
  getTheme: (state) => state.theme,
  getMyUuid: (state) => state.me.uuid,
  getHistoryMsgs: (state) => state.history,
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
});
