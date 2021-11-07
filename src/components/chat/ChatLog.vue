/* reference: https://www.pubnub.com/blog/vuejs-group-chat-app-tutorial/ */

<template>
  <div class="chat-log" ref="chatLogContainer">
    <message-bubble
      v-for="historyMsg in history"
      v-bind:key="historyMsg.id"
      v-bind:uuid="historyMsg.uuid"
      v-bind:text="historyMsg.text"
    />
    <message-bubble
      v-for="msg in vueChatMsg"
      v-bind:key="msg.id"
      v-bind:uuid="msg.message.uuid"
      v-bind:text="msg.message.text"
    />
  </div>
</template>

<script>
import MessageBubble from './MessageBubble';
import {mapGetters} from 'vuex';

/**
 * Auto scrolls the chat log to the bottom when a new message is received
 */
function scrollBottom() {
  this.$el.scrollTo(0, this.$el.scrollHeight);
}

export default {
  name: 'chat-log',
  components: {MessageBubble},
  props: {
    channel: String
  },
  data() {
    return {
      /*
       * $pnGetMessage will listen to a channel subscribed to and start to
       * display messages as soon as they are received.
      */
      vueChatMsg: this.$pnGetMessage(this.channel),
    }
  },
  watch: {
    vueChatMsg: function(){
      this.$nextTick(scrollBottom);
    }
  },
  computed: {
    ...mapGetters({
      history: 'getHistoryMsgs',
    }),
  },
};
</script>

<style scoped lang="scss">
.chat-log {
  height: calc(100vh - 177px);  /* minus topnav, filter buttons & messageinput */
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
