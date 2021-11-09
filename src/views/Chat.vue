<template>
  <div class="chat">
    <div class="fixed-height">
    <!-- List of selectable chats -->
      <div class="filter-buttons">
        <!-- Global chat -->
        <router-link to="/chat/global">
          <Button btn-class="btn__toggle btn--radio" :class="{'active': channel == 'global'}" v-tooltip="'All users'">
            Global
            <Star :star="1" isdisabled v-tooltip="'You can\'t unstar this chat'"
                  :maxstars="1" starsize="xs"/>
          </Button>
        </router-link>
        <!-- Saved chats -->
        <router-link :to="'/chat/'+savedChannel" v-for="savedChannel of savedChatChannels" :key="savedChannel">
          <Button btn-class="btn__toggle btn--radio" :class="{'active': channel == savedChannel}">
            <i
              class="bi"
              :class="savedChannel.split(':')[0] == 'artist' ? 'bi-person-video2' : 'bi-book-fill'"
              v-tooltip="capitalizeFirstLetter(savedChannel.split(':')[0])"
            />
            {{ capitalizeFirstLetter(savedChannel.split(':')[1]) }}
            <Star :star="1" @click.native="handleSavedChatChannels($event, savedChannel)"
                  :maxstars="1" starsize="xs" v-tooltip="'Star this chat for future viewing'"/>
            <router-link :to="'/music/'+savedChannel" v-tooltip="'Visit this '+channel.split(':')[0]+'\'s page'">
              <i class="bi bi-link-45deg go-icon"/>
            </router-link>
          </Button>
        </router-link>
        <!-- Active chat -->
        <template v-if="channel != 'global' && !savedChatChannels.includes(channel)">
          <router-link :to="'/chat/'+channel">
            <Button btn-class="btn__toggle btn--radio active">
              <i
                class="bi"
                :class="channel.split(':')[0] == 'artist' ? 'bi-person-video2' : 'bi-book-fill'"
                v-tooltip="capitalizeFirstLetter(channel.split(':')[0])"
              />
              {{ capitalizeFirstLetter(channel.split(':')[1]) }}
              <Star :star="0" @click.native="handleSavedChatChannels($event, channel)"
                    :maxstars="1" starsize="xs" v-tooltip="'Star this chat for future viewing'"/>
              <router-link :to="'/music/'+channel" v-tooltip="'Visit this '+channel.split(':')[0]+'\'s page'">
                <i class="bi bi-link-45deg go-icon"/>
              </router-link>
            </Button>
          </router-link>
        </template>
      </div>
    <!-- Chat components -->
      <chat-log :channel="activeChannel"/>
    </div>
    <message-input :channel="activeChannel"/>
  </div>
</template>

<script>
import ChatLog from '@/components/chat/ChatLog';
import MessageInput from '@/components/chat/MessageInput';
import Button from '@/components/Btn.vue'
import Star from '@/components/Star.vue'
import { capitalizeFirstLetter } from '@/utils'
import {mapGetters} from 'vuex';
import PubNubVue from 'pubnub-vue';

export default {
  name: 'chat',
  components: {
    Button,
    Star,
    ChatLog,
    MessageInput
  },
  props: {
    channel: { type: String, default: 'global' }
  },
  computed: {
    ...mapGetters({
      theme: 'getTheme',
      savedChatChannels: 'getSavedChatChannels'
    }),
    activeChannel() {
      return this.$route.params.channel || this.channel
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return capitalizeFirstLetter(string)
    },
    handleSavedChatChannels(event, channel) {
      if (event.target.parentNode.classList.contains("active")) {
        this.$store.commit('addSavedChatChannel', channel)
      } else {
        this.$store.commit('removeSavedChatChannel', channel)
      }
    },
  /* adapted from: https://www.pubnub.com/blog/vuejs-group-chat-app-tutorial/ */
    fetchHistory(store) {
      PubNubVue.getInstance().history(
        {
          channel: this.channel,
          count: 6, // how many items to fetch
          stringifiedTimeToken: true, // false is the default
        },
        function(status, response) {
          store.commit('addHistory', {history: response.messages});
        }
      )
    }
  },
  mounted() {
    // Subscribe to PubNub
    this.$pnSubscribe({
      channels: [this.channel],
    });
    this.$nextTick(this.fetchHistory(this.$store));
  },
};
</script>

<style scoped lang="scss">
.chat {
  padding: 20px 30px 0 30px;

  .fixed-height {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 135px);  /* minus topnav & messageinput */

    & > * {
      margin-bottom: 0.5rem;
      overflow: auto; /* scroll in any direction */
    }
  }

  .filter-buttons {
    word-break: break-word;

    /* vertical scroll */
    min-height: 50px; /* 1 line */
    max-height: 90px; /* 2 or more lines */

    // /* horizontal scroll */
    // white-space: nowrap;

    // & * {
    //   display: inline-block;
    // }

    .active .go-icon {
      color: green; /* darker */
    }

    .go-icon {
      position: relative;
      top: 2px;
      font-size: 18px;
    }
  }
}

/* reference: https://www.pubnub.com/blog/vuejs-group-chat-app-tutorial/ */
/* Loading Ripple Animation */
/* Generated by loading.io */
@keyframes lds-ripple {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 8px;
    left: 8px;
    width: 176px;
    height: 176px;
    opacity: 0;
  }
}
@-webkit-keyframes lds-ripple {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 8px;
    left: 8px;
    width: 176px;
    height: 176px;
    opacity: 0;
  }
}
.lds-ripple {
  position: relative;
}
.lds-ripple div {
  box-sizing: content-box;
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  -webkit-animation: lds-ripple 2.6s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  animation: lds-ripple 2.6s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(1) {
  border-color: #000000;
}
.lds-ripple div:nth-child(2) {
  border-color: rgba(0%,0%,0%,0.675);
  -webkit-animation-delay: -1.3s;
  animation-delay: -1.3s;
}
.lds-ripple {
  width: 36px !important;
  height: 36px !important;
  -webkit-transform: translate(-18px, -18px) scale(0.18) translate(18px, 18px);
  transform: translate(-18px, -18px) scale(0.18) translate(18px, 18px);
}
</style>