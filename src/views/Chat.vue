<template>
  <div class="chat">
    <!-- Selectable chats -->
    <div class="filter-buttons">
      <!-- Global chat -->
      <router-link to="/chat/global">
        <Button btn-class="btn__toggle btn--radio" :class="{'active': channel == 'global'}">
          Global
          <Star :star="1" isdisabled
                :maxstars="1" starsize="xs"/>
        </Button>
      </router-link>
      <!-- Saved chats -->
      <router-link :to="'/chat/'+savedChannel" v-for="savedChannel of savedChatChannels" :key="savedChannel">
        <Button btn-class="btn__toggle btn--radio" :class="{'active': channel == savedChannel}">
          {{ capitalizeFirstLetter(savedChannel) }}
          <Star :star="1" @click.native="handleSavedChatChannels($event, savedChannel)"
                :maxstars="1" starsize="xs"/>
        </Button>
      </router-link>
      <!-- Active chat -->
      <template v-if="channel != 'global' && !savedChatChannels.includes(channel)">
        <router-link :to="'/chat/'+channel">
          <Button btn-class="btn__toggle btn--radio active">
            {{ capitalizeFirstLetter(channel) }}
            <Star :star="0" @click.native="handleSavedChatChannels($event, channel)"
                  :maxstars="1" starsize="xs"/>
          </Button>
        </router-link>
      </template>
    </div>
    <!-- Chat container -->
    <router-view :channel="activeChannel"/>
  </div>
</template>

<script>
import Button from '@/components/Btn.vue'
import Star from '@/components/Star.vue'
import { capitalizeFirstLetter } from '@/utils'
import {mapGetters} from 'vuex';

export default {
  name: 'chat',
  components: {
    Button,
    Star
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
  },
};
</script>

<style scoped lang="scss">
.chat {
  padding: 20px 50px 0 50px;

  .filter-buttons {
    margin-bottom: 10px;
  }
}
</style>
