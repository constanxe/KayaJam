/* reference: https://www.pubnub.com/blog/vuejs-group-chat-app-tutorial/ */

<template>
  <div class="message-bubble" :class="me">
    <span class="from" :class="me">{{ uuid }}</span>
    <br :class="me">
    <span class="message-text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'message-bubble',
  props: ['uuid','text'],
  computed: {
    me() {
      let result = false;
      // Check if the client uuid of the message received is your client uuid
      if (this.$store.getters.getMyUuid === this.uuid)  result = true;
      // Render the message bubble on the right side if it is from this client
      return result ? 'me' : '';
    },
  }
};
</script>

<style scoped lang="scss">
.message-bubble {
  float: left;
  clear: both;
  display: block;
  margin-bottom: 8px;

  .message-text {
    border-radius: 4px;
    padding: 8px;
    margin: 4px;
    color: black;
    text-align: left;
    width: fit-content;
    word-break: break-word;
    background-color: #dfdfdf;
  }

  &.me {
    float: right;

    .message-text {
      background-color: map-get($colors-brands, spotify);
    }

    br.me {
      display: none;
    }
  }

  span {
    display: block;
  }
}

.from {
  float: left;
  margin: 4px;
  font-size: 10px;
  color: #9DA7AF;

  &.me {
    display: none;
  }
}
</style>
