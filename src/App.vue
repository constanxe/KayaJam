<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $color-text;

    &.router-link-exact-active {
      color: $color-primary;
    }
  }
}
</style>
