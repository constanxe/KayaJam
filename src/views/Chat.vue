<template>
  <div class="chat">
    <!-- documentation: https://github.com/ankurk91/vue-loading-overlay -->
    <loading
      :active="dataLoading"
      :background-color="theme == 'light' ? 'white' : 'black'"
      color="green"
      loader="bars"
    />

    <div class="filter-buttons">
      <template v-if="activeChannel != 'global'">
        <router-link to="/chat/global">
          <Button btn-class="btn__toggle btn--radio">Global</Button>
        </router-link>
      </template>
      <router-link :to="'/chat/'+activeChannel">
        <Button btn-class="btn__toggle btn--radio active">{{ capitalizeFirstLetter(activeChannel) }}</Button>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import Button from '@/components/Btn.vue'
import { capitalizeFirstLetter } from '@/utils'
import {mapGetters} from 'vuex';

export default {
  name: 'chat',
  components: {
    Button,
    Loading
  },
  data() {
    return {
      dataLoading: false
    }
  },
  computed: {
    ...mapGetters({
      theme: 'getTheme',
    }),
    activeChannel() {
      return this.$route.params.channel
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return capitalizeFirstLetter(string)
    },
    routeLoaded() {
      this.dataLoading = true
      this.$router.go(0)  /* reference: https://stackoverflow.com/questions/41301099/do-we-have-router-reload-in-vue-router */
    },
  },
  /* reference: https://stackoverflow.com/questions/52468088/vue-router-call-function-after-route-has-loaded */
  watch: {
    $route() {
      this.$nextTick(this.routeLoaded());
    }
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