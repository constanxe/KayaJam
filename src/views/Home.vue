<template>
  <div class="home p-4">
    <SpotifyArtistAlbums artist-id="43ZHCT0cAZBISjO8DG9PnE"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SpotifyArtistAlbums from '@/components/SpotifyArtistAlbums.vue'

export default {
  name: 'Home',
  components: {
    SpotifyArtistAlbums
  }
}
</script>
