import styles from '@/assets/_config.scss';

/* reference: https://www.pubnub.com/blog/vuejs-group-chat-app-tutorial/ */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  theme: styles.defaultTheme,
  user: {},
  playerAlbum: "1DFixLWuPkv3KT3TnV35m3", /* temporary fallback for player */
  me: {},
  /* chat */
  history: [],
  savedChatChannels: [],
};

const mutations = {
  setTheme(state, theme) {
    state.theme = theme;
  },
  login(state, payload) {
    state.user = payload;
  },
  setPlayerAlbum(state, playerAlbum) {
    state.playerAlbum = playerAlbum;
  },
  setMe(state, {me}) {
    state.me = me;
  },
  /* chat */
  addHistory(state, {history}) {
    state.history = []
    history.forEach(element => {
      state.history.push(element.entry);
    });
  },
  addSavedChatChannel(state, channel) {
    const pos = state.savedChatChannels.indexOf(channel);
    if (pos == -1) state.savedChatChannels.push(channel);
  },
  removeSavedChatChannel(state, channel) {
    const pos = state.savedChatChannels.indexOf(channel);
    if (pos > -1) state.savedChatChannels.splice(pos,1);
  },
}

const getters = {
  getTheme: (state) => state.theme,
  getUser: (state) => state.user,
  getUserUuid: (state) => state.user.name,
  getPlayerAlbum: (state) => state.playerAlbum,
  getMyUuid: (state) => state.me.uuid,
  getHistoryMsgs: (state) => state.history,
  getSavedChatChannels: (state) => state.savedChatChannels,
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
});
