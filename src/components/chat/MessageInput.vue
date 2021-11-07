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

      const userUUID = this.$store.getters.getUserUuid;

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
.message-input {
  display: table-row;
  height: 55px;
}

textarea {
  width: 100%;
  height: 40px;
  padding: 2px 5px;
  font-size: 14px;
  border-radius: 3px;
  color: var(--color-default);
  background-color: var(--color-text);
  border: solid 3px var(--color-supporting);
  resize: none;
  outline: none;
  overflow: hidden;
  line-height: normal;
}
</style>
