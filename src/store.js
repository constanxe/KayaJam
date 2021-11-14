import styles from '@/assets/_config.scss';

/* reference: https://www.pubnub.com/blog/vuejs-group-chat-app-tutorial/ */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  theme: styles.defaultTheme,
  playerAlbum: "6T0uX51GLiQW6bFBXSz05I", /* temporary fallback for player */
  user: {},
  /* chat */
  history: [],
  // savedChatChannels: [],
};

const mutations = {
  setTheme(state, theme) {
    state.theme = theme;
  },
  setPlayerAlbum(state, playerAlbum) {
    state.playerAlbum = playerAlbum;
  },
  login(state, payload) {
    state.user = payload;
  },
  /* chat */
  addHistory(state, {history}) {
    state.history = []
    history.forEach(element => {
      state.history.push(element.entry);
    });
  },
  // addSavedChatChannel(state, channel) {
  //   const pos = state.savedChatChannels.indexOf(channel);
  //   if (pos == -1) state.savedChatChannels.push(channel);
  // },
  // removeSavedChatChannel(state, channel) {
  //   const pos = state.savedChatChannels.indexOf(channel);
  //   if (pos > -1) state.savedChatChannels.splice(pos,1);
  // },
}

const getters = {
  getTheme: (state) => state.theme,
  getPlayerAlbum: (state) => state.playerAlbum,
  /* user */
  getUser: (state) => state.user,
  getUserUuid: (state) => state.user.name,
  /* chat */
  getHistoryMsgs: (state) => state.history,
  // getSavedChatChannels: (state) => state.savedChatChannels,
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
});
