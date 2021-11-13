<template>
  <div class="container-fluid p-4">
    <div class="row">
      <div class="col-6">
        <span class="fs-4">Artist</span>&nbsp;
        <!-- Buttons with features -->
        <router-link :to="'/chat/artist:'+artistName">
          <Button v-tooltip="'Chat with others about this artist'">Discussion</Button>
        </router-link>
        <hr>
        <!-- [Spotify widgets] reference: https://developer.spotify.com/documentation/widgets -->
        <!-- Follow: Detail view -->
        <iframe :src="`https://open.spotify.com/follow/1/?uri=spotify:artist:${artistId}&size=detail&theme=${theme}`"
                width="210" height="56" scrolling="no" frameborder="0" allowtransparency="true"/>
        <iframe :src="`https://open.spotify.com/follow/1/?uri=spotify:artist:${artistId}&size=detail&theme=${theme}&show-count=0`"
                width="168" height="56" scrolling="no" frameborder="0" allowtransparency="true"/>
        <hr>
        <!-- Follow: Basic View -->
        <iframe :src="`https://open.spotify.com/follow/1/?uri=spotify:artist:${artistId}&size=basic&theme=${theme}&show-count=0`"
                width="100" height="27" scrolling="no" frameborder="0" allowtransparency="true"/>
        <iframe :src="`https://open.spotify.com/follow/1/?uri=spotify:artist:${artistId}&size=basic&theme=${theme}`"
                width="150" height="27" scrolling="no" frameborder="0" allowtransparency="true"/>
      </div>
      <div class="col-6">
        <span class="fs-4">Album</span>&nbsp;
        <!-- Buttons with features -->
        <router-link :to="`/chat/album:${albumName}`">
          <Button v-tooltip="'Chat with others about this album'">Discussion</Button>
        </router-link>
        &nbsp;
        <Button v-tooltip="'Set player to this album'" @click.native="setPlayerAlbum(albumId)">Play Album</Button>
        <hr>
        <!-- Player: Large view (customisable height) -->
        <iframe :src="`https://open.spotify.com/embed/album/${albumId}`"
                width="300" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
        <!-- Player: Compact view -->
        <iframe :src="`https://open.spotify.com/embed/album/${albumId}`"
                width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Btn.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SpotifyWidgets',
  components: {
    Button
  },
  data() {
    return {
      /* temporary fallbacks */
      artistName: "Elvis Presley",
      artistId: "43ZHCT0cAZBISjO8DG9PnE",
      albumName: "Don´t Be Cruel and Other Hits",
      albumId: "5Ay88ZVN61blW8QYUpofy6"
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  methods: {
    ...mapMutations(['setPlayerAlbum']),
  }
}
</script>
