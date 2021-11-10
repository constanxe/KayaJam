/* reference: https://www.pubnub.com/blog/vuejs-group-chat-app-tutorial/ */

<template>
  <div class="message-input">
    <textarea
      placeholder="Enter message"
      maxlength="20000"
      @keydown.enter="submitMessage"
    />
  </div>
</template>

<script>
export default {
  name: 'message-input',
  props: {
    channel: String
  },
  methods: {
    submitMessage(event) {
      if (!event.shiftKey) {
        event.preventDefault();
      } else {
        return;
      }

      // If the message body is empty, do not submit
      if (event.target.value.length === 0) {
        return;
      }

      const userUUID = this.$store.getters.getMyUuid;

      // console.log(even.target.value);
      // Publish to PubNub the text and user's uuid
      this.$pnPublish({
        channel: this.channel,
        message: {
          text: event.target.value,
          uuid: userUUID,
        },
      })

      // Reset the text input
      event.target.value = '';
    }
  },
};
</script>

<style scoped lang="scss">
textarea {
  position: relative; /* non-static value for z-index else buttons overlap */
  width: 100%;
  height: 45px;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 3px;
  color: var(--color-default);
  background-color: var(--color-text);
  resize: none;
  outline: none;
  line-height: normal;
}
</style>
