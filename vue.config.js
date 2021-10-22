module.exports = {
  /* source: https://css-tricks.com/how-to-import-a-sass-file-into-every-vue-component-in-an-app/ */
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "startbootstrap-sb-admin/dist/css/styles";
          @import "bootstrap/dist/css/bootstrap";
          @import "@/assets/_config.scss";
          @import "@/assets/_global.scss";
        `
      }
    }
  },
  /* source: https://cli.vuejs.org/config/#pages */
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Spotify Webapp'
    }
  }
};
